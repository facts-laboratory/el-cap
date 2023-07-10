import React from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LightningIcon,
  StarIcon,
  TrendingIcon,
} from '../icons';
import { ProcessedTokenData } from '@el-cap/interfaces';

type MetricKey = '1h' | '24h' | '7d';

type TopCoinsCardProps = {
  title: string;
  type: string;
  data: ProcessedTokenData[];
  goToCoin: (symbol: string, entity: ProcessedTokenData) => void;
  goToFeed: (title: string) => void;
  dataKey: string;
};

const TopCoinsCard: React.FC<TopCoinsCardProps> = ({
  title,
  type,
  data,
  goToCoin,
  goToFeed,
  dataKey,
}) => {
  const icon = () => {
    switch (title) {
      case 'Trending Coins':
        return <TrendingIcon width={32} height={32} />;

      case 'Biggest Gainers':
        return <LightningIcon width={32} height={32} />;

      case 'Moving':
        return <StarIcon width={32} height={32} />;

      default:
        break;
    }
  };

  type MetricKey = '1h' | '24h' | '7d';

  const metrics = (metric: ProcessedTokenData) => {
    const dataKeyOfMetric = dataKey as MetricKey;

    switch (type) {
      case 'Percentage':
        if (metric[dataKeyOfMetric] < 0) {
          return (
            <span className="text-red-600 font-bold flex">
              <ArrowDownIcon
                className="mr-1 mt-1"
                width={20}
                height={20}
                color="#ff0000"
              />
              {Math.abs(metric[dataKeyOfMetric]).toFixed(2)}%
            </span>
          );
        }
        return (
          <span className="text-green-600 font-bold flex">
            <ArrowUpIcon
              className="mr-1 mt-1"
              width={20}
              height={20}
              color="#00ff00"
            />
            {Math.abs(metric[dataKeyOfMetric]).toFixed(2)}%
          </span>
        );

      default:
        return (
          <span className="font-bold">
            ${metric[dataKeyOfMetric].toFixed(2)}
          </span>
        );
    }
  };

  const convertString = (str: string) => {
    const temp = str.toLowerCase();
    return temp.replace(/\s/g, '-');
  };

  return (
    <div className="flex-1">
      <div className="rounded-3xl sm:p-6 p-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {icon()}
            <span className="font-bold text-xl">{title}</span>
          </div>
          <span
            className="text-gray-500 hover:cursor-pointer hover:text-gray-600"
            onClick={() => goToFeed(convertString(dataKey))}
          >
            More &gt;
          </span>
        </div>
        <div className="py-4 text-sm sm:text-base">
          {data.map((coin, index) => {
            return (
              <div
                className="flex justify-between m-2 cursor-pointer"
                key={index}
                onClick={() => goToCoin(coin.coin, coin)}
              >
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <img src={coin.image} className="h-5 w-5" alt={coin.coin} />
                  <span className="font-bold">{coin.name}</span>
                  <span className="text-gray-400">{coin.coin}</span>
                </div>
                <div>{metrics(coin)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopCoinsCard;
