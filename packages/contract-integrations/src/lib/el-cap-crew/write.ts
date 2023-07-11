import { InjectedArweaveSigner } from 'warp-contracts-plugin-deploy';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { writeContract } from 'arweavekit/contract';

export async function getUserSigner(strategy: string) {
  let userSigner = null;

  try {
    if (strategy === 'arconnect') {
      userSigner = new InjectedArweaveSigner(window.arweaveWallet);
      console.log('userSigner', userSigner);
      await userSigner.setPublicKey();
    } else if (strategy === 'webwallet') {
      const wallet = new ArweaveWebWallet({
        name: 'El Capitan',
      });
      wallet.setUrl('arweave.app');
      await wallet.connect();

      userSigner = new InjectedArweaveSigner(wallet);
    }
  } catch (error) {
    console.log(error);
  }

  console.log('userSigner', userSigner);
  return userSigner;
}

export const updateWatchList = async (
  signer,
  address: string,
  coin: string
) => {
  await writeContract({
    environment: 'mainnet' as const,
    contractTxId: address,
    wallet: signer,
    options: {
      function: 'updateWatchlist',
      ticker: coin,
    },
  });

  await writeContract({
    environment: 'mainnet' as const,
    contractTxId: address,
    wallet: signer,
    options: {
      function: 'dummyWrite',
    },
  });
};
