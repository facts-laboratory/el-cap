export function processTokenData(redstone, remaining) {
  const processedTokenData = {
    name: remaining.name || '',
    image: remaining.image?.large || '',
    coin: redstone.symbol || '',
    price: redstone.value || 0,
    marketCap: 0, // Not present in the original structure
    volume: 0, // Not present in the original structure
    circulatingSupply: remaining.circulating_supply || 0,
    '1h': 0, // Not present in the original structure
    '24h': 0, // Not present in the original structure
    '7d': 0, // Not present in the original structure
  };

  return processedTokenData;
}
