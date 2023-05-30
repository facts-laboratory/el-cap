import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import redstone from 'redstone-api';
import { getPrices } from './el-cap-kit.js';

import { RootState } from '../store';

export const FEED_FEATURE_KEY = 'feed';

/*
 * Update these interfaces according to your requirements.
 */
export interface FeedEntity {
  id: number;
}

export interface FeedState extends EntityState<FeedEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

type RedstoneObject = { [ticker: string]: unknown };
type RemainingObject = {
  [index: string]: { symbol: string } & Record<string, unknown>;
};

const dummyData = {
  redstone: {
    ETH: {
      id: '9928b0ee-7878-4d58-85ec-4b37e787ed8a',
      symbol: 'ETH',
      provider: 'I-5rWUehEv-MjdK9gFw09RxfSLQX9DIHxG614Wf8qo0',
      value: 1812.99651696,
      liteEvmSignature:
        '0xac0cdf6e7d69bb5ebbf6ba0779c26342861c69c20932877edd9991193e17949a01b41e16052d8e52a74dd84f2115cbc5af29b48dfa6f64e0aa3fb56e8472c31c1c',
      permawebTx: 'mock-permaweb-tx',
      version: '0.4',
      source: {
        band: 1813.3,
        bequant: 1812.99651696,
        binance: 1813.0825204,
        binanceus: 1814.34,
        binanceusdm: 1812.2924888,
        bitcoincom: 1812.99651696,
        bitfinex2: 1814.7,
        bittrex: 1814.808,
        btcturk: 1812.9725160000003,
        cex: 1814.25,
        chainlink: 1813.73668326,
        coinbaseprime: 1812.69,
        coinbasepro: 1812.69,
        coingecko: 1813.33,
        dia: 1812.6760973006612,
        hitbtc: 1812.99651696,
        hollaex: 1811.3524512000001,
        huobipro: 1813.2025252,
        kaiko: 1812.574024890999,
        kraken: 1812.44,
        kucoin: 1813.1225220000001,
        lbank: 1813.8326000747043,
        oceanex: 1812.5324984000001,
        okx: 1813.0525192,
        poloniex: 1812.5624996000001,
        probit: 1813.0825204,
        stex: 1803.0117011533428,
      },
      timestamp: 1685099220000,
      minutes: 7,
      providerPublicKey:
        'xyTvKiCST8bAT6sxrgkLh8UCX2N1eKvawODuxwq4qOHIdDAZFU_3N2m59rkZ0E7m77GsJuf1I8u0oEJEbxAdT7uD2JTwoYEHauXSxyJYvF0RCcZOhl5P1PJwImd44SJYa_9My7L84D5KXB9SKs8_VThe7ZyOb5HSGLNvMIK6A8IJ4Hr_tg9GYm65CRmtcu18S9mhun8vgw2wi7Gw6oR6mc4vU1I-hrU66Fi7YlXwFieP6YSy01JqoLPhU84EunPQzXPouVSbXjgRU5kFVxtdRy4GK2fzEBFYsQwCQgFrySCrFKHV8AInu9jerfof_DxNKiXkBzlB8nc22CrYnvvio_BWyh-gN0hQHZT0gwMR-A7sbXNCQJfReaIZzX_jP6XoB82PnpzmL_j1mJ2lnv2Rn001flBAx9AYxtGXd9s07pA-FggTbEG3Y2UnlWW6l3EJ93E0IfxL0PqGEUlp217mxUHvmTw9fkGDWa8rT9RPmsTyji-kMFSefclw80cBm_iOsIEutGP4S3LDbP-ZVJWDeJOBQQpSgwbisl8qbjl2sMQLQihoG2TQyNbmLwfyq-XSULkXjUi1_6BH36wnDBLWBKF-bS2bLKcGtn3Vjet72lNHxJJilcj8vpauwJG0078S_lO5uGt6oicdGR6eh_NSn6_8za_tXg0G_fohz4Yb1z8',
    },
    BTC: {
      id: '34d7f6d8-ca3b-4d26-8d41-6dab17fcfb49',
      symbol: 'BTC',
      provider: 'I-5rWUehEv-MjdK9gFw09RxfSLQX9DIHxG614Wf8qo0',
      value: 26458.848311600002,
      liteEvmSignature:
        '0xfd98cc42fbef8b985d054111f57bbe7609998249c8eba98a086c12e1b7b7abb054a471a75a28bee886fc45e923ce48dcf8fe511bcfce24c1f105a1ba75c56f5a1b',
      permawebTx: 'mock-permaweb-tx',
      version: '0.4',
      source: {
        band: 26458.95,
        bequant: 26456.4982176,
        binance: 26459.9983576,
        binanceus: 26469.92,
        binanceusdm: 26449.457936000003,
        bitcoincom: 26456.4982176,
        bitfinex2: 26476,
        bittrex: 26488.014,
        btcturk: 26435.057360000003,
        cex: 26504,
        coinbaseprime: 26450.21,
        coinbasepro: 26450.21,
        coingecko: 26454,
        hitbtc: 26456.4982176,
        hollaex: 26458.848311600002,
        huobipro: 26461.0784008,
        kaiko: 26449.99145637057,
        kraken: 26451.8,
        kucoin: 26460.558380000002,
        lbank: 26460.764425725738,
        oceanex: 26451.218006400002,
        okx: 26459.758348000003,
        poloniex: 26453.028078800002,
        probit: 26460.058360000003,
        stex: 27000.150662808,
      },
      timestamp: 1685099220000,
      minutes: 7,
      providerPublicKey:
        'xyTvKiCST8bAT6sxrgkLh8UCX2N1eKvawODuxwq4qOHIdDAZFU_3N2m59rkZ0E7m77GsJuf1I8u0oEJEbxAdT7uD2JTwoYEHauXSxyJYvF0RCcZOhl5P1PJwImd44SJYa_9My7L84D5KXB9SKs8_VThe7ZyOb5HSGLNvMIK6A8IJ4Hr_tg9GYm65CRmtcu18S9mhun8vgw2wi7Gw6oR6mc4vU1I-hrU66Fi7YlXwFieP6YSy01JqoLPhU84EunPQzXPouVSbXjgRU5kFVxtdRy4GK2fzEBFYsQwCQgFrySCrFKHV8AInu9jerfof_DxNKiXkBzlB8nc22CrYnvvio_BWyh-gN0hQHZT0gwMR-A7sbXNCQJfReaIZzX_jP6XoB82PnpzmL_j1mJ2lnv2Rn001flBAx9AYxtGXd9s07pA-FggTbEG3Y2UnlWW6l3EJ93E0IfxL0PqGEUlp217mxUHvmTw9fkGDWa8rT9RPmsTyji-kMFSefclw80cBm_iOsIEutGP4S3LDbP-ZVJWDeJOBQQpSgwbisl8qbjl2sMQLQihoG2TQyNbmLwfyq-XSULkXjUi1_6BH36wnDBLWBKF-bS2bLKcGtn3Vjet72lNHxJJilcj8vpauwJG0078S_lO5uGt6oicdGR6eh_NSn6_8za_tXg0G_fohz4Yb1z8',
    },
    BNB: {
      id: 'b33c2869-cf10-40c6-b08f-c74ec27c2c2c',
      symbol: 'BNB',
      provider: 'I-5rWUehEv-MjdK9gFw09RxfSLQX9DIHxG614Wf8qo0',
      value: 306.5322608,
      liteEvmSignature:
        '0x8aaed65931e4f0c17da3497fd51ba67d61094cc22fe9c15cefb3f83774efe6c73dbcec1427f9ff3799ae6a7881fa956dbb4b341dfdc68e87ac30e0d12ed020f61b',
      permawebTx: 'mock-permaweb-tx',
      version: '0.4',
      source: {
        binance: 306.51226,
        binanceus: 306.5,
        binanceusdm: 306.30225160000003,
        bitcoincom: 306.79000110920003,
        cex: 302.4001,
        coingecko: 306.61,
        hitbtc: 306.79000110920003,
        kucoin: 306.57126236000005,
        lbank: 306.61226400000004,
        oceanex: 306.509559892,
        poloniex: 306.5522616,
        probit: 306.1522456,
      },
      timestamp: 1685099220000,
      minutes: 7,
      providerPublicKey:
        'xyTvKiCST8bAT6sxrgkLh8UCX2N1eKvawODuxwq4qOHIdDAZFU_3N2m59rkZ0E7m77GsJuf1I8u0oEJEbxAdT7uD2JTwoYEHauXSxyJYvF0RCcZOhl5P1PJwImd44SJYa_9My7L84D5KXB9SKs8_VThe7ZyOb5HSGLNvMIK6A8IJ4Hr_tg9GYm65CRmtcu18S9mhun8vgw2wi7Gw6oR6mc4vU1I-hrU66Fi7YlXwFieP6YSy01JqoLPhU84EunPQzXPouVSbXjgRU5kFVxtdRy4GK2fzEBFYsQwCQgFrySCrFKHV8AInu9jerfof_DxNKiXkBzlB8nc22CrYnvvio_BWyh-gN0hQHZT0gwMR-A7sbXNCQJfReaIZzX_jP6XoB82PnpzmL_j1mJ2lnv2Rn001flBAx9AYxtGXd9s07pA-FggTbEG3Y2UnlWW6l3EJ93E0IfxL0PqGEUlp217mxUHvmTw9fkGDWa8rT9RPmsTyji-kMFSefclw80cBm_iOsIEutGP4S3LDbP-ZVJWDeJOBQQpSgwbisl8qbjl2sMQLQihoG2TQyNbmLwfyq-XSULkXjUi1_6BH36wnDBLWBKF-bS2bLKcGtn3Vjet72lNHxJJilcj8vpauwJG0078S_lO5uGt6oicdGR6eh_NSn6_8za_tXg0G_fohz4Yb1z8',
    },
  },
  remaining: {
    '0': {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      current_price: 26454,
      market_cap: 512800618741,
      market_cap_rank: 1,
      fully_diluted_valuation: 555545191699,
      total_volume: 7708563485,
      high_24h: 26558,
      low_24h: 26216,
      price_change_24h: 192.74,
      price_change_percentage_24h: 0.7339,
      market_cap_change_24h: 4620242611,
      market_cap_change_percentage_24h: 0.90917,
      circulating_supply: 19384225,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -61.68974,
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: 67.81,
      atl_change_percentage: 38908.43325,
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2023-05-26T11:06:57.203Z',
      sparkline_in_7d: {
        price: [
          26865.531410499854, 26926.89908684181,

          26448.296157391003, 26423.03593682665,
        ],
      },
      price_change_percentage_1h_in_currency: 0.05890585257772234,
      price_change_percentage_24h_in_currency: 0.7339033314577833,
      price_change_percentage_7d_in_currency: -1.4354996057913685,
    },
    '1': {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      current_price: 1813.33,
      market_cap: 218081220351,
      market_cap_rank: 2,
      fully_diluted_valuation: 218081220351,
      total_volume: 6541074679,
      high_24h: 1816.51,
      low_24h: 1783.29,
      price_change_24h: 25.91,
      price_change_percentage_24h: 1.44934,
      market_cap_change_24h: 3477860905,
      market_cap_change_percentage_24h: 1.6206,
      circulating_supply: 120258105.894785,
      total_supply: 120258105.894785,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -62.83203,
      ath_date: '2021-11-10T14:24:19.604Z',
      atl: 0.432979,
      atl_change_percentage: 418661.89595,
      atl_date: '2015-10-20T00:00:00.000Z',
      roi: {
        times: 90.64905350499114,
        currency: 'btc',
        percentage: 9064.905350499115,
      },
      last_updated: '2023-05-26T11:06:59.942Z',
      sparkline_in_7d: {
        price: [
          1807.198698316342, 1806.8392714652343, 1808.6910039727682,
          1807.464985717585, 1808.0976574342005, 1807.6636182603536,
          1814.8625216671917, 1814.8408558642202, 1810.0894386318216,
          1814.3270998245375, 1813.0827055569014, 1818.8220994847193,
          1818.1158579136888, 1810.9590594877307, 1812.4988519574872,
          1814.0136235287525, 1813.7303115873779, 1812.1317035605853,

          1807.3884715603995,
        ],
      },
      price_change_percentage_1h_in_currency: 0.045235105756102865,
      price_change_percentage_24h_in_currency: 1.44933963058961,
      price_change_percentage_7d_in_currency: 0.2893463683979916,
    },
    '2': {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
      current_price: 1,
      market_cap: 83050294002,
      market_cap_rank: 3,
      fully_diluted_valuation: 83050294002,
      total_volume: 16703591871,
      high_24h: 1.003,
      low_24h: 0.997586,
      price_change_24h: -0.000219878879606839,
      price_change_percentage_24h: -0.02198,
      market_cap_change_24h: 31929982,
      market_cap_change_percentage_24h: 0.03846,
      circulating_supply: 83063097246.7102,
      total_supply: 83063097246.7102,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.4313,
      ath_date: '2018-07-24T00:00:00.000Z',
      atl: 0.572521,
      atl_change_percentage: 74.63916,
      atl_date: '2015-03-02T00:00:00.000Z',
      roi: null,
      last_updated: '2023-05-26T11:05:00.585Z',
      sparkline_in_7d: {
        price: [
          0.9994556419832497, 1.0001212742219918, 1.0000182469110646,
          0.9998257847089468, 0.9999774977947926, 1.0001999167073377,

          0.9998307807664494, 1.0008451722021203, 0.9993550796773982,
          0.9999096191783322, 0.9997745771782724, 0.9995812810376985,
          1.0000903569333215, 0.9996453177708176, 1.0002194301050493,
          0.9998546264977252, 0.9998701340548733, 1.000139705550208,
          1.0000680483651894, 1.0004589505151464, 0.9996437363572256,
        ],
      },
      price_change_percentage_1h_in_currency: 0.0131969909615374,
      price_change_percentage_24h_in_currency: -0.02198037164199514,
      price_change_percentage_7d_in_currency: -0.007782408668378975,
    },
  },
};

