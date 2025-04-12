
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Users, 
  BookOpen, 
  Calendar,
  User, 
  Edit, 
  Trash2
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

// Mock classes data
const classes = [
  {
    id: '1',
    name: 'Class 9A',
    section: 'Science',
    teacher: 'Jane Smith',
    students: 32,
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'],
    room: 'Lab 101'
  },
  {
    id: '2',
    name: 'Class 10B',
    section: 'Commerce',
    teacher: 'Michael Johnson',
    students: 28,
    subjects: ['Economics', 'Business Studies', 'Accounting', 'Mathematics', 'English'],
    room: 'Room 203'
  },
  {
    id: '3',
    name: 'Class 11C',
    section: 'Arts',
    teacher: 'Sarah Williams',
    students: 25,
    subjects: ['History', 'Political Science', 'Geography', 'Literature', 'English', 'Psychology'],
    room: 'Room 305'
  },
  {
    id: '4',
    name: 'Class 12A',
    section: 'Science',
    teacher: 'Robert Brown',
    students: 30,
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English'],
    room: 'Lab 102'
  },
  {
    id: '5',
    name: 'Class 9B',
    section: 'Science',
    teacher: 'Lisa Taylor',
    students: 33,
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'],
    room: 'Lab 103'
  },
];

const ClassesManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  // Filter classes based on search query
  const filteredClasses = classes.filter(
    cls => 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cls.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleView = (cls: any) => {
    setSelectedClass(cls);
    setIsViewDialogOpen(true);
  };
  
  const handleDelete = (cls: any) => {
    setSelectedClass(cls);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    toast({
      title: "Class Removed",
      description: `${selectedClass.name} has been removed from the system.`,
    });
    setIsDeleteDialogOpen(false);
  };
  
  const handleAddClass = () => {
    toast({
      title: "Class Added",
      description: "New class has been successfully added to the system.",
    });
    setIsAddDialogOpen(false);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Classes Management</h1>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-1">
            <Plus size={16} />
            Add Class
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Classes
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">
                Across all grades
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">
                Active enrollment
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Teachers
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div>
              <p className="text-xs text-muted-foreground">
                Teaching staff
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Academic Year
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2023-24</div>
              <p className="text-xs text-muted-foreground">
                Current session
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Classes Directory</CardTitle>
            <CardDescription>Browse and manage all classes</CardDescription>
            <div className="flex items-center space-x-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search classes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Class Teacher</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.section}</TableCell>
                    <TableCell>{cls.teacher}</TableCell>
                    <TableCell>{cls.students}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline">{cls.subjects.length} subjects</Badge>
                      </div>
                    </TableCell>
                    <TableCell>{cls.room}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(cls)}
                        >
                          <Users size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(cls)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredClasses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No classes found matching your search criteria.
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
              Are you sure you want to delete {selectedClass?.name}? This action cannot be undone 
              and will affect all enrolled students and assigned teachers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Enter the details of the new class below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="class-name">Class Name</label>
              <Input id="class-name" placeholder="e.g. Class 9A" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="section">Section</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sections</SelectLabel>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="class-teacher">Class Teacher</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Teachers</SelectLabel>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="michael-johnson">Michael Johnson</SelectItem>
                    <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                    <SelectItem value="robert-brown">Robert Brown</SelectItem>
                    <SelectItem value="lisa-taylor">Lisa Taylor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="room">Classroom/Lab</label>
              <Input id="room" placeholder="e.g. Room 101" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddClass}>Add Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Class Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedClass?.name} - Students</DialogTitle>
            <DialogDescription>
              View all students enrolled in {selectedClass?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Class</p>
                  <p className="font-medium">{selectedClass.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Section</p>
                  <p className="font-medium">{selectedClass.section}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Class Teacher</p>
                  <p className="font-medium">{selectedClass.teacher}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room</p>
                  <p className="font-medium">{selectedClass.room}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedClass.subjects.map((subject: string, i: number) => (
                    <Badge key={i} variant="outline">{subject}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Students ({selectedClass.students})</h3>
                  <Input 
                    placeholder="Search students..." 
                    className="max-w-xs"
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Parent</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">John Walker</TableCell>
                      <TableCell>S2023001</TableCell>
                      <TableCell><Badge className="bg-green-500">96%</Badge></TableCell>
                      <TableCell><Badge className="bg-green-500">Excellent</Badge></TableCell>
                      <TableCell>Michael Walker</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emma Thompson</TableCell>
                      <TableCell>S2023002</TableCell>
                      <TableCell><Badge className="bg-green-500">92%</Badge></TableCell>
                      <TableCell><Badge className="bg-blue-500">Good</Badge></TableCell>
                      <TableCell>David Thompson</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Oliver Davis</TableCell>
                      <TableCell>S2023003</TableCell>
                      <TableCell><Badge className="bg-amber-500">89%</Badge></TableCell>
                      <TableCell><Badge className="bg-blue-500">Good</Badge></TableCell>
                      <TableCell>Sarah Davis</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            <Button>Manage Students</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ClassesManagement;
