import ChartComponent from './components/ChartComponent';
import BitTabComponent from './components/TabComponent';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface ChartWidgetProps {}

export function ChartWidget(props: ChartWidgetProps) {
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);
  return (
    <>
      <div className="sm:flex items-center justify-between my-4">
        <span className="font-bold md:text-3xl text-xl whitespace-nowrap mx-2 mb-2">
          Bitcoin To USD Chart
        </span>
        <BitTabComponent chartData={chartData} setChartData={setChartData} />
      </div>
      <div>
        <ChartComponent data={chartData}  />
      </div>
    </>
  );
}

export default ChartWidget;
