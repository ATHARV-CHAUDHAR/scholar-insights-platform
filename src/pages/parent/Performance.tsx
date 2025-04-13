
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

const studentPerformanceData = [
  {
    subject: "Mathematics",
    grades: [
      { name: "Quiz 1", value: 85, average: 78 },
      { name: "Mid-Term", value: 72, average: 75 },
      { name: "Quiz 2", value: 78, average: 76 },
      { name: "Project", value: 90, average: 82 },
      { name: "Final", value: 88, average: 80 },
    ],
    attendance: 95,
    improvement: true,
    teacher: "Mrs. Johnson",
    strengths: ["Problem solving", "Logical reasoning"],
    weaknesses: ["Word problems"],
  },
  {
    subject: "Science",
    grades: [
      { name: "Quiz 1", value: 75, average: 72 },
      { name: "Mid-Term", value: 80, average: 76 },
      { name: "Quiz 2", value: 85, average: 74 },
      { name: "Project", value: 95, average: 85 },
      { name: "Final", value: 90, average: 82 },
    ],
    attendance: 98,
    improvement: true,
    teacher: "Mr. Clark",
    strengths: ["Experiments", "Critical thinking"],
    weaknesses: ["Theoretical concepts"],
  },
  {
    subject: "English",
    grades: [
      { name: "Quiz 1", value: 68, average: 70 },
      { name: "Mid-Term", value: 72, average: 74 },
      { name: "Quiz 2", value: 75, average: 72 },
      { name: "Project", value: 82, average: 80 },
      { name: "Final", value: 80, average: 78 },
    ],
    attendance: 90,
    improvement: true,
    teacher: "Ms. Davis",
    strengths: ["Creative writing", "Vocabulary"],
    weaknesses: ["Grammar", "Comprehension"],
  },
  {
    subject: "History",
    grades: [
      { name: "Quiz 1", value: 70, average: 68 },
      { name: "Mid-Term", value: 65, average: 70 },
      { name: "Quiz 2", value: 60, average: 72 },
      { name: "Project", value: 75, average: 76 },
      { name: "Final", value: 68, average: 74 },
    ],
    attendance: 85,
    improvement: false,
    teacher: "Mr. Peterson",
    strengths: ["Research skills"],
    weaknesses: ["Date memorization", "Connecting events"],
  },
];

const ParentPerformance = () => {
  const [selectedChild, setSelectedChild] = useState("John Smith");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const subject = studentPerformanceData.find(
    (data) => data.subject === selectedSubject
  );

  const overallAverage = subject
    ? Math.round(
        subject.grades.reduce((sum, grade) => sum + grade.value, 0) /
          subject.grades.length
      )
    : 0;

  const getGradeColor = (value: number) => {
    if (value >= 90) return "bg-green-500";
    if (value >= 80) return "bg-blue-500";
    if (value >= 70) return "bg-yellow-500";
    if (value >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  const getGradeStatus = (value: number) => {
    if (value >= 90) return "Excellent";
    if (value >= 80) return "Good";
    if (value >= 70) return "Satisfactory";
    if (value >= 60) return "Needs Improvement";
    return "Unsatisfactory";
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Student Performance</h1>
          <p className="text-gray-500">Track your child's academic progress</p>
        </div>
        <div className="w-full sm:w-auto">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select Child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="John Smith">John Smith</SelectItem>
              <SelectItem value="Emma Smith">Emma Smith</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Overall Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{overallAverage}%</span>
              {subject?.improvement ? (
                <TrendingUp className="text-green-500 mb-1" />
              ) : (
                <TrendingDown className="text-red-500 mb-1" />
              )}
            </div>
            <Progress
              value={overallAverage}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{subject?.attendance}%</span>
              {subject && subject.attendance > 90 ? (
                <Check className="text-green-500 mb-1" />
              ) : (
                <AlertTriangle className="text-yellow-500 mb-1" />
              )}
            </div>
            <Progress
              value={subject?.attendance || 0}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-xl font-medium">
                {getGradeStatus(overallAverage)}
              </span>
              <Award className={subject?.improvement ? "text-green-500" : "text-gray-400"} />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {subject?.improvement
                ? "Showing improvement"
                : "Needs attention"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Teacher
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-xl font-medium">{subject?.teacher}</span>
            </div>
            <div className="flex items-center mt-1">
              <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                Schedule a meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>Performance over time</CardDescription>
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentPerformanceData.map((data) => (
                      <SelectItem key={data.subject} value={data.subject}>
                        {data.subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {subject ? (
                <div className="h-[400px]">
                  <PerformanceChart 
                    data={subject.grades}
                    title={`${selectedSubject} Performance`}
                    description={`Performance metrics for ${selectedSubject}`}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <p className="text-gray-500">No data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Recent Grades</h3>
                <div className="space-y-2">
                  {subject?.grades.slice(-3).map((grade, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border-b"
                    >
                      <span>{grade.name}</span>
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-10 h-10 rounded-full ${getGradeColor(
                            grade.value
                          )} text-white flex items-center justify-center font-bold`}
                        >
                          {grade.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-gray-700">Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {subject?.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-gray-700">Areas to Improve</h3>
                <div className="flex flex-wrap gap-2">
                  {subject?.weaknesses.map((weakness, index) => (
                    <Badge key={index} variant="outline" className="border-amber-200 text-amber-700">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-gray-700">Recommendations</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Practice daily for 30 minutes</li>
                  <li>Complete all homework assignments</li>
                  <li>Attend additional help sessions</li>
                  {subject?.subject === "Mathematics" && (
                    <li>Focus on word problems using real-world examples</li>
                  )}
                  {subject?.subject === "English" && (
                    <li>Read more advanced books to improve comprehension</li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2 border rounded-md hover:bg-gray-50 transition-colors">
                  <BookOpen className="text-scholar-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Practice Problems</h4>
                    <p className="text-sm text-gray-500">
                      Additional problems for practice in {selectedSubject}
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                      Download PDF
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 border rounded-md hover:bg-gray-50 transition-colors">
                  <BookOpen className="text-scholar-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Video Tutorials</h4>
                    <p className="text-sm text-gray-500">
                      Supplementary video lessons
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                      View Resources
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 border rounded-md hover:bg-gray-50 transition-colors">
                  <BookOpen className="text-scholar-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Study Guide</h4>
                    <p className="text-sm text-gray-500">
                      Comprehensive study guide for {selectedSubject}
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ParentPerformance;
