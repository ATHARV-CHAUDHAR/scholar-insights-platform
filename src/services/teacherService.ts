
import apiClient from './api';
import { User, ClassRoom } from '@/types';
import { mockTeachers, mockClasses } from '@/utils/mockData';

export const teacherService = {
  /**
   * Get all teachers
   */
  getAllTeachers: async (): Promise<User[]> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<User[]>('/teachers');
      // return response.data;
      
      // For demo, return mock data
      return mockTeachers;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return [];
    }
  },
  
  /**
   * Get classes assigned to a teacher
   */
  getTeacherClasses: async (teacherId: string): Promise<ClassRoom[]> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<ClassRoom[]>(`/teachers/${teacherId}/classes`);
      // return response.data;
      
      // For demo, return mock data
      return mockClasses.filter(c => c.teacherId === teacherId);
    } catch (error) {
      console.error(`Error fetching classes for teacher ${teacherId}:`, error);
      return [];
    }
  }
};
