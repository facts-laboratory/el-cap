import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  mergeObjects,
  sortPrices,
  processTokenData,
  sortTopCoins,
  entriesToObj,
} from '@el-cap/utilities';
import { ProcessedTokenData, TopCoins } from '@el-cap/interfaces';
import { getPrices } from './el-cap-kit.js';
import { RootState } from '../store.js';

export const FEED_FEATURE_KEY = 'feed';

/*
 * Update these interfaces according to your requirements.
 */
export interface FeedEntity {
  coin: string;
}

export interface FeedState extends EntityState<FeedEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  topLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  topCoins?: TopCoins;
}

export const feedAdapter = createEntityAdapter<FeedEntity>({
  selectId: (entity) => entity.coin,
});
// Modify checkCoinsOnWatchlist function to work with Dictionary<ProcessedTokenData>

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (key: string, thunkAPI) => {
    try {
      const { feed } = thunkAPI.getState() as RootState;
      const { entities } = feed;

      if (Object.keys(entities).length === 0) {
        // Run this if there are no entities
        const prices = await getPrices();
        console.log('prices in feed', prices);
        if (Object.keys(prices.remaining).length > 0) {
          const combinedPrices = mergeObjects(
            prices.redstone,
            prices.remaining
          );

          console.log('combined prices', combinedPrices);
          const processedPrices = await processTokenData(combinedPrices);

          const sortedPrices = sortPrices(entriesToObj(processedPrices), key);

          console.log('ready to return in feed', sortedPrices);

          return sortedPrices;
        } else {
          console.log('prices.redstone', prices.redstone);
          return prices.redstone;
        }
      } else {
        // If entities exist, sort them and also add watchlist flag

        const sortedPrices = sortPrices(entriesToObj(entities), key);

        return sortedPrices;
      }
    } catch (error) {
      console.log('failing', error);
      return [];
    }
  }
);

export const getTopCoins = createAsyncThunk(
  'feed/getTopCoins',
  async (_, thunkAPI) => {
    try {
      const { feed } = thunkAPI.getState() as RootState;
      const { entities } = feed;

      // Process and sort the data
      const sortedTopCoins = sortTopCoins(entriesToObj(entities));

      return sortedTopCoins;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch top coins');
    }
  }
);

export const initialFeedState: FeedState = feedAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  topLoadingStatus: 'not loaded',
});

export const feedSlice = createSlice({
  name: FEED_FEATURE_KEY,
  initialState: initialFeedState,
  reducers: {
    add: feedAdapter.addOne,
    remove: feedAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state: FeedState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchFeed.fulfilled,
        (state: FeedState, action: PayloadAction<ProcessedTokenData[]>) => {
          console.log('feed thunk', action.payload);
          feedAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchFeed.rejected, (state: FeedState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(getTopCoins.pending, (state: FeedState) => {
        state.topLoadingStatus = 'loading';
      })
      .addCase(
        getTopCoins.fulfilled,
        (state: FeedState, action: PayloadAction<TopCoins>) => {
          state.topCoins = action.payload;
          state.topLoadingStatus = 'loaded';
        }
      )
      .addCase(getTopCoins.rejected, (state: FeedState, action) => {
        state.topLoadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const feedReducer = feedSlice.reducer;

export const feedActions = feedSlice.actions;

const { selectAll, selectEntities } = feedAdapter.getSelectors();

export const getFeedState = (rootState: RootState): FeedState =>
  rootState[FEED_FEATURE_KEY];

export const selectAllFeed = createSelector(getFeedState, selectAll);

export const selectFeedLoadingStatus = createSelector(
  getFeedState,
  (state: FeedState) => state.loadingStatus
);

export const selectFeedEntities = createSelector(getFeedState, selectEntities);

export const selectTopLoadingStatus = createSelector(
  getFeedState,
  (state: FeedState) => state.topLoadingStatus
);

export const selectTopCoins = createSelector(
  getFeedState,
  (state: FeedState) => state.topCoins
);
