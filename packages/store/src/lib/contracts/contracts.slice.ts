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
import { deploy, getCrewMemberContract } from '@el-cap/contract-integrations';

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
    const contractId = 'MH-w8Sq6uw3Jwc_stPqyJT8fEcIhx4VrrE10NFgv-KY';
    const warp = WarpFactory.forMainnet();
    const contract = warp.contract(contractId);
    const state: any = await contract.readState();
    const coins = state.cachedValue.state.coins;
    return coins;
  }
);

export const addToWatchlist = createAsyncThunk(
  'contracts/addToWatchlist',
  async (coin: string, thunkAPI) => {
    console.log('==addToWatchlist==');
    const queryCrewState = await getCrewMemberContract();
    const address = await window.arweaveWallet.getActiveAddress();
    console.log('addToWatchList in thunk', queryCrewState, address);
    if (queryCrewState.length > 0) {
      console.log('queryCrewState', queryCrewState[0]);
      const contractId = '36ujkpS-AogOB0DOV3O8Hp-P7rDGIeRZ1n620i1RmSU';
      const warp = WarpFactory.forMainnet();
      const contract = warp.contract(contractId);
      const state: any = await contract.readState();
      console.log('state in addToWatchlist', state);
      try {
        const writeResult = await writeContract({
          environment: 'mainnet' as const,
          contractTxId: queryCrewState[0].node.id,
          wallet: 'use_wallet' as const,
          options: {
            function: 'updateWatchlist',
            ticker: coin,
          },
        });

        console.log('writeResult', writeResult);
      } catch (error) {
        console.log('==transaction not yet finalised==');
        localStorage.setItem('el-cap-watchlist', JSON.stringify(coin));
      }
    } else {
      deploy(coin);
    }
  }
);

export const syncLocalCoins = createAsyncThunk(
  'contracts/syncLocalCoins',
  async (_, thunkAPI) => {
    console.log('==syncLocalCoins==');

    // Fetch coins from local storage
    const localCoins = JSON.parse(
      localStorage.getItem('el-cap-watchlist') || '[]'
    );

    if (!localCoins.length) {
      console.log('No coins in local storage to sync');
      return;
    }

    const queryCrewState = await getCrewMemberContract();
    const address = await window.arweaveWallet.getActiveAddress();
    console.log('syncLocalCoins in thunk', queryCrewState, address);

    if (queryCrewState.length > 0) {
      console.log('queryCrewState', queryCrewState[0]);
      const contractId = '36ujkpS-AogOB0DOV3O8Hp-P7rDGIeRZ1n620i1RmSU';
      const warp = WarpFactory.forMainnet();
      const contract = warp.contract(contractId);
      const state: any = await contract.readState();
      console.log('state in syncLocalCoins', state);

      try {
        // Iterate over each local coin and add it to the blockchain
        for (const coin of localCoins) {
          await writeContract({
            environment: 'mainnet' as const,
            contractTxId: queryCrewState[0].node.id,
            wallet: 'use_wallet' as const,
            options: {
              function: 'updateWatchlist',
              ticker: coin,
            },
          });
        }
        console.log('All local coins have been synced');

        // Clear the local storage after syncing
        localStorage.removeItem('el-cap-watchlist');
      } catch (error) {
        console.log('==error syncing coins==', error);
      }
    } else {
      console.log('No contract exists to sync coins to');
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
