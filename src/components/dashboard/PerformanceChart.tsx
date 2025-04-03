
import React from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Score']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke="#4A6FFF" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Student Score"
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
