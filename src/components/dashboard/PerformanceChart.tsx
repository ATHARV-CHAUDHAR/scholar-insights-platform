
import React, { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, AreaChart, ComposedChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PerformanceData {
  name: string;
  value: number;
  average?: number;
}

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
  
  // Calculate some stats for the summary
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
  
  // Custom chart colors
  const chartColors = {
    primary: '#4A6FFF',
    secondary: '#9CA3AF',
    gradient: ['rgba(74, 111, 255, 0.2)', 'rgba(74, 111, 255, 0)'],
    bar: 'rgba(74, 111, 255, 0.7)',
  };

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={data} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              className="transition-transform duration-300 hover:scale-[1.02]"
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  {chartColors.gradient.map((color, index) => (
                    <stop 
                      key={index} 
                      offset={index === 0 ? "5%" : "95%"} 
                      stopColor={color} 
                      stopOpacity={index === 0 ? 0.8 : 0.1}
                    />
                  ))}
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="opacity-30" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis domain={[0, 100]} className="text-xs" />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Score']}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={chartColors.primary} 
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
                name="Student Score"
                animationDuration={1500}
              />
              {averageKey && (
                <Area 
                  type="monotone" 
                  dataKey={averageKey} 
                  stroke={chartColors.secondary} 
                  fill="none"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  name="Class Average"
                  animationDuration={1500}
                  animationBegin={300}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              className="transition-transform duration-300 hover:scale-[1.02]"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="opacity-30" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis domain={[0, 100]} className="text-xs" />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Score']}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar 
                dataKey={dataKey} 
                fill={chartColors.bar}
                radius={[4, 4, 0, 0]} 
                name="Student Score"
                animationDuration={1500}
              />
              {averageKey && (
                <Line 
                  type="monotone" 
                  dataKey={averageKey} 
                  stroke={chartColors.secondary} 
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                  name="Class Average"
                  animationDuration={1500}
                  animationBegin={300}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        );
        
      default: // line chart
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              className="transition-transform duration-300 hover:scale-[1.02]"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                className="opacity-30" 
              />
              <XAxis 
                dataKey="name"
                className="text-xs"
              />
              <YAxis 
                domain={[0, 100]}
                className="text-xs"
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Score']}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                }}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={chartColors.primary} 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                name="Student Score"
                animationDuration={1500}
                animationBegin={0}
              />
              {averageKey && (
                <Line 
                  type="monotone" 
                  dataKey={averageKey} 
                  stroke={chartColors.secondary} 
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                  name="Class Average"
                  animationDuration={1500}
                  animationBegin={300}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

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
              <TabsList className="bg-muted/30">
                <TabsTrigger value="line" onClick={() => setChartType('line')} className={chartType === 'line' ? 'bg-background' : ''}>
                  Line
                </TabsTrigger>
                <TabsTrigger value="area" onClick={() => setChartType('area')} className={chartType === 'area' ? 'bg-background' : ''}>
                  Area
                </TabsTrigger>
                <TabsTrigger value="bar" onClick={() => setChartType('bar')} className={chartType === 'bar' ? 'bg-background' : ''}>
                  Bar
                </TabsTrigger>
              </TabsList>
            </div>
          )}
        </div>
        
        {data.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-2 pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Current:</span>
              <span className="text-lg font-bold">{currentValue}%</span>
              <div className={cn(
                "flex items-center text-xs font-medium ml-2",
                trend === 'up' ? "text-green-600" : 
                trend === 'down' ? "text-red-600" : "text-gray-600"
              )}>
                {trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                {trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                {trend === 'neutral' && <Minus className="h-3 w-3 mr-1" />}
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
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
