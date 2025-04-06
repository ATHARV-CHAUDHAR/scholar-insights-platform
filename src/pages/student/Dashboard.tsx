
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import StatCard from "@/components/dashboard/StatCard";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import { Book, Calendar, GraduationCap, Award, Clock } from "lucide-react";
import { calculateAttendancePercentage, calculateAverageMarks, getMockSubjects } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Student Dashboard | AVA Ed. Tech.';
    
    // Log Supabase connection status
    console.log('Supabase client initialized:', supabase);
    console.log('Current user:', user);

    // Check if we can connect to Supabase
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('subjects').select('*').limit(1);
        console.log('Supabase connection test:', { data, error });
      } catch (e) {
        console.error('Supabase connection test failed:', e);
      }
    };
    
    checkConnection();
    
    // Fetch data or use mock data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would fetch from Supabase
        // For now, use mock data
        const subjects = getMockSubjects();
        const attendanceChartData = subjects.map(subject => ({
          name: subject.subject_name || subject.name, // Handle both formats
          present: Math.floor(Math.random() * 30) + 70, // Random percentage between 70-100
          absent: Math.floor(Math.random() * 15),
          late: Math.floor(Math.random() * 15),
        }));
        
        setAttendanceData(attendanceChartData);
        
        toast({
          title: 'Welcome to Student Dashboard',
          description: 'Your learning journey starts here!',
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error loading dashboard',
          description: 'Could not load your dashboard data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  const overallAttendance = 92.5; // Example value
  const averageGrade = 87.3; // Example value
  const completedAssignments = 24;
  const totalAssignments = 28;
  const upcomingTests = 2;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.username || user?.name || 'Student'}! Here's your learning progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance Rate"
          value={`${overallAttendance}%`}
          description="Your overall attendance"
          icon={Calendar}
          trend="up"
          trendValue="1.2%"
          iconClassName="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Average Grade"
          value={`${averageGrade}%`}
          description="Current semester"
          icon={Award}
          trend="up"
          trendValue="2.4%"
          iconClassName="bg-green-100 text-green-600"
        />
        <StatCard
          title="Assignments"
          value={`${completedAssignments}/${totalAssignments}`}
          description="Completed assignments"
          icon={Book}
          trend="neutral"
          trendValue="85.7%"
          iconClassName="bg-amber-100 text-amber-600"
        />
        <StatCard
          title="Upcoming Tests"
          value={upcomingTests}
          description="In the next two weeks"
          icon={Clock}
          iconClassName="bg-purple-100 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <GraduationCap className="h-16 w-16 mx-auto text-primary" />
              <p>Your performance metrics will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <AttendanceChart 
          data={attendanceData} 
          title="Attendance by Subject" 
          description="Your attendance record for each subject"
        />
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4 pb-4 border-b">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Assignment Submitted</h4>
                  <p className="text-sm text-muted-foreground">You submitted "Math Problem Set 7" - 2 days ago</p>
                </div>
              </li>
              <li className="flex items-start space-x-4 pb-4 border-b">
                <div className="bg-green-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Test Result</h4>
                  <p className="text-sm text-muted-foreground">You scored 92% on "Science Mid-term" - 5 days ago</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Class Attended</h4>
                  <p className="text-sm text-muted-foreground">You attended all classes this week</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
