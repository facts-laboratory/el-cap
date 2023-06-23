import { Warp, WarpFactory } from 'warp-contracts';
import { DeployPlugin, ArweaveSigner } from 'warp-contracts-plugin-deploy';
import { EL_CAP_CREW_TX, stateFromFile } from './initial-state';

export async function deploy(coin) {
  const warp = WarpFactory.forMainnet().use(new DeployPlugin());

  const initialState = {
    ...stateFromFile,

    ...{
      owner: '456',
      watchlist: [coin],
    },
  };

  // const deploy = await warp.deploy({
  //   wallet: new ArweaveSigner(jwk),
  //   initState: JSON.stringify(initialState),
  //   srcTxId: contractSrc,
  // });
  // console.log(`contractTxId ${deploy.contractTxId}`);

  console.log('warp', warp);
  const deployFromSourceTx = await warp.deployFromSourceTx(
    {
      initState: JSON.stringify({
        ...initialState,
      }),
      srcTxId: EL_CAP_CREW_TX,
      wallet: 'use_wallet',
      tags: [{ name: 'El-Cap-Version', value: 'MVP-1' }],
    },
    { disableBundling: true }
  );

  console.log(
    `Contract ${deployFromSourceTx.contractTxId} deployed from contract source ${deployFromSourceTx.srcTxId}`
  );

  deployFromSourceTx();
}
