
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, Bell, AlertTriangle, UserCircle } from 'lucide-react';
import { students, subjects, getStudentAttendanceStats, getStudentPerformanceStats } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Filter students that belong to the logged-in parent
  const myChildren = students.filter(student => student.parentId === user?.id);
  
  // If no children, show a message
  if (myChildren.length === 0) {
    return (
      <Layout>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Parent Dashboard</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>No Children Found</CardTitle>
              <CardDescription>
                It seems that your account is not linked to any children.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Please contact the school administration to link your account with your children.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // For demonstration, we'll focus on the first child
  const activeChild = myChildren[0];
  
  // Get attendance statistics for the active child
  const attendanceStats = getStudentAttendanceStats(activeChild.id);
  
  // Get performance statistics for the active child
  const performanceStats = getStudentPerformanceStats(activeChild.id);
  
  // Prepare performance data for chart
  const performanceChartData = performanceStats.subjectStats.map(stat => ({
    name: stat.subjectName,
    value: stat.averageMarks,
    average: 75, // Mock class average
  }));
  
  // Upcoming events data
  const upcomingEvents = [
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      date: '2025-04-15',
      time: '10:00 AM',
      description: 'Quarterly meeting to discuss your child\'s progress',
    },
    {
      id: '2',
      title: 'Science Exhibition',
      date: '2025-04-25',
      time: '09:30 AM',
      description: 'Annual science exhibition showcasing student projects',
    },
    {
      id: '3',
      title: 'Mathematics Quiz',
      date: '2025-05-05',
      time: '11:00 AM',
      description: 'Inter-class mathematics quiz competition',
    },
  ];
  
  // Recent announcements data
  const announcements = [
    {
      id: '1',
      title: 'New Library Hours',
      date: '2025-04-01',
      content: 'The school library will now be open on Saturdays from 9 AM to 1 PM to encourage reading habits.',
    },
    {
      id: '2',
      title: 'School Sports Day',
      date: '2025-03-25',
      content: 'The annual sports day will be held on May 10th. All parents are cordially invited to attend.',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Parent Dashboard</h2>
        
        {/* Child Selection (if multiple children) */}
        {myChildren.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle>My Children</CardTitle>
              <CardDescription>Select a child to view their details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {myChildren.map(child => (
                  <div 
                    key={child.id} 
                    className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border ${
                      child.id === activeChild.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Avatar className="h-14 w-14 mb-2">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(child.name)}&background=4A6FFF&color=fff&size=100`} />
                      <AvatarFallback>{child.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{child.name}</span>
                    <span className="text-xs text-muted-foreground">Class {child.class}-{child.section}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Child Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Child Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Student Information</CardTitle>
              <CardDescription>
                {activeChild.name}'s details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(activeChild.name)}&background=4A6FFF&color=fff&size=100`} />
                  <AvatarFallback>{activeChild.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold">{activeChild.name}</h3>
                  <p className="text-sm text-muted-foreground">Roll No: {activeChild.rollNumber}</p>
                  <p className="text-sm text-muted-foreground">Class: {activeChild.class}-{activeChild.section}</p>
                  
                  <Link to={`/parent/student/${activeChild.id}`}>
                    <Button className="mt-2" size="sm">
                      <UserCircle className="mr-2 h-4 w-4" />
                      View Full Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Attendance Overview */}
          <StatCard 
            title="Overall Attendance" 
            value={`${attendanceStats.overallStats.attendancePercentage.toFixed(1)}%`}
            description={`${attendanceStats.overallStats.presentCount} present, ${attendanceStats.overallStats.absentCount} absent`}
            icon={Calendar}
            iconClassName={`bg-${
              attendanceStats.overallStats.attendancePercentage >= 90
                ? 'green'
                : attendanceStats.overallStats.attendancePercentage >= 75
                ? 'yellow'
                : 'red'
            }-100 text-${
              attendanceStats.overallStats.attendancePercentage >= 90
                ? 'green'
                : attendanceStats.overallStats.attendancePercentage >= 75
                ? 'yellow'
                : 'red'
            }-700`}
          />
          
          {/* Performance Overview */}
          <StatCard 
            title="Academic Performance" 
            value={`${performanceStats.overallStats.averageMarks.toFixed(1)}%`}
            description="Overall academic score"
            icon={BookOpen}
            iconClassName={`bg-${
              performanceStats.overallStats.averageMarks >= 90
                ? 'green'
                : performanceStats.overallStats.averageMarks >= 75
                ? 'blue'
                : performanceStats.overallStats.averageMarks >= 60
                ? 'yellow'
                : 'red'
            }-100 text-${
              performanceStats.overallStats.averageMarks >= 90
                ? 'green'
                : performanceStats.overallStats.averageMarks >= 75
                ? 'blue'
                : performanceStats.overallStats.averageMarks >= 60
                ? 'yellow'
                : 'red'
            }-700`}
          />
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>
                    {activeChild.name}'s performance across subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    data={performanceChartData}
                    title=""
                    description=""
                  />
                </CardContent>
              </Card>
              
              {/* Attention Areas */}
              <Card>
                <CardHeader>
                  <CardTitle>Areas Needing Attention</CardTitle>
                  <CardDescription>
                    Subjects that require more focus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceStats.subjectStats
                      .filter(stat => stat.trend === 'decreasing' || stat.averageMarks < 70)
                      .map(stat => (
                        <div key={stat.subjectId} className="flex items-start space-x-3 p-3 rounded-lg border border-amber-200 bg-amber-50">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{stat.subjectName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {stat.trend === 'decreasing' 
                                ? 'Performance is declining. Current average: ' 
                                : 'Performance is below expected level: '}
                              {stat.averageMarks.toFixed(1)}%
                            </p>
                            <p className="text-sm mt-1">
                              <strong>Recommendation:</strong> Schedule additional study time and consider extra practice.
                            </p>
                          </div>
                        </div>
                      ))}
                    
                    {performanceStats.subjectStats.filter(stat => stat.trend === 'decreasing' || stat.averageMarks < 70).length === 0 && (
                      <div className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Great Progress!</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {activeChild.name} is doing well in all subjects. Keep up the good work!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex space-x-4 p-3 rounded-lg border border-gray-200">
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-primary-foreground border border-primary text-primary">
                        <span className="text-sm font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-lg font-bold">{new Date(event.date).getDate()}</span>
                      </div>
                      
                      <div className="flex-grow">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.time} • {event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Performance</CardTitle>
                <CardDescription>Complete subject-wise performance details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {performanceStats.subjectStats.map(stat => (
                    <Card key={stat.subjectId} className="border shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">{stat.subjectName}</CardTitle>
                        <CardDescription>Average Score: {stat.averageMarks.toFixed(1)}%</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                          <div
                            className={`h-2.5 rounded-full ${
                              stat.averageMarks >= 90
                                ? 'bg-green-500'
                                : stat.averageMarks >= 75
                                ? 'bg-blue-500'
                                : stat.averageMarks >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${stat.averageMarks}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span>Performance Trend:</span>
                            <span className={`font-medium ${
                              stat.trend === 'increasing'
                                ? 'text-green-600'
                                : stat.trend === 'decreasing'
                                ? 'text-red-600'
                                : 'text-gray-600'
                            }`}>
                              {stat.trend === 'increasing'
                                ? 'Improving'
                                : stat.trend === 'decreasing'
                                ? 'Declining'
                                : 'Stable'}
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Recent Assessments:</span>
                            <span className="font-medium">{stat.performances.length}</span>
                          </div>
                        </div>
                        
                        <Link to={`/parent/performance/${activeChild.id}?subject=${stat.subjectId}`}>
                          <Button variant="outline" size="sm" className="w-full mt-4">
                            View Details
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="announcements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>School Announcements</CardTitle>
                <CardDescription>Recent announcements from the school</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Important Notifications</CardTitle>
                <CardDescription>Alerts and notifications for parents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bell className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">All Caught Up!</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You have no new notifications at this time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>School Calendar</CardTitle>
                <CardDescription>Upcoming events and important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Calendar Feature</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    The detailed calendar view will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ParentDashboard;
