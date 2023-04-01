import { createChart, ColorType, IChartApi } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import "./chat.css";

interface ChartProps {
  data: { time: string; value: number }[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

const ChartComponent: React.FC<ChartProps> = ({
  data,
  colors = {
    backgroundColor: "white",
    lineColor: "#F95153",
    textColor: "black",
    areaTopColor: "#F89E9EB9",
    areaBottomColor: "#F2E0E0DC",
  },
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi>();

  useEffect(() => {
    const handleResize = () => {
      chart.current?.applyOptions({
        width: chartContainerRef.current?.clientWidth ?? 0,
      });
    };
    if (chartContainerRef.current) {
      chart.current = createChart(chartContainerRef.current, {
        layout: {
          background: {
            type: ColorType.Solid,
            color: colors.backgroundColor,
          },
          textColor: colors.textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });
      chart.current.timeScale().fitContent();

      const newSeries = chart.current.addAreaSeries({
        lineColor: colors.lineColor,
        topColor: colors.areaTopColor,
        bottomColor: colors.areaBottomColor,
      });
      newSeries.setData(data);

      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.current?.remove();
    };
  }, [data, colors]);

  return <div ref={chartContainerRef} />;
};

export default ChartComponent;
