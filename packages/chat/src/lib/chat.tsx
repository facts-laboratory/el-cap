import {
  TrendingIcon,
  LightningIcon,
  StarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '../icons';
export interface IData {
  icon: string;
  text: string;
  value: string;
}
export interface IMarketCap {
  title: string;
  type: string;
  data: IData[];
}

export function Chat(props: IMarketCap) {
  return (
    <div className="rounded-3xl sm:p-6 p-2 bg-white">
      <div className="flex justify-between">
        <div className="flex items-center">
          {props.title === 'Trending' ? (
            <TrendingIcon width={32} height={32} />
          ) : props.title === 'Biggest Gainer' ? (
            <LightningIcon width={32} height={32} />
          ) : (
            <StarIcon width={32} height={32} />
          )}
          <span className="font-bold text-xl">{props.title}</span>
        </div>
        <span className="text-gray-500 hover:cursor-pointer hover:text-gray-600">
          More &gt;
        </span>
      </div>
      <div className="py-4 text-sm sm:text-base">
        {props.data.map((val, index) => {
          return (
            <div className="flex justify-between m-2" key={index}>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <span>{index + 1}</span>
                {val.icon === 'SHIB' ? (
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png"
                    className="h-5 w-5"
                    alt="SHIB"
                  ></img>
                ) : (
                  <img
                    className="h-4 w-4"
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/24029.png"
                    alt="TIMESERIES"
                  ></img>
                )}
                <span className="font-bold">{val.text}</span>
                <span className="text-gray-400">{val.icon}</span>
              </div>
              {props.type === 'trending' ? (
                <div>
                  {parseFloat(val.value) < 0 ? (
                    <span className="text-red-600 font-bold flex">
                      <ArrowDownIcon
                        className="mr-1 mt-1"
                        width={20}
                        height={20}
                        color="#ff0000"
                      />
                      {Math.abs(parseFloat(val.value))}%
                    </span>
                  ) : (
                    <span className="text-green-600 font-bold flex">
                      <ArrowUpIcon
                        className="mr-1 mt-1"
                        width={20}
                        height={20}
                        color="#00ff00"
                      />
                      {Math.abs(parseFloat(val.value))}%
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  <span className="font-bold">${val.value}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chat;
