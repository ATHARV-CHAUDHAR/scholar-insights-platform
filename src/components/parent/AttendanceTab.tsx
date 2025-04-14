
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronDown, ChevronUp, UserCheck, UserX, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { getStudentAttendanceStats, getStudentById, attendance, subjects, getSubjectById } from '@/utils/mockData';
import MonthlyAttendanceCalendar from './MonthlyAttendanceCalendar';
import SubjectAttendanceDetails from './SubjectAttendanceDetails';

interface AttendanceTabProps {
  studentId: string;
}

const AttendanceTab: React.FC<AttendanceTabProps> = ({ studentId }) => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  
  const student = getStudentById(studentId);
  const attendanceStats = getStudentAttendanceStats(studentId);
  
  // Get subject-specific data
  const subjectData = subjects.map(subject => {
    const subjectStat = attendanceStats.subjectStats.find(s => s.subjectId === subject.id);
    return {
      id: subject.id,
      name: subject.name,
      present: subjectStat?.presentCount || 0,
      late: subjectStat?.lateCount || 0,
      absent: subjectStat?.absentCount || 0,
      total: subjectStat?.totalClasses || 0,
      attendancePercentage: subjectStat?.attendancePercentage || 0
    };
  });
  
  // Filter attendance data based on selected timeframe
  const getFilteredAttendance = () => {
    const studentAttendance = attendance.filter(a => a.studentId === studentId);
    const today = new Date();
    
    let startDate;
    switch (selectedTimeframe) {
      case 'week':
        startDate = subDays(today, 7);
        break;
      case 'month':
        startDate = startOfMonth(today);
        break;
      case 'semester':
        startDate = subDays(today, 120); // Approx. 4 months
        break;
      default:
        startDate = subDays(today, 30);
    }
    
    return studentAttendance.filter(a => new Date(a.date) >= startDate);
  };
  
  // Chart data
  const chartData = subjects.map(subject => {
    const subjectStat = attendanceStats.subjectStats.find(s => s.subjectId === subject.id);
    return {
      name: subject.name,
      present: subjectStat?.presentCount || 0,
      late: subjectStat?.lateCount || 0,
      absent: subjectStat?.absentCount || 0,
    };
  });
  
  // Calculate overall attendance
  const overallAttendance = attendanceStats.overallStats.attendancePercentage;
  const attendanceColor = 
    overallAttendance >= 90 ? 'text-green-600' :
    overallAttendance >= 80 ? 'text-emerald-600' :
    overallAttendance >= 70 ? 'text-yellow-600' :
    'text-red-600';
  
  // Trend data for the past month
  const getAttendanceTrendData = () => {
    const today = new Date();
    const startDate = subDays(today, 30);
    const endDate = today;
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    
    const trendData = dateRange.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayAttendance = attendance.filter(a => 
        a.studentId === studentId && 
        a.date === dateStr
      );
      
      const present = dayAttendance.filter(a => a.status === 'present').length;
      const absent = dayAttendance.filter(a => a.status === 'absent').length;
      const late = dayAttendance.filter(a => a.status === 'late').length;
      
      return {
        date: format(date, 'MMM dd'),
        present,
        absent,
        late,
        total: dayAttendance.length,
      };
    }).filter(day => day.total > 0); // Only include days with classes
    
    return trendData;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold">Attendance Records</h3>
          <p className="text-muted-foreground">
            {student?.name}'s class attendance statistics
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select 
            value={selectedTimeframe} 
            onValueChange={setSelectedTimeframe}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedSubject} 
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold tracking-tight">
                <span className={attendanceColor}>{overallAttendance.toFixed(1)}%</span>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={overallAttendance} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold tracking-tight">
                <span>{attendanceStats.overallStats.presentCount}</span>
                <span className="text-sm text-muted-foreground ml-1">days</span>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold tracking-tight">
                <span>{attendanceStats.overallStats.lateCount}</span>
                <span className="text-sm text-muted-foreground ml-1">days</span>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium">Absences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold tracking-tight">
                <span className={attendanceStats.overallStats.absentCount > 5 ? "text-red-600" : ""}>
                  {attendanceStats.overallStats.absentCount}
                </span>
                <span className="text-sm text-muted-foreground ml-1">days</span>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-6">
        <TabsList className="grid grid-cols-3 w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <CardDescription>Daily attendance records for the past month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getAttendanceTrendData()}
                    margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70}
                      tick={{ fontSize: 12 }} 
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" stackId="a" fill="#22c55e" name="Present" />
                    <Bar dataKey="late" stackId="a" fill="#eab308" name="Late" />
                    <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Areas of Concern */}
          {attendanceStats.subjectStats.filter(s => s.attendancePercentage < 85).length > 0 && (
            <Card className="border-amber-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle>Areas of Concern</CardTitle>
                </div>
                <CardDescription>
                  Subject attendance that may need improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceStats.subjectStats
                    .filter(s => s.attendancePercentage < 85)
                    .map((subject) => {
                      const subjectInfo = getSubjectById(subject.subjectId);
                      return (
                        <div 
                          key={subject.subjectId} 
                          className="p-4 border rounded-lg bg-amber-50 border-amber-200"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <div>
                              <h4 className="font-medium">{subjectInfo?.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Attendance: <span className="font-medium">{subject.attendancePercentage.toFixed(1)}%</span> 
                                ({subject.presentCount + subject.lateCount}/{subject.totalClasses} days)
                              </p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedSubject(subject.subjectId);
                                setSelectedTab('subjects');
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Calendar</CardTitle>
              <CardDescription>Visual representation of daily attendance status</CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyAttendanceCalendar 
                studentId={studentId}
                selectedSubject={selectedSubject} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-4 mt-4">
          {selectedSubject === 'all' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectData.map(subject => (
                <Card key={subject.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>
                      Attendance: {subject.attendancePercentage.toFixed(1)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Present: {subject.present}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="text-sm">Late: {subject.late}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">Absent: {subject.absent}</span>
                        </div>
                      </div>
                      
                      <div className="w-24 h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Present', value: subject.present, fill: '#22c55e' },
                                { name: 'Late', value: subject.late, fill: '#eab308' },
                                { name: 'Absent', value: subject.absent, fill: '#ef4444' },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={15}
                              outerRadius={40}
                              paddingAngle={5}
                              dataKey="value"
                            >
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedSubject(subject.id)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <SubjectAttendanceDetails 
              studentId={studentId} 
              subjectId={selectedSubject} 
              onBack={() => setSelectedSubject('all')}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceTab;

import { PieChart, Pie } from 'recharts';
