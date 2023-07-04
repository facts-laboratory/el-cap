import {
  ProcessedTokenData,
  SortKey,
  RemainingObject,
  RedstoneObject,
  TopCoins,
  State,
} from '@el-cap/interfaces';
import { Dictionary } from '@reduxjs/toolkit';
import {
  getCrewMemberContract,
  EL_CAP_RIGGING_TX,
  readState,
  getLatestHydrate,
} from '@el-cap/contract-integrations';
import { FeedEntity } from '@el-cap/store';
import { writeContract } from 'arweavekit/contract';

export async function processTokenData(
  combinedTokenData: Record<string, any>
): Promise<Dictionary<ProcessedTokenData>> {
  const processedData: Dictionary<ProcessedTokenData> = {};

  Object.keys(combinedTokenData).forEach((key) => {
    const combinedTokenItem = combinedTokenData[key];

    processedData[key] = {
      name: combinedTokenItem.name || '',
      image: combinedTokenItem.image || '',
      coin: combinedTokenItem.symbol || '',
      price: combinedTokenItem.value || 0,
      marketCap: combinedTokenItem.market_cap || 0,
      volume: combinedTokenItem.total_volume || 0,
      circulatingSupply: combinedTokenItem.circulating_supply || 0,
      '1h': combinedTokenItem.price_change_percentage_1h_in_currency || 0,
      '24h': combinedTokenItem.price_change_percentage_24h_in_currency || 0,
      '7d': combinedTokenItem.price_change_percentage_7d_in_currency || 0,
      watchlist: false,
    };
  });

  console.log('combibedTokenData', combinedTokenData);

  return await checkCoinsOnWatchlist(processedData);
}

export function entriesToObj(
  entities: Dictionary<FeedEntity>
): Record<string, ProcessedTokenData> {
  return Object.entries(entities).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );
}

export const checkCoinsOnWatchlist = async (
  entities: Dictionary<ProcessedTokenData>,
  returnOnlyWatchlist = false
) => {
  const queryCrewState = await getCrewMemberContract();
  let watchlist: string[] = [];

  if (queryCrewState.length > 0) {
    const state: State = await readState(queryCrewState[0].node.id);
    console.log('state in checkCoinsOnWatchlist', state);
    watchlist = state.watchlist.map((item: string) => item.toLowerCase());
  }

  let resultEntities = {} as Dictionary<ProcessedTokenData>;

  Object.keys(entities).forEach((coinKey) => {
    const coin = entities[coinKey];
    if (coin) {
      resultEntities[coinKey] = {
        ...coin,
        watchlist: watchlist.includes(coin.coin.toLowerCase()),
      };
    }
  });

  if (returnOnlyWatchlist) {
    resultEntities = Object.keys(resultEntities)
      .filter((coinKey) => resultEntities[coinKey].watchlist)
      .reduce(
        (res: Dictionary<ProcessedTokenData>, key) => (
          (res[key] = resultEntities[key]), res
        ),
        {}
      );
  }

  return resultEntities;
};

export function sortTopCoins(
  entities: Record<string, ProcessedTokenData>
): TopCoins {
  // Convert the entities object to an array
  const entityArray = Object.values(entities);

  // Sort the entities by the 7d, 24h, and 1h properties in descending order
  const sortedEntitiesBy7d = entityArray
    .sort((a, b) => b['7d'] - a['7d'])
    .slice(0, 4);
  const sortedEntitiesBy24h = entityArray
    .sort((a, b) => b['24h'] - a['24h'])
    .slice(0, 4);
  const sortedEntitiesBy1h = entityArray
    .sort((a, b) => b['1h'] - a['1h'])
    .slice(0, 4);

  // Create an object with values for the top four entities sorted by 7d, 24h, and 1h
  const result: TopCoins = {
    '7d': sortedEntitiesBy7d,
    '24h': sortedEntitiesBy24h,
    '1h': sortedEntitiesBy1h,
  };

  return result;
}

export function sortPrices(
  prices: ProcessedTokenData[] | Dictionary<ProcessedTokenData>,
  key: string | null = 'marketCap'
): ProcessedTokenData[] {
  console.log('sortkey in function', key);
  if (!Object.values(SortKey).includes(key as SortKey)) {
    key = SortKey.MARKET_CAP; // Fallback to sorting by marketCap
  }

  // Define keys for which the sorting order should be reversed
  const reverseOrderKeys = [SortKey.LOSERS];

  const pricesArray = Array.isArray(prices) ? prices : Object.values(prices);
  const sortedPrices = [...pricesArray];

  sortedPrices.sort((a, b) => {
    if (a[key] < b[key]) {
      // Return -1 for reverse order keys and 1 for others
      return reverseOrderKeys.includes(key as SortKey) ? -1 : 1;
    } else if (a[key] > b[key]) {
      // Return 1 for reverse order keys and -1 for others
      return reverseOrderKeys.includes(key as SortKey) ? 1 : -1;
    } else {
      return 0;
    }
  });

  return sortedPrices;
}

export async function updateCoinsRecursive(
  allCoins: ProcessedTokenData[] | undefined,
  index = 0
) {
  if (index >= allCoins.length) return;

  // Get the next 5 coins
  const coins = allCoins.slice(index, index + 5);

  // Call refreshCoins with the chunk of 5 coins
  await writeContract({
    environment: 'mainnet' as const,
    contractTxId: EL_CAP_RIGGING_TX,
    wallet: 'use_wallet' as const,
    options: {
      function: 'refreshCoins',
      coins,
    },
  });

  // Call updateCoinsRecursive with the next index
  await updateCoinsRecursive(allCoins, index + 5);
}

export const getLastUpdatedState = async () => {
  const state = await readState();
  console.log('readState', state);
  return state;
};

export const isLastUpdatedOverDay = async () => {
  const read = await getLatestHydrate();
  console.log('isLastUpdatedOverDay: read', read);

  // Get the current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  console.log('isLastUpdatedOverDay: currentTime', currentTime);

  for (const transaction of read) {
    if (transaction.node.block && transaction.node.block.timestamp) {
      const transactionTime = transaction.node.block.timestamp;
      console.log('isLastUpdatedOverDay: transactionTime', transactionTime);

      const differenceInHours = (currentTime - transactionTime) / 3600;
      console.log('isLastUpdatedOverDay: differenceInHours', differenceInHours);

      if (differenceInHours > 24) {
        console.log('isLastUpdatedOverDay: result', true);
        return true;
      } else {
        console.log('isLastUpdatedOverDay: result', false);
        return false;
      }
    }
  }

  // If no transaction with a timestamp is found, return false
  console.log('isLastUpdatedOverDay: result', false);
  return false;
};

export function mergeSingleCoinObjects(
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
export function mergeObjects(
  redstone: RedstoneObject,
  remaining: RemainingObject
): Array<unknown> {
  if (remaining) {
    const redstoneLowered: Record<string, unknown> = Object.keys(
      redstone
    ).reduce<Record<string, unknown>>((c, k) => {
      c[k.toLowerCase()] = redstone[k];
      return c;
    }, {});

    return Object.keys(remaining).map((key) => {
      const symbolLower = remaining[key].symbol.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(redstoneLowered, symbolLower)) {
        return {
          ...remaining[key],
          ...(redstoneLowered[symbolLower] as object),
        };
      } else {
        return remaining[key];
      }
    });
  } else {
    return redstone;
  }
}
