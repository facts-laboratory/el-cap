import {
  fetchContracts,
  contractsAdapter,
  contractsReducer,
} from './contracts.slice';

describe('contracts reducer', () => {
  it('should handle initial state', () => {
    const expected = contractsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(contractsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchContractss', () => {
    let state = contractsReducer(undefined, fetchContracts.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = contractsReducer(
      state,
      fetchContracts.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = contractsReducer(
      state,
      fetchContracts.rejected(new Error('Uh oh'), null, null)
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
