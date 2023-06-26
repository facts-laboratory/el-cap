import { Warp, WarpFactory } from 'warp-contracts';
import { DeployPlugin, ArweaveSigner } from 'warp-contracts-plugin-deploy';
import { EL_CAP_CREW_TX, stateFromFile } from './initial-state';

export async function deploy(coin) {
  const warp = WarpFactory.forMainnet().use(new DeployPlugin());

  window.arweaveWallet.connect(['SIGN_TRANSACTION', 'ACCESS_ADDRESS']);

  const initialState = {
    ...stateFromFile,

    ...{
      owner: await window.arweaveWallet.getActiveAddress(),
      watchlist: [coin],
    },
  };

  const deployFromSourceTx = await warp.deployFromSourceTx(
    {
      initState: JSON.stringify({
        ...initialState,
      }),
      srcTxId: EL_CAP_CREW_TX,
      wallet: 'use_wallet',
      tags: [{ name: 'El-Cap-Version', value: 'MVP-9' }],
    },
    { disableBundling: true }
  );

  console.log(
    `Contract ${deployFromSourceTx.contractTxId} deployed from contract source ${deployFromSourceTx.srcTxId}`
  );

  deployFromSourceTx();
}
