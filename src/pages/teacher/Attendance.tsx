
import React, { useState, useEffect } from 'react';
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
import { CheckCircle2, XCircle, AlertCircle, SaveIcon, XIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getClasses, 
  getDivisions,
  getSubjectsByTeacher,
  getStudentsByClass,
  getAttendanceByClassAndDate,
  saveAttendance
} from '@/services/dataService';
import { useAuth } from '@/contexts/AuthContext';
import { Attendance, Student, Subject, Division, Teacher } from '@/types';

const TeacherAttendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [attendanceData, setAttendanceData] = useState<
    Array<{ student_id: string; status: 'Present' | 'Absent' | 'Late' }>
  >([]);
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch divisions
  const { data: divisions = [] } = useQuery({
    queryKey: ['divisions'],
    queryFn: getDivisions,
    enabled: !!user
  });
  
  // Fetch teacher subjects
  const { data: teacherSubjects = [] } = useQuery({
    queryKey: ['teacherSubjects', user?.id],
    queryFn: () => getSubjectsByTeacher(user?.id || ''),
    enabled: !!user && user.role === 'Teacher'
  });
  
  // Filter divisions based on teacher's subjects
  const teacherDivisions = divisions.filter(division => 
    teacherSubjects.some(subject => subject.division_id === division.id)
  );
  
  // Set default division and subject when data is loaded
  useEffect(() => {
    if (teacherDivisions.length > 0 && !selectedDivisionId) {
      setSelectedDivisionId(teacherDivisions[0].id);
    }
    
    if (teacherSubjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(teacherSubjects[0].subject_id);
    }
  }, [teacherDivisions, teacherSubjects]);
  
  // Fetch students for the selected division
  const { data: students = [] } = useQuery({
    queryKey: ['students', selectedDivisionId],
    queryFn: () => {
      const division = divisions.find(d => d.id === selectedDivisionId);
      return getStudentsByClass(division?.class_id || '');
    },
    enabled: !!selectedDivisionId
  });
  
  // Fetch attendance data for the selected date, division and subject
  const { data: existingAttendance = [] } = useQuery({
    queryKey: ['attendance', selectedDivisionId, selectedDate, selectedSubjectId],
    queryFn: () => {
      const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
      const division = divisions.find(d => d.id === selectedDivisionId);
      return getAttendanceByClassAndDate(division?.class_id || '', formattedDate);
    },
    enabled: !!selectedDivisionId && !!selectedDate && !!selectedSubjectId
  });
  
  // Save attendance mutation
  const saveMutation = useMutation({
    mutationFn: saveAttendance,
    onSuccess: () => {
      toast({
        title: "Attendance saved",
        description: `Attendance for ${format(selectedDate || new Date(), 'PPP')} has been saved.`,
      });
      setShowAttendanceDialog(false);
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
    onError: (error) => {
      toast({
        title: "Error saving attendance",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  // Prepare for marking attendance
  const handleMarkAttendance = () => {
    if (!selectedDivisionId || !selectedSubjectId) {
      toast({
        title: "Selection required",
        description: "Please select both a class and subject.",
        variant: "destructive"
      });
      return;
    }
    
    // Initialize attendance data for all students in the selected class
    const initialAttendance = students.map(student => {
      // Try to find existing attendance for this student, date, and subject
      const existingRecord = existingAttendance.find(a => 
        a.student_id === student.id && 
        a.subject_id === selectedSubjectId
      );
      
      return {
        student_id: student.id,
        status: existingRecord?.status || 'Present',
      };
    });
    
    setAttendanceData(initialAttendance);
    setShowAttendanceDialog(true);
  };
  
  // Update a student's attendance status
  const updateAttendanceStatus = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceData(prev => 
      prev.map(item => 
        item.student_id === studentId ? { ...item, status } : item
      )
    );
  };
  
  // Save the attendance data
  const saveAttendanceData = () => {
    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
    
    const attendanceRecords = attendanceData.map(item => ({
      student_id: item.student_id,
      class_date: formattedDate,
      status: item.status,
      subject_id: selectedSubjectId
    }));
    
    saveMutation.mutate(attendanceRecords);
  };
  
  // Get attendance status for a specific student on the selected date and subject
  const getAttendanceStatus = (studentId: string) => {
    const studentAttendance = existingAttendance.find(a => 
      a.student_id === studentId && 
      a.subject_id === selectedSubjectId
    );
    
    return studentAttendance?.status || 'N/A';
  };
  
  // Render the status icon based on attendance status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'Absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Late':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };
  
  // Get the text display for attendance status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'Present':
        return 'Present';
      case 'Absent':
        return 'Absent';
      case 'Late':
        return 'Late';
      default:
        return 'Not Marked';
    }
  };
  
  // Calculate attendance statistics
  const calculateAttendanceStats = () => {
    if (!existingAttendance.length) return { present: 0, absent: 0, late: 0, total: 0 };
    
    const subjectAttendance = existingAttendance.filter(a => a.subject_id === selectedSubjectId);
    const presentCount = subjectAttendance.filter(a => a.status === 'Present').length;
    const absentCount = subjectAttendance.filter(a => a.status === 'Absent').length;
    const lateCount = subjectAttendance.filter(a => a.status === 'Late').length;
    const totalCount = subjectAttendance.length;
    
    return {
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      total: totalCount,
      presentPercentage: totalCount ? (presentCount / totalCount) * 100 : 0,
      absentPercentage: totalCount ? (absentCount / totalCount) * 100 : 0,
      latePercentage: totalCount ? (lateCount / totalCount) * 100 : 0
    };
  };
  
  const stats = calculateAttendanceStats();

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
                      value={selectedDivisionId} 
                      onValueChange={setSelectedDivisionId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherDivisions.map(division => {
                          const className = division.Classes?.class_name || '';
                          return (
                            <SelectItem key={division.id} value={division.id}>
                              {className} - {division.section}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Select 
                      value={selectedSubjectId} 
                      onValueChange={setSelectedSubjectId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherSubjects
                          .filter(item => item.division_id === selectedDivisionId)
                          .map(item => (
                            <SelectItem 
                              key={item.subject_id} 
                              value={item.subject_id}
                            >
                              {item.Subjects?.subject_name || 'Unknown Subject'}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleMarkAttendance}
                    disabled={!selectedDivisionId || !selectedSubjectId}
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
                    <span className="font-medium">{stats.present} ({stats.presentPercentage.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <span>Late:</span>
                    </div>
                    <span className="font-medium">{stats.late} ({stats.latePercentage.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>Absent:</span>
                    </div>
                    <span className="font-medium">{stats.absent} ({stats.absentPercentage.toFixed(1)}%)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Attendance List */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance List</CardTitle>
                <CardDescription>
                  {teacherDivisions.find(d => d.id === selectedDivisionId)?.Classes?.class_name} {teacherDivisions.find(d => d.id === selectedDivisionId)?.section} - {
                    teacherSubjects.find(s => s.subject_id === selectedSubjectId)?.Subjects?.subject_name
                  } on {
                    selectedDate ? format(selectedDate, 'PPP') : 'Today'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Enrollment No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          No students found for this class
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map(student => {
                        const status = getAttendanceStatus(student.id);
                        return (
                          <TableRow key={student.id}>
                            <TableCell>{student.enrollment_number}</TableCell>
                            <TableCell>{student.user?.username || 'Unknown'}</TableCell>
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
              {teacherDivisions.find(d => d.id === selectedDivisionId)?.Classes?.class_name} {teacherDivisions.find(d => d.id === selectedDivisionId)?.section} - {
                teacherSubjects.find(s => s.subject_id === selectedSubjectId)?.Subjects?.subject_name
              } for {selectedDate ? format(selectedDate, 'PPP') : 'Today'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Enrollment No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Absent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(student => {
                  const studentAttendance = attendanceData.find(a => a.student_id === student.id);
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{student.enrollment_number}</TableCell>
                      <TableCell>{student.user?.username || 'Unknown'}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={studentAttendance?.status === 'Present'}
                          onCheckedChange={() => updateAttendanceStatus(student.id, 'Present')}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={studentAttendance?.status === 'Late'}
                          onCheckedChange={() => updateAttendanceStatus(student.id, 'Late')}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={studentAttendance?.status === 'Absent'}
                          onCheckedChange={() => updateAttendanceStatus(student.id, 'Absent')}
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
            <Button onClick={saveAttendanceData}>
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
