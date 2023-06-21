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

export const CONTRACTS_FEATURE_KEY = 'contracts';

export interface ContractsEntity {
  id: number;
  symbol: string;
}

export interface ContractsState extends EntityState<ContractsEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const contractsAdapter = createEntityAdapter<ContractsEntity>({
  selectId: (entity) => entity.symbol,
});

export const fetchCoins = createAsyncThunk(
  'contracts/fetchCoins',
  async (_, thunkAPI) => {
    console.log('fetchCoins in thunk');
    const contractId = 'MH-w8Sq6uw3Jwc_stPqyJT8fEcIhx4VrrE10NFgv-KY';
    const warp = WarpFactory.forMainnet();
    const contract = warp.contract(contractId);
    const state: any = await contract.readState();
    const coins = state.cachedValue.state.coins;
    console.log('coins in fetchCoins', coins, state, contract, warp);
    return coins;
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
      .addCase(fetchCoins.pending, (state: ContractsState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCoins.fulfilled,
        (state: ContractsState, action: PayloadAction<ContractsEntity[]>) => {
          contractsAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchCoins.rejected, (state: ContractsState, action) => {
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
