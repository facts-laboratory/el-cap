import { WarpFactory } from 'warp-contracts';
import {
  DeployPlugin,
  InjectedArweaveSigner,
} from 'warp-contracts-plugin-deploy';
import { stateFromFile } from './initial-state';
import { EL_CAP_CREW_SRC } from './constants';
import { ArweaveWebWallet } from 'arweave-wallet-connector';

export async function deploy(coin: string, address: string, strategy: string) {
  const warp = WarpFactory.forMainnet().use(new DeployPlugin());

  await window.arweaveWallet.connect([
    'ACCESS_ADDRESS',
    'SIGN_TRANSACTION',
    'ACCESS_PUBLIC_KEY',
    'SIGNATURE',
  ]);

  const initialState = {
    ...stateFromFile,

    ...{
      owner: address,
      watchlist: [coin],
    },
  };
  let userSigner = null;

  console.log('strategy in deploy', strategy);
  if (strategy === 'arconnect') {
    console.log('running arconnect strategy');
    userSigner = new InjectedArweaveSigner(window.arweaveWallet);
    await userSigner.setPublicKey();
    console.log('userSigner after connecting', userSigner);
  } else if (strategy === 'webwallet') {
    const wallet = new ArweaveWebWallet({
      name: 'El Capitan',
    });
    wallet.setUrl('arweave.app');
    await wallet.connect();

    console.log('wallet', wallet);

    userSigner = new InjectedArweaveSigner(wallet);
  }

  console.log('usersigner', userSigner);
  const deployFromSourceTx = async () => {
    return await warp.deployFromSourceTx({
      initState: JSON.stringify({ ...initialState }),
      srcTxId: EL_CAP_CREW_SRC,
      wallet: userSigner,
      tags: [{ name: 'El-Cap-Version', value: 'MVP-22' }],
    });
  };

  const result = await deployFromSourceTx();
  console.log(
    `Contract ${result.contractTxId} deployed from contract source ${result.srcTxId}`
  );
}
