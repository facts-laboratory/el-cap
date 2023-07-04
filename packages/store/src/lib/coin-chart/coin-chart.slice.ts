import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getRemainingPriceHistory, get24hPrice } from '../feed/el-cap-kit.js';
import { RootState } from '../store.js';
import { ChartData, RemainingObject } from '@el-cap/interfaces';

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
  chartData: RemainingObject[];
  remainingChartData: RemainingObject[];
  remainingLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
}

export const coinChartAdapter = createEntityAdapter<CoinChartEntity>();

export const fetch24PriceData = createAsyncThunk(
  'coinChart/fetchStatus',
  async (input: { symbol: string; interval: string }, thunkAPI) => {
    const { symbol, interval } = input;
    const coinChart = await get24hPrice({ symbol, interval });

    return coinChart;
  }
);

export const fetchRemainingPriceData = createAsyncThunk(
  'coinChart/fetchRemaining',
  async (input: { symbol: string; interval: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const coinChart = state.coinChart.chartData;
    const remaining = await getRemainingPriceHistory({
      ...coinChart,
      symbol: input.symbol,
    });

    return remaining;
  }
);

export const initialCoinChartState: CoinChartState =
  coinChartAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
    chartData: {},
    remainingChartData: [],

    remainingLoadingStatus: 'not loaded',
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
      .addCase(fetch24PriceData.pending, (state: CoinChartState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetch24PriceData.fulfilled,
        (state: CoinChartState, action: PayloadAction<CoinChartEntity[]>) => {
          state.chartData = action.payload;
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetch24PriceData.rejected, (state: CoinChartState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(fetchRemainingPriceData.pending, (state: CoinChartState) => {
        state.remainingLoadingStatus = 'loading';
      })
      .addCase(
        fetchRemainingPriceData.fulfilled,
        (state: CoinChartState, action: PayloadAction<RemainingObject[]>) => {
          state.chartData = action.payload;
          state.remainingLoadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchRemainingPriceData.rejected,
        (state: CoinChartState, action) => {
          state.remainingLoadingStatus = 'error';
          state.error = action.error.message;
        }
      );
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

export const selectRemainingLoadingStatus = createSelector(
  getCoinChartState,
  (state) => state.remainingLoadingStatus
);

export const selectCoinChartEntities = createSelector(
  getCoinChartState,
  selectEntities
);
