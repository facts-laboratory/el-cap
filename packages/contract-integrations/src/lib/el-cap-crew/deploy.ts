import { WarpFactory } from 'warp-contracts';
import {
  DeployPlugin,
  InjectedArweaveSigner,
} from 'warp-contracts-plugin-deploy';
import { stateFromFile } from './initial-state';
import { EL_CAP_CREW_SRC } from './constants';

export async function deploy(coin: string) {
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
      owner: await window.arweaveWallet.getActiveAddress(),
      watchlist: [coin],
    },
  };

  const userSigner = new InjectedArweaveSigner(window.arweaveWallet);
  await userSigner.setPublicKey();

  const deployFromSourceTx = async () => {
    return await warp.deployFromSourceTx({
      initState: JSON.stringify({ ...initialState }),
      srcTxId: EL_CAP_CREW_SRC,
      wallet: userSigner,
      tags: [{ name: 'El-Cap-Version', value: 'MVP-21' }],
    });
  };

  const result = await deployFromSourceTx();
  console.log(
    `Contract ${result.contractTxId} deployed from contract source ${result.srcTxId}`
  );
}
