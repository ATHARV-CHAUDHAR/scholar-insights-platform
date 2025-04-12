
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
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

// Mock data for teachers
const teachers = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    subject: 'Mathematics',
    phone: '(555) 123-4567',
    classes: ['9A', '10B', '11C'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Johnson',
    email: 'michaelj@example.com',
    subject: 'Physics',
    phone: '(555) 234-5678',
    classes: ['10A', '11A', '12B'],
    status: 'active',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarahw@example.com',
    subject: 'English',
    phone: '(555) 345-6789',
    classes: ['8A', '9B', '10C'],
    status: 'active',
  },
  {
    id: '4',
    name: 'Robert Brown',
    email: 'robertb@example.com',
    subject: 'Chemistry',
    phone: '(555) 456-7890',
    classes: ['11A', '11B', '12A'],
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Lisa Taylor',
    email: 'lisat@example.com',
    subject: 'Biology',
    phone: '(555) 567-8901',
    classes: ['9C', '10A', '11B'],
    status: 'active',
  },
];

const TeachersManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  // Filter teachers based on search query
  const filteredTeachers = teachers.filter(
    teacher => 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEdit = (teacher: any) => {
    setSelectedTeacher(teacher);
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = (teacher: any) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    toast({
      title: "Teacher Removed",
      description: `${selectedTeacher.name} has been removed from the system.`,
    });
    setIsDeleteDialogOpen(false);
  };
  
  const handleAddTeacher = () => {
    toast({
      title: "Teacher Added",
      description: "New teacher has been successfully added to the system.",
    });
    setIsAddDialogOpen(false);
  };
  
  const handleUpdateTeacher = () => {
    toast({
      title: "Teacher Updated",
      description: `${selectedTeacher.name}'s information has been updated.`,
    });
    setIsEditDialogOpen(false);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
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
              Add Teacher
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Teachers Directory</CardTitle>
            <CardDescription>Manage all teachers in the system</CardDescription>
            <div className="flex items-center space-x-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name, email, or subject..."
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
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.classes.map((cls, i) => (
                          <Badge key={i} variant="outline">{cls}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {teacher.status === 'active' ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(teacher)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(teacher)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTeachers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No teachers found matching your search criteria.
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
              Are you sure you want to remove {selectedTeacher?.name} from the system? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Update {selectedTeacher?.name}'s information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">Full Name</label>
              <Input 
                id="name" 
                defaultValue={selectedTeacher?.name} 
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={selectedTeacher?.email} 
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="subject">Subject</label>
              <Input 
                id="subject" 
                defaultValue={selectedTeacher?.subject} 
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone">Phone Number</label>
              <Input 
                id="phone" 
                defaultValue={selectedTeacher?.phone} 
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="status">Status</label>
              <Select defaultValue={selectedTeacher?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateTeacher}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Teacher Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Enter the details of the new teacher below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="new-name">Full Name</label>
              <Input id="new-name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="new-email">Email</label>
              <Input id="new-email" type="email" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="new-subject">Subject</label>
              <Input id="new-subject" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="new-phone">Phone Number</label>
              <Input id="new-phone" />
            </div>
            <div className="grid gap-2">
              <label>Classes</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">9A</Badge>
                <Badge variant="outline">10B</Badge>
                <Button variant="outline" size="sm" className="h-6">
                  <Plus size={12} /> Add Class
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="new-status">Status</label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTeacher}>Add Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TeachersManagement;
