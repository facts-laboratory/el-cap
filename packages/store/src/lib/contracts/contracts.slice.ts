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
import { writeContract } from 'arweavekit/contract';
import {
  deploy,
  getCrewMemberContract,
  CONTRACT_TX,
  readState,
} from '@el-cap/contract-integrations';
import { State } from '@el-cap/interfaces';

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

export const fetchContractcoins = createAsyncThunk(
  'contracts/fetchContractcoins',
  async (_, thunkAPI) => {
    const state: State = await readState();
    const coins = state.coins;
    return coins;
  }
);

export const addToWatchlist = createAsyncThunk(
  'contracts/addToWatchlist',
  async (coin: string, thunkAPI) => {
    console.log('==addToWatchlist==');
    const queryCrewState = await getCrewMemberContract();
    if (queryCrewState.length > 0) {
      console.log('queryCrewState', queryCrewState[0]);

      try {
        const state: State = await readState(queryCrewState[0].node.id);
        console.log('state in addToWatchlist', state);
        await writeContract({
          environment: 'mainnet' as const,
          contractTxId: queryCrewState[0].node.id,
          wallet: 'use_wallet' as const,
          options: {
            function: 'updateWatchlist',
            ticker: coin,
          },
        });
      } catch (error) {
        console.log('==transaction not yet finalised==');
      }
    } else {
      deploy(coin);
    }
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
