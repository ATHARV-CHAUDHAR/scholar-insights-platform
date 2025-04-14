import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('si-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      localStorage.removeItem('si-token');
      localStorage.removeItem('si-user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('si-token', response.data.token);
      localStorage.setItem('si-user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('si-token');
    localStorage.removeItem('si-user');
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.user;
  },
};

// Parent API functions
export const parentApi = {
  getDashboardData: async () => {
    const response = await api.get('/parent/dashboard');
    return response.data;
  },
  
  getChildren: async () => {
    const response = await api.get('/parent/children');
    return response.data.children;
  },
  
  getChildDetails: async (id: string) => {
    const response = await api.get(`/parent/children/${id}`);
    return response.data.student;
  },
  
  getAttendance: async (studentId: string) => {
    const response = await api.get(`/parent/attendance/${studentId}`);
    return response.data;
  },
  
  getPerformance: async (studentId: string) => {
    const response = await api.get(`/parent/performance/${studentId}`);
    return response.data;
  },
  
  getCalendar: async () => {
    const response = await api.get('/parent/calendar');
    return response.data.events;
  },
};

// Teacher API functions
export const teacherApi = {
  getDashboardData: async () => {
    const response = await api.get('/teacher/dashboard');
    return response.data;
  },
  
  getStudents: async () => {
    const response = await api.get('/teacher/students');
    return response.data.students;
  },
  
  getStudentDetails: async (id: string) => {
    const response = await api.get(`/teacher/student/${id}`);
    return response.data.student;
  },
  
  getAttendance: async (date?: string, classId?: string) => {
    let url = '/teacher/attendance';
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (classId) params.append('classId', classId);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await api.get(url);
    return response.data;
  },
  
  markAttendance: async (data: any) => {
    const response = await api.post('/teacher/attendance', data);
    return response.data;
  },
  
  getPerformance: async (classId?: string, examId?: string) => {
    let url = '/teacher/performance';
    const params = new URLSearchParams();
    if (classId) params.append('classId', classId);
    if (examId) params.append('examId', examId);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await api.get(url);
    return response.data;
  },
  
  recordPerformance: async (data: any) => {
    const response = await api.post('/teacher/performance', data);
    return response.data;
  },
  
  getCalendar: async () => {
    const response = await api.get('/teacher/calendar');
    return response.data.events;
  },
};

// Admin API functions
export const adminApi = {
  getDashboardData: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  
  getTeachers: async () => {
    const response = await api.get('/admin/teachers');
    return response.data.teachers;
  },
  
  createTeacher: async (teacherData: any) => {
    const response = await api.post('/admin/teachers', teacherData);
    return response.data;
  },
  
  getTeacherDetails: async (id: string) => {
    const response = await api.get(`/admin/teacher/${id}`);
    return response.data.teacher;
  },
  
  updateTeacher: async (id: string, teacherData: any) => {
    const response = await api.put(`/admin/teacher/${id}`, teacherData);
    return response.data;
  },
  
  deleteTeacher: async (id: string) => {
    const response = await api.delete(`/admin/teacher/${id}`);
    return response.data;
  },
  
  getStudents: async () => {
    const response = await api.get('/admin/students');
    return response.data.students;
  },
  
  createStudent: async (studentData: any) => {
    const response = await api.post('/admin/students', studentData);
    return response.data;
  },
  
  getStudentDetails: async (id: string) => {
    const response = await api.get(`/admin/student/${id}`);
    return response.data.student;
  },
  
  updateStudent: async (id: string, studentData: any) => {
    const response = await api.put(`/admin/student/${id}`, studentData);
    return response.data;
  },
  
  deleteStudent: async (id: string) => {
    const response = await api.delete(`/admin/student/${id}`);
    return response.data;
  },
  
  getClasses: async () => {
    const response = await api.get('/admin/classes');
    return response.data.classes;
  },
  
  createClass: async (classData: any) => {
    const response = await api.post('/admin/classes', classData);
    return response.data;
  },
  
  getClassDetails: async (id: string) => {
    const response = await api.get(`/admin/class/${id}`);
    return response.data.class;
  },
  
  updateClass: async (id: string, classData: any) => {
    const response = await api.put(`/admin/class/${id}`, classData);
    return response.data;
  },
  
  deleteClass: async (id: string) => {
    const response = await api.delete(`/admin/class/${id}`);
    return response.data;
  },
  
  getSystemStatus: async () => {
    const response = await api.get('/admin/system-status');
    return response.data;
  },
  
  getCalendar: async () => {
    const response = await api.get('/admin/calendar');
    return response.data.events;
  },
};

export default api;
