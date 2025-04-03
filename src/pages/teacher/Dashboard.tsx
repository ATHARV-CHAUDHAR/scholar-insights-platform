
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import StudentTable from '@/components/dashboard/StudentTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { students, subjects } from '@/utils/mockData';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for charts
  const attendanceData = subjects.map(subject => ({
    name: subject.name,
    present: Math.floor(Math.random() * 20) + 70, // 70-90%
    absent: Math.floor(Math.random() * 10) + 5,   // 5-15%
    late: Math.floor(Math.random() * 10) + 5,     // 5-15%
  }));
  
  const performanceData = subjects.map(subject => ({
    name: subject.name,
    value: Math.floor(Math.random() * 30) + 70, // 70-100
    average: Math.floor(Math.random() * 20) + 60, // 60-80
  }));
  
  const recentPerformanceData = [
    { name: 'Quiz 1', value: 80, average: 75 },
    { name: 'Class Test', value: 75, average: 70 },
    { name: 'Mid Term', value: 85, average: 72 },
    { name: 'Quiz 2', value: 90, average: 78 },
    { name: 'Final Term', value: 82, average: 76 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Students" 
            value={students.length}
            description="In your classes"
            icon={Users}
            iconClassName="bg-blue-100 text-blue-700"
          />
          <StatCard 
            title="Classes" 
            value="4"
            description="You're teaching"
            icon={GraduationCap}
            iconClassName="bg-purple-100 text-purple-700"
          />
          <StatCard 
            title="Attendance Rate" 
            value="92%"
            trend="up"
            trendValue="2%"
            description="From last month"
            icon={Calendar}
            iconClassName="bg-green-100 text-green-700"
          />
          <StatCard 
            title="Average Performance" 
            value="78%"
            trend="up"
            trendValue="5%"
            description="From last term"
            icon={BookOpen}
            iconClassName="bg-amber-100 text-amber-700"
          />
        </div>
        
        {/* Tabbed Dashboard */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AttendanceChart 
                data={attendanceData} 
                title="Class Attendance by Subject"
                description="Current month attendance statistics"
              />
              <PerformanceChart 
                data={recentPerformanceData} 
                title="Recent Performance Trend"
                description="Last 5 assessments"
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Students</CardTitle>
                <CardDescription>Your most recent students</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentTable students={students.slice(0, 5)} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Detailed attendance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceChart 
                  data={attendanceData} 
                  title="Attendance by Subject"
                  description="Full attendance breakdown"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Subject-wise performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={performanceData} 
                  title="Performance by Subject"
                  description="Average scores across all subjects"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>Complete list of students in your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentTable students={students} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
