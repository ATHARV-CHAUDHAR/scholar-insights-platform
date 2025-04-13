
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import React from 'react';

export interface PerformanceData {
  name: string;
  value: number;
  average?: number;
}

export interface ChartColors {
  primary: string;
  secondary: string;
  gradient: string[];
  bar: string;
}

export const defaultChartColors: ChartColors = {
  primary: '#4A6FFF',
  secondary: '#9CA3AF',
  gradient: ['rgba(74, 111, 255, 0.2)', 'rgba(74, 111, 255, 0)'],
  bar: 'rgba(74, 111, 255, 0.7)',
};

export const calculateStats = (data: PerformanceData[]) => {
  const currentValue = data.length > 0 ? data[data.length - 1].value : 0;
  const previousValue = data.length > 1 ? data[data.length - 2].value : 0;
  const trend = currentValue > previousValue ? 'up' : currentValue < previousValue ? 'down' : 'neutral';
  const trendPercentage = previousValue !== 0 
    ? Math.abs(((currentValue - previousValue) / previousValue) * 100).toFixed(1) 
    : '0';
  
  // Find min and max values
  const values = data.map(item => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  
  return {
    currentValue,
    previousValue,
    trend,
    trendPercentage,
    maxValue,
    minValue
  };
};

export const getTrendIcon = (trend: string) => {
  if (trend === 'up') return <TrendingUp className="h-3 w-3 mr-1" />;
  if (trend === 'down') return <TrendingDown className="h-3 w-3 mr-1" />;
  return <Minus className="h-3 w-3 mr-1" />;
};
