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
} from '@el-cap/utilities';
import { TopCoins, State, ProcessedTokenData } from '@el-cap/interfaces';
import { getPrices } from './el-cap-kit.js';
import {
  getCrewMemberContract,
  readState,
} from '@el-cap/contract-integrations';
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

export const checkCoinsOnWatchlist = async (entities: ProcessedTokenData[]) => {
  const queryCrewState = await getCrewMemberContract();
  let watchlist: string[] = [];

  if (queryCrewState.length > 0) {
    const state: State = await readState(queryCrewState[0].node.id);
    console.log('state in checkCoinsOnWatchlist', state);
    watchlist = state.watchlist.map((item: string) => item.toLowerCase());
  }

  return entities.map((coin) => {
    return {
      ...coin,
      watchlist: watchlist.includes(coin.coin.toLowerCase()),
    };
  });
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (key: string, thunkAPI) => {
    try {
      const { feed } = thunkAPI.getState() as RootState;
      const { entities } = feed;

      if (Object.keys(entities).length === 0) {
        // Run this if there are no entities
        const prices = await getPrices();
        const combinedPrices = mergeObjects(prices.redstone, prices.remaining);

        const processedPrices = processTokenData(combinedPrices);

        // Add the watchlist flag to each entity
        const processedPricesWithWatchlistFlag = await checkCoinsOnWatchlist(
          processedPrices
        );

        const sortedPrices = sortPrices(processedPricesWithWatchlistFlag, key);

        return sortedPrices;
      } else {
        // If entities exist, sort them and also add watchlist flag
        const entitiesWithWatchlistFlag = await checkCoinsOnWatchlist(entities);

        const sortedPrices = sortPrices(entitiesWithWatchlistFlag, key);

        return sortedPrices;
      }
    } catch (error) {
      console.log(error);
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
      const sortedTopCoins = sortTopCoins(entities);

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
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state: FeedState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchFeed.fulfilled,
        (state: FeedState, action: PayloadAction<FeedEntity[]>) => {
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

/*
 * Export reducer for store configuration.
 */
export const feedReducer = feedSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(feedActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const feedActions = feedSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllFeed);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
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
