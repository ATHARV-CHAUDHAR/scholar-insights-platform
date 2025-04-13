
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Clock,
  Map,
  BookOpen,
  AlertCircle,
  Check,
  Info,
  CalendarPlus
} from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: Date;
  time?: string;
  location?: string;
  description: string;
  type: "class" | "exam" | "school" | "holiday";
  className?: string;
  requiresAction?: boolean;
  isImportant?: boolean;
};

const ParentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedChild, setSelectedChild] = useState("John Smith");
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Mathematics Test",
      date: new Date(2025, 3, 15),
      time: "09:00 AM - 10:30 AM",
      location: "Room 103",
      description: "End of chapter algebra test",
      type: "exam",
      className: "Mathematics",
      requiresAction: false,
      isImportant: true,
    },
    {
      id: 2,
      title: "Science Project Due",
      date: new Date(2025, 3, 18),
      description: "Solar system model project deadline",
      type: "class",
      className: "Science",
      requiresAction: true,
      isImportant: true,
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: new Date(2025, 3, 20),
      time: "03:00 PM - 05:30 PM",
      location: "School Conference Room",
      description: "Quarterly parent-teacher conference",
      type: "school",
      requiresAction: true,
      isImportant: true,
    },
    {
      id: 4,
      title: "Spring Break",
      date: new Date(2025, 3, 25),
      description: "School closed for spring break",
      type: "holiday",
      requiresAction: false,
      isImportant: false,
    },
    {
      id: 5,
      title: "Field Trip - Museum of Science",
      date: new Date(2025, 3, 10),
      time: "09:00 AM - 03:00 PM",
      location: "City Museum of Science",
      description: "Science class field trip - permission slip required",
      type: "class",
      className: "Science",
      requiresAction: true,
      isImportant: true,
    },
  ]);

  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<"month" | "list">("month");
  
  const filteredEvents = events.filter(
    (event) => filter === "all" || event.type === filter
  );

  const todaysEvents = events.filter(
    (event) => date && format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  const actionRequiredEvents = events.filter(event => event.requiresAction);
  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "class":
        return <BookOpen className="h-4 w-4" />;
      case "exam":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "school":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "holiday":
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "class":
        return <Badge variant="outline" className="border-blue-200 text-blue-700">Class</Badge>;
      case "exam":
        return <Badge variant="outline" className="border-amber-200 text-amber-700">Exam</Badge>;
      case "school":
        return <Badge variant="outline" className="border-purple-200 text-purple-700">School</Badge>;
      case "holiday":
        return <Badge variant="outline" className="border-green-200 text-green-700">Holiday</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">School Calendar</h1>
          <p className="text-gray-500">Your child's academic schedule and events</p>
        </div>
        <div className="w-full sm:w-auto">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select Child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="John Smith">John Smith</SelectItem>
              <SelectItem value="Emma Smith">Emma Smith</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>
                    View your child's school events and important dates
                  </CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Filter Events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="class">Classes</SelectItem>
                      <SelectItem value="exam">Exams</SelectItem>
                      <SelectItem value="school">School Events</SelectItem>
                      <SelectItem value="holiday">Holidays</SelectItem>
                    </SelectContent>
                  </Select>
                  <Tabs value={view} onValueChange={(v) => setView(v as "month" | "list")}>
                    <TabsList className="grid w-[160px] grid-cols-2">
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="list">List</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="month" className="mt-0">
                <div className="p-3 bg-white rounded-lg">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="pointer-events-auto"
                    modifiers={{
                      booked: filteredEvents.map((event) => event.date),
                      important: filteredEvents
                        .filter((event) => event.isImportant)
                        .map((event) => event.date),
                    }}
                    modifiersStyles={{
                      booked: {
                        fontWeight: "bold",
                        color: "white",
                        backgroundColor: "#4A6FFF",
                      },
                      important: {
                        fontWeight: "bold",
                        color: "white",
                        backgroundColor: "#FF4A6F",
                      },
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="list" className="mt-0 space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="font-medium">No events found</h3>
                    <p>Try changing your filter</p>
                  </div>
                ) : (
                  filteredEvents
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex justify-between items-start border-b pb-4"
                      >
                        <div className="flex gap-3">
                          <div className="mt-1">{getEventTypeIcon(event.type)}</div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-medium">{event.title}</h3>
                              {getEventTypeBadge(event.type)}
                              {event.requiresAction && (
                                <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">
                                  Action Required
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <CalendarIcon className="h-3 w-3 text-gray-400" />
                              <p className="text-sm text-gray-600">
                                {format(event.date, "MMMM d, yyyy")}
                              </p>
                            </div>
                            {event.time && (
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <p className="text-sm text-gray-600">{event.time}</p>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-2 mt-1">
                                <Map className="h-3 w-3 text-gray-400" />
                                <p className="text-sm text-gray-600">{event.location}</p>
                              </div>
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                              {event.description}
                            </p>
                            {event.className && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                <BookOpen size={14} />
                                <span>{event.className}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Today's Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {date ? format(date, "MMMM d, yyyy") : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todaysEvents.length > 0 ? (
                <div className="space-y-3">
                  {todaysEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getEventTypeIcon(event.type)}</div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-medium">{event.title}</h3>
                            {event.requiresAction && (
                              <Badge variant="outline" className="border-red-200 text-red-600">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          {event.time && <p className="text-xs text-gray-600">{event.time}</p>}
                          {event.location && <p className="text-xs text-gray-600">{event.location}</p>}
                          <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="mb-2">No events scheduled for this date</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getEventTypeIcon(event.type)}</div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-xs text-gray-600">
                            {format(event.date, "MMM d")}
                            {event.time && ` • ${event.time}`}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No upcoming events</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Required */}
          <Card className="border-amber-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Action Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actionRequiredEvents.length > 0 ? (
                  actionRequiredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border border-amber-200 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
                    >
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-xs text-gray-600">
                        Due: {format(event.date, "MMM d, yyyy")}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">{event.description}</p>
                      <div className="mt-3">
                        <Button size="sm" className="w-full">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No actions required</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ParentCalendar;
