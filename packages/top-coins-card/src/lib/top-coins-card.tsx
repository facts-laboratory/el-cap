import React from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LightningIcon,
  StarIcon,
  TrendingIcon,
} from '../icons';

type TopCoinsCardProps = {
  title: string;
  type: string;
  data: TopCoin[];
  goToCoin: (symbol: string) => void;
  goToFeed: (title: string) => void;
};

type TopCoin = {
  name: string;
  symbol: string;
  metric: number;
  image: string;
};

const TopCoinsCard: React.FC<TopCoinsCardProps> = ({
  title,
  type,
  data,
  goToCoin,
  goToFeed,
}) => {
  const icon = () => {
    switch (title) {
      case 'Trending Coins':
        return <TrendingIcon width={32} height={32} />;

      case 'Biggest Gainers':
        return <LightningIcon width={32} height={32} />;

      case 'Recently Updated Socials':
        return <StarIcon width={32} height={32} />;

      default:
        break;
    }
  };

  const metrics = (metric: number) => {
    switch (type) {
      case 'Percentage':
        if (metric < 0) {
          return (
            <span className="text-red-600 font-bold flex">
              <ArrowDownIcon
                className="mr-1 mt-1"
                width={20}
                height={20}
                color="#ff0000"
              />
              {Math.abs(metric)}%
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
            {Math.abs(metric)}%
          </span>
        );

      default:
        return <span className="font-bold">${metric}</span>;
    }
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
            onClick={() => goToFeed(title)}
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
                onClick={() => goToCoin(coin.symbol)}
              >
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <img src={coin.image} className="h-5 w-5" alt={coin.symbol} />
                  <span className="font-bold">{coin.name}</span>
                  <span className="text-gray-400">{coin.symbol}</span>
                </div>
                <div>{metrics(coin.metric)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopCoinsCard;
