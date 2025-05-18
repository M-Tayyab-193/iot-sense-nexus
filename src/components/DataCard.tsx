
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  value: number | string | boolean;
  icon: React.ReactNode;
  unit?: string;
  colorClass?: string;
  animate?: boolean;
}

const DataCard: React.FC<DataCardProps> = ({ 
  title, 
  value, 
  icon, 
  unit = '', 
  colorClass = 'from-blue-600 to-blue-400',
  animate = true
}) => {
  // Handle boolean values
  const displayValue = typeof value === 'boolean' 
    ? (value ? 'Active' : 'Inactive') 
    : value;
    
  return (
    <Card className={cn(
      "overflow-hidden card-gradient animate-fade-in",
      animate && "hover:scale-[1.02] transition-transform duration-200"
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn(
          "p-2 rounded-full",
          typeof value === 'boolean' && value ? 'bg-green-500/20' : 'bg-iot-purple/20'
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {displayValue}
          {unit && <span className="ml-1 text-sm opacity-70">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
