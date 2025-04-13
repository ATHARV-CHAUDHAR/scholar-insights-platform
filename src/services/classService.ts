
import apiClient from './api';
import { ClassRoom, Student } from '@/types';
import { mockClasses, mockStudents } from '@/utils/mockData';

export const classService = {
  /**
   * Get all classes
   */
  getAllClasses: async (): Promise<ClassRoom[]> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<ClassRoom[]>('/classes');
      // return response.data;
      
      // For demo, return mock data
      return mockClasses;
    } catch (error) {
      console.error('Error fetching classes:', error);
      return [];
    }
  },
  
  /**
   * Get a single class by ID
   */
  getClassById: async (id: string): Promise<ClassRoom | null> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<ClassRoom>(`/classes/${id}`);
      // return response.data;
      
      // For demo, return mock data
      const classData = mockClasses.find(c => c.id === id);
      return classData || null;
    } catch (error) {
      console.error(`Error fetching class ${id}:`, error);
      return null;
    }
  },
  
  /**
   * Get students in a specific class
   */
  getClassStudents: async (classId: string): Promise<Student[]> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.get<Student[]>(`/classes/${classId}/students`);
      // return response.data;
      
      // For demo, return mock data
      const classData = mockClasses.find(c => c.id === classId);
      if (!classData) return [];
      
      return mockStudents.filter(s => s.class === classData.name);
    } catch (error) {
      console.error(`Error fetching students for class ${classId}:`, error);
      return [];
    }
  }
};
