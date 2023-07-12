import { InjectedArweaveSigner } from 'warp-contracts-plugin-deploy';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { writeContract } from 'arweavekit/contract';

export async function getUserSigner(strategy: string) {
  let userSigner = null;

  try {
    if (strategy === 'arconnect') {
      userSigner = new InjectedArweaveSigner(window.arweaveWallet);
      console.log('userSigner', userSigner);
    } else if (strategy === 'webwallet') {
      console.log('using webwallet strategy', strategy);
      const wallet = new ArweaveWebWallet({
        name: 'El Capitan',
      });
      wallet.setUrl('arweave.app');
      await wallet.connect();

      userSigner = new InjectedArweaveSigner(wallet);
    }
    await userSigner.setPublicKey();
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
