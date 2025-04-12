
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Bell, 
  FileText, 
  Settings,
  Download,
  RefreshCw,
  Filter,
  Eye,
  MoreHorizontal,
  MessageSquare,
  Mail,
  CheckCircle,
  AlertTriangle,
  Phone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StatCard from '@/components/dashboard/StatCard';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import StudentTable from '@/components/dashboard/StudentTable';
import QuickActions from '@/components/dashboard/QuickActions';
import SystemStatus from '@/components/dashboard/SystemStatus';
import RecentEnrollments from '@/components/dashboard/RecentEnrollments';
import { students, performance, attendance, subjects } from '@/utils/mockData';
import { Link } from 'react-router-dom';

// Mock data for charts
const performanceData = [
  { name: 'Jan', value: 85, average: 75 },
  { name: 'Feb', value: 82, average: 78 },
  { name: 'Mar', value: 80, average: 80 },
  { name: 'Apr', value: 78, average: 75 },
  { name: 'May', value: 82, average: 80 },
  { name: 'Jun', value: 84, average: 83 }
];

const attendanceData = [
  { name: 'Math', present: 95, absent: 5, late: 0 },
  { name: 'English', present: 92, absent: 5, late: 3 },
  { name: 'Science', present: 88, absent: 10, late: 2 },
  { name: 'History', present: 94, absent: 4, late: 2 },
  { name: 'Art', present: 90, absent: 7, late: 3 }
];

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  
  const handleRefreshData = () => {
    toast({
      title: "Refreshing data...",
      description: "Dashboard data is being updated.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exporting data...",
      description: "Your data is being exported to CSV.",
    });
  };

  const handleFilterData = () => {
    toast({
      title: "Filter options",
      description: "Filter options dialog will open here.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleFilterData} variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button onClick={handleExportData} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button onClick={handleRefreshData} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Students" 
            value="1,248" 
            description="+12% from last month" 
            icon={Users} 
            trend="up"
            trendValue="12%"
            linkTo="/admin/students" 
            iconClassName="bg-blue-100 text-blue-700"
            onClick={() => toast({
              title: "Students Overview",
              description: "Navigating to students page...",
            })}
          />
          <StatCard 
            title="Total Teachers" 
            value="56" 
            description="+3 new this month" 
            icon={Users} 
            trend="up"
            trendValue="5%"
            linkTo="/admin/teachers" 
            iconClassName="bg-green-100 text-green-700"
            onClick={() => toast({
              title: "Teachers Overview",
              description: "Navigating to teachers page...",
            })}
          />
          <StatCard 
            title="Classes" 
            value="32" 
            description="Across all grades" 
            icon={BookOpen} 
            linkTo="/admin/classes"
            iconClassName="bg-amber-100 text-amber-700"
            onClick={() => toast({
              title: "Classes Overview",
              description: "Navigating to classes page...",
            })}
          />
          <StatCard 
            title="Revenue" 
            value="$528,590" 
            description="+8.2% from last quarter" 
            icon={DollarSign} 
            trend="up"
            trendValue="8.2%"
            linkTo="/admin/finance" 
            iconClassName="bg-purple-100 text-purple-700"
            onClick={() => toast({
              title: "Finance Overview",
              description: "Navigating to finance page...",
            })}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Recent Notifications
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => toast({
                        title: "Notifications Settings",
                        description: "Opening notification settings...",
                      })}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>System alerts and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className="flex items-start gap-4 pb-3 border-b border-gray-100 hover:bg-muted/50 p-2 rounded-md cursor-pointer transition-colors"
                    onClick={() => toast({
                      title: "System Maintenance",
                      description: "View maintenance details for May 15, 2AM-4AM",
                    })}
                  >
                    <Bell className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">System Maintenance</p>
                      <p className="text-xs text-gray-500">Scheduled for May 15, 2AM-4AM</p>
                    </div>
                  </div>
                  <div 
                    className="flex items-start gap-4 pb-3 border-b border-gray-100 hover:bg-muted/50 p-2 rounded-md cursor-pointer transition-colors"
                    onClick={() => toast({
                      title: "End of Year Reports",
                      description: "View report preparation guidelines",
                    })}
                  >
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">End of Year Reports</p>
                      <p className="text-xs text-gray-500">Due in 14 days</p>
                    </div>
                  </div>
                  <div 
                    className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-md cursor-pointer transition-colors"
                    onClick={() => toast({
                      title: "New Students",
                      description: "View 5 pending student applications",
                    })}
                  >
                    <Users className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">5 New Students</p>
                      <p className="text-xs text-gray-500">Enrollments pending approval</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full text-sm"
                    onClick={() => toast({
                      title: "All Notifications",
                      description: "Opening notifications center...",
                    })}
                  >
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>

              <QuickActions />
              <SystemStatus />
            </div>

            <RecentEnrollments />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <CardTitle>Overall Performance</CardTitle>
                    <CardDescription>School-wide academic metrics</CardDescription>
                  </div>
                  <div className="mt-2 sm:mt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Performance Filters",
                        description: "Opening performance filter options...",
                      })}
                    >
                      <Filter className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Export Performance Data",
                        description: "Exporting performance data to CSV...",
                      })}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-80">
                  <PerformanceChart data={performanceData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <CardTitle>Class Performance Comparison</CardTitle>
                    <CardDescription>Average scores by class</CardDescription>
                  </div>
                  <div className="mt-2 sm:mt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Class Filters",
                        description: "Opening class filter options...",
                      })}
                    >
                      <Filter className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Export Class Data",
                        description: "Exporting class performance data to CSV...",
                      })}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-80">
                  <PerformanceChart data={performanceData} />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <CardTitle>Top Performing Students</CardTitle>
                  <CardDescription>Highest achievers across all classes</CardDescription>
                </div>
                <div className="mt-2 sm:mt-0 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({
                      title: "Student Filters",
                      description: "Opening student filter options...",
                    })}
                  >
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    <span>Filter</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({
                      title: "Export Student Data",
                      description: "Exporting student data to CSV...",
                    })}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span>Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <StudentTable students={students.slice(0, 5)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <CardTitle>Attendance Overview</CardTitle>
                    <CardDescription>School-wide attendance trends</CardDescription>
                  </div>
                  <div className="mt-2 sm:mt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Attendance Filters",
                        description: "Opening attendance filter options...",
                      })}
                    >
                      <Filter className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Export Attendance Data",
                        description: "Exporting attendance data to CSV...",
                      })}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-80">
                  <AttendanceChart data={attendanceData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <CardTitle>Attendance by Class</CardTitle>
                    <CardDescription>Comparison across classes</CardDescription>
                  </div>
                  <div className="mt-2 sm:mt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Class Filters",
                        description: "Opening class filter options...",
                      })}
                    >
                      <Filter className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Export Class Data",
                        description: "Exporting class attendance data to CSV...",
                      })}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-80">
                  <AttendanceChart data={attendanceData} />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <CardTitle>Attendance Concerns</CardTitle>
                  <CardDescription>Students with low attendance</CardDescription>
                </div>
                <div className="mt-2 sm:mt-0 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({
                      title: "Attendance Filters",
                      description: "Opening attendance filter options...",
                    })}
                  >
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    <span>Filter</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({
                      title: "Export Attendance Data",
                      description: "Exporting attendance concerns data to CSV...",
                    })}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span>Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Class</TableHead>
                        <TableHead>Attendance Rate</TableHead>
                        <TableHead className="hidden md:table-cell">Absences</TableHead>
                        <TableHead className="hidden lg:table-cell">Last Present</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">James Wilson</TableCell>
                        <TableCell className="hidden sm:table-cell">Class 7A</TableCell>
                        <TableCell>68%</TableCell>
                        <TableCell className="hidden md:table-cell">16 days</TableCell>
                        <TableCell className="hidden lg:table-cell">Apr 28, 2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8"
                              onClick={() => toast({
                                title: "Contact James Wilson",
                                description: "Opening messaging interface...",
                              })}
                            >Contact</Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => toast({
                                title: "Actions for James Wilson",
                                description: "Opening more options...",
                              })}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Sophia Brown</TableCell>
                        <TableCell className="hidden sm:table-cell">Class 9B</TableCell>
                        <TableCell>72%</TableCell>
                        <TableCell className="hidden md:table-cell">14 days</TableCell>
                        <TableCell className="hidden lg:table-cell">May 2, 2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8"
                              onClick={() => toast({
                                title: "Contact Sophia Brown",
                                description: "Opening messaging interface...",
                              })}
                            >Contact</Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => toast({
                                title: "Actions for Sophia Brown",
                                description: "Opening more options...",
                              })}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <div>
                    <CardTitle>System Resources</CardTitle>
                    <CardDescription>Current usage statistics</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    <span>Refresh</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Database Storage</span>
                        <span className="text-sm text-gray-500">78%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">File Storage</span>
                        <span className="text-sm text-gray-500">42%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-600 rounded-full" style={{width: '42%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">API Rate Limits</span>
                        <span className="text-sm text-gray-500">23%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-600 rounded-full" style={{width: '23%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Email Quota</span>
                        <span className="text-sm text-gray-500">91%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-red-600 rounded-full" style={{width: '91%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-sm">Manage Resources</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent System Logs</CardTitle>
                    <CardDescription>Latest system activities</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span>Export</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600 truncate">[INFO] User authentication successful</span>
                      <span className="text-gray-400 whitespace-nowrap ml-2">2 mins ago</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-amber-600 truncate">[WARN] High CPU usage detected</span>
                      <span className="text-gray-400 whitespace-nowrap ml-2">15 mins ago</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600 truncate">[INFO] Database backup completed</span>
                      <span className="text-gray-400 whitespace-nowrap ml-2">1 hour ago</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-red-600 truncate">[ERROR] Email service connection failed</span>
                      <span className="text-gray-400 whitespace-nowrap ml-2">3 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 truncate">[INFO] System update installed</span>
                      <span className="text-gray-400 whitespace-nowrap ml-2">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-sm">View All Logs</Button>
                </CardFooter>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Recent user activities and settings</CardDescription>
                </div>
                <div className="mt-2 sm:mt-0 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    <span>Filter</span>
                  </Button>
                  <Button>
                    <Users className="h-3.5 w-3.5 mr-1" />
                    <span>Add User</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden sm:table-cell">Role</TableHead>
                        <TableHead className="hidden md:table-cell">Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">John Doe</TableCell>
                        <TableCell className="hidden sm:table-cell">Administrator</TableCell>
                        <TableCell className="hidden md:table-cell">Just now</TableCell>
                        <TableCell><Badge className="bg-green-500">Online</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">Edit</Button>
                            <Button variant="outline" size="sm" className="h-8">Disable</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Jane Smith</TableCell>
                        <TableCell className="hidden sm:table-cell">Teacher</TableCell>
                        <TableCell className="hidden md:table-cell">10 minutes ago</TableCell>
                        <TableCell><Badge className="bg-green-500">Online</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">Edit</Button>
                            <Button variant="outline" size="sm" className="h-8">Disable</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Robert Johnson</TableCell>
                        <TableCell className="hidden sm:table-cell">Parent</TableCell>
                        <TableCell className="hidden md:table-cell">3 hours ago</TableCell>
                        <TableCell><Badge className="bg-gray-500">Offline</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">Edit</Button>
                            <Button variant="outline" size="sm" className="h-8">Disable</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between">
                <Button variant="outline" className="mb-2 sm:mb-0 w-full sm:w-auto">View All Users</Button>
                <Button className="w-full sm:w-auto">Add New User</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
