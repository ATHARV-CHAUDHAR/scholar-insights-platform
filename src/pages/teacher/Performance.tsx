import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { BarChart, TrendingUp, TrendingDown, Search, Filter, Download } from 'lucide-react';
import { students, subjects } from '@/utils/mockData';

const TeacherPerformance = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  
  function generatePerformanceData() {
    return subjects.map(subject => ({
      id: subject.id,
      name: subject.name,
      scores: Array(5).fill(0).map((_, i) => ({
        name: `Test ${i + 1}`,
        value: Math.floor(Math.random() * 30) + 70, // 70-100%
        average: Math.floor(Math.random() * 20) + 60, // 60-80%
      })),
      average: Math.floor(Math.random() * 20) + 75, // 75-95%
      trend: Math.random() > 0.5 ? 'up' : 'down',
    }));
  }
  
  const subjectPerformance = generatePerformanceData();
  
  function generateStudentPerformance() {
    return students.map(student => {
      const scores = subjects.map(subject => {
        return {
          subjectId: subject.id,
          subjectName: subject.name,
          score: Math.floor(Math.random() * 30) + 70 // 70-100%
        };
      });
      
      const averageScore = Math.floor(
        scores.reduce((sum, subj) => sum + subj.score, 0) / scores.length
      );
      
      return {
        id: student.id,
        name: student.name,
        rollNumber: student.rollNumber,
        class: student.class,
        section: student.section,
        scores,
        average: averageScore,
        trend: averageScore > 80 ? 'up' : averageScore < 70 ? 'down' : 'neutral'
      };
    });
  }
  
  const studentPerformance = generateStudentPerformance();
  
  const filteredStudents = studentPerformance
    .filter(student => {
      if (selectedClass !== "all" && student.class !== selectedClass) {
        return false;
      }
      
      if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "average") {
        return b.average - a.average; // Descending
      } else if (sortBy === "rollNumber") {
        return a.rollNumber.localeCompare(b.rollNumber);
      }
      return 0;
    });
  
  const selectedSubjectData = subjectPerformance.find(s => s.id === selectedSubject)?.scores || subjectPerformance[0].scores;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Performance Analytics</h2>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="w-full sm:w-auto border-b">
            <TabsTrigger value="students" className="flex-1 sm:flex-none">Student Analysis</TabsTrigger>
            <TabsTrigger value="subjects" className="flex-1 sm:flex-none">Subject Analysis</TabsTrigger>
            <TabsTrigger value="comparison" className="flex-1 sm:flex-none">Comparisons</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Performance</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">81.5%</span>
                  <span className="ml-2 text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    3.2% 
                  </span>
                </div>
                <CardDescription>Across all subjects and classes</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Highest Class Average</span>
                    <span className="font-medium">9-A (86%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Lowest Class Average</span>
                    <span className="font-medium">8-B (76%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Top Subject</span>
                    <span className="font-medium">Mathematics (89%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Performance Bands</CardTitle>
                <CardDescription>Distribution of student performance</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Excellent (90-100%)</span>
                      <span className="font-medium">16 students</span>
                    </div>
                    <Progress value={16} max={100} className="h-2 bg-green-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Good (80-89%)</span>
                      <span className="font-medium">42 students</span>
                    </div>
                    <Progress value={42} max={100} className="h-2 bg-blue-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Satisfactory (70-79%)</span>
                      <span className="font-medium">28 students</span>
                    </div>
                    <Progress value={28} max={100} className="h-2 bg-amber-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Needs Improvement (<70%)</span>
                      <span className="font-medium">14 students</span>
                    </div>
                    <Progress value={14} max={100} className="h-2 bg-red-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Assessments</CardTitle>
                <CardDescription>Last 5 assessment average scores</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Final Term</span>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">82%</span>
                      <TrendingUp className="h-3 w-3 ml-1 text-green-600" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quiz 2</span>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">78%</span>
                      <TrendingDown className="h-3 w-3 ml-1 text-red-600" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Mid Term</span>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">80%</span>
                      <TrendingUp className="h-3 w-3 ml-1 text-green-600" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Class Test</span>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">75%</span>
                      <TrendingDown className="h-3 w-3 ml-1 text-red-600" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quiz 1</span>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">77%</span>
                      <TrendingUp className="h-3 w-3 ml-1 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <TabsContent value="students" className="space-y-6 mt-0">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="rollNumber">Roll Number</SelectItem>
                      <SelectItem value="average">Average Score</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>
                  Showing {filteredStudents.length} students
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Class</TableHead>
                        {subjects.slice(0, 3).map(subject => (
                          <TableHead key={subject.id} className="text-right">
                            {subject.name.split(' ')[0]}
                          </TableHead>
                        ))}
                        <TableHead className="text-right">Average</TableHead>
                        <TableHead className="text-right">Trend</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map(student => (
                        <TableRow key={student.id} className="group">
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.rollNumber}</TableCell>
                          <TableCell>{student.class}-{student.section}</TableCell>
                          {student.scores.slice(0, 3).map(score => (
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
                          <TableCell className="text-right font-medium">
                            {student.average}%
                          </TableCell>
                          <TableCell className="text-right">
                            {student.trend === 'up' && <TrendingUp className="inline h-4 w-4 text-green-500" />}
                            {student.trend === 'down' && <TrendingDown className="inline h-4 w-4 text-red-500" />}
                            {student.trend === 'neutral' && <span>-</span>}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => navigate(`/teacher/student/${student.id}`)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredStudents.length} of {studentPerformance.length} students
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subjects" className="space-y-6 mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="w-full sm:w-[250px]">
                  <SelectValue placeholder="Select Subject" />
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
            
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedSubject === "all" 
                    ? "All Subjects Performance" 
                    : `${subjects.find(s => s.id === selectedSubject)?.name || 'Subject'} Performance`}
                </CardTitle>
                <CardDescription>
                  Assessment scores over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <PerformanceChart
                    data={selectedSubjectData}
                    title=""
                    description=""
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Comparison</CardTitle>
                  <CardDescription>Average performance across subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectPerformance.map(subject => (
                      <div key={subject.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{subject.name}</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{subject.average}%</span>
                            {subject.trend === 'up' && <TrendingUp className="h-3 w-3 ml-1 text-green-500" />}
                            {subject.trend === 'down' && <TrendingDown className="h-3 w-3 ml-1 text-red-500" />}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              subject.average >= 90 ? 'bg-green-500' :
                              subject.average >= 80 ? 'bg-blue-500' :
                              subject.average >= 70 ? 'bg-amber-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${subject.average}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Class Comparison</CardTitle>
                  <CardDescription>Performance across different classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['8-A', '8-B', '9-A', '9-B', '10-A', '10-B'].map((className) => {
                      const average = Math.floor(Math.random() * 20) + 75;
                      const trend = Math.random() > 0.5 ? 'up' : 'down';
                      
                      return (
                        <div key={className}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Class {className}</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium">{average}%</span>
                              {trend === 'up' && <TrendingUp className="h-3 w-3 ml-1 text-green-500" />}
                              {trend === 'down' && <TrendingDown className="h-3 w-3 ml-1 text-red-500" />}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                average >= 90 ? 'bg-green-500' :
                                average >= 80 ? 'bg-blue-500' :
                                average >= 70 ? 'bg-amber-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${average}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>Compare performance across classes and subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-20 flex items-center justify-center text-muted-foreground">
                  Comparison charts and analysis will be available in the next update
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeacherPerformance;
