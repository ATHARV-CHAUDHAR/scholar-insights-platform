
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  iconClassName?: string;
  linkTo?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  iconClassName,
  linkTo,
}) => {
  const CardWrapper = linkTo ? ({ children }: { children: React.ReactNode }) => (
    <Link to={linkTo} className="block h-full w-full">
      {children}
    </Link>
  ) : React.Fragment;
  
  return (
    <CardWrapper>
      <Card className={cn(
        "overflow-hidden h-full", 
        linkTo && "transition-all hover:shadow-md hover:scale-[1.01] duration-200", 
        className
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium truncate">{title}</CardTitle>
          {Icon && (
            <div className={cn(
              "p-2 rounded-full",
              iconClassName || "bg-primary/10 text-primary"
            )}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold truncate">{value}</div>
          {(description || trend) && (
            <div className="flex items-center mt-1 flex-wrap gap-1">
              {trend && (
                <span className={cn(
                  "text-xs inline-flex items-center px-1.5 py-0.5 rounded-full",
                  trend === 'up' && "bg-green-100 text-green-700",
                  trend === 'down' && "bg-red-100 text-red-700",
                  trend === 'neutral' && "bg-gray-100 text-gray-700"
                )}>
                  {trend === 'up' && '↑'}
                  {trend === 'down' && '↓'}
                  {trend === 'neutral' && '→'}
                  {trendValue}
                </span>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default StatCard;
