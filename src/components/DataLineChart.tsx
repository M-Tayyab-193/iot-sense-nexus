
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DeviceData } from '@/context/DeviceContext';

interface DataLineChartProps {
  data: DeviceData[];
  dataKey: keyof DeviceData;
  title: string;
  color: string;
  unit?: string;
}

const DataLineChart: React.FC<DataLineChartProps> = ({
  data,
  dataKey,
  title,
  color,
  unit = '',
}) => {
  // Format the timestamp for display
  const formattedData = data.map(item => ({
    ...item,
    formattedTime: new Date(item.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    }),
  }));

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="formattedTime" 
                tick={{ fill: '#fff', fontSize: 12 }} 
                tickLine={{ stroke: '#fff' }}
                axisLine={{ stroke: '#fff', opacity: 0.3 }}
              />
              <YAxis 
                tick={{ fill: '#fff', fontSize: 12 }} 
                tickLine={{ stroke: '#fff' }}
                axisLine={{ stroke: '#fff', opacity: 0.3 }}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #3F3F46', color: '#fff' }}
                formatter={(value) => [`${value}${unit}`, title]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type="monotone"
                dataKey={dataKey as string}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataLineChart;
