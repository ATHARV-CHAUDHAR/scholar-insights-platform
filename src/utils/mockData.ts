import { User, Student, Attendance, Subject, Performance, ClassRoom } from '@/types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'admin',
    avatar: '',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    role: 'teacher',
    avatar: '',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robertjohnson@example.com',
    role: 'parent',
    avatar: '',
  },
];

// Mock Students
export const students: Student[] = [
  {
    id: '1',
    name: 'Akash Kumar',
    rollNumber: '001',
    class: '4',
    section: 'A',
    parentId: '3',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    rollNumber: '002',
    class: '4',
    section: 'A',
    parentId: '3',
  },
  {
    id: '3',
    name: 'Rahul Verma',
    rollNumber: '003',
    class: '4',
    section: 'A',
  },
  {
    id: '4',
    name: 'Sneha Patel',
    rollNumber: '004',
    class: '4',
    section: 'A',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    rollNumber: '005',
    class: '4',
    section: 'A',
  },
];

// Mock Subjects
export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    teacherId: '2',
    classId: '1',
  },
  {
    id: '2',
    name: 'Science',
    teacherId: '2',
    classId: '1',
  },
  {
    id: '3',
    name: 'English',
    teacherId: '2',
    classId: '1',
  },
  {
    id: '4',
    name: 'History',
    teacherId: '2',
    classId: '1',
  },
  {
    id: '5',
    name: 'Geography',
    teacherId: '2',
    classId: '1',
  },
];

// Mock Classes
export const classes: ClassRoom[] = [
  {
    id: '1',
    name: '4',
    section: 'A',
    teacherId: '2',
  },
  {
    id: '2',
    name: '4',
    section: 'B',
  },
  {
    id: '3',
    name: '5',
    section: 'A',
  },
];

// Generate attendance for the last 30 days
export const generateAttendance = (): Attendance[] => {
  const attendance: Attendance[] = [];
  const today = new Date();
  
  // For each student
  students.forEach(student => {
    // For the last 30 days
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) {
        continue;
      }
      
      // For each subject
      subjects.forEach(subject => {
        // Random attendance status with weighted probability
        const rand = Math.random();
        let status: 'present' | 'absent' | 'late';
        
        if (rand < 0.8) {
          status = 'present';
        } else if (rand < 0.95) {
          status = 'late';
        } else {
          status = 'absent';
        }
        
        // Special case for Akash (student id 1) with Mathematics (subject id 1)
        // More absences in Mathematics for the case study
        if (student.id === '1' && subject.id === '1' && i > 5 && i < 15 && Math.random() < 0.6) {
          status = 'absent';
        }
        
        attendance.push({
          id: `${student.id}-${date.toISOString().split('T')[0]}-${subject.id}`,
          studentId: student.id,
          date: date.toISOString().split('T')[0],
          status,
          subjectId: subject.id,
        });
      });
    }
  });
  
  return attendance;
};

export const attendance = generateAttendance();

// Generate performance data
export const generatePerformance = (): Performance[] => {
  const performance: Performance[] = [];
  const examTypes = ['Quiz', 'Test', 'Mid-Term', 'Final'];
  
  // For each student
  students.forEach(student => {
    // For each subject
    subjects.forEach(subject => {
      // For each exam type
      examTypes.forEach(examType => {
        let marks: number;
        const totalMarks = 100;
        
        // Default good performance
        marks = Math.floor(Math.random() * 20) + 80; // 80-100
        
        // Special case for Akash's declining performance in Mathematics
        if (student.id === '1' && subject.id === '1') {
          if (examType === 'Quiz') {
            marks = Math.floor(Math.random() * 10) + 85; // 85-95
          } else if (examType === 'Test') {
            marks = Math.floor(Math.random() * 15) + 75; // 75-90
          } else if (examType === 'Mid-Term') {
            marks = Math.floor(Math.random() * 20) + 60; // 60-80
          } else {
            marks = Math.floor(Math.random() * 25) + 55; // 55-80
          }
        }
        
        // Random date in the last 3 months
        const date = new Date();
        date.setMonth(date.getMonth() - Math.floor(Math.random() * 3));
        date.setDate(Math.floor(Math.random() * 28) + 1);
        
        performance.push({
          id: `${student.id}-${subject.id}-${examType}`,
          studentId: student.id,
          subjectId: subject.id,
          examType,
          marks,
          totalMarks,
          date: date.toISOString().split('T')[0],
        });
      });
    });
  });
  
  return performance;
};

