import {
  ProcessedTokenData,
  SortKey,
  RemainingObject,
  RedstoneObject,
} from '@el-cap/interfaces';

export function processTokenData(
  combinedTokenData: Record<string, any>
): ProcessedTokenData[] {
  return Object.keys(combinedTokenData).map((key) => {
    const combinedTokenItem = combinedTokenData[key];

    return {
      name: combinedTokenItem.name || '',
      image: combinedTokenItem.image || '',
      coin: combinedTokenItem.symbol || '',
      price: combinedTokenItem.value || 0,
      marketCap: combinedTokenItem.market_cap || 0,
      volume: combinedTokenItem.total_volume || 0,
      gainers: combinedTokenItem.price_change_percentage_7d_in_currency || 0,
      circulatingSupply: combinedTokenItem.circulating_supply || 0,
      losers: combinedTokenItem.price_change_percentage_7d_in_currency || 0,
      '1h': combinedTokenItem.price_change_percentage_1h_in_currency || 0,
      '24h': combinedTokenItem.price_change_percentage_24h_in_currency || 0,
      '7d': combinedTokenItem.price_change_percentage_7d_in_currency || 0,
    };
  });
}

export function sortPrices(
  prices: ProcessedTokenData[] | { [key: string]: ProcessedTokenData },
  key: string
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
