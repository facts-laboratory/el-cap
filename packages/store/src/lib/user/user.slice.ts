import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Othent } from 'othent';
import { User } from '@el-cap/interfaces';
import { ArConnect } from 'arweavekit/auth';
import Account, { ArAccount } from 'arweave-account';

const account = new Account();

export const USER_FEATURE_KEY = 'user';

/*
 * Update these interfaces according to your requirements.
 */

export interface UserState extends EntityState<User> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  user: ArAccount | null;
}

export const userAdapter = createEntityAdapter<User>();

export const setUser = createAsyncThunk(
  'user/fetchStatus',
  async (_, thunkAPI) => {
    console.log('setting user');
    await ArConnect.connect({
      permissions: ['SIGN_TRANSACTION', 'ACCESS_ADDRESS'],
      appInfo: { name: 'El Capitan' },
    });
    const address = await ArConnect.getActiveAddress();

    const user = await account.get(address);
    console.log('address', address, 'user', user);
    // const othent = await Othent({
    //   API_ID: '2384f84424a36b36ede2873be3e0c7e9',
    // });
    // const user = await othent.logIn();
    // console.log('user in slice', user);
    return [user];
  }
);

export const unsetUser = createAsyncThunk(
  'user/unsetUser',
  async (_, thunkAPI) => {
    console.log('logging out');
    const disconnected = await ArConnect.disconnect();
    console.log('disconnected', disconnected);
    return [];
    // const othent = await Othent({
    //   API_ID: '2384f84424a36b36ede2873be3e0c7e9',
    // });
    // const logout = await othent.logOut();
    // console.log('user in slice', logout);
    // return [logout];
  }
);

export const initialUserState: UserState = userAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  user: null,
});

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {
    add: userAdapter.addOne,
    remove: userAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUser.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        setUser.fulfilled,
        (state: UserState, action: PayloadAction<ArAccount[]>) => {
          state.user = action.payload[0];
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(setUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(unsetUser.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(unsetUser.fulfilled, (state: UserState) => {
        state.user = null;
        state.loadingStatus = 'loaded';
      })
      .addCase(unsetUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

const { selectAll, selectEntities } = userAdapter.getSelectors();

export const getUserState = (rootState: RootState): UserState =>
  rootState[USER_FEATURE_KEY];

export const selectUser = createSelector(
  getUserState,
  (state: UserState) => state.user
);

export const selectAllUser = createSelector(getUserState, selectAll);

export const selectUserEntities = createSelector(getUserState, selectEntities);
