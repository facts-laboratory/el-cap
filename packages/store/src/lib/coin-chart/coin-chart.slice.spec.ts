import {
  fetchCoinChart,
  coinChartAdapter,
  coinChartReducer,
} from './coin-chart.slice';

describe('coinChart reducer', () => {
  it('should handle initial state', () => {
    const expected = coinChartAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(coinChartReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchCoinCharts', () => {
    let state = coinChartReducer(undefined, fetchCoinChart.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = coinChartReducer(
      state,
      fetchCoinChart.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = coinChartReducer(
      state,
      fetchCoinChart.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
