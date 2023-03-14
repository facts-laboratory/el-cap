import styles from './coin.module.css';
import { CryptoData } from '@el-cap/interfaces';

/* eslint-disable-next-line */

interface CoinProps {
  data: CryptoData;
}

export function Coin( props: CoinProps ) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Coin!</h1>
    </div>
  );
}

export default Coin;
