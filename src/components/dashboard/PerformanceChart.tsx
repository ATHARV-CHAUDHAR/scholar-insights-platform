
import React from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  title = 'Performance Trend',
  description = 'Student performance over time',
  dataKey = 'value',
  averageKey = 'average'
}) => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="transition-all duration-300 hover:bg-gray-50">
        <CardTitle className="transition-transform duration-300 hover:scale-105">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              className="transition-transform duration-300 hover:scale-[1.02]"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                className="transition-opacity duration-300 opacity-50" 
              />
              <XAxis 
                dataKey="name"
                className="transition-all duration-300"
              />
              <YAxis 
                domain={[0, 100]}
                className="transition-all duration-300"
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Score']}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                  transition: 'all 0.3s ease',
                }}
                wrapperStyle={{
                  transition: 'opacity 0.3s ease',
                }}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                  transition: 'all 0.3s ease',
                }}
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke="#4A6FFF" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ 
                  r: 8,
                  className: "transition-all duration-300"
                }}
                name="Student Score"
                className="transition-all duration-300 hover:filter hover:drop-shadow-md"
                animationDuration={1500}
                animationBegin={0}
              />
              {averageKey && (
                <Line 
                  type="monotone" 
                  dataKey={averageKey} 
                  stroke="#9CA3AF" 
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                  name="Class Average"
                  className="transition-all duration-300 hover:filter hover:drop-shadow-md"
                  animationDuration={1500}
                  animationBegin={300}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
