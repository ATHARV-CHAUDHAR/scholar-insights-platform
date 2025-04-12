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
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StatCard from '@/components/dashboard/StatCard';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import StudentTable from '@/components/dashboard/StudentTable';
import { students, performance, attendance, subjects } from '@/utils/mockData';

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <Button onClick={handleRefreshData} variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Students" 
            value="1,248" 
            description="+12% from last month" 
            icon={Users} 
            trend="up"
            trendValue="12%"
            linkTo="/admin/students" 
          />
          <StatCard 
            title="Total Teachers" 
            value="56" 
            description="+3 new this month" 
            icon={Users} 
            trend="up"
            trendValue="5%"
            linkTo="/admin/teachers" 
          />
          <StatCard 
            title="Classes" 
            value="32" 
            description="Across all grades" 
            icon={BookOpen} 
            linkTo="/admin/classes" 
          />
          <StatCard 
            title="Revenue" 
            value="$528,590" 
            description="+8.2% from last quarter" 
            icon={DollarSign} 
            trend="up"
            trendValue="8.2%"
            linkTo="/admin/finance" 
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>System alerts and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 pb-3 border-b border-gray-100">
                    <Bell className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">System Maintenance</p>
                      <p className="text-xs text-gray-500">Scheduled for May 15, 2AM-4AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pb-3 border-b border-gray-100">
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">End of Year Reports</p>
                      <p className="text-xs text-gray-500">Due in 14 days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">5 New Students</p>
                      <p className="text-xs text-gray-500">Enrollments pending approval</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">View All Notifications</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used operations</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Button className="justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Add New Teacher
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Create Class
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Event
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    System Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database</span>
                      <Badge className="bg-green-500">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API</span>
                      <Badge className="bg-green-500">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Storage</span>
                      <Badge className="bg-green-500">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Authentication</span>
                      <Badge className="bg-green-500">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Services</span>
                      <Badge className="bg-amber-500">Degraded</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">View Detailed Status</Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Enrollments</CardTitle>
                <CardDescription>New students in the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Alice Johnson</TableCell>
                      <TableCell>Class 9A</TableCell>
                      <TableCell>S20230501</TableCell>
                      <TableCell>Apr 15, 2023</TableCell>
                      <TableCell><Badge className="bg-amber-500">Pending</Badge></TableCell>
                      <TableCell><Button variant="outline" size="sm">Review</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Robert Smith</TableCell>
                      <TableCell>Class 8B</TableCell>
                      <TableCell>S20230502</TableCell>
                      <TableCell>Apr 18, 2023</TableCell>
                      <TableCell><Badge className="bg-green-500">Approved</Badge></TableCell>
                      <TableCell><Button variant="outline" size="sm">View</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emily Davis</TableCell>
                      <TableCell>Class 10C</TableCell>
                      <TableCell>S20230503</TableCell>
                      <TableCell>Apr 22, 2023</TableCell>
                      <TableCell><Badge className="bg-amber-500">Pending</Badge></TableCell>
                      <TableCell><Button variant="outline" size="sm">Review</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">View All Enrollments</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Performance</CardTitle>
                  <CardDescription>School-wide academic metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <PerformanceChart data={performanceData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Class Performance Comparison</CardTitle>
                  <CardDescription>Average scores by class</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <PerformanceChart data={performanceData} />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Students</CardTitle>
                <CardDescription>Highest achievers across all classes</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentTable students={students.slice(0, 5)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>School-wide attendance trends</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <AttendanceChart data={attendanceData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attendance by Class</CardTitle>
                  <CardDescription>Comparison across classes</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <AttendanceChart data={attendanceData} />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Concerns</CardTitle>
                <CardDescription>Students with low attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                      <TableHead>Absences</TableHead>
                      <TableHead>Last Present</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">James Wilson</TableCell>
                      <TableCell>Class 7A</TableCell>
                      <TableCell>68%</TableCell>
                      <TableCell>16 days</TableCell>
                      <TableCell>Apr 28, 2023</TableCell>
                      <TableCell><Button variant="outline" size="sm">Contact</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sophia Brown</TableCell>
                      <TableCell>Class 9B</TableCell>
                      <TableCell>72%</TableCell>
                      <TableCell>14 days</TableCell>
                      <TableCell>May 2, 2023</TableCell>
                      <TableCell><Button variant="outline" size="sm">Contact</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>System Resources</CardTitle>
                  <CardDescription>Current usage statistics</CardDescription>
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
                  <Button variant="outline">Manage Resources</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent System Logs</CardTitle>
                  <CardDescription>Latest system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">[INFO] User authentication successful</span>
                      <span className="text-gray-400">2 mins ago</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-amber-600">[WARN] High CPU usage detected</span>
                      <span className="text-gray-400">15 mins ago</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">[INFO] Database backup completed</span>
                      <span className="text-gray-400">1 hour ago</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-red-600">[ERROR] Email service connection failed</span>
                      <span className="text-gray-400">3 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">[INFO] System update installed</span>
                      <span className="text-gray-400">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View All Logs</Button>
                </CardFooter>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Recent user activities and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>Administrator</TableCell>
                      <TableCell>Just now</TableCell>
                      <TableCell><Badge className="bg-green-500">Online</Badge></TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Disable</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>Teacher</TableCell>
                      <TableCell>10 minutes ago</TableCell>
                      <TableCell><Badge className="bg-green-500">Online</Badge></TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Disable</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Robert Johnson</TableCell>
                      <TableCell>Parent</TableCell>
                      <TableCell>3 hours ago</TableCell>
                      <TableCell><Badge className="bg-gray-500">Offline</Badge></TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Disable</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View All Users</Button>
                <Button>Add New User</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
