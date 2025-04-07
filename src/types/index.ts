
export type UserRole = 'admin' | 'teacher' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  parentId?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subjectId?: string;
}

export interface Subject {
  id: string;
  name: string;
  teacherId?: string;
  classId: string;
}

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
