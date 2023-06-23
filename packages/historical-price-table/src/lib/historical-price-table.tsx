import { useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface HistoricalPriceTableProps {}

type TableProps = {
  coinTable: CoinTable;
  fetch: (symbol: string) => void;
  loadingStatus: LoadingStatus;
  error: string | null;
};

enum LoadingStatus {
  LOADED = 'loaded',
  LOADING = 'loading',
  NOT_LOADED = 'not loaded',
}

type CoinTable = {
  [timeRange: string]: HistoricalData[];
};

type HistoricalData = {
  timestamp: number;
  value: number;
};

enum TimeRange {
  DAY_1 = '1d',
  DAY_7 = '7d',
  MONTH_1 = '1m',
  MONTH_3 = '3m',
  YEAR_1 = '1y',
}

export function HistoricalPriceTable(props: TableProps) {
  const { coinTable, fetch, loadingStatus, error } = props;
  const [timeRange, setTimeRange] = useState<string>('1d');

  if (loadingStatus !== LoadingStatus.LOADED) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loadingStatus === LoadingStatus.LOADED) {
    return (
      <div className="my-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            Historical Data for Bitcoin
          </span>
          <div>
            <select
              id="location"
              name="location"
              className="mt-2 block w-full rounded-md border-0 p-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="Canada"
            >
              <option>1D</option>
              <option>7D</option>
              <option>1M</option>
              <option>3M</option>
              <option>1Y</option>
            </select>
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
              {coinTable[timeRange].map((val: HistoricalData, idx: number) => {
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default HistoricalPriceTable;
