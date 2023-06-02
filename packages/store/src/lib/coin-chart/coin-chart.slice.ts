import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { get24hPrice, getRemainingPriceHistory } from './el-cap-kit.js';
import { RootState } from '../store.js';

export const COIN_CHART_FEATURE_KEY = 'coinChart';

/*
 * Update these interfaces according to your requirements.
 */
export interface CoinChartEntity {
  id: number;
}

export interface CoinChartState extends EntityState<CoinChartEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  chartData: any;
}

export const coinChartAdapter = createEntityAdapter<CoinChartEntity>();

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
 *   dispatch(fetchCoinChart())
 * }, [dispatch]);
 * ```
 */
export const fetchCoinChart = createAsyncThunk(
  'coinChart/fetchStatus',
  async (input: { symbol: string; interval: string }, thunkAPI) => {
    const { symbol, interval } = input;
    const coinChart = await get24hPrice({ symbol, interval });
    const remaining = await getRemainingPriceHistory({
      ...coinChart,
    });
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getCoinCharts()`;
     * Right now we just return an empty array.
     */
    return remaining;
  }
);

export const initialCoinChartState: CoinChartState =
  coinChartAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
    chartData: {},
  });

export const coinChartSlice = createSlice({
  name: COIN_CHART_FEATURE_KEY,
  initialState: initialCoinChartState,
  reducers: {
    add: coinChartAdapter.addOne,
    remove: coinChartAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinChart.pending, (state: CoinChartState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCoinChart.fulfilled,
        (state: CoinChartState, action: PayloadAction<CoinChartEntity[]>) => {
          console.log('action', action.payload);
          state.chartData = action.payload;
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchCoinChart.rejected, (state: CoinChartState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const coinChartReducer = coinChartSlice.reducer;

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
 *   dispatch(coinChartActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const coinChartActions = coinChartSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllCoinChart);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = coinChartAdapter.getSelectors();

export const getCoinChartState = (rootState: RootState): CoinChartState =>
  rootState[COIN_CHART_FEATURE_KEY];

export const selectAllCoinChart = createSelector(getCoinChartState, selectAll);

export const selectChartData = createSelector(
  getCoinChartState,
  (state) => state.chartData
);

export const selectCoinChartEntities = createSelector(
  getCoinChartState,
  selectEntities
);
