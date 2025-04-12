import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  ArrowLeft,
  Cpu,
  Database,
  Server,
  HardDrive,
  Mail,
  Shield,
  Activity,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  lastIncident?: string;
  details?: string;
  responseTime?: string;
  load?: string;
}

interface ResourceUsage {
  id: string;
  name: string;
  used: number;
  total: number;
  unit: string;
}

const SystemStatusPage: React.FC = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const [services, setServices] = useState<ServiceStatus[]>([
    { 
      id: 'database', 
      name: 'Database', 
      status: 'operational',
      uptime: '99.98%',
      responseTime: '45ms',
      load: '23%'
    },
    { 
      id: 'api', 
      name: 'API Services', 
      status: 'operational',
      uptime: '99.95%',
      responseTime: '120ms',
      load: '18%'
    },
    { 
      id: 'storage', 
      name: 'File Storage', 
      status: 'operational',
      uptime: '100%',
      responseTime: '85ms',
      load: '32%'
    },
    { 
      id: 'auth', 
      name: 'Authentication', 
      status: 'operational',
      uptime: '99.99%',
      responseTime: '95ms',
      load: '15%'
    },
    { 
      id: 'email', 
      name: 'Email Services', 
      status: 'degraded', 
      uptime: '98.2%',
      lastIncident: '2 hours ago',
      details: 'High latency reported, engineers investigating',
      responseTime: '350ms',
      load: '45%'
    },
    { 
      id: 'security', 
      name: 'Security Services', 
      status: 'operational',
      uptime: '99.97%',
      responseTime: '65ms',
      load: '12%'
    },
    { 
      id: 'backup', 
      name: 'Backup Systems', 
      status: 'down',
      uptime: '95.5%',
      lastIncident: '30 minutes ago',
      details: 'Scheduled maintenance in progress, estimated completion in 2 hours',
      responseTime: 'N/A',
      load: '0%'
    }
  ]);

  const [resources, setResources] = useState<ResourceUsage[]>([
    { id: 'cpu', name: 'CPU Usage', used: 23, total: 100, unit: '%' },
    { id: 'memory', name: 'Memory', used: 4.2, total: 8, unit: 'GB' },
    { id: 'disk', name: 'Storage', used: 248, total: 500, unit: 'GB' },
    { id: 'bandwidth', name: 'Bandwidth', used: 58, total: 200, unit: 'Mbps' },
    { id: 'database', name: 'Database Storage', used: 1.8, total: 5, unit: 'GB' },
  ]);

  const handleRefreshStatus = () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing system status",
      description: "Retrieving latest system metrics...",
    });
    
    setTimeout(() => {
      const updatedServices = services.map(service => {
        const randomUpdate = Math.random();
        if (randomUpdate > 0.7) {
          const statuses: ('operational' | 'degraded' | 'down')[] = ['operational', 'degraded', 'down'];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          let details = service.details;
          if (newStatus === 'degraded' && service.status === 'operational') {
            details = 'Performance degradation detected';
          } else if (newStatus === 'down' && service.status !== 'down') {
            details = 'Service unavailable, engineers notified';
          } else if (newStatus === 'operational' && service.status !== 'operational') {
            details = 'Service restored to normal operation';
          }
          
          return { 
            ...service, 
            status: newStatus, 
            details,
            lastIncident: newStatus !== 'operational' ? 'Just now' : service.lastIncident
          };
        }
        return service;
      });
      
      const updatedResources = resources.map(resource => {
        const fluctuation = (Math.random() * 10) - 5;
        let newUsed = resource.used + (resource.total * (fluctuation / 100));
        newUsed = Math.max(0, Math.min(newUsed, resource.total));
        return {
          ...resource,
          used: +newUsed.toFixed(1)
        };
      });
      
      setServices(updatedServices);
      setResources(updatedResources);
      setLastUpdated(new Date());
      setIsRefreshing(false);
      
      toast({
        title: "Status Updated",
        description: "System status has been refreshed.",
      });
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    if (status === 'operational') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'degraded') return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === 'operational') return "bg-green-500";
    if (status === 'degraded') return "bg-amber-500";
    return "bg-red-500";
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'database': return <Database className="h-5 w-5" />;
      case 'api': return <Server className="h-5 w-5" />;
      case 'storage': return <HardDrive className="h-5 w-5" />;
      case 'auth': return <Shield className="h-5 w-5" />;
      case 'email': return <Mail className="h-5 w-5" />;
      case 'security': return <Shield className="h-5 w-5" />;
      case 'backup': return <Database className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getResourceIcon = (id: string) => {
    switch (id) {
      case 'cpu': return <Cpu className="h-5 w-5" />;
      case 'memory': return <Server className="h-5 w-5" />;
      case 'disk': return <HardDrive className="h-5 w-5" />;
      case 'bandwidth': return <Activity className="h-5 w-5" />;
      case 'database': return <Database className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const handleExportStatus = () => {
    toast({
      title: "Exporting system status",
      description: "Generating report for download...",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "System status report has been downloaded.",
      });
    }, 1000);
  };

  const handleServiceClick = (service: ServiceStatus) => {
    toast({
      title: `${service.name} Details`,
      description: service.details || `Status: ${service.status}, Uptime: ${service.uptime}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">System Status</h1>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleRefreshStatus} 
              variant="outline" 
              size="sm" 
              className="gap-2"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button onClick={handleExportStatus} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()} on {lastUpdated.toLocaleDateString()}
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Service Health Overview
              </CardTitle>
              <CardDescription>Current status of all system services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Uptime</TableHead>
                      <TableHead className="hidden lg:table-cell">Response Time</TableHead>
                      <TableHead className="hidden xl:table-cell">Last Incident</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow 
                        key={service.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleServiceClick(service)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-md bg-muted">
                              {getServiceIcon(service.id)}
                            </div>
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeClass(service.status)}>
                            <div className="flex items-center gap-1.5">
                              {getStatusIcon(service.status)}
                              <span>
                                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                              </span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{service.uptime}</TableCell>
                        <TableCell className="hidden lg:table-cell">{service.responseTime}</TableCell>
                        <TableCell className="hidden xl:table-cell">
                          {service.lastIncident || "No incidents"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Resource Utilization
              </CardTitle>
              <CardDescription>System resource usage metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                  <div 
                    key={resource.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-md bg-muted/80">
                          {getResourceIcon(resource.id)}
                        </div>
                        <span className="font-medium">{resource.name}</span>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {Math.round((resource.used / resource.total) * 100)}%
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{resource.used} {resource.unit}</span>
                        <span>{resource.total} {resource.unit}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            (resource.used / resource.total) > 0.8 ? 'bg-red-500' :
                            (resource.used / resource.total) > 0.6 ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(resource.used / resource.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                System Logs
              </CardTitle>
              <CardDescription>Recent system activity logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">[SUCCESS] Database backup completed</p>
                      <p className="text-muted-foreground">Automated system backup completed successfully</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground whitespace-nowrap">5 mins ago</span>
                </div>
                <div className="flex justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">[WARNING] High CPU usage detected</p>
                      <p className="text-muted-foreground">CPU usage exceeded 80% threshold for 5 minutes</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground whitespace-nowrap">20 mins ago</span>
                </div>
                <div className="flex justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">[ERROR] Email service connection failed</p>
                      <p className="text-muted-foreground">Unable to establish connection with SMTP server</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground whitespace-nowrap">1 hour ago</span>
                </div>
                <div className="flex justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">[INFO] System update installed</p>
                      <p className="text-muted-foreground">Security patches and performance updates applied</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground whitespace-nowrap">3 hours ago</span>
                </div>
                <div className="flex justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">[INFO] User authentication service restarted</p>
                      <p className="text-muted-foreground">Scheduled maintenance completed</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground whitespace-nowrap">5 hours ago</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Logs
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SystemStatusPage;
