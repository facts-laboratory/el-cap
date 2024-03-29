import { setUser, userAdapter, userReducer } from './user.slice';

describe('user reducer', () => {
  it('should handle initial state', () => {
    const expected = userAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(userReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle setUsers', () => {
    let state = userReducer(undefined, setUser.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = userReducer(state, setUser.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = userReducer(
      state,
      setUser.rejected(new Error('Uh oh'), null, null)
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
