
export type UserRole = 'Student' | 'Teacher' | 'Admin' | 'Parent';

export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  role: UserRole;
  avatar?: string;
  created_at: string;
  updated_at: string;
  name?: string; // Adding name property for backward compatibility
}

export interface Student {
  id: string;
  user_id: string;
  enrollment_number: string;
  class_id: string;
  dob: string;
  class_name?: string;
  section?: string;
  name?: string; // For backward compatibility
  rollNumber?: string; // For backward compatibility
  class?: string; // For backward compatibility
  parentId?: string; // For backward compatibility
}

export interface Teacher {
  id: string;
  user_id: string;
  department_id: string;
  specialization?: string;
  dob: string;
}

export interface Parent {
  id: string;
  user_id: string;
  student_id: string;
  relationship: 'Mother' | 'Father' | 'Guardian';
}

export interface Class {
  id: string;
  class_name: string;
  year: number;
}

export interface Division {
  id: string;
  class_id: string;
  section: string;
}

export interface Subject {
  id: string;
  subject_name: string;
  subject_code: string;
  name?: string; // For backward compatibility
  teacherId?: string; // For backward compatibility
  classId?: string; // For backward compatibility
}

export interface Attendance {
  id: string;
  student_id: string;
  class_date: string;
  status: 'Present' | 'Absent' | 'Late';
  subject_id: string;
  studentId?: string; // For backward compatibility
  subjectId?: string; // For backward compatibility
}

export interface Exam {
  id: string;
  exam_name: string;
  exam_date: string;
  class_id: string;
}

export interface Result {
  id: string;
  student_id: string;
  exam_id: string;
  subject_id: string;
  marks_obtained: number;
  grade?: string;
}

export interface TeacherSubject {
  id: string;
  teacher_id: string;
  subject_id: string;
  division_id: string;
}

export interface TimeTableEntry {
  id: string;
  division_id: string;
  subject_id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period_number: number;
  start_time: string;
  end_time: string;
}

export interface PerformanceMetrics {
  id: string;
  student_id: string;
  subject_id: string;
  avg_attendance_rate?: number;
  avg_exam_score?: number;
}

// Chart data type for visualization components
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// Additional types for mockData.ts
export interface Performance {
  id: string;
  studentId: string;
  subjectId: string;
  examType: string;
  marks: number;
  totalMarks: number;
  date: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  section: string;
  teacherId?: string;
}
