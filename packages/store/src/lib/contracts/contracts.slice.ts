import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-deploy';
import { RootState } from '../store';
import { writeContract } from 'arweavekit/contract';
import {
  deploy,
  getCrewMemberContract,
  getUserSigner,
  readState,
  updateWatchList,
} from '@el-cap/contract-integrations';
import { getMarketData } from '../feed/el-cap-kit.js';
import { MarketData, State } from '@el-cap/interfaces';
import { extractMarketData } from '@el-cap/utilities';

export const CONTRACTS_FEATURE_KEY = 'contracts';

export interface ContractsEntity {
  id: number;
  coin: string;
}

export interface ContractsState extends EntityState<ContractsEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  marketData?: MarketData[];
  marketDataLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
}

export const contractsAdapter = createEntityAdapter<ContractsEntity>({
  selectId: (entity) => entity.coin,
});

export const fetchContractcoins = createAsyncThunk(
  'contracts/fetchContractcoins',
  async (_, thunkAPI) => {
    const state: State = (await readState()) as State;
    const coins = state.coins;
    return coins;
  }
);

export const fetchMarketData = createAsyncThunk(
  'contracts/fetchMarketData',
  async (_, thunkAPI) => {
    const data = await getMarketData();
    const marketData = extractMarketData(data);
    return marketData;
  }
);

export const addToWatchlist = createAsyncThunk(
  'contracts/addToWatchlist',
  async (coin: string, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState;
    const address = user.user?.addr;
    const strategy = user.user?.strategy;
    if (address && strategy) {
      const queryCrewState = await getCrewMemberContract(address);
      console.log('queryCrewState', queryCrewState);
      if (queryCrewState.length > 0) {
        console.log('running here');
        try {
          const userSigner = await getUserSigner(strategy);
          await updateWatchList(userSigner, queryCrewState[0].node.id, coin);
        } catch (error) {
          console.log('error', error);
        }
      } else {
        deploy(coin, address, strategy);
      }
    }
  }
);

export const initialContractsState: ContractsState =
  contractsAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
    marketDataLoadingStatus: 'not loaded',
  });

export const contractsSlice = createSlice({
  name: CONTRACTS_FEATURE_KEY,
  initialState: initialContractsState,
  reducers: {
    add: contractsAdapter.addOne,
    remove: contractsAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractcoins.pending, (state: ContractsState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchContractcoins.fulfilled,
        (state: ContractsState, action: PayloadAction<any>) => {
          contractsAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchContractcoins.rejected, (state: ContractsState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(addToWatchlist.pending, (state: ContractsState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(addToWatchlist.fulfilled, (state: ContractsState) => {
        state.loadingStatus = 'loaded';
      })
      .addCase(addToWatchlist.rejected, (state: ContractsState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(fetchMarketData.pending, (state: ContractsState) => {
        state.marketDataLoadingStatus = 'loading';
      })
      .addCase(
        fetchMarketData.fulfilled,
        (state: ContractsState, action: PayloadAction<any>) => {
          state.marketData = action.payload;
          state.marketDataLoadingStatus = 'loaded';
        }
      )
      .addCase(fetchMarketData.rejected, (state: ContractsState, action) => {
        state.marketDataLoadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const contractsReducer = contractsSlice.reducer;

export const contractsActions = contractsSlice.actions;

const { selectAll, selectEntities } = contractsAdapter.getSelectors();

export const getContractsState = (rootState: RootState): ContractsState =>
  rootState[CONTRACTS_FEATURE_KEY];

export const selectAllContracts = createSelector(getContractsState, selectAll);

export const selectContractsLoadingStatus = createSelector(
  getContractsState,
  (state: ContractsState) => state.loadingStatus
);

export const selectMarketData = createSelector(
  getContractsState,
  (state: ContractsState) => state.marketData
);

export const selectContractsEntities = createSelector(
  getContractsState,
  selectEntities
);
