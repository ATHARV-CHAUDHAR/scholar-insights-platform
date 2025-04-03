
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)]}
                labelFormatter={(label) => `Subject: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="present" 
                name="Present" 
                fill="#4ADE80" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="late" 
                name="Late" 
                fill="#FBBF24" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="absent" 
                name="Absent" 
                fill="#F87171" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
