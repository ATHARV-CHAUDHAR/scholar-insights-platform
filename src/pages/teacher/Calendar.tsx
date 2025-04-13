
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  CalendarPlus,
  Users,
  BookOpen,
  Clock,
  Check,
  X,
  Calendar as CalendarIcon,
  AlertCircle,
} from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  description: string;
  type: "class" | "exam" | "meeting" | "holiday";
  className?: string;
  location?: string;
  status?: "scheduled" | "completed" | "canceled";
};

const TeacherCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Mathematics Class",
      date: new Date(2025, 3, 15),
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      description: "Class 10 - Algebra",
      type: "class",
      className: "Class 10A",
      location: "Room 103",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Science Quiz",
      date: new Date(2025, 3, 16),
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      description: "Class 9 - Physics Quiz",
      type: "exam",
      className: "Class 9B",
      location: "Room 105",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: new Date(2025, 3, 18),
      startTime: "03:00 PM",
      endTime: "05:00 PM",
      description: "Meeting with parents of Class 10 students",
      type: "meeting",
      location: "Conference Room",
      status: "scheduled",
    },
    {
      id: 4,
      title: "Teacher's Day",
      date: new Date(2025, 3, 20),
      description: "School Holiday - Teacher's Day",
      type: "holiday",
      status: "scheduled",
    },
  ]);
  
  const [view, setView] = useState<"month" | "list">("month");
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    description: "",
    type: "class",
    status: "scheduled",
  });
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = events.filter(
    (event) => filter === "all" || event.type === filter
  );

  const todaysEvents = events.filter(
    (event) => date && format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        ...newEvent,
        id: events.length + 1,
      } as Event;
      setEvents([...events, event]);
      setNewEvent({
        title: "",
        date: new Date(),
        startTime: "",
        endTime: "",
        description: "",
        type: "class",
        status: "scheduled",
      });
    }
  };

  const markAsComplete = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: "completed" } : event
      )
    );
  };

  const cancelEvent = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: "canceled" } : event
      )
    );
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800";
      case "exam":
        return "bg-amber-100 text-amber-800";
      case "meeting":
        return "bg-purple-100 text-purple-800";
      case "holiday":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline" className="text-blue-500 border-blue-200">Scheduled</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-green-500 border-green-200">Completed</Badge>;
      case "canceled":
        return <Badge variant="outline" className="text-red-500 border-red-200">Canceled</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Class Schedule</CardTitle>
                  <CardDescription>
                    Manage your classes, exams and meetings
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
                      <SelectItem value="meeting">Meetings</SelectItem>
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
                    }}
                    modifiersStyles={{
                      booked: {
                        fontWeight: "bold",
                        color: "white",
                        backgroundColor: "#4A6FFF",
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
                    <p>Try changing your filter or add new events</p>
                  </div>
                ) : (
                  filteredEvents
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <div
                        key={event.id}
                        className={`flex justify-between items-start border-b pb-4 ${
                          event.status === "canceled" ? "opacity-60" : ""
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(
                                event.type
                              )}`}
                            >
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </span>
                            <h3 className="font-medium">{event.title}</h3>
                            {getStatusBadge(event.status || "scheduled")}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <CalendarIcon className="h-3 w-3 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {format(event.date, "MMMM d, yyyy")}
                            </p>
                          </div>
                          {event.startTime && (
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <p className="text-sm text-gray-600">
                                {event.startTime} - {event.endTime}
                              </p>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                              <span>{event.location}</span>
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
                        <div className="flex gap-2">
                          {event.status === "scheduled" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsComplete(event.id)}
                                className="text-green-500"
                              >
                                <Check size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => cancelEvent(event.id)}
                                className="text-red-500"
                              >
                                <X size={16} />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Today's Schedule Card */}
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
                      className={`p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors ${
                        event.status === "canceled" ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-8 rounded-full ${
                              event.type === "class"
                                ? "bg-blue-500"
                                : event.type === "exam"
                                ? "bg-amber-500"
                                : event.type === "meeting"
                                ? "bg-purple-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            {event.startTime && (
                              <p className="text-xs text-gray-600">
                                {event.startTime} - {event.endTime}
                              </p>
                            )}
                            {event.location && (
                              <p className="text-xs text-gray-500">{event.location}</p>
                            )}
                          </div>
                        </div>
                        <div>{getStatusBadge(event.status || "scheduled")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="mb-2">No events scheduled for this date</p>
                  <Button
                    variant="outline"
                    className="text-xs"
                    onClick={() =>
                      setNewEvent({ ...newEvent, date: date || new Date() })
                    }
                  >
                    <CalendarPlus className="h-4 w-4 mr-1" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Event Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Add New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Event Date</Label>
                  <div className="border rounded-md p-2">
                    <CalendarComponent
                      mode="single"
                      selected={newEvent.date}
                      onSelect={(date) => setNewEvent({ ...newEvent, date })}
                      className="pointer-events-auto"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startTime: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endTime: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, type: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={newEvent.location || ""}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, location: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description"
                    value={newEvent.description || ""}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={addEvent}
                  disabled={!newEvent.title || !newEvent.date}
                >
                  <CalendarPlus className="h-4 w-4 mr-2" /> Add Event
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherCalendar;
