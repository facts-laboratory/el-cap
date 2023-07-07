import { Skeleton } from '../skeleton';

export function TopCoinsCardSkeleton() {
  return (
    <div className="flex-1">
      <div className="rounded-3xl sm:p-6 p-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="font-bold text-xl mr-2 min-w-[40px] min-h-[40px]" />
            <Skeleton className="font-bold text-xl mr-2 min-w-[150px]" />
          </div>
          <Skeleton className="text-gray-500 hover:cursor-pointer hover:text-gray-600 min-w-[70px]" />
        </div>
        <div className="py-4 text-sm sm:text-base">
          {[...Array(5)].map((_, index) => (
            <div className="flex justify-between m-2" key={index}>
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 min-w-[40px] mr-2" />
                <Skeleton className="font-bold mr-2 min-w-[150px]" />
                <Skeleton className="text-gray-400 min-w-[70px]" />
              </div>
              <Skeleton className="font-bold min-w-[150px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
