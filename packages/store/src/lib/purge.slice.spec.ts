import { fetchPurge, purgeAdapter, purgeReducer } from './purge.slice';

describe('purge reducer', () => {
  it('should handle initial state', () => {
    const expected = purgeAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(purgeReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchPurges', () => {
    let state = purgeReducer(undefined, fetchPurge.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = purgeReducer(state, fetchPurge.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = purgeReducer(
      state,
      fetchPurge.rejected(new Error('Uh oh'), null, null)
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
