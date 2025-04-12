
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Eye, Mail, MoreHorizontal, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Enrollment {
  id: string;
  studentName: string;
  class: string;
  rollNumber: string;
  enrollmentDate: string;
  status: 'approved' | 'pending' | 'rejected';
}

const RecentEnrollments: React.FC = () => {
  const { toast } = useToast();
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    {
      id: 'e1',
      studentName: 'Alice Johnson',
      class: 'Class 9A',
      rollNumber: 'S20230501',
      enrollmentDate: 'Apr 15, 2023',
      status: 'pending'
    },
    {
      id: 'e2',
      studentName: 'Robert Smith',
      class: 'Class 8B',
      rollNumber: 'S20230502',
      enrollmentDate: 'Apr 18, 2023',
      status: 'approved'
    },
    {
      id: 'e3',
      studentName: 'Emily Davis',
      class: 'Class 10C',
      rollNumber: 'S20230503',
      enrollmentDate: 'Apr 22, 2023',
      status: 'pending'
    }
  ]);

  const handleViewDetails = (enrollment: Enrollment) => {
    toast({
      title: "Student Details",
      description: `Viewing details for ${enrollment.studentName}`,
    });
  };

  const handleContactStudent = (enrollment: Enrollment) => {
    toast({
      title: "Contact Student",
      description: `Opening messaging interface for ${enrollment.studentName}`,
    });
  };

  const handleCallStudent = (enrollment: Enrollment) => {
    toast({
      title: "Call Student",
      description: `Initiating call to ${enrollment.studentName}'s guardian`,
    });
  };

  const handleApproveEnrollment = (id: string) => {
    setEnrollments(enrollments.map(enrollment => 
      enrollment.id === id ? { ...enrollment, status: 'approved' } : enrollment
    ));
    
    toast({
      title: "Enrollment Approved",
      description: "The student enrollment has been approved.",
    });
  };

  const handleRejectEnrollment = (id: string) => {
    setEnrollments(enrollments.map(enrollment => 
      enrollment.id === id ? { ...enrollment, status: 'rejected' } : enrollment
    ));
    
    toast({
      title: "Enrollment Rejected",
      description: "The student enrollment has been rejected.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Enrollments",
      description: "Opening enrollment filters...",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <CardTitle>Recent Enrollments</CardTitle>
          <CardDescription>New students in the past 30 days</CardDescription>
        </div>
        <div className="mt-2 sm:mt-0">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleFilter}>
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead className="hidden sm:table-cell">Class</TableHead>
                <TableHead className="hidden md:table-cell">Roll Number</TableHead>
                <TableHead className="hidden lg:table-cell">Enrollment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                  <TableCell className="hidden sm:table-cell">{enrollment.class}</TableCell>
                  <TableCell className="hidden md:table-cell">{enrollment.rollNumber}</TableCell>
                  <TableCell className="hidden lg:table-cell">{enrollment.enrollmentDate}</TableCell>
                  <TableCell>
                    <Badge className={
                      enrollment.status === 'approved' ? "bg-green-500" : 
                      enrollment.status === 'pending' ? "bg-amber-500" :
                      "bg-red-500"
                    }>
                      {enrollment.status === 'approved' ? 'Approved' :
                       enrollment.status === 'pending' ? 'Pending' : 'Rejected'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewDetails(enrollment)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleContactStudent(enrollment)}
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Contact</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleCallStudent(enrollment)}
                      >
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call</span>
                      </Button>
                      {enrollment.status === 'pending' && (
                        <div className="flex">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-green-600"
                            onClick={() => handleApproveEnrollment(enrollment.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => handleRejectEnrollment(enrollment.id)}
                          >
                            <AlertTriangle className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="text-sm"
          onClick={() => toast({
            title: "All Enrollments",
            description: "Opening all enrollments...",
          })}
        >
          View All Enrollments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentEnrollments;
