
-- Create database
CREATE DATABASE IF NOT EXISTS scholar_insights;
USE scholar_insights;

-- ### AUTHENTICATION AND USER MANAGEMENT ###
-- 1. Users Table
CREATE TABLE IF NOT EXISTS Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  disabled_date TIMESTAMP NULL,
  successive_failed_logins INT DEFAULT 0,
  last_timezone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Roles Table
CREATE TABLE IF NOT EXISTS Roles (
  role_id INT PRIMARY KEY AUTO_INCREMENT,
  role_name ENUM('Student', 'Teacher', 'Admin', 'Parent') UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Permissions Table
CREATE TABLE IF NOT EXISTS Permissions (
  permission_id INT PRIMARY KEY AUTO_INCREMENT,
  permission_name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Role-Permission Association
CREATE TABLE IF NOT EXISTS Assoc_Role_Permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES Roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES Permissions(permission_id)
);

-- 5. User-Role Association Table
CREATE TABLE IF NOT EXISTS Assoc_User_Roles (
  user_role_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- ### CLASS MANAGEMENT ###
-- Classes Table
CREATE TABLE IF NOT EXISTS Classes (
  class_id INT PRIMARY KEY AUTO_INCREMENT,
  class_name VARCHAR(50) UNIQUE NOT NULL,
  year SMALLINT NOT NULL
);

-- Divisions Table
CREATE TABLE IF NOT EXISTS Divisions (
  division_id INT PRIMARY KEY AUTO_INCREMENT,
  class_id INT NOT NULL,
  section VARCHAR(10) NOT NULL,
  UNIQUE (class_id, section),
  FOREIGN KEY (class_id) REFERENCES Classes(class_id) ON DELETE CASCADE
);

-- Departments Table
CREATE TABLE IF NOT EXISTS Departments (
  department_id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

-- ### STUDENT AND TEACHER MANAGEMENT ###
-- 1. Students Table
CREATE TABLE IF NOT EXISTS Students (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  enrollment_number VARCHAR(20) UNIQUE NOT NULL,
  class_id INT NOT NULL,
  dob DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

-- 2. Teachers Table
CREATE TABLE IF NOT EXISTS Teachers (
  teacher_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  department_id INT NOT NULL,
  specialization VARCHAR(100),
  dob DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- 3. Parents Table
CREATE TABLE IF NOT EXISTS Parents (
  parent_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  student_id INT NOT NULL,
  relationship ENUM('Mother', 'Father', 'Guardian') NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- Subjects Table
CREATE TABLE IF NOT EXISTS Subjects (
  subject_id INT PRIMARY KEY AUTO_INCREMENT,
  subject_name VARCHAR(100) NOT NULL,
  subject_code VARCHAR(20) UNIQUE NOT NULL
);

-- Teacher_Subject_Assoc Table
CREATE TABLE IF NOT EXISTS Teacher_Subject_Assoc (
  assoc_id INT PRIMARY KEY AUTO_INCREMENT,
  teacher_id INT NOT NULL,
  subject_id INT NOT NULL,
  division_id INT NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
  FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
  FOREIGN KEY (division_id) REFERENCES Divisions(division_id) ON DELETE CASCADE,
  UNIQUE (teacher_id, subject_id, division_id)
);

-- Timetable Table
CREATE TABLE IF NOT EXISTS Timetable (
  timetable_id INT PRIMARY KEY AUTO_INCREMENT,
  division_id INT NOT NULL,
  subject_id INT NOT NULL,
  day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
  period_number INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (division_id) REFERENCES Divisions(division_id),
  FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
  CHECK (period_number BETWEEN 1 AND 8),
  CHECK (end_time > start_time),
  UNIQUE (division_id, day, period_number)
);

-- ### ATTENDANCE MANAGEMENT ###
-- 1. Attendance Table
CREATE TABLE IF NOT EXISTS Attendance (
  attendance_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  class_date DATE NOT NULL,
  status ENUM('Present', 'Absent', 'Late') NOT NULL,
  subject_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES Students(student_id),
  FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);

-- ### EXAM AND RESULT MANAGEMENT ###
-- 1. Exams Table
CREATE TABLE IF NOT EXISTS Exams (
  exam_id INT PRIMARY KEY AUTO_INCREMENT,
  exam_name VARCHAR(100) NOT NULL,
  exam_date DATE NOT NULL,
  class_id INT NOT NULL,
  FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

-- 2. Results Table
CREATE TABLE IF NOT EXISTS Results (
  result_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  exam_id INT NOT NULL,
  subject_id INT NOT NULL,
  marks_obtained DECIMAL(5, 2) NOT NULL,
  grade VARCHAR(2),
  FOREIGN KEY (student_id) REFERENCES Students(student_id),
  FOREIGN KEY (exam_id) REFERENCES Exams(exam_id),
  FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);

-- ### EVENT MANAGEMENT ###
-- 1. Events Table
CREATE TABLE IF NOT EXISTS Events (
  event_id INT PRIMARY KEY AUTO_INCREMENT,
  event_name VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  description TEXT,
  organizer_id INT NOT NULL,
  FOREIGN KEY (organizer_id) REFERENCES Teachers(teacher_id)
);

-- 2. Event Participation Table
CREATE TABLE IF NOT EXISTS Assoc_Event_Participation (
  participation_id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  participant_id INT NOT NULL,
  participant_type ENUM('Student', 'Teacher') NOT NULL,
  FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

-- Create indexes for performance optimization
CREATE INDEX idx_class_id ON Divisions(class_id);
CREATE INDEX idx_division_day ON Timetable(division_id, day);
CREATE INDEX idx_student_id ON Attendance(student_id);
CREATE INDEX idx_student_exam ON Results(student_id, exam_id);
