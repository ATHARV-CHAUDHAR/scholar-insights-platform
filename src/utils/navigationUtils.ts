
import { UserRole } from '@/types';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar,
  LucideIcon
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

export const getNavigationItems = (role?: UserRole): NavigationItem[] => {
  if (role === 'admin') {
    return [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Teachers', path: '/admin/teachers', icon: Users },
      { name: 'Students', path: '/admin/students', icon: Users },
      { name: 'Classes', path: '/admin/classes', icon: BookOpen },
      { name: 'Calendar', path: '/admin/calendar', icon: Calendar },
    ];
  } else if (role === 'teacher') {
    return [
      { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
      { name: 'Attendance', path: '/teacher/attendance', icon: Users },
      { name: 'Performance', path: '/teacher/performance', icon: BookOpen },
      { name: 'Calendar', path: '/teacher/calendar', icon: Calendar },
    ];
  } else if (role === 'parent') {
    return [
      { name: 'Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
      { name: 'Attendance', path: '/parent/attendance', icon: Users },
      { name: 'Performance', path: '/parent/performance', icon: BookOpen },
      { name: 'Calendar', path: '/parent/calendar', icon: Calendar },
    ];
  }
  return [];
};
