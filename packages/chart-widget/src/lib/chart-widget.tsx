import ChartComponent from './components/ChartComponent';
import BitTabComponent from './components/TabComponent';

/* eslint-disable-next-line */
export interface ChartWidgetProps {}

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 28.67 },
  { time: '2019-01-01', value: 25.68 },
  { time: '2019-01-02', value: 24.67 },
  { time: '2019-01-03', value: 26.68 },
  { time: '2019-01-04', value: 28.67 },
  { time: '2019-01-05', value: 23.68 },
  { time: '2019-01-06', value: 25.67 },
  { time: '2019-01-07', value: 30.68 },
  { time: '2019-01-08', value: 32.67 },
  { time: '2019-01-09', value: 34.68 },
  { time: '2019-01-10', value: 40.67 },
];

export function ChartWidget(props: ChartWidgetProps) {
  const { entity } = props;
  return (
    <>
      <div className="sm:flex items-center justify-between my-4">
        <span className="font-bold md:text-3xl text-xl whitespace-nowrap mx-2 mb-2">
          {entity.coin} To USD Chart
        </span>
        <BitTabComponent />
      </div>
      <div>
        <ChartComponent data={initialData} />;
      </div>
    </>
  );
}

export default ChartWidget;
