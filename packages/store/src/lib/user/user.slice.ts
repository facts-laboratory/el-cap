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

export const USER_FEATURE_KEY = 'user';

/*
 * Update these interfaces according to your requirements.
 */

export interface UserState extends EntityState<User> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  user: User | null;
}

export const userAdapter = createEntityAdapter<User>();

export const fetchUser = createAsyncThunk(
  'user/fetchStatus',
  async (_, thunkAPI) => {
    const othent = await Othent({
      API_ID: '2384f84424a36b36ede2873be3e0c7e9',
    });
    const user = await othent.logIn();
    console.log('user in slice', user);
    return [user];
  }
);

export const unsetUser = createAsyncThunk(
  'user/unsetUser',
  async (_, thunkAPI) => {
    console.log('logging out');
    const othent = await Othent({
      API_ID: '2384f84424a36b36ede2873be3e0c7e9',
    });
    const logout = await othent.logOut();
    console.log('user in slice', logout);
    return [logout];
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
      .addCase(fetchUser.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchUser.fulfilled,
        (state: UserState, action: PayloadAction<User[]>) => {
          state.user = action.payload[0];
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchUser.rejected, (state: UserState, action) => {
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
