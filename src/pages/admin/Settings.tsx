import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integration">Integrations</TabsTrigger>
            <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage application basic settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input id="school-name" defaultValue="AVA Educational Technology Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input id="website" defaultValue="https://www.avaedutech.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" defaultValue="contact@avaedutech.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Education Way, Learning City, ED 12345, USA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="America/New_York"
                  >
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <select 
                    id="date-format" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="MM/DD/YYYY"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            {/* Security settings content */}
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure application security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Password Expiry</h3>
                    <p className="text-sm text-gray-500">Enforce password change every 90 days</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Account Lockout</h3>
                    <p className="text-sm text-gray-500">Lock account after 5 failed login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Session Timeout</h3>
                    <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="session-timeout">Session Timeout Duration (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <select 
                    id="password-policy" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="strong"
                  >
                    <option value="basic">Basic (min 8 characters)</option>
                    <option value="medium">Medium (min 8 chars, letters and numbers)</option>
                    <option value="strong">Strong (min 10 chars, letters, numbers, special)</option>
                    <option value="custom">Custom Policy</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Keys & Authentication</CardTitle>
                <CardDescription>Manage system API keys and authentication settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex">
                    <Input 
                      id="api-key" 
                      defaultValue="sk_test_51KdJkELGBcXXXXXXXXXXXXXXX" 
                      type="password" 
                      className="rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none">Reveal</Button>
                  </div>
                </div>
                <div>
                  <Button variant="outline">Regenerate API Key</Button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h3 className="font-medium">API Access</h3>
                    <p className="text-sm text-gray-500">Enable API access for third-party integrations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            {/* Notifications settings content */}
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure system email notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Student Enrollment</h3>
                    <p className="text-sm text-gray-500">Send notifications for new student enrollments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Student Performance</h3>
                    <p className="text-sm text-gray-500">Send notifications for significant performance changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Low Attendance</h3>
                    <p className="text-sm text-gray-500">Send notifications for students with attendance below 80%</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">System Updates</h3>
                    <p className="text-sm text-gray-500">Send notifications for system updates and maintenance</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Security Alerts</h3>
                    <p className="text-sm text-gray-500">Send notifications for important security events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>Configure system SMS notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Send important alerts via SMS</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-provider">SMS Provider</Label>
                  <select 
                    id="sms-provider" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="twilio"
                  >
                    <option value="twilio">Twilio</option>
                    <option value="nexmo">Nexmo</option>
                    <option value="aws-sns">AWS SNS</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-api-key">API Key</Label>
                  <Input id="sms-api-key" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-api-secret">API Secret</Label>
                  <Input id="sms-api-secret" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-4">
            {/* Integration settings content */}
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Integrations</CardTitle>
                <CardDescription>Configure external service integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
                      G
                    </div>
                    <div>
                      <h3 className="font-medium">Google Workspace</h3>
                      <p className="text-sm text-gray-500">Integrate with Google Classroom and Drive</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-[#6264A7] rounded-md flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <h3 className="font-medium">Microsoft Teams</h3>
                      <p className="text-sm text-gray-500">Enable virtual classrooms with Teams</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-green-500 rounded-md flex items-center justify-center text-white font-bold">
                      Z
                    </div>
                    <div>
                      <h3 className="font-medium">Zoom</h3>
                      <p className="text-sm text-gray-500">Connect with Zoom for video conferences</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                      C
                    </div>
                    <div>
                      <h3 className="font-medium">Canvas LMS</h3>
                      <p className="text-sm text-gray-500">Connect to Canvas learning management system</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold">
                      K
                    </div>
                    <div>
                      <h3 className="font-medium">Kahoot!</h3>
                      <p className="text-sm text-gray-500">Integrate with Kahoot! for interactive quizzes</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="backup" className="space-y-4">
            {/* Backup settings content */}
            <Card>
              <CardHeader>
                <CardTitle>Backup & Restore</CardTitle>
                <CardDescription>Manage system backups and restoration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Automated Backups</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Enable daily automated backups</p>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <select 
                    id="backup-frequency" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="daily"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Retention Period (days)</Label>
                  <Input id="retention-period" type="number" defaultValue="30" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-location">Backup Storage Location</Label>
                  <select 
                    id="backup-location" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="cloud"
                  >
                    <option value="local">Local Storage</option>
                    <option value="cloud">Cloud Storage</option>
                    <option value="both">Both Local and Cloud</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-4 mt-6">
                  <h3 className="font-medium">Manual Backup & Restore</h3>
                  <Button variant="outline" className="justify-start">
                    Create Manual Backup Now
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Import Backup
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Export Backup
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Recent Backups</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>May 12, 2023 03:00 AM</TableCell>
                        <TableCell>1.2 GB</TableCell>
                        <TableCell>Automated</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Restore</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 11, 2023 03:00 AM</TableCell>
                        <TableCell>1.2 GB</TableCell>
                        <TableCell>Automated</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Restore</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 10, 2023 15:45 PM</TableCell>
                        <TableCell>1.3 GB</TableCell>
                        <TableCell>Manual</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Restore</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminSettings;
