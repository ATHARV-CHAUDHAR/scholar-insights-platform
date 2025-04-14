
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, UserCheck, UserX, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { attendance, getSubjectById } from '@/utils/mockData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MonthlyAttendanceCalendarProps {
  studentId: string;
  selectedSubject: string;
}

const MonthlyAttendanceCalendar: React.FC<MonthlyAttendanceCalendarProps> = ({ 
  studentId, 
  selectedSubject 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get days for the current month
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  
  // Get starting day of week (0 = Sunday, 1 = Monday, etc.)
  const startDay = firstDayOfMonth.getDay();
  
  // Calculate empty cells before first day
  const emptyCells = Array.from({ length: startDay }, (_, i) => i);
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Get attendance status for a specific day
  const getAttendanceStatus = (date: Date) => {
    // Format date to match the database format
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Get attendance records for this day and student
    const dayAttendance = attendance.filter(a => 
      a.studentId === studentId && 
      a.date === dateStr &&
      (selectedSubject === 'all' || a.subjectId === selectedSubject)
    );
    
    if (dayAttendance.length === 0) {
      return null; // No classes on this day
    }
    
    const statuses = dayAttendance.map(a => a.status);
    
    // If any class was missed, mark as absent
    if (statuses.includes('absent')) {
      const absentCount = statuses.filter(s => s === 'absent').length;
      return { status: 'absent', count: absentCount, total: dayAttendance.length };
    }
    
    // If any class was attended late, mark as late
    if (statuses.includes('late')) {
      const lateCount = statuses.filter(s => s === 'late').length;
      return { status: 'late', count: lateCount, total: dayAttendance.length };
    }
    
    // All present
    return { status: 'present', count: dayAttendance.length, total: dayAttendance.length };
  };
  
  // Get attendance details for tooltip
  const getAttendanceDetails = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    const dayAttendance = attendance.filter(a => 
      a.studentId === studentId && 
      a.date === dateStr &&
      (selectedSubject === 'all' || a.subjectId === selectedSubject)
    );
    
    if (dayAttendance.length === 0) return [];
    
    return dayAttendance.map(record => {
      const subject = getSubjectById(record.subjectId);
      return {
        subject: subject?.name || 'Unknown',
        status: record.status
      };
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h3 className="text-lg font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div 
            key={day} 
            className="h-10 flex items-center justify-center font-medium text-sm"
          >
            {day}
          </div>
        ))}
        
        {emptyCells.map(i => (
          <div key={`empty-${i}`} className="h-20 border border-transparent"></div>
        ))}
        
        {daysInMonth.map(day => {
          const attendanceStatus = getAttendanceStatus(day);
          const attendanceDetails = getAttendanceDetails(day);
          const isToday = isSameDay(day, new Date());
          
          // Determine background color based on attendance
          let bgColor = 'bg-white';
          let statusIcon = null;
          let statusColor = '';
          
          if (attendanceStatus) {
            if (attendanceStatus.status === 'absent') {
              bgColor = 'bg-red-50';
              statusColor = 'text-red-600';
              statusIcon = <UserX className="h-4 w-4 text-red-600" />;
            } else if (attendanceStatus.status === 'late') {
              bgColor = 'bg-yellow-50';
              statusColor = 'text-yellow-600';
              statusIcon = <Clock className="h-4 w-4 text-yellow-600" />;
            } else {
              bgColor = 'bg-green-50';
              statusColor = 'text-green-600';
              statusIcon = <UserCheck className="h-4 w-4 text-green-600" />;
            }
          }
          
          return (
            <TooltipProvider key={day.toString()}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`h-20 border rounded-md transition-colors ${
                      isToday ? 'border-primary' : 'border-gray-200'
                    } ${bgColor} hover:bg-gray-50 cursor-pointer p-1`}
                  >
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}>
                        {format(day, 'd')}
                      </span>
                      {statusIcon}
                    </div>
                    
                    {attendanceStatus && (
                      <div className="mt-2 text-center">
                        <span className={`text-xs font-medium ${statusColor}`}>
                          {attendanceStatus.count}/{attendanceStatus.total}
                        </span>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="w-64 p-0">
                  <Card className="p-3">
                    <p className="font-medium text-sm mb-2">{format(day, 'EEEE, MMMM d, yyyy')}</p>
                    
                    {attendanceDetails.length > 0 ? (
                      <div className="space-y-2">
                        {attendanceDetails.map((detail, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm">{detail.subject}</span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              detail.status === 'present' ? 'bg-green-100 text-green-800' : 
                              detail.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No classes on this day</p>
                    )}
                  </Card>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      
      <div className="flex justify-center space-x-4 mt-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs">Present</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs">Late</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs">Absent</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendanceCalendar;
