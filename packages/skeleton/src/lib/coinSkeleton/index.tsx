import { Skeleton } from '../skeleton';
import WatchlistIcon from './watchlist';

export function CoinSkeleton() {
  return (
    <>
      <div className="flex items-center mt-5">
        <Skeleton className="text-gray-400 hover:text-gray-600 cursor-pointer font-medium text-xl py-2 inline-flex mr-2 min-w-[40px] min-h-[40px]" />
        <Skeleton className="text-black hover:text-gray-600 cursor-pointer font-medium text-xl py-2 inline-flex mr-2 min-w-[55px] min-h-[40px]" />
        <WatchlistIcon
          className="ml-2"
          width={18}
          height={18}
          isOnWatchlist={false}
        />
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
        <div className="col-span-1">
          <div className="flex items-center my-4">
            <Skeleton className="h-20 min-w-[80px] mr-2" />
            <Skeleton className="font-bold text-2xl mr-2 min-w-[150px]" />
            <Skeleton className="w-20 h-20 min-w-[20px] mr-2" />
            <Skeleton className="font-bold text-2xl mr-2 min-w-[150px]" />
            {/* Skeleton for Tag and WatchlistIcon */}
          </div>
          {/* Skeletons for CoinAttributeLinkButton */}
          <p className="my-2">Tags</p>
          <div className="flex gap-4 flex-wrap">
            {/* Skeletons for Tag */}
            <Skeleton className="text-blue-500 hover:cursor-pointer min-w-[70px]" />
            <Skeleton className="text-blue-500 hover:cursor-pointer min-w-[70px]" />
            <Skeleton className="text-blue-500 hover:cursor-pointer min-w-[70px]" />
            <Skeleton className="text-blue-500 hover:cursor-pointer min-w-[70px]" />
          </div>
        </div>
        <div className="md:col-span-2 col-span-1">
          {/* Skeletons for rest of the content */}
        </div>
      </div>
      {/* Skeleton for ToggleComponent, ChartWidget, and HistoricalPriceTable */}
    </>
  );
}
