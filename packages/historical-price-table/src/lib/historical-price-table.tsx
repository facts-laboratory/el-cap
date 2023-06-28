import { SetStateAction, useEffect, useRef, useState } from 'react';
import ArrowDownIcon from 'packages/feed/src/lib/icons/arrowDown';
import { LoadingStatus } from '@el-cap/interfaces';
/* eslint-disable-next-line */
export interface HistoricalPriceTableProps {}

type TableProps = {
  chartData: CoinTable;
  fetch: (symbol: string) => void;
  loadingStatus: LoadingStatus;
  error: string | null;
};

type CoinTable = {
  [timeRange: string]: HistoricalData[];
};

type HistoricalData = {
  timestamp: number;
  value: number;
};

enum TimeRange {
  DAY_1 = '24h',
  DAY_7 = '7d',
  MONTH_1 = '1m',
  MONTH_3 = '3m',
  YEAR_1 = '1y',
}

export function HistoricalPriceTable(props: TableProps) {
  const { chartData, loadingStatus, error } = props;
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  if (loadingStatus !== LoadingStatus.LOADED) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loadingStatus === LoadingStatus.LOADED) {
    return (
      <div className="my-4">
        <div className="flex justify-between items-center" ref={dropdownRef}>
          <span className="text-2xl font-bold">
            Historical Data for Bitcoin
          </span>
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="flex justify-between px-2 py-2 text-black font-bold rounded-md hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ring-1 ring-gray-600 w-40"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-6" viewBox="0 0 64 64">
                <path d="M58 5.5h-5.5V5a5 5 0 0 0-10 0v.5h-21V5a5 5 0 0 0-10 0v.5H6a6 6 0 0 0-6 6v41a6 6 0 0 0 6 6h52a6 6 0 0 0 6-6v-41a6 6 0 0 0-6-6ZM46.5 5a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0Zm-31 0a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0ZM60 52.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V22h56ZM60 18H4v-6.5a2 2 0 0 1 2-2h5.5V11a5 5 0 0 0 10 0V9.5h21V11a5 5 0 0 0 10 0V9.5H58a2 2 0 0 1 2 2Z"></path>
              </svg>
              {timeRange}
              <ArrowDownIcon className="mt-1" width={15} height={15} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {Object.values(TimeRange).map((timeRange) => (
                    <button
                      type="button"
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full ${
                        timeRange === TimeRange.MONTH_3 ||
                        timeRange === TimeRange.YEAR_1
                          ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                          : ''
                      }`}
                      // disabled if it's 3m or 1y
                      disabled={
                        timeRange === TimeRange.MONTH_3 ||
                        timeRange === TimeRange.YEAR_1
                      }
                      role="menuitem"
                      onClick={() => setTimeRange(timeRange as TimeRange)}
                      key={timeRange}
                      data-te={timeRange}
                    >
                      {timeRange.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-gray-700 bg-white font-bold">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Date
                </th>
                <th scope="col" className="px-6 py-5">
                  Close
                </th>
                <th scope="col" className="px-6 py-5">
                  Open*
                </th>
                <th scope="col" className="px-6 py-5">
                  High
                </th>
                <th scope="col" className="px-6 py-5">
                  Low
                </th>
                <th scope="col" className="px-6 py-5">
                  Volume
                </th>
                <th scope="col" className="px-6 py-5">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData[timeRange.toLowerCase()].map(
                (val: HistoricalData, idx: number) => {
                  return (
                    <tr key={idx}>
                      <td className="px-6 py-4">
                        {new Date(val.timestamp).getMonth() +
                          1 +
                          '/' +
                          new Date(val.timestamp).getDate() +
                          '/' +
                          new Date(val.timestamp).getFullYear()}
                      </td>
                      <td className="px-6 py-4">{val.value}</td>
                      <td className="px-6 py-4">Coming Soon</td>
                      <td className="px-6 py-4">Coming Soon</td>
                      <td className="px-6 py-4">Coming Soon</td>
                      <td className="px-6 py-4">Coming Soon</td>
                      <td className="px-6 py-4">Coming Soon</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default HistoricalPriceTable;
