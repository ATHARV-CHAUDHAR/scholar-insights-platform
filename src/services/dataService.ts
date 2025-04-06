import { supabase } from '@/integrations/supabase/client';
import { Student, Attendance, Subject, Class, Division, Result, Teacher, User, PerformanceMetrics } from '@/types';

// User related functions
export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

// Student related functions
export const getStudentById = async (studentId: string) => {
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      users (*),
      classes (*)
    `)
    .eq('student_id', studentId)
    .single();

  if (error) throw error;
  return data;
};

export const getStudentsByClass = async (classId: string) => {
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      users (*)
    `)
    .eq('class_id', classId);

  if (error) throw error;
  return data;
};

// Teacher related functions
export const getTeacherById = async (teacherId: string) => {
  const { data, error } = await supabase
    .from('teachers')
    .select(`
      *,
      users (*)
    `)
    .eq('teacher_id', teacherId)
    .single();

  if (error) throw error;
  return data;
};

// Attendance related functions
export const getAttendanceByStudent = async (studentId: string) => {
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      subjects (*)
    `)
    .eq('student_id', studentId)
    .order('class_date', { ascending: false });

  if (error) throw error;
  return data;
};

export const getAttendanceByClassAndDate = async (classId: string, date: string) => {
  const { data: students, error: studentsError } = await supabase
    .from('students')
    .select('*')
    .eq('class_id', classId);

  if (studentsError) throw studentsError;

  const studentIds = students.map(student => student.student_id);

  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      students (*),
      subjects (*)
    `)
    .in('student_id', studentIds)
    .eq('class_date', date);

  if (error) throw error;
  return data;
};

export const saveAttendance = async (attendanceData: Partial<Attendance>[]) => {
  const { data, error } = await supabase
    .from('attendance')
    .upsert(attendanceData, { onConflict: 'student_id,class_date,subject_id' });

  if (error) throw error;
  return data;
};

// Subject related functions
export const getSubjects = async () => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*');

  if (error) throw error;
  return data;
};

export const getSubjectById = async (subjectId: string) => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('subject_id', subjectId)
    .single();

  if (error) throw error;
  return data;
};

export const getSubjectsByTeacher = async (teacherId: string) => {
  const { data, error } = await supabase
    .from('teacher_subject_assoc')
    .select(`
      *,
      subjects (*),
      divisions (*)
    `)
    .eq('teacher_id', teacherId);

  if (error) throw error;
  return data;
};

// Class related functions
export const getClasses = async () => {
  const { data, error } = await supabase
    .from('classes')
    .select('*');

  if (error) throw error;
  return data;
};

export const getDivisions = async () => {
  const { data, error } = await supabase
    .from('divisions')
    .select(`
      *,
      classes (*)
    `);

  if (error) throw error;
  return data;
};

// Results related functions
export const getResultsByStudent = async (studentId: string) => {
  const { data, error } = await supabase
    .from('results')
    .select(`
      *,
      exams (*),
      subjects (*)
    `)
    .eq('student_id', studentId);

  if (error) throw error;
  return data;
};

export const getResultsByExam = async (examId: string) => {
  const { data, error } = await supabase
    .from('results')
    .select(`
      *,
      students (*),
      subjects (*)
    `)
    .eq('exam_id', examId);

  if (error) throw error;
  return data;
};

// Performance metrics
export const getPerformanceMetrics = async (studentId: string) => {
  const { data, error } = await supabase
    .from('performance_metrics')
    .select(`
      *,
      subjects (*)
    `)
    .eq('student_id', studentId);

  if (error) throw error;
  return data;
};

// Analytics data helpers
export const getAttendanceStatsBySubject = async (studentId: string) => {
  // This is a more complex query that would typically be handled by a backend function
  // For now, we'll fetch all attendance records and process them client-side
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      subjects (*)
    `)
    .eq('student_id', studentId);

  if (error) throw error;
  
  // Process data to get stats by subject
  // In a real implementation, this would be better handled by a database function
  const statsBySubject = {};
  data.forEach(attendance => {
    const subjectId = attendance.subject_id;
    if (!statsBySubject[subjectId]) {
      statsBySubject[subjectId] = {
        subjectId,
        subjectName: attendance.subjects.subject_name,
        total: 0,
        present: 0,
        absent: 0,
        late: 0
      };
    }
    
    statsBySubject[subjectId].total++;
    if (attendance.status === 'Present') statsBySubject[subjectId].present++;
    else if (attendance.status === 'Absent') statsBySubject[subjectId].absent++;
    else if (attendance.status === 'Late') statsBySubject[subjectId].late++;
  });
  
  return Object.values(statsBySubject);
};
