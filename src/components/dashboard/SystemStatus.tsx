
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface SystemService {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down';
  details?: string;
}

const SystemStatus: React.FC = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [services, setServices] = useState<SystemService[]>([
    { id: 'database', name: 'Database', status: 'operational' },
    { id: 'api', name: 'API', status: 'operational' },
    { id: 'storage', name: 'Storage', status: 'operational' },
    { id: 'auth', name: 'Authentication', status: 'operational' },
    { id: 'email', name: 'Email Services', status: 'degraded', details: 'High latency reported' }
  ]);

  const handleRefreshStatus = () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing system status",
      description: "Checking service health...",
    });
    
    // Simulate refresh delay
    setTimeout(() => {
      // Random status updates for demo purposes
      const updatedServices = services.map(service => {
        const randomUpdate = Math.random();
        if (randomUpdate > 0.7) {
          // 30% chance of status change
          const statuses: ('operational' | 'degraded' | 'down')[] = ['operational', 'degraded', 'down'];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          return { ...service, status: newStatus };
        }
        return service;
      });
      
      setServices(updatedServices);
      setIsRefreshing(false);
      
      toast({
        title: "Status Updated",
        description: "System status has been refreshed.",
      });
    }, 1500);
  };

  const handleServiceClick = (service: SystemService) => {
    toast({
      title: `${service.name} Status`,
      description: service.details || `Status: ${service.status}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          System Status
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleRefreshStatus}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh status</span>
          </Button>
        </CardTitle>
        <CardDescription>Current system health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleServiceClick(service)}
            >
              <span className="text-sm flex items-center gap-2">
                {service.status === 'operational' && <CheckCircle className="h-4 w-4 text-green-500" />}
                {service.status === 'degraded' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                {service.status === 'down' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                {service.name}
              </span>
              <Badge className={
                service.status === 'operational' ? "bg-green-500" : 
                service.status === 'degraded' ? "bg-amber-500" : 
                "bg-red-500"
              }>
                {service.status === 'operational' ? 'Operational' : 
                 service.status === 'degraded' ? 'Degraded' : 'Down'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/admin/system-status" className="w-full">
          <Button 
            variant="ghost" 
            className="w-full text-sm"
          >
            View Detailed Status
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SystemStatus;
