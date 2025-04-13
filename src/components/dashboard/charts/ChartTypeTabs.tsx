
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartTypeTabsProps {
  chartType: string;
  setChartType: (type: string) => void;
}

const ChartTypeTabs: React.FC<ChartTypeTabsProps> = ({
  chartType,
  setChartType
}) => {
  return (
    <Tabs value={chartType} onValueChange={setChartType}>
      <TabsList className="bg-muted/30">
        <TabsTrigger value="line">Line</TabsTrigger>
        <TabsTrigger value="area">Area</TabsTrigger>
        <TabsTrigger value="bar">Bar</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChartTypeTabs;