export const performance = generatePerformance();

// Get attendance data for a specific student
export const getStudentAttendance = (studentId: string) => {
  return attendance.filter(a => a.studentId === studentId);
};

// Get performance data for a specific student
export const getStudentPerformance = (studentId: string) => {
  return performance.filter(p => p.studentId === studentId);
};

// Calculate attendance percentage for a student by subject
export const calculateAttendancePercentage = (studentId: string, subjectId?: string) => {
  const studentAttendance = attendance.filter(a => 
    a.studentId === studentId && 
    (subjectId ? a.subjectId === subjectId : true)
  );
  
  if (studentAttendance.length === 0) return 0;
  
  const presentCount = studentAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
  return (presentCount / studentAttendance.length) * 100;
};

// Calculate average marks for a student by subject
export const calculateAverageMarks = (studentId: string, subjectId?: string) => {
  const studentPerformance = performance.filter(p => 
    p.studentId === studentId && 
    (subjectId ? p.subjectId === subjectId : true)
  );
  
  if (studentPerformance.length === 0) return 0;
  
  const totalMarks = studentPerformance.reduce((sum, p) => sum + p.marks, 0);
  return totalMarks / studentPerformance.length;
};

// Get student by ID
export const getStudentById = (studentId: string) => {
  return students.find(s => s.id === studentId);
};

// Get subject by ID
export const getSubjectById = (subjectId: string) => {
  return subjects.find(s => s.id === subjectId);
};

// Get user by ID
export const getUserById = (userId: string) => {
  return users.find(u => u.id === userId);
};

// Get class by ID
export const getClassById = (classId: string) => {
  return classes.find(c => c.id === classId);
};

// Get student attendance statistics
export const getStudentAttendanceStats = (studentId: string) => {
  const studentAttendance = attendance.filter(a => a.studentId === studentId);
  
  // Group by subject
  const subjectStats = subjects.map(subject => {
    const subjectAttendance = studentAttendance.filter(a => a.subjectId === subject.id);
    const presentCount = subjectAttendance.filter(a => a.status === 'present').length;
    const lateCount = subjectAttendance.filter(a => a.status === 'late').length;
    const absentCount = subjectAttendance.filter(a => a.status === 'absent').length;
    const totalClasses = subjectAttendance.length;
    
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      presentCount,
      lateCount,
      absentCount,
      totalClasses,
      attendancePercentage: totalClasses > 0 ? 
        ((presentCount + lateCount) / totalClasses) * 100 : 0
    };
  });
  
  return {
    subjectStats,
    overallStats: {
      presentCount: studentAttendance.filter(a => a.status === 'present').length,
      lateCount: studentAttendance.filter(a => a.status === 'late').length,
      absentCount: studentAttendance.filter(a => a.status === 'absent').length,
      totalClasses: studentAttendance.length,
      attendancePercentage: studentAttendance.length > 0 ? 
        ((studentAttendance.filter(a => a.status === 'present').length + 
          studentAttendance.filter(a => a.status === 'late').length) / 
         studentAttendance.length) * 100 : 0
    }
  };
};

// Get student performance statistics
export const getStudentPerformanceStats = (studentId: string) => {
  const studentPerformance = performance.filter(p => p.studentId === studentId);
  
  // Group by subject
  const subjectStats = subjects.map(subject => {
    const subjectPerformance = studentPerformance.filter(p => p.subjectId === subject.id);
    const averageMarks = subjectPerformance.length > 0 ? 
      subjectPerformance.reduce((sum, p) => sum + p.marks, 0) / subjectPerformance.length : 0;
    
    // Calculate trend (increasing or decreasing)
    let trend = 'stable';
    if (subjectPerformance.length >= 2) {
      // Sort by date
      const sorted = [...subjectPerformance].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      const firstScore = sorted[0].marks;
      const lastScore = sorted[sorted.length - 1].marks;
      
      if (lastScore > firstScore) {
        trend = 'increasing';
      } else if (lastScore < firstScore) {
        trend = 'decreasing';
      }
    }
    
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      averageMarks,
      trend,
      performances: subjectPerformance
    };
  });
  
  return {
    subjectStats,
    overallStats: {
      averageMarks: studentPerformance.length > 0 ? 
        studentPerformance.reduce((sum, p) => sum + p.marks, 0) / studentPerformance.length : 0
    }
  };
};
