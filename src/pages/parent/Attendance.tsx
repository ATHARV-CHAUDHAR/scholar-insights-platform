
import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { students } from '@/utils/mockData';
import { Card, CardContent } from '@/components/ui/card';
import AttendanceTab from '@/components/parent/AttendanceTab';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const ParentAttendance: React.FC = () => {
  const { user } = useAuth();
  
  // Filter students that belong to the logged-in parent
  const myChildren = students.filter(student => student.parentId === user?.id);
  
  // State for selected child
  const [selectedChildId, setSelectedChildId] = useState(myChildren.length > 0 ? myChildren[0].id : '');
  
  // Handle button click for demo purposes
  const handleRefreshClick = () => {
    toast({
      title: "Refreshing attendance data",
      description: "Attendance records are being updated..."
    });
    // In a real app, this would fetch updated data from the backend
  };
  
  // If no children, show a message
  if (myChildren.length === 0) {
    return (
      <Layout>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Attendance Records</h2>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                It seems that your account is not linked to any children.
                Please contact the school administration to link your account with your children.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Attendance Records</h2>
          
          <div className="flex gap-2 items-center">
            {myChildren.length > 1 && (
              <Select 
                value={selectedChildId} 
                onValueChange={(value) => {
                  setSelectedChildId(value);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  {myChildren.map(child => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            <Button 
              variant="outline" 
              onClick={handleRefreshClick}
              type="button"
            >
              Refresh Data
            </Button>
          </div>
        </div>
        
        {selectedChildId && <AttendanceTab studentId={selectedChildId} />}
      </div>
    </Layout>
  );
};

export default ParentAttendance;
