import { fetchFeed, feedAdapter, feedReducer } from './feed.slice';

describe('feed reducer', () => {
  it('should handle initial state', () => {
    const expected = feedAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(feedReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchFeeds', () => {
    let state = feedReducer(undefined, fetchFeed.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = feedReducer(state, fetchFeed.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = feedReducer(
      state,
      fetchFeed.rejected(new Error('Uh oh'), null, null)
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
