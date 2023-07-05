import {
  fetchWatchlist,
  watchlistAdapter,
  watchlistReducer,
} from './watchlist.slice';

describe('watchlist reducer', () => {
  it('should handle initial state', () => {
    const expected = watchlistAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(watchlistReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchWatchlists', () => {
    let state = watchlistReducer(undefined, fetchWatchlist.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = watchlistReducer(
      state,
      fetchWatchlist.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = watchlistReducer(
      state,
      fetchWatchlist.rejected(new Error('Uh oh'), null, null)
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
