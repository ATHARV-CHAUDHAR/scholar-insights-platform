
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Calendar, Settings, FileText, Mail, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  link?: string;
  variant: 'default' | 'outline';
  onClick?: () => void;
}

const QuickActions: React.FC = () => {
  const { toast } = useToast();
  
  const actions: QuickAction[] = [
    {
      id: 'add-teacher',
      title: 'Add New Teacher',
      icon: <Users className="mr-2 h-4 w-4" />,
      link: '/admin/teachers/new',
      variant: 'default',
    },
    {
      id: 'create-class',
      title: 'Create Class',
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      link: '/admin/classes/new',
      variant: 'outline',
    },
    {
      id: 'schedule',
      title: 'Schedule Event',
      icon: <Calendar className="mr-2 h-4 w-4" />,
      onClick: () => {
        toast({
          title: "Calendar Event",
          description: "Opening calendar scheduler...",
        });
      },
      variant: 'outline',
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
      link: '/admin/settings',
      variant: 'outline',
    },
  ];

  const handleAction = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (!action.link) {
      toast({
        title: action.title,
        description: `Action ${action.title} triggered`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Quick Actions
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Configure quick actions</span>
          </Button>
        </CardTitle>
        <CardDescription>Frequently used operations</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {actions.map((action) => (
          action.link ? (
            <Link key={action.id} to={action.link} className="w-full">
              <Button className="justify-start text-sm w-full" variant={action.variant}>
                {action.icon}
                {action.title}
              </Button>
            </Link>
          ) : (
            <Button 
              key={action.id} 
              className="justify-start text-sm" 
              variant={action.variant}
              onClick={() => handleAction(action)}
            >
              {action.icon}
              {action.title}
            </Button>
          )
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
