import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { persistor, RootState } from './store';

export const PURGE_FEATURE_KEY = 'purge';

/*
 * Update these interfaces according to your requirements.
 */
export interface PurgeEntity {
  id: number;
}

export interface PurgeState extends EntityState<PurgeEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const purgeAdapter = createEntityAdapter<PurgeEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
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
 *   dispatch(fetchPurge())
 * }, [dispatch]);
 * ```
 */
export const fetchPurge = createAsyncThunk(
  'purge/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getPurges()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialPurgeState: PurgeState = purgeAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const purgeSlice = createSlice({
  name: PURGE_FEATURE_KEY,
  initialState: initialPurgeState,
  reducers: {
    add: purgeAdapter.addOne,
    remove: purgeAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurge.pending, (state: PurgeState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchPurge.fulfilled,
        (state: PurgeState, action: PayloadAction<PurgeEntity[]>) => {
          purgeAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
          persistor.purge();
        }
      )
      .addCase(fetchPurge.rejected, (state: PurgeState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const purgeReducer = purgeSlice.reducer;

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
 *   dispatch(purgeActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const purgeActions = purgeSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllPurge);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = purgeAdapter.getSelectors();

export const getPurgeState = (rootState: RootState): PurgeState =>
  rootState[PURGE_FEATURE_KEY];

export const selectAllPurge = createSelector(getPurgeState, selectAll);

export const selectPurgeEntities = createSelector(
  getPurgeState,
  selectEntities
);
