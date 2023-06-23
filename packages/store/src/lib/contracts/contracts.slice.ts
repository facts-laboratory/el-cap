import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { WarpFactory } from 'warp-contracts';
import { CrewMember } from '@el-cap/interfaces';
import { deploy } from '@el-cap/contract-integrations';

export const CONTRACTS_FEATURE_KEY = 'contracts';

export interface ContractsEntity {
  id: number;
  symbol: string;
}

export interface ContractsState extends EntityState<ContractsEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  crew: CrewMember[];
}

export const contractsAdapter = createEntityAdapter<ContractsEntity>({
  selectId: (entity) => entity.symbol,
});

export const fetchContractcoins = createAsyncThunk(
  'contracts/fetchContractcoins',
  async (_, thunkAPI) => {
    console.log('fetchContractcoins in thunk');
    const contractId = 'zQyVXGGHME6Uh3opS8ULRTIb8jVTjvz2BT3f4jnH_wo';
    const warp = WarpFactory.forMainnet();
    const contract = warp.contract(contractId);
    const state: any = await contract.readState();
    console.log('state in fetchContracts', state);
    const coins = state.cachedValue.state.coins;
    console.log('coins in fetchContractcoins', coins, state, contract, warp);
    return coins;
  }
);

export const addToWatchlist = createAsyncThunk(
  'contracts/addToWatchlist',
  async (coin: string, thunkAPI) => {
    console.log('addToWatchList in thunk');
    deploy(coin);
  }
);

export const initialContractsState: ContractsState =
  contractsAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
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
        (state: ContractsState, action: PayloadAction<ContractsEntity[]>) => {
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

export const selectContractsEntities = createSelector(
  getContractsState,
  selectEntities
);
