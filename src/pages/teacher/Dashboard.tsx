
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import StudentTable from '@/components/dashboard/StudentTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, GraduationCap, Calendar, BookOpen, BarChart, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { students, subjects } from '@/utils/mockData';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  
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
  
  // Generate detailed performance data for each subject
  const generateDetailedPerformance = () => {
    return subjects.map(subject => {
      // Generate random scores for different assessment types
      const quizScore = Math.floor(Math.random() * 20) + 70;
      const assignmentScore = Math.floor(Math.random() * 20) + 70;
      const midtermScore = Math.floor(Math.random() * 20) + 70;
      const finalScore = Math.floor(Math.random() * 20) + 70;
      
      // Calculate average
      const average = Math.floor((quizScore + assignmentScore + midtermScore + finalScore) / 4);
      
      // Determine trend (random for mock data)
      const trends = ['up', 'down', 'neutral'];
      const trend = trends[Math.floor(Math.random() * trends.length)];
      
      return {
        id: subject.id,
        name: subject.name,
        quizScore,
        assignmentScore,
        midtermScore,
        finalScore,
        average,
        trend
      };
    });
  };
  
  const detailedPerformance = generateDetailedPerformance();
  
  // Generate student performance data
  const generateStudentPerformance = () => {
    return students.slice(0, 10).map(student => {
      const scores = subjects.map(subject => {
        return {
          subjectId: subject.id,
          subjectName: subject.name,
          score: Math.floor(Math.random() * 30) + 70
        };
      });
      
      const averageScore = Math.floor(
        scores.reduce((sum, subj) => sum + subj.score, 0) / scores.length
      );
      
      return {
        id: student.id,
        name: student.name,
        rollNumber: student.rollNumber,
        scores,
        average: averageScore,
        trend: averageScore > 80 ? 'up' : averageScore < 70 ? 'down' : 'neutral'
      };
    });
  };
  
  const studentPerformance = generateStudentPerformance();
  
  // Find students who need attention (with lower scores)
  const studentsNeedingAttention = studentPerformance
    .filter(student => student.average < 75 || student.trend === 'down')
    .sort((a, b) => a.average - b.average)
    .slice(0, 5);

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
                showTabs={false}
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Performance Summary Card */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>Subject-wise performance analysis</CardDescription>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedSubject("all")} 
                        className={selectedSubject === "all" ? "bg-primary text-primary-foreground" : ""}
                      >
                        All
                      </Button>
                      {subjects.slice(0, 3).map(subject => (
                        <Button 
                          key={subject.id}
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSubject(subject.id)}
                          className={selectedSubject === subject.id ? "bg-primary text-primary-foreground" : ""}
                        >
                          {subject.name.split(' ')[0]}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <PerformanceChart 
                      data={
                        selectedSubject === "all" 
                          ? performanceData 
                          : performanceData.filter(item => 
                              subjects.find(s => s.id === selectedSubject)?.name === item.name
                            )
                      } 
                      title=""
                      description=""
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Students Needing Attention */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                    Needs Attention
                  </CardTitle>
                  <CardDescription>Students requiring additional support</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="px-6">
                    {studentsNeedingAttention.map((student, index) => (
                      <div 
                        key={student.id}
                        className={`py-3 ${index !== studentsNeedingAttention.length - 1 ? 'border-b' : ''}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">Roll: {student.rollNumber}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              <span className={`text-sm font-medium ${
                                student.average < 70 ? 'text-red-600' : 'text-amber-600'
                              }`}>
                                {student.average}%
                              </span>
                              {student.trend === 'down' && <TrendingDown className="h-3 w-3 ml-1 text-red-500" />}
                            </div>
                            <p className="text-xs text-muted-foreground">Avg. Score</p>
                          </div>
                        </div>
                        <Progress 
                          value={student.average} 
                          className="h-1 mt-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/20">
                  <Button variant="ghost" className="w-full text-xs" size="sm" onClick={() => navigate('/teacher/performance')}>
                    View All Students
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Detailed Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Analysis</CardTitle>
                <CardDescription>Detailed breakdown by assessment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead className="text-right">Quizzes</TableHead>
                        <TableHead className="text-right">Assignments</TableHead>
                        <TableHead className="text-right">Mid Term</TableHead>
                        <TableHead className="text-right">Final Term</TableHead>
                        <TableHead className="text-right">Average</TableHead>
                        <TableHead className="text-right">Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detailedPerformance.map(subject => (
                        <TableRow key={subject.id}>
                          <TableCell className="font-medium">{subject.name}</TableCell>
                          <TableCell className="text-right">{subject.quizScore}%</TableCell>
                          <TableCell className="text-right">{subject.assignmentScore}%</TableCell>
                          <TableCell className="text-right">{subject.midtermScore}%</TableCell>
                          <TableCell className="text-right">{subject.finalScore}%</TableCell>
                          <TableCell className="text-right font-medium">{subject.average}%</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center">
                              {subject.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                              {subject.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                              {subject.trend === 'neutral' && <span className="text-gray-500">-</span>}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20">
                <div className="flex w-full justify-between text-sm text-muted-foreground">
                  <p>Showing data from current term</p>
                  <button className="hover:underline">Download Report</button>
                </div>
              </CardFooter>
            </Card>
            
            {/* Student Performance Card */}
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Individual student performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Roll No.</TableHead>
                        {subjects.slice(0, 4).map(subject => (
                          <TableHead key={subject.id} className="text-right">{subject.name.split(' ')[0]}</TableHead>
                        ))}
                        <TableHead className="text-right">Average</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentPerformance.map(student => (
                        <TableRow key={student.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/teacher/student/${student.id}`)}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.rollNumber}</TableCell>
                          {student.scores.slice(0, 4).map(score => (
                            <TableCell key={score.subjectId} className="text-right">
                              <div className={`px-2 py-1 rounded-full inline-block text-xs font-medium ${
                                score.score >= 90 ? 'bg-green-100 text-green-800' :
                                score.score >= 75 ? 'bg-blue-100 text-blue-800' :
                                score.score >= 60 ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {score.score}%
                              </div>
                            </TableCell>
                          ))}
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <span className="font-medium">{student.average}%</span>
                              <div className="ml-2">
                                {student.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                                {student.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 flex justify-between">
                <p className="text-sm text-muted-foreground">Showing 10 of {students.length} students</p>
                <Button size="sm" onClick={() => navigate('/teacher/students')}>View All</Button>
              </CardFooter>
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
