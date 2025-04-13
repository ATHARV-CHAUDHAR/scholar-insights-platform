
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { PerformanceData, ChartColors } from './utils';

interface AreaChartComponentProps {
  data: PerformanceData[];
  dataKey: string;
  averageKey?: string;
  chartColors: ChartColors;
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ 
  data, 
  dataKey, 
  averageKey,
  chartColors 
}) => {
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
};

export default AreaChartComponent;