function mergeObjects(
  redstone: RedstoneObject,
  remaining: RemainingObject
): Array<unknown> {
  const redstoneLowered: Record<string, unknown> = Object.keys(redstone).reduce<
    Record<string, unknown>
  >((c, k) => {
    c[k.toLowerCase()] = redstone[k];
    return c;
  }, {});

  return Object.keys(remaining).map((key) => {
    const symbolLower = remaining[key].symbol.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(redstoneLowered, symbolLower)) {
      return { ...remaining[key], ...(redstoneLowered[symbolLower] as object) };
    } else {
      return remaining[key];
    }
  });
}

export const feedAdapter = createEntityAdapter<FeedEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchFeed())
 * }, [dispatch]);
 * ```
 */

export const fetchFeed = createAsyncThunk(
  'feed/fetchStatus',
  async (_, thunkAPI) => {
    try {
      console.log('fetching feed');
      const prices = await getPrices();
      const combinedPrices = mergeObjects(prices.redstone, prices.remaining);
      console.log('prices', prices, 'combined', combinedPrices);
      return combinedPrices;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const initialFeedState: FeedState = feedAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const feedSlice = createSlice({
  name: FEED_FEATURE_KEY,
  initialState: initialFeedState,
  reducers: {
    add: feedAdapter.addOne,
    remove: feedAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state: FeedState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchFeed.fulfilled,
        (state: FeedState, action: PayloadAction<FeedEntity[]>) => {
          feedAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchFeed.rejected, (state: FeedState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const feedReducer = feedSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(feedActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const feedActions = feedSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllFeed);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = feedAdapter.getSelectors();

export const getFeedState = (rootState: RootState): FeedState =>
  rootState[FEED_FEATURE_KEY];

export const selectAllFeed = createSelector(getFeedState, selectAll);

export const selectFeedLoadingStatus = createSelector(
  getFeedState,
  (state: FeedState) => state.loadingStatus
);

export const selectFeedEntities = createSelector(getFeedState, selectEntities);
