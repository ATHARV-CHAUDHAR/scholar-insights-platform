
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Filter,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for students
const students = [
  {
    id: '1',
    name: 'John Walker',
    rollNumber: 'S2023001',
    class: '9A',
    section: 'Science',
    parent: 'Michael Walker',
    attendance: '96%',
    performance: 'Excellent',
  },
  {
    id: '2',
    name: 'Emma Thompson',
    rollNumber: 'S2023002',
    class: '10B',
    section: 'Commerce',
    parent: 'David Thompson',
    attendance: '92%',
    performance: 'Good',
  },
  {
    id: '3',
    name: 'Oliver Davis',
    rollNumber: 'S2023003',
    class: '9A',
    section: 'Science',
    parent: 'Sarah Davis',
    attendance: '89%',
    performance: 'Good',
  },
  {
    id: '4',
    name: 'Sophia Clark',
    rollNumber: 'S2023004',
    class: '11C',
    section: 'Arts',
    parent: 'Elizabeth Clark',
    attendance: '97%',
    performance: 'Excellent',
  },
  {
    id: '5',
    name: 'James Wilson',
    rollNumber: 'S2023005',
    class: '10B',
    section: 'Commerce',
    parent: 'Robert Wilson',
    attendance: '85%',
    performance: 'Average',
  },
  {
    id: '6',
    name: 'Ava Rodriguez',
    rollNumber: 'S2023006',
    class: '12A',
    section: 'Science',
    parent: 'Maria Rodriguez',
    attendance: '94%',
    performance: 'Good',
  },
  {
    id: '7',
    name: 'Noah Brown',
    rollNumber: 'S2023007',
    class: '11C',
    section: 'Arts',
    parent: 'Daniel Brown',
    attendance: '88%',
    performance: 'Good',
  },
];

const StudentsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  // Filter students based on search query and selected grade
  const filteredStudents = students.filter(
    student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.parent.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesGrade = selectedGrade === 'all' || student.class.startsWith(selectedGrade);
      
      return matchesSearch && matchesGrade;
    }
  );
  
  const handleView = (student: any) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };
  
  const handleDelete = (student: any) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    toast({
      title: "Student Removed",
      description: `${selectedStudent.name} has been removed from the system.`,
    });
    setIsDeleteDialogOpen(false);
  };
  
  const handleAddStudent = () => {
    toast({
      title: "Student Added",
      description: "New student has been successfully added to the system.",
    });
    setIsAddDialogOpen(false);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Students Management</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="gap-1">
              <Download size={16} />
              Export
            </Button>
            <Button variant="outline" className="gap-1">
              <Upload size={16} />
              Import
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-1">
              <Plus size={16} />
              Add Student
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Students Directory</CardTitle>
            <CardDescription>Manage all students in the system</CardDescription>
            
            <Tabs defaultValue="all" className="mt-6" onValueChange={setSelectedGrade}>
              <TabsList>
                <TabsTrigger value="all">All Grades</TabsTrigger>
                <TabsTrigger value="9">Grade 9</TabsTrigger>
                <TabsTrigger value="10">Grade 10</TabsTrigger>
                <TabsTrigger value="11">Grade 11</TabsTrigger>
                <TabsTrigger value="12">Grade 12</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center space-x-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name, roll number, or parent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter size={16} />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>{student.parent}</TableCell>
                    <TableCell>
                      {parseInt(student.attendance) >= 90 ? (
                        <Badge className="bg-green-500">{student.attendance}</Badge>
                      ) : parseInt(student.attendance) >= 80 ? (
                        <Badge className="bg-amber-500">{student.attendance}</Badge>
                      ) : (
                        <Badge className="bg-red-500">{student.attendance}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.performance === 'Excellent' ? (
                        <Badge className="bg-green-500">{student.performance}</Badge>
                      ) : student.performance === 'Good' ? (
                        <Badge className="bg-blue-500">{student.performance}</Badge>
                      ) : (
                        <Badge className="bg-amber-500">{student.performance}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(student)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(student)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No students found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {selectedStudent?.name} from the system? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>
              Complete information about {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center mb-4">
                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 font-semibold">
                  {selectedStudent.name.charAt(0)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Roll Number</p>
                  <p className="font-medium">{selectedStudent.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Class</p>
                  <p className="font-medium">{selectedStudent.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Section</p>
                  <p className="font-medium">{selectedStudent.section}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Parent</p>
                  <p className="font-medium">{selectedStudent.parent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="font-medium">{selectedStudent.attendance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Performance</p>
                  <p className="font-medium">{selectedStudent.performance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Admission Date</p>
                  <p className="font-medium">01 Jan, 2023</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Recent Activities</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-gray-700">Submitted Math assignment</p>
                    <p className="text-gray-500">Yesterday</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-gray-700">Participated in Science Fair</p>
                    <p className="text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            <Button>Edit Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the details of the new student below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="new-name">Full Name</label>
              <Input id="new-name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="new-class">Class</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Class</SelectLabel>
                      <SelectItem value="9A">9A</SelectItem>
                      <SelectItem value="9B">9B</SelectItem>
                      <SelectItem value="10A">10A</SelectItem>
                      <SelectItem value="10B">10B</SelectItem>
                      <SelectItem value="11A">11A</SelectItem>
                      <SelectItem value="12A">12A</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="new-section">Section</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Section</SelectLabel>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Commerce">Commerce</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="new-roll">Roll Number</label>
              <Input id="new-roll" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="new-parent">Parent Name</label>
              <Input id="new-parent" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="new-parent-email">Parent Email</label>
              <Input id="new-parent-email" type="email" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="new-parent-phone">Parent Phone</label>
              <Input id="new-parent-phone" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddStudent}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default StudentsManagement;
