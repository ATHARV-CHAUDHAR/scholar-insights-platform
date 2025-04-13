
import apiClient from './api';
import { Student, Attendance, Performance } from '@/types';
import { mockStudents, mockAttendance, mockPerformance } from '@/utils/mockData';

export const studentService = {
  /**
   * Get all students 
   */
  getAllStudents: async (): Promise<Student[]> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<Student[]>('/students');
      // return response.data;
      
      // For demo, return mock data
      return mockStudents;
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  },
  
  /**
   * Get a single student by ID
   */
  getStudentById: async (id: string): Promise<Student | null> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<Student>(`/students/${id}`);
      // return response.data;
      
      // For demo, return mock data
      const student = mockStudents.find(s => s.id === id);
      return student || null;
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      return null;
    }
  },
  
  /**
   * Get attendance records for a student
   */
  getStudentAttendance: async (studentId: string): Promise<Attendance[]> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<Attendance[]>(`/students/${studentId}/attendance`);
      // return response.data;
      
      // For demo, return mock data
      return mockAttendance.filter(a => a.studentId === studentId);
    } catch (error) {
      console.error(`Error fetching attendance for student ${studentId}:`, error);
      return [];
    }
  },
  
  /**
   * Get performance records for a student
   */
  getStudentPerformance: async (studentId: string): Promise<Performance[]> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<Performance[]>(`/students/${studentId}/performance`);
      // return response.data;
      
      // For demo, return mock data
      return mockPerformance.filter(p => p.studentId === studentId);
    } catch (error) {
      console.error(`Error fetching performance for student ${studentId}:`, error);
      return [];
    }
  }
};
