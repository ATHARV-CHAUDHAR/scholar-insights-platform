
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getTrendIcon } from './utils';

interface PerformanceStatsProps {
  currentValue: number;
  maxValue: number;
  minValue: number;
  trend: string;
  trendPercentage: string;
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({
  currentValue,
  maxValue,
  minValue,
  trend,
  trendPercentage
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-2 pt-2 border-t">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Current:</span>
        <span className="text-lg font-bold">{currentValue}%</span>
        <div className={cn(
          "flex items-center text-xs font-medium ml-2",
          trend === 'up' ? "text-green-600" : 
          trend === 'down' ? "text-red-600" : "text-gray-600"
        )}>
          {getTrendIcon(trend)}
          {trend !== 'neutral' ? `${trendPercentage}%` : '-'}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">High:</span>
        <span className="text-sm">{maxValue}%</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Low:</span>
        <span className="text-sm">{minValue}%</span>
      </div>
      
      <div className="w-full sm:w-40 mt-1 sm:mt-0">
        <Progress 
          value={currentValue} 
          className={cn(
            "h-1.5 w-full",
            currentValue >= 90 ? "bg-green-100" : 
            currentValue >= 75 ? "bg-blue-100" : 
            currentValue >= 60 ? "bg-amber-100" : "bg-red-100"
          )}
        />
      </div>
    </div>
  );
};

export default PerformanceStats;
