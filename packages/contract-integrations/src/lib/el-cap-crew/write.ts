import { InjectedArweaveSigner } from 'warp-contracts-plugin-deploy';
import { ArweaveWebWallet } from 'arweave-wallet-connector';

export async function getUserSigner(strategy: string) {
  let userSigner = null;

  if (strategy === 'arconnect') {
    userSigner = new InjectedArweaveSigner(window.arweaveWallet);
    await userSigner.setPublicKey();
  } else if (strategy === 'webwallet') {
    const wallet = new ArweaveWebWallet({
      name: 'El Capitan',
    });
    wallet.setUrl('arweave.app');

    try {
      await wallet.connect();
      userSigner = new InjectedArweaveSigner(wallet);
    } catch (error) {
      throw new Error('Failed to connect to ArweaveWebWallet');
    }
  }

  return userSigner;
}
