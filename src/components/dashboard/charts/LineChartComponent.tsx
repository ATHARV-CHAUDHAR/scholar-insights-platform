
import React from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { PerformanceData, ChartColors } from './utils';

interface LineChartComponentProps {
  data: PerformanceData[];
  dataKey: string;
  averageKey?: string;
  chartColors: ChartColors;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ 
  data, 
  dataKey, 
  averageKey,
  chartColors 
}) => {
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
};

export default LineChartComponent;
