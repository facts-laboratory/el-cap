import { WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';
import { stateFromFile } from './initial-state';
import { EL_CAP_CREW_SRC } from './constants';
import { getUserSigner } from './write';

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

  const userSigner = await getUserSigner(strategy);

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
