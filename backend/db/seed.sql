
-- Sample data for Scholar Insights Platform
-- This script will populate the database with initial test data

USE scholar_insights;

-- Insert roles
INSERT INTO Roles (role_name, description) VALUES 
('Admin', 'System administrator with full access'),
('Teacher', 'Teaching staff with access to class and student data'),
('Student', 'Enrolled student with limited access'),
('Parent', 'Parent or guardian of enrolled students');

-- Insert permissions (simplified)
INSERT INTO Permissions (permission_name, description) VALUES
('user:read', 'Can read user data'),
('user:write', 'Can create and update user data'),
('attendance:read', 'Can read attendance data'),
('attendance:write', 'Can create and update attendance'),
('performance:read', 'Can read performance data'),
('performance:write', 'Can create and update performance data');

-- Assign permissions to roles
-- Admin permissions
INSERT INTO Assoc_Role_Permissions (role_id, permission_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6);

-- Teacher permissions
INSERT INTO Assoc_Role_Permissions (role_id, permission_id) VALUES 
(2, 1), (2, 3), (2, 4), (2, 5), (2, 6);

-- Student permissions
INSERT INTO Assoc_Role_Permissions (role_id, permission_id) VALUES 
(3, 3), (3, 5);

-- Parent permissions
INSERT INTO Assoc_Role_Permissions (role_id, permission_id) VALUES 
(4, 3), (4, 5);

-- Insert users
INSERT INTO Users (username, email, password_hash, is_active) VALUES
-- Admins
('John Doe', 'johndoe@example.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', true),
-- Teachers
('Jane Smith', 'janesmith@example.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', true),
('Michael Brown', 'michaelbrown@example.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', true),
-- Parents
('Robert Johnson', 'robertjohnson@example.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', true),
('Mary Williams', 'marywilliams@example.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', true),
-- Students
('David Wilson', 'davidwilson@example.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', true),
('Sarah Davis', 'sarahdavis@example.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', true);

-- Assign roles to users
INSERT INTO Assoc_User_Roles (user_id, role_id) VALUES
(1, 1), -- John Doe as Admin
(2, 2), -- Jane Smith as Teacher
(3, 2), -- Michael Brown as Teacher
(4, 4), -- Robert Johnson as Parent
(5, 4), -- Mary Williams as Parent
(6, 3), -- David Wilson as Student
(7, 3); -- Sarah Davis as Student

-- Insert departments
INSERT INTO Departments (department_name, description) VALUES
('Mathematics', 'Department of Mathematics'),
('Science', 'Department of Science'),
('English', 'Department of English'),
('Social Studies', 'Department of Social Studies');

-- Insert classes
INSERT INTO Classes (class_name, year) VALUES
('Grade 10', 2023),
('Grade 11', 2023),
('Grade 12', 2023);

-- Insert divisions
INSERT INTO Divisions (class_id, section) VALUES
(1, 'A'),
(1, 'B'),
(2, 'A'),
(3, 'A');

-- Insert teachers
INSERT INTO Teachers (user_id, department_id, specialization, dob) VALUES
(2, 1, 'Calculus', '1980-05-15'),
(3, 2, 'Physics', '1975-10-22');

-- Insert students
INSERT INTO Students (user_id, enrollment_number, class_id, dob) VALUES
(6, 'S2023001', 1, '2006-03-12'),
(7, 'S2023002', 2, '2005-07-25');

-- Insert parents
INSERT INTO Parents (user_id, student_id, relationship) VALUES
(4, 1, 'Father'),
(5, 2, 'Mother');

-- Insert subjects
INSERT INTO Subjects (subject_name, subject_code) VALUES
('Mathematics', 'MATH101'),
('Physics', 'PHYS101'),
('Chemistry', 'CHEM101'),
('Biology', 'BIO101'),
('English', 'ENG101'),
('History', 'HIST101');

-- Connect teachers to subjects and divisions
INSERT INTO Teacher_Subject_Assoc (teacher_id, subject_id, division_id) VALUES
(1, 1, 1), -- Jane teaches Math in Grade 10-A
(2, 2, 1); -- Michael teaches Physics in Grade 10-A

-- Create sample attendance
INSERT INTO Attendance (student_id, class_date, status, subject_id) VALUES
-- For David Wilson
(1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'Present', 1),
(1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'Present', 2),
(1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), 'Absent', 1),
(1, DATE_SUB(CURDATE(), INTERVAL 4 DAY), 'Present', 2),
(1, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'Late', 1),
-- For Sarah Davis
(2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'Present', 1),
(2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'Present', 2),
(2, DATE_SUB(CURDATE(), INTERVAL 3 DAY), 'Present', 1),
(2, DATE_SUB(CURDATE(), INTERVAL 4 DAY), 'Late', 2),
(2, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'Absent', 1);

-- Create sample exams
INSERT INTO Exams (exam_name, exam_date, class_id) VALUES
('Midterm Examination', DATE_ADD(CURDATE(), INTERVAL 15 DAY), 1),
('Final Examination', DATE_ADD(CURDATE(), INTERVAL 60 DAY), 1),
('Quiz 1', DATE_SUB(CURDATE(), INTERVAL 15 DAY), 1);

-- Create sample results
INSERT INTO Results (student_id, exam_id, subject_id, marks_obtained, grade) VALUES
-- David Wilson's results
(1, 3, 1, 85.50, 'B+'), -- Math Quiz
(1, 3, 2, 90.00, 'A'), -- Physics Quiz
-- Sarah Davis's results
(2, 3, 1, 92.50, 'A'), -- Math Quiz
(2, 3, 2, 88.00, 'B+'); -- Physics Quiz

-- Create sample events
INSERT INTO Events (event_name, event_date, description, organizer_id) VALUES
('Science Fair', DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'Annual science project exhibition', 2),
('Parent-Teacher Meeting', DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'Quarterly progress discussion', 1);

-- Create sample event participation
INSERT INTO Assoc_Event_Participation (event_id, participant_id, participant_type) VALUES
(1, 1, 'Student'), -- David participating in Science Fair
(1, 2, 'Student'); -- Sarah participating in Science Fair
