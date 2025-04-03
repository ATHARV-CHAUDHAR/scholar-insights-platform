
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Download,
  Mail,
  Phone,
  Printer,
  UserCircle,
  XCircle,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import { 
  getStudentById, 
  getStudentAttendanceStats, 
  getStudentPerformanceStats,
  performance,
  subjects,
  getSubjectById,
} from '@/utils/mockData';

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get student data
  const student = getStudentById(id || '');
  
  if (!student) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] space-y-4">
          <AlertTriangle className="h-16 w-16 text-amber-500" />
          <h1 className="text-2xl font-bold">Student Not Found</h1>
          <p className="text-muted-foreground">The student you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Get attendance statistics
  const attendanceStats = getStudentAttendanceStats(student.id);
  
  // Get performance statistics
  const performanceStats = getStudentPerformanceStats(student.id);
  
  // Prepare performance data for chart
  const performanceChartData = performanceStats.subjectStats.map(stat => ({
    name: stat.subjectName,
    value: stat.averageMarks,
    average: 75, // Mock class average
  }));
  
  // Prepare data for performance trend chart
  const trendData = subjects.map(subject => {
    const subjectPerformances = performance.filter(
      p => p.studentId === student.id && p.subjectId === subject.id
    );
    
    if (subjectPerformances.length === 0) {
      return {
        subjectName: subject.name,
        data: []
      };
    }
    
    // Sort by date
    subjectPerformances.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      subjectName: subject.name,
      data: subjectPerformances.map(p => ({
        name: p.examType,
        value: (p.marks / p.totalMarks) * 100,
      }))
    };
  }).filter(item => item.data.length > 0);
  
  // Print student report
  const printReport = () => {
    toast({
      title: 'Printing report',
      description: `Printing comprehensive report for ${student.name}.`,
    });
  };
  
  // Download student data
  const downloadData = () => {
    toast({
      title: 'Downloading data',
      description: `${student.name}'s data is being downloaded.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with navigation and actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">Student Profile</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={printReport}>
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
            <Button variant="outline" onClick={downloadData}>
              <Download className="mr-2 h-4 w-4" />
              Download Data
            </Button>
          </div>
        </div>
        
        {/* Student overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Student Details</CardTitle>
              <CardDescription>Personal and academic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=4A6FFF&color=fff&size=128`} />
                  <AvatarFallback>{student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{student.name}</h3>
                  <p className="text-muted-foreground">Roll No. {student.rollNumber}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Class:</span>
                  <span className="text-sm font-medium">
                    {student.class} {student.section}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm font-medium">
                    {`student${student.rollNumber}@school.com`}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="text-sm font-medium">
                    {`+91 98765 ${40000 + parseInt(student.rollNumber)}`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Attendance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Current academic year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall attendance */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Attendance</span>
                  <span className="text-sm font-bold">{attendanceStats.overallStats.attendancePercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      attendanceStats.overallStats.attendancePercentage >= 90
                        ? 'bg-green-500'
                        : attendanceStats.overallStats.attendancePercentage >= 75
                        ? 'bg-yellow-400'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${attendanceStats.overallStats.attendancePercentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Present: {attendanceStats.overallStats.presentCount}</span>
                  <span>Late: {attendanceStats.overallStats.lateCount}</span>
                  <span>Absent: {attendanceStats.overallStats.absentCount}</span>
                </div>
              </div>
              
              {/* Subject-wise attendance */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">Subject-wise Attendance</h4>
                
                {attendanceStats.subjectStats.map(stat => (
                  <div key={stat.subjectId} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">{stat.subjectName}</span>
                      <span className="text-xs font-medium">{stat.attendancePercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          stat.attendancePercentage >= 90
                            ? 'bg-green-500'
                            : stat.attendancePercentage >= 75
                            ? 'bg-yellow-400'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${stat.attendancePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Academic performance summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall performance */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Performance</span>
                  <span className="text-sm font-bold">{performanceStats.overallStats.averageMarks.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      performanceStats.overallStats.averageMarks >= 90
                        ? 'bg-green-500'
                        : performanceStats.overallStats.averageMarks >= 75
                        ? 'bg-yellow-400'
                        : performanceStats.overallStats.averageMarks >= 60
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${performanceStats.overallStats.averageMarks}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Subject-wise performance */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">Subject-wise Performance</h4>
                
                {performanceStats.subjectStats.map(stat => (
                  <div key={stat.subjectId} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{stat.subjectName}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {stat.trend === 'increasing' ? (
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                              ) : stat.trend === 'decreasing' ? (
                                <XCircle className="h-3 w-3 text-red-500" />
                              ) : null}
                            </TooltipTrigger>
                            <TooltipContent>
                              {stat.trend === 'increasing'
                                ? 'Improving performance'
                                : stat.trend === 'decreasing'
                                ? 'Declining performance'
                                : 'Stable performance'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="text-xs font-medium">{stat.averageMarks.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          stat.averageMarks >= 90
                            ? 'bg-green-500'
                            : stat.averageMarks >= 75
                            ? 'bg-yellow-400'
                            : stat.averageMarks >= 60
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${stat.averageMarks}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Detailed Tabs */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">
              <BookOpen className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <Calendar className="h-4 w-4 mr-2" />
              Attendance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4">
            {/* Performance Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Comparison across subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    data={performanceChartData}
                    title=""
                    description=""
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {trendData.length > 0 && (
                    <Tabs defaultValue={trendData[0].subjectName} className="w-full">
                      <TabsList className="w-full justify-start overflow-auto">
                        {trendData.map(item => (
                          <TabsTrigger key={item.subjectName} value={item.subjectName} className="text-xs">
                            {item.subjectName}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {trendData.map(item => (
                        <TabsContent key={item.subjectName} value={item.subjectName}>
                          <PerformanceChart
                            data={item.data}
                            title=""
                            description=""
                            dataKey="value"
                            averageKey={undefined}
                          />
                        </TabsContent>
                      ))}
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Detailed performance table */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Details</CardTitle>
                <CardDescription>Detailed examination results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performance
                      .filter(p => p.studentId === student.id)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map(perf => {
                        const subject = getSubjectById(perf.subjectId);
                        return (
                          <TableRow key={perf.id}>
                            <TableCell>{subject?.name || 'Unknown'}</TableCell>
                            <TableCell>{perf.examType}</TableCell>
                            <TableCell className="text-right">
                              {perf.marks}/{perf.totalMarks}
                            </TableCell>
                            <TableCell className="text-right">
                              {((perf.marks / perf.totalMarks) * 100).toFixed(1)}%
                            </TableCell>
                            <TableCell>{new Date(perf.date).toLocaleDateString()}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4">
            {/* Attendance by subject chart */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance by Subject</CardTitle>
                <CardDescription>Subject-wise attendance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attendanceStats.subjectStats.map(stat => (
                    <Card key={stat.subjectId} className="border-0 shadow-none">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">{stat.subjectName}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex justify-center">
                          <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-100 border-8" style={{
                            borderColor: stat.attendancePercentage >= 90
                              ? '#4ADE80'
                              : stat.attendancePercentage >= 75
                              ? '#FBBF24'
                              : '#F87171',
                            borderWidth: '8px'
                          }}>
                            <span className="text-3xl font-bold">{stat.attendancePercentage.toFixed(0)}%</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                          <div className="space-y-1">
                            <div className="text-sm font-semibold text-green-600">{stat.presentCount}</div>
                            <div className="text-xs text-muted-foreground">Present</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-semibold text-amber-500">{stat.lateCount}</div>
                            <div className="text-xs text-muted-foreground">Late</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-semibold text-red-500">{stat.absentCount}</div>
                            <div className="text-xs text-muted-foreground">Absent</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDetail;
