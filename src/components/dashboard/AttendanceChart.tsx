
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AttendanceData {
  name: string;
  present: number;
  absent: number;
  late: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
  title?: string;
  description?: string;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ 
  data, 
  title = 'Attendance Overview',
  description = 'Monthly attendance statistics'
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
            <BarChart 
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
              <YAxis className="transition-all duration-300" />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)]}
                labelFormatter={(label) => `Subject: ${label}`}
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
              <Bar 
                dataKey="present" 
                name="Present" 
                fill="#4ADE80" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300 hover:brightness-110"
                animationDuration={1500}
                animationBegin={0}
              />
              <Bar 
                dataKey="late" 
                name="Late" 
                fill="#FBBF24" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300 hover:brightness-110"
                animationDuration={1500}
                animationBegin={300}
              />
              <Bar 
                dataKey="absent" 
                name="Absent" 
                fill="#F87171" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300 hover:brightness-110"
                animationDuration={1500}
                animationBegin={600}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
