import { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ChartComponent from './components/ChartComponent';
import './components/slideranimations.css';

type CoinChart = {
  [timeRange: string]: HistoricalDataPoint[];
};

type HistoricalDataPoint = {
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

interface ChartData {
  time: number;
  value: number;
}

enum LoadingStatus {
  LOADED = 'loaded',
  LOADING = 'loading',
  NOT_LOADED = 'not loaded',
}
interface CoinChartProps {
  chartData: CoinChart;
  fetch: (input: { symbol: string; interval: string }) => void;
  loadingStatus: LoadingStatus;
  error?: string | null;
  remainingLoadingStatus: LoadingStatus;
  ticker: string;
  fetchRemaining: (input: { symbol: string; interval: string }) => void;
}

export function ChartWidget(props: CoinChartProps) {
  const { chartData, fetch, loadingStatus, error, ticker, fetchRemaining } =
    props;
  const [selectedTimeRange, setSelectedTimeRange] = useState(TimeRange.DAY_1);
  const underlineRef = useRef(null);
  const buttonRefs = useRef(new Map()).current;

  useEffect(() => {
    fetch({ symbol: ticker, interval: '24h' });
  }, []);

  useEffect(() => {
    console.log('chartData in effect', chartData);
    if (chartData['24h'] && !chartData['7d']) {
      console.log('fetching', ticker);
      fetchRemaining({ symbol: ticker, interval: '7d' });
    }
  }, [chartData['24h']]);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.NOT_LOADED) {
      // fetch(selectedTimeRange);
    }
  }, [loadingStatus, fetch, selectedTimeRange]);

  useEffect(() => {
    const selectedButton = buttonRefs.get(selectedTimeRange);
    if (selectedButton && underlineRef.current) {
      underlineRef.current.style.transform = `translateX(${selectedButton.offsetLeft}px)`;
      underlineRef.current.style.width = `${selectedButton.offsetWidth}px`;
    }
  }, [selectedTimeRange]);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeRange(e.target.value as TimeRange);
  };

  function convertTimeStampAndSetData(data: HistoricalDataPoint[]) {
    const newData: ChartData[] = [];
    data.forEach((el) => {
      newData.push({
        time: el.timestamp,
        value: el.value,
      });
    });
    return newData;
  }

  if (loadingStatus !== LoadingStatus.LOADED) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loadingStatus === LoadingStatus.LOADED && chartData['24h']) {
    return (
      <>
        <div className="sm:flex items-center justify-between my-4">
          <span className="font-bold md:text-3xl text-xl whitespace-nowrap">
            Bitcoin To USD Chart
          </span>
          <div className="relative mr-2 px-4 py-2 bg-white rounded-lg overflow-auto">
            <div className="flex">
              {Object.values(TimeRange).map((timeRange) => (
                <button
                  key={timeRange}
                  data-time-range={timeRange}
                  // disabled if it's 3m or 1y
                  disabled={
                    timeRange === TimeRange.MONTH_3 ||
                    timeRange === TimeRange.YEAR_1
                  }
                  className={`px-5 mx-2 z-20 font-bold transition-colors duration-300 rounded time-range-button ${
                    timeRange === TimeRange.MONTH_3 ||
                    timeRange === TimeRange.YEAR_1
                      ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                      : ''
                  }`}
                  onClick={() => setSelectedTimeRange(timeRange as TimeRange)}
                >
                  {timeRange.toUpperCase()}
                </button>
              ))}

              <CSSTransition in={true} timeout={200} classNames="slider" appear>
                <div
                  ref={underlineRef}
                  className="absolute bottom-2 rounded left-0 z-10 h-6 bg-yellow-400 transition-all ease-in-out duration-200 slider"
                />
              </CSSTransition>
            </div>
          </div>
        </div>
        <div>
          <ChartComponent
            data={convertTimeStampAndSetData(chartData[selectedTimeRange])}
          />
        </div>
      </>
    );
  }
}

export default ChartWidget;
