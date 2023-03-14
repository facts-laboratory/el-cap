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
        const arr = Object.entries(O).map((item) => {
          return item[1];
        });
        setPrices(arr);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    console.log(prices);
  }, [prices]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Feed!</h1>
      <div className={styles['coin-container']}>
        {prices &&
          prices.map((item: CryptoData) => {
            return <Coin data={item} />;
          })}

      </div>
    </div>
  );
}

export default Feed;
