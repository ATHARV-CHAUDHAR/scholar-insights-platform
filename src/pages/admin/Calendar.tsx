
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { format } from "date-fns";
import {
  CalendarPlus,
  Users,
  Trash2,
  Edit,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: Date;
  description: string;
  type: "school" | "class" | "exam" | "holiday";
  participants?: string[];
};

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Annual Function",
      date: new Date(2025, 3, 20),
      description: "School Annual Day celebration",
      type: "school",
      participants: ["All Students", "All Teachers", "Parents"],
    },
    {
      id: 2,
      title: "Final Exam - Mathematics",
      date: new Date(2025, 3, 15),
      description: "Class 10 Final Mathematics Examination",
      type: "exam",
      participants: ["Class 10 Students"],
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: new Date(2025, 3, 10),
      description: "Quarterly Parent-Teacher Meeting",
      type: "class",
      participants: ["Class Teachers", "Parents"],
    },
    {
      id: 4,
      title: "Spring Break",
      date: new Date(2025, 3, 25),
      description: "Spring Break Holiday",
      type: "holiday",
    },
  ]);
  
  const [view, setView] = useState<"month" | "list">("month");
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    description: "",
    type: "school",
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
        description: "",
        type: "school",
      });
    }
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "school":
        return "bg-blue-100 text-blue-800";
      case "class":
        return "bg-green-100 text-green-800";
      case "exam":
        return "bg-amber-100 text-amber-800";
      case "holiday":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>School Calendar</CardTitle>
                <div className="flex gap-2">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter Events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="school">School Events</SelectItem>
                      <SelectItem value="class">Class Events</SelectItem>
                      <SelectItem value="exam">Exams</SelectItem>
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
              <Tabs value={view}>
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
                          className="flex justify-between items-start border-b pb-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(
                                  event.type
                                )}`}
                              >
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </span>
                              <h3 className="font-medium">{event.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {format(event.date, "MMMM d, yyyy")}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {event.description}
                            </p>
                            {event.participants && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                <Users size={14} />
                                <span>{event.participants.join(", ")}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteEvent(event.id)}
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Event Details Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {date ? format(date, "MMMM d, yyyy") : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todaysEvents.length > 0 ? (
                <div className="space-y-4">
                  {todaysEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-8 rounded-full ${
                            event.type === "school"
                              ? "bg-blue-500"
                              : event.type === "class"
                              ? "bg-green-500"
                              : event.type === "exam"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </div>
                      {event.participants && (
                        <div className="mt-2 pl-4 text-xs text-gray-500">
                          <span className="font-medium">Participants: </span>
                          {event.participants.join(", ")}
                        </div>
                      )}
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
                      <SelectItem value="school">School Event</SelectItem>
                      <SelectItem value="class">Class Event</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description"
                    value={newEvent.description}
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

export default Calendar;
