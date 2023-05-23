import { useEffect, useRef, useState } from "react";
enum TimeRange {
  DAY_1 = '1d',
  DAY_7 = '7d',
  MONTH_1 = '1m',
  MONTH_3 = '3m',
  YEAR_1 = '1y'
}
type CoinChart = {
  [timeRange: string]: HistoricalDataPoint[];
};

type HistoricalDataPoint = {
  timestamp: number;
  value: number;
  time: string;
};

const tabsData = [
  {
    label: "1D",
  },
  {
    label: "7D",
  },
  {
    label: "1M",
  },
  {
    label: "3M",
  },
  {
    label: "1Y",
  },
  {
    label: "All",
  },
];

const BitTabComponent: React.FC<{ chartData: { time: string; value: number }[]; setChartData: any}> = ({
  chartData,
  setChartData,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);


  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const coinChart: any = {
      '1d': [
          { timestamp: 1653153600, value: 4500 },
          { timestamp: 1653164400, value: 4600 },
          { timestamp: 1653175200, value: 4700 },
          { timestamp: 1653186000, value: 4800 },
          { timestamp: 1653196800, value: 4900 },
          { timestamp: 1653207600, value: 5000 },
          { timestamp: 1653218400, value: 4900 },
          { timestamp: 1653229200, value: 4800 },
          { timestamp: 1653240000, value: 4700 },
          { timestamp: 1653250800, value: 4600 },
          { timestamp: 1653261600, value: 4500 },
      ],
      '7d': [
          { timestamp: 1652668800, value: 4000 },
          { timestamp: 1652755200, value: 4100 },
          { timestamp: 1652841600, value: 4200 },
          { timestamp: 1652928000, value: 4300 },
          { timestamp: 1653014400, value: 4400 },
          { timestamp: 1653100800, value: 4500 },
          { timestamp: 1653187200, value: 4600 },
      ],
      '1m': [
          { timestamp: 1650739200, value: 3500 },
          { timestamp: 1650825600, value: 3600 },
          { timestamp: 1650912000, value: 3700 },
          { timestamp: 1650998400, value: 3800 },
          { timestamp: 1651084800, value: 3900 },
          { timestamp: 1651171200, value: 4000 },
          { timestamp: 1651257600, value: 4100 },
          { timestamp: 1651344000, value: 4200 },
          { timestamp: 1651430400, value: 4300 },
          { timestamp: 1651516800, value: 4400 },
          { timestamp: 1651603200, value: 4500 },
          { timestamp: 1651689600, value: 4600 },
      ],
      '3m': [
          { timestamp: 1648416000, value: 3000 },
          { timestamp: 1648502400, value: 3100 },
          { timestamp: 1648588800, value: 3200 },
          { timestamp: 1648675200, value: 3300 },
          { timestamp: 1648761600, value: 3400 },
          { timestamp: 1648848000, value: 3500 },
          { timestamp: 1648934400, value: 3600 },
          { timestamp: 1649020800, value: 3700 },
          { timestamp: 1649107200, value: 3800 },
          { timestamp: 1649193600, value: 3900 },
          { timestamp: 1649280000, value: 4000 },
          { timestamp: 1649366400, value: 4100 },
      ],
      '1y': [
          { timestamp: 1621699200, value: 2000 },
          { timestamp: 1621785600, value: 2100 },
          { timestamp: 1621872000, value: 2200 },
          { timestamp: 1621958400, value: 2300 },
          { timestamp: 1622044800, value: 2400 },
          { timestamp: 1622131200, value: 2500 },
          { timestamp: 1622217600, value: 2600 },
          { timestamp: 1622304000, value: 2700 },
          { timestamp: 1622390400, value: 2800 },
          { timestamp: 1622476800, value: 2900 },
          { timestamp: 1622563200, value: 3000 },
          { timestamp: 1622649600, value: 3100 },
          { timestamp: 1622736000, value: 3200 },
          { timestamp: 1622822400, value: 3300 },
          { timestamp: 1622908800, value: 3400 },
          { timestamp: 1622995200, value: 3500 },
          { timestamp: 1623081600, value: 3600 },
          { timestamp: 1623168000, value: 3700 },
          { timestamp: 1623254400, value: 3800 },
          { timestamp: 1623340800, value: 3900 },
          { timestamp: 1623427200, value: 4000 },
          { timestamp: 1623513600, value: 4100 },
          { timestamp: 1623600000, value: 4200 },
          { timestamp: 1623686400, value: 4300 },
          { timestamp: 1623772800, value: 4400 },
          { timestamp: 1623859200, value: 4500 },
          { timestamp: 1623945600, value: 4600 },
          { timestamp: 1624032000, value: 4700 },
          { timestamp: 1624118400, value: 4800 },
          { timestamp: 1624204800, value: 4900 },
          { timestamp: 1624291200, value: 5000 },
      ],
  };
    
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    
    const index = tabsData[activeTabIndex].label.toLowerCase();
    const chartData = coinChart[index];
    if (!chartData) return;
    const finalChart: any = [];
    chartData.forEach((arr: any) => {
      finalChart.push({
        time: arr.timestamp,
        value: arr.value,
      })
    });
    console.log(finalChart);
    setChartData(finalChart);
    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <div className="relative mr-2 px-4 py-2 bg-white rounded-lg overflow-auto">
      <div className="flex">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              ref={(el) => (tabsRef.current[idx] = el)}
              className="px-5 mx-2 z-20 font-bold"
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        className="absolute z-10 block bottom-2 bg-yellow-400 transition-all duration-300 h-6 rounded-lg"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      />
    </div>
  );
};

export default BitTabComponent;
