
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceData, calculateStats } from './charts/utils';
import ChartContainer from './charts/ChartContainer';
import PerformanceStats from './charts/PerformanceStats';
import ChartTypeTabs from './charts/ChartTypeTabs';

interface PerformanceChartProps {
  data: PerformanceData[];
  title?: string;
  description?: string;
  dataKey?: string;
  averageKey?: string;
  showTabs?: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  title = 'Performance Trend',
  description = 'Student performance over time',
  dataKey = 'value',
  averageKey = 'average',
  showTabs = true
}) => {
  const [chartType, setChartType] = useState('line');
  
  // Calculate stats for the summary
  const stats = calculateStats(data);
  
  return (
    <Card className="w-full h-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="transition-all duration-300 hover:bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="transition-transform duration-300 hover:scale-105">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          
          {showTabs && (
            <div className="hidden sm:block">
              <ChartTypeTabs 
                chartType={chartType} 
                setChartType={setChartType} 
              />
            </div>
          )}
        </div>
        
        {data.length > 0 && (
          <PerformanceStats
            currentValue={stats.currentValue}
            maxValue={stats.maxValue}
            minValue={stats.minValue}
            trend={stats.trend}
            trendPercentage={stats.trendPercentage}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer
            data={data}
            dataKey={dataKey}
            averageKey={averageKey}
            chartType={chartType}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
