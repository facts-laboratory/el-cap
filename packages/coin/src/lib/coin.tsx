import styles from './coin.module.css';

/* eslint-disable-next-line */
export interface CoinProps {}

export function Coin(props: CoinProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Coin!</h1>
    </div>
  );
}

export default Coin;
