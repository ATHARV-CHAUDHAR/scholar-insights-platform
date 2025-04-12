
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
    <Link to={linkTo} className="block h-full">
      {children}
    </Link>
  ) : React.Fragment;
  
  return (
    <CardWrapper>
      <Card className={cn("overflow-hidden", linkTo && "transition-all hover:shadow-md", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
          <div className="text-2xl font-bold">{value}</div>
          {(description || trend) && (
            <div className="flex items-center mt-1">
              {trend && (
                <span className={cn(
                  "text-xs mr-1",
                  trend === 'up' && "text-green-600",
                  trend === 'down' && "text-red-600",
                  trend === 'neutral' && "text-gray-500"
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
