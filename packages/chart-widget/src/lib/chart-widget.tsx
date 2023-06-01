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
  DAY_1 = '1d',
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
  coinChart: CoinChart;
  fetch: (symbol: string) => void;
  loadingStatus: LoadingStatus;
  error?: string | null;
}

export function ChartWidget(props: CoinChartProps) {
  const { coinChart, fetch, loadingStatus, error } = props;
  const [selectedTimeRange, setSelectedTimeRange] = useState(TimeRange.DAY_1);
  const underlineRef = useRef(null);
  const buttonRefs = useRef(new Map()).current;

  useEffect(() => {
    if (loadingStatus === LoadingStatus.NOT_LOADED) {
      fetch(selectedTimeRange);
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

  if (loadingStatus === LoadingStatus.LOADING) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="sm:flex items-center justify-between my-4">
        <span className="font-bold md:text-3xl text-xl whitespace-nowrap mx-2 mb-2">
          Bitcoin To USD Chart
        </span>
        <div className="relative mr-2 px-4 py-2 bg-white rounded-lg overflow-auto">
          <div className="flex relative">
            {Object.values(TimeRange).map((timeRange) => (
              <button
                key={timeRange}
                ref={(el) => buttonRefs.set(timeRange, el)}
                className={`px-5 mx-2 z-20 font-bold transition-colors duration-300 rounded time-range-button`}
                onClick={() => setSelectedTimeRange(timeRange)}
              >
                {timeRange.toUpperCase()}
              </button>
            ))}
            <CSSTransition in={true} timeout={200} classNames="slider" appear>
              <div
                ref={underlineRef}
                className="absolute rounded left-0 z-10 h-6 bg-yellow-400 transition-all ease-in-out duration-200 slider"
              />
            </CSSTransition>
          </div>
        </div>
      </div>
      <div>
        <ChartComponent
          data={convertTimeStampAndSetData(coinChart[selectedTimeRange])}
        />
      </div>
    </>
  );
}

export default ChartWidget;
