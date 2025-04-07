
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, AlertCircle, SaveIcon, XIcon, CheckIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  students, 
  classes, 
  subjects,
  attendance as mockAttendance 
} from '@/utils/mockData';

const TeacherAttendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>(classes[0].id);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0].id);
  const [attendanceData, setAttendanceData] = useState<
    Array<{ studentId: string; status: 'present' | 'absent' | 'late' }>
  >([]);
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);
  const { toast } = useToast();
  
  const filteredStudents = students.filter(student => 
    classes.find(c => c.id === selectedClass)?.name === student.class && 
    classes.find(c => c.id === selectedClass)?.section === student.section
  );
  
  // Prepare for marking attendance
  const handleMarkAttendance = () => {
    // Initialize attendance data for all students in the selected class
    const initialAttendance = filteredStudents.map(student => {
      // Try to find existing attendance for this student, date, and subject
      const existingAttendance = mockAttendance.find(a => 
        a.studentId === student.id && 
        a.date === format(selectedDate || new Date(), 'yyyy-MM-dd') &&
        a.subjectId === selectedSubject
      );
      
      return {
        studentId: student.id,
        status: existingAttendance?.status || 'present',
      };
    });
    
    setAttendanceData(initialAttendance);
    setShowAttendanceDialog(true);
  };
  
  // Update a student's attendance status
  const updateAttendanceStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => 
      prev.map(item => 
        item.studentId === studentId ? { ...item, status } : item
      )
    );
  };
  
  // Save the attendance data
  const saveAttendance = () => {
    // In a real app, this would send the data to the server
    // For this demo, we'll just show a toast
    toast({
      title: "Attendance saved",
      description: `Attendance for ${format(selectedDate || new Date(), 'PPP')} has been saved.`,
    });
    setShowAttendanceDialog(false);
  };
  
  // Get attendance status for a specific student on the selected date and subject
  const getAttendanceStatus = (studentId: string) => {
    const studentAttendance = mockAttendance.find(a => 
      a.studentId === studentId && 
      a.date === format(selectedDate || new Date(), 'yyyy-MM-dd') &&
      a.subjectId === selectedSubject
    );
    
    return studentAttendance?.status || 'N/A';
  };
  
  // Render the status icon based on attendance status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'late':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };
  
  // Get the text display for attendance status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      case 'late':
        return 'Late';
      default:
        return 'Not Marked';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Attendance Management</h2>
        
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
            <TabsTrigger value="report">Attendance Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Choose a date to mark or view attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              {/* Class and Subject Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Class & Subject</CardTitle>
                  <CardDescription>Choose the class and subject for attendance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Class</label>
                    <Select 
                      value={selectedClass} 
                      onValueChange={setSelectedClass}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map(classItem => (
                          <SelectItem key={classItem.id} value={classItem.id}>
                            Class {classItem.name} - {classItem.section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Select 
                      value={selectedSubject} 
                      onValueChange={setSelectedSubject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleMarkAttendance}
                  >
                    Mark Attendance
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Today's Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                  <CardDescription>
                    {selectedDate ? format(selectedDate, 'PPP') : 'Today'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Present:</span>
                    </div>
                    <span className="font-medium">16 (80%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <span>Late:</span>
                    </div>
                    <span className="font-medium">2 (10%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>Absent:</span>
                    </div>
                    <span className="font-medium">2 (10%)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Attendance List */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance List</CardTitle>
                <CardDescription>
                  Attendance status for Class {
                    classes.find(c => c.id === selectedClass)?.name
                  } {
                    classes.find(c => c.id === selectedClass)?.section
                  } - {
                    subjects.find(s => s.id === selectedSubject)?.name
                  } on {
                    selectedDate ? format(selectedDate, 'PPP') : 'Today'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          No students found for this class
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map(student => {
                        const status = getAttendanceStatus(student.id);
                        return (
                          <TableRow key={student.id}>
                            <TableCell>{student.rollNumber}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {renderStatusIcon(status)}
                                <span>{getStatusText(status)}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Report</CardTitle>
                <CardDescription>Detailed attendance statistics for all classes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate comprehensive attendance reports, view trends, and export data.
                </p>
                <div className="mt-6">
                  {/* Report content would go here */}
                  <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      This feature will be available in the next update.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Attendance Marking Dialog */}
      <Dialog open={showAttendanceDialog} onOpenChange={setShowAttendanceDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>
              Class {classes.find(c => c.id === selectedClass)?.name} {classes.find(c => c.id === selectedClass)?.section} - {subjects.find(s => s.id === selectedSubject)?.name} for {selectedDate ? format(selectedDate, 'PPP') : 'Today'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Absent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map(student => {
                  const studentAttendance = attendanceData.find(a => a.studentId === student.id);
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={studentAttendance?.status === 'present'}
                          onCheckedChange={() => updateAttendanceStatus(student.id, 'present')}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={studentAttendance?.status === 'late'}
                          onCheckedChange={() => updateAttendanceStatus(student.id, 'late')}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={studentAttendance?.status === 'absent'}
                          onCheckedChange={() => updateAttendanceStatus(student.id, 'absent')}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAttendanceDialog(false)}>
              <XIcon className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={saveAttendance}>
              <SaveIcon className="mr-2 h-4 w-4" />
              Save Attendance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TeacherAttendance;
