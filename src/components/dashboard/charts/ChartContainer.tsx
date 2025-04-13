
import React from 'react';
import LineChartComponent from './LineChartComponent';
import AreaChartComponent from './AreaChartComponent';
import BarChartComponent from './BarChartComponent';
import { PerformanceData, ChartColors, defaultChartColors } from './utils';

interface ChartContainerProps {
  data: PerformanceData[];
  dataKey: string;
  averageKey?: string;
  chartType: string;
  chartColors?: ChartColors;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  data, 
  dataKey, 
  averageKey, 
  chartType,
  chartColors = defaultChartColors
}) => {
  switch (chartType) {
    case 'area':
      return (
        <AreaChartComponent
          data={data}
          dataKey={dataKey}
          averageKey={averageKey}
          chartColors={chartColors}
        />
      );
    case 'bar':
      return (
        <BarChartComponent
          data={data}
          dataKey={dataKey}
          averageKey={averageKey}
          chartColors={chartColors}
        />
      );
    default: // line chart
      return (
        <LineChartComponent
          data={data}
          dataKey={dataKey}
          averageKey={averageKey}
          chartColors={chartColors}
        />
      );
  }
};

export default ChartContainer;
