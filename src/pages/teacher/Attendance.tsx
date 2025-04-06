import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { getDivisions, getSubjectsByTeacher, getStudentsByClass, saveAttendance } from '@/services/dataService';
import { useAuth } from '@/contexts/AuthContext';
import { toNumberId, toStringId } from '@/utils/typeConversions';

interface AttendanceRecord {
  student_id: number;
  status: 'Present' | 'Absent' | 'Late';
}

const Attendance = () => {
  const { user } = useAuth();
  const [divisions, setDivisions] = useState<any[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<'entry' | 'history'>('entry');

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const divisionsData = await getDivisions();
        setDivisions(divisionsData);
      } catch (error) {
        console.error('Error fetching divisions:', error);
        toast({
          title: 'Failed to load divisions',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchDivisions();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user?.id) return;
      
      try {
        const subjectsData = await getSubjectsByTeacher(user.id);
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        toast({
          title: 'Failed to load subjects',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchSubjects();
  }, [user]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedDivision) return;

      try {
        const division = divisions.find(d => d.division_id.toString() === selectedDivision);
        if (!division) return;
        
        const studentsData = await getStudentsByClass(division.class_id.toString());
        setStudents(studentsData);
        
        // Initialize attendance records for all students
        const initialAttendance = studentsData.map(student => ({
          student_id: student.student_id,
          status: 'Present' as 'Present' | 'Absent' | 'Late'
        }));
        
        setAttendanceRecords(initialAttendance);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast({
          title: 'Failed to load students',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchStudents();
  }, [selectedDivision, divisions]);

  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value);
    setSelectedSubject('');
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setAttendanceDate(date);
    }
  };

  const handleStatusChange = (studentId: number, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceRecords(prevRecords => {
      return prevRecords.map(record => {
        if (record.student_id === studentId) {
          return { ...record, status };
        }
        return record;
      });
    });
  };

  const handleSubmitAttendance = async () => {
    if (!selectedSubject || !selectedDivision || !attendanceDate) {
      toast({
        title: 'Missing information',
        description: 'Please select division, subject, and date.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedDate = format(attendanceDate, 'yyyy-MM-dd');
      
      const attendanceData = attendanceRecords.map(record => ({
        student_id: record.student_id,
        subject_id: Number(selectedSubject),
        class_date: formattedDate,
        status: record.status
      }));

      await saveAttendance(attendanceData);
      
      toast({
        title: 'Attendance saved',
        description: `Attendance for ${formattedDate} has been saved successfully.`,
      });
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast({
        title: 'Failed to save attendance',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusButtonClass = (status: string, currentStatus: string) => {
    const baseClass = 'px-3 py-1 rounded-md text-xs font-medium transition-colors';
    
    if (status === currentStatus) {
      switch (status) {
        case 'Present':
          return `${baseClass} bg-green-500 text-white`;
        case 'Absent':
          return `${baseClass} bg-red-500 text-white`;
        case 'Late':
          return `${baseClass} bg-yellow-500 text-white`;
      }
    }
    
    return `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  // Filter subjects based on selected division
  const filteredSubjects = selectedDivision
    ? subjects.filter(subject => subject.division_id.toString() === selectedDivision)
    : [];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Attendance Management</h1>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'entry' | 'history')}>
          <TabsList className="mb-4">
            <TabsTrigger value="entry">Mark Attendance</TabsTrigger>
            <TabsTrigger value="history">View History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="entry">
            <Card>
              <CardHeader>
                <CardTitle>Record Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Division</label>
                    <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map((division) => (
                          <SelectItem 
                            key={division.division_id} 
                            value={division.division_id.toString()}
                          >
                            {division.classes.class_name} - {division.section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <Select value={selectedSubject} onValueChange={handleSubjectChange} disabled={!selectedDivision}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredSubjects.map((subject) => (
                          <SelectItem 
                            key={subject.subject_id} 
                            value={subject.subject_id.toString()}
                          >
                            {subject.subjects.subject_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <Calendar
                      mode="single"
                      selected={attendanceDate}
                      onSelect={handleDateChange}
                      className="rounded-md border"
                      disabled={(date) => date > new Date() || date < new Date('2023-01-01')}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Selected: {format(attendanceDate, 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                {selectedDivision && selectedSubject && attendanceDate && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Attendance for {format(attendanceDate, 'MMMM dd, yyyy')}
                    </h2>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Roll No.</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student, index) => {
                            const attendanceRecord = attendanceRecords.find(
                              record => record.student_id === student.student_id
                            );
                            const status = attendanceRecord ? attendanceRecord.status : 'Present';
                            
                            return (
                              <tr key={student.student_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="py-2 px-4 text-sm text-gray-800">{student.enrollment_number}</td>
                                <td className="py-2 px-4 text-sm text-gray-800">{student.users.username}</td>
                                <td className="py-2 px-4">
                                  <div className="flex space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => handleStatusChange(student.student_id, 'Present')}
                                      className={getStatusButtonClass('Present', status)}
                                    >
                                      Present
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleStatusChange(student.student_id, 'Absent')}
                                      className={getStatusButtonClass('Absent', status)}
                                    >
                                      Absent
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleStatusChange(student.student_id, 'Late')}
                                      className={getStatusButtonClass('Late', status)}
                                    >
                                      Late
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button 
                        onClick={handleSubmitAttendance} 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Attendance'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Select filters to view attendance history.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Division</label>
                    <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map((division) => (
                          <SelectItem 
                            key={division.division_id} 
                            value={division.division_id.toString()}
                          >
                            {division.classes.class_name} - {division.section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <Select value={selectedSubject} onValueChange={handleSubjectChange} disabled={!selectedDivision}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredSubjects.map((subject) => (
                          <SelectItem 
                            key={subject.subject_id} 
                            value={subject.subject_id.toString()}
                          >
                            {subject.subjects.subject_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Button className="mt-6">Load History</Button>
                  </div>
                </div>

                {/* Placeholder for attendance history table - would fetch from API in real implementation */}
                <div className="mt-6 p-4 text-center border rounded-md">
                  <p className="text-gray-500">Select filters and click "Load History" to view attendance records.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Attendance;
