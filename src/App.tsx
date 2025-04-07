
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherPerformance from "./pages/teacher/Performance";
import StudentDetail from "./pages/teacher/StudentDetail";

// Parent Pages
import ParentDashboard from "./pages/parent/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Teacher Routes */}
            <Route 
              path="/teacher/dashboard" 
              element={
                <PrivateRoute allowedRoles={['teacher', 'admin']}>
                  <TeacherDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/teacher/attendance" 
              element={
                <PrivateRoute allowedRoles={['teacher', 'admin']}>
                  <TeacherAttendance />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/teacher/performance" 
              element={
                <PrivateRoute allowedRoles={['teacher', 'admin']}>
                  <TeacherPerformance />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/teacher/student/:id" 
              element={
                <PrivateRoute allowedRoles={['teacher', 'admin']}>
                  <StudentDetail />
                </PrivateRoute>
              } 
            />
            
            {/* Parent Routes */}
            <Route 
              path="/parent/dashboard" 
              element={
                <PrivateRoute allowedRoles={['parent']}>
                  <ParentDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/parent/student/:id" 
              element={
                <PrivateRoute allowedRoles={['parent']}>
                  <StudentDetail />
                </PrivateRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
