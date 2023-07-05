import { readContractState, writeContract } from 'arweavekit/contract';
import { WarpFactory } from 'warp-contracts';
import { CONTRACT_PARAMS } from './constants.js'; // Import your constants

const warp = WarpFactory.forMainnet();

export const readState = async (contractId = null)=> {
  // Use provided contractId, if available
  const params = contractId
    ? { ...CONTRACT_PARAMS, contractTxId: contractId }
    : CONTRACT_PARAMS;

  const result = await readContractState(params);
  const state = result.readContract.cachedValue.state;
  return state;
};

export async function getActiveWalletAddress() {
  // await window.arweaveWallet.connect([
  //   'ACCESS_ADDRESS',
  //   'SIGN_TRANSACTION',
  //   'ACCESS_PUBLIC_KEY',
  //   'SIGNATURE',
  // ]);

  return await window.arweaveWallet.getActiveAddress();
}
