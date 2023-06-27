import redstone from 'redstone-api';

export const fetchHistoricalPrice = async (input) => {
  console.log(
    'input start of fetchHistoricalPrice',
    JSON.parse(JSON.stringify(input))
  );

  let { symbol, interval = '24h' } = input;
  let { coinChart } = input;
  coinChart = coinChart || {};
  const timePeriods = ['24h', '7d', '1m', '3m', '1y'];

  const timeValues = {
    '24h': 24,
    '7d': 7 * 24,
    '1m': 30 * 24,
    '3m': 3 * 30 * 24,
    '1y': 365 * 24,
  };

  // Skip if data for this interval is already in coinChart
  if (coinChart[interval]) {
    // Get the next interval from timePeriods
    const currentIndex = timePeriods.indexOf(interval);
    if (currentIndex < timePeriods.length - 1) {
      interval = timePeriods[currentIndex + 1];
    } else {
      return coinChart;
    }
  }

  const endDate = new Date();
  const startDate = new Date(
    endDate.getTime() - timeValues[interval] * 60 * 60 * 1000
  );

  // Set the data interval depending on the chosen time interval
  const dateInterval = ['24h', '7d'].includes(interval)
    ? 3600 * 1000
    : 24 * 3600 * 1000;

  try {
    const prices = await redstone.getHistoricalPrice(symbol.toUpperCase(), {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      interval: dateInterval,
    });

    const trimmedPrices = trimData(prices);

    coinChart[interval] = trimmedPrices;

    return { ...coinChart };
  } catch (err) {
    console.error(`Failed to get historical price data: ${err}`);
    throw err;
  }
};
function trimData(inputArray) {
  const reduced = removeDuplicatesByTimestamp(inputArray);
  let outputArray = reduced.map((item) => {
    let timestamp = item.timestamp;
    return {
      value: item.value,
      timestamp,
      symbol: item.symbol,
    };
  });
  return outputArray;
}

function removeDuplicatesByTimestamp(data) {
  return data.reduce((acc, current) => {
    const exists = acc.find((item) => item.timestamp === current.timestamp);
    if (!exists) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
}
