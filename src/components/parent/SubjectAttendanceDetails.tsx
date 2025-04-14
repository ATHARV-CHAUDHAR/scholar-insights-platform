
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { 
  getStudentAttendanceStats, 
  getSubjectById, 
  getStudentById, 
  attendance 
} from '@/utils/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubjectAttendanceDetailsProps {
  studentId: string;
  subjectId: string;
  onBack: () => void;
}

const SubjectAttendanceDetails: React.FC<SubjectAttendanceDetailsProps> = ({
  studentId,
  subjectId,
  onBack
}) => {
  const [timeframe, setTimeframe] = useState('all');
  
  const subject = getSubjectById(subjectId);
  const student = getStudentById(studentId);
  
  if (!subject || !student) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>Subject or student information not found</p>
          <Button onClick={onBack} className="mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to All Subjects
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Get attendance stats
  const stats = getStudentAttendanceStats(studentId);
  const subjectStats = stats.subjectStats.find(s => s.subjectId === subjectId);
  
  // Filter attendance records for this student and subject
  const getFilteredAttendance = () => {
    let filteredAttendance = attendance.filter(
      a => a.studentId === studentId && a.subjectId === subjectId
    );
    
    // Apply timeframe filter
    if (timeframe !== 'all') {
      const today = new Date();
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      
      if (timeframe === 'month') {
        filteredAttendance = filteredAttendance.filter(a => {
          const date = parseISO(a.date);
          return date >= monthStart && date <= monthEnd;
        });
      } else if (timeframe === 'semester') {
        // Assuming semester started 4 months ago
        const semesterStart = new Date();
        semesterStart.setMonth(semesterStart.getMonth() - 4);
        filteredAttendance = filteredAttendance.filter(a => {
          return parseISO(a.date) >= semesterStart;
        });
      }
    }
    
    // Sort by date (recent first)
    return filteredAttendance.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };
  
  const filteredAttendance = getFilteredAttendance();
  
  // Calculate statistics
  const presentCount = filteredAttendance.filter(a => a.status === 'present').length;
  const lateCount = filteredAttendance.filter(a => a.status === 'late').length;
  const absentCount = filteredAttendance.filter(a => a.status === 'absent').length;
  const totalClasses = filteredAttendance.length;
  const attendancePercentage = totalClasses > 0 ? 
    ((presentCount + lateCount) / totalClasses) * 100 : 0;
  
  // Generate status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            Present
          </span>
        );
      case 'late':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
            Late
          </span>
        );
      case 'absent':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
            Absent
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to All Subjects
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{subject.name}</CardTitle>
          <CardDescription>
            Attendance records for {student.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Present</p>
              <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              <p className="text-xs text-muted-foreground">classes</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Late</p>
              <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
              <p className="text-xs text-muted-foreground">classes</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Absent</p>
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              <p className="text-xs text-muted-foreground">classes</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
              <p className="text-2xl font-bold">
                {attendancePercentage.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">{totalClasses} total classes</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Attendance Records</h3>
            <Select 
              value={timeframe} 
              onValueChange={setTimeframe}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map(record => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {format(parseISO(record.date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {format(parseISO(record.date), 'EEEE')}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(record.status)}
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredAttendance.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                      No attendance records found for the selected timeframe
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectAttendanceDetails;
