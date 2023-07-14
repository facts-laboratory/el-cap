import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type SparklineChartProps = {
  data: number[];
};

const SparklineChart: React.FC<SparklineChartProps> = ({ data }) => {
  const [series, setSeries] = useState([
    {
      data: data,
    },
  ]);
  const [options, setOptions] = useState({
    colors: ['#ff0000'],
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Add this line to hide the toolbar
      },
    },
    tooltip: {
      enabled: false, // This prevents tooltip from showing on hover
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      labels: {
        show: false, //hides X-axis labels
      },
      axisBorder: {
        show: false, // Hides the x-axis line
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
    },
    yaxis: {
      labels: {
        show: false, //hides Y-axis labels
      },
    },
  });

  useEffect(() => {
    setSeries((prevSeries) =>
      prevSeries.map((item) => ({
        ...item,
        data: data,
      }))
    );

    if (data.length > 0 && data[0] > data[data.length - 1]) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        colors: ['#ff0000'],
      }));
    } else {
      setOptions((prevOptions) => ({
        ...prevOptions,
        colors: ['#00ff00'],
      }));
    }
  }, [data]);

  return (
    <div className="relative inline-block group">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={70}
        width={170}
      />
    </div>
  );
};

export default SparklineChart;
