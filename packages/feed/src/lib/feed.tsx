import styles from './feed.module.css';
import { useState, useEffect } from 'react';
import redstone from 'redstone-api';
import { Coin } from '@el-cap/coin';
import { CryptoData } from '@el-cap/interfaces';

/* eslint-disable-next-line */
export interface FeedProps {}

export function Feed(props: FeedProps) {
  const [prices, setPrices] = useState<any>({});

  useEffect(() => {
    redstone
      .getAllPrices().then((O: any) => {
        setPrices(Object.values(O));
      })
      .catch(console.log);
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Feed!</h1>
      <div className={styles['coin-container']}>
        {JSON.stringify(prices)}
      </div>
    </div>
  );
}

export default Feed;
