
const { dbConnection } = require('../config/db.config');

// Get parent dashboard data
const getDashboardData = (req, res) => {
  const parentId = req.user.id;
  
  dbConnection.query(
    `SELECT s.student_id, u.username as student_name, c.class_name, d.section
     FROM Parents p
     JOIN Students s ON p.student_id = s.student_id
     JOIN Users u ON s.user_id = u.user_id
     JOIN Classes c ON s.class_id = c.class_id
     JOIN Divisions d ON c.class_id = d.class_id
     WHERE p.user_id = ?`,
    [parentId],
    (error, students) => {
      if (error) {
        console.error('Error fetching parent dashboard data:', error);
        return res.status(500).json({ message: 'Server error fetching dashboard data' });
      }
      
      if (students.length === 0) {
        return res.status(200).json({ 
          children: [],
          recentAttendance: [],
          recentPerformance: []
        });
      }
      
      // Get the first student's ID for recent data
      const studentId = students[0].student_id;
      
      // Get recent attendance
      dbConnection.query(
        `SELECT a.status, a.class_date, s.subject_name
         FROM Attendance a
         JOIN Subjects s ON a.subject_id = s.subject_id
         WHERE a.student_id = ?
         ORDER BY a.class_date DESC
         LIMIT 5`,
        [studentId],
        (error, attendance) => {
          if (error) {
            console.error('Error fetching attendance data:', error);
            return res.status(500).json({ message: 'Server error fetching attendance data' });
          }
          
          // Get recent performance
          dbConnection.query(
            `SELECT r.marks_obtained, r.grade, e.exam_name, s.subject_name
             FROM Results r
             JOIN Exams e ON r.exam_id = e.exam_id
             JOIN Subjects s ON r.subject_id = s.subject_id
             WHERE r.student_id = ?
             ORDER BY e.exam_date DESC
             LIMIT 5`,
            [studentId],
            (error, performance) => {
              if (error) {
                console.error('Error fetching performance data:', error);
                return res.status(500).json({ message: 'Server error fetching performance data' });
              }
              
              res.json({
                children: students,
                recentAttendance: attendance,
                recentPerformance: performance
              });
            }
          );
        }
      );
    }
  );
};

// Get children list
const getChildren = (req, res) => {
  const parentId = req.user.id;
  
  dbConnection.query(
    `SELECT s.student_id, u.username as student_name, c.class_name, d.section
     FROM Parents p
     JOIN Students s ON p.student_id = s.student_id
     JOIN Users u ON s.user_id = u.user_id
     JOIN Classes c ON s.class_id = c.class_id
     JOIN Divisions d ON c.class_id = d.class_id
     WHERE p.user_id = ?`,
    [parentId],
    (error, results) => {
      if (error) {
        console.error('Error fetching children:', error);
        return res.status(500).json({ message: 'Server error fetching children data' });
      }
      
      res.json({ children: results });
    }
  );
};

// Get child details
const getChildDetails = (req, res) => {
  const { id } = req.params;
  const parentId = req.user.id;
  
  // Verify this child belongs to the parent
  dbConnection.query(
    `SELECT s.student_id, u.username as student_name, u.email as student_email, 
            s.enrollment_number, c.class_name, d.section, s.dob
     FROM Parents p
     JOIN Students s ON p.student_id = s.student_id
     JOIN Users u ON s.user_id = u.user_id
     JOIN Classes c ON s.class_id = c.class_id
     JOIN Divisions d ON c.class_id = d.class_id
     WHERE p.user_id = ? AND s.student_id = ?`,
    [parentId, id],
    (error, results) => {
      if (error) {
        console.error('Error fetching child details:', error);
        return res.status(500).json({ message: 'Server error fetching student details' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'Student not found or access denied' });
      }
      
      res.json({ student: results[0] });
    }
  );
};

// Get student attendance
const getStudentAttendance = (req, res) => {
  const { studentId } = req.params;
  const parentId = req.user.id;
  
  // Verify this student belongs to the parent
  dbConnection.query(
    `SELECT COUNT(*) as count FROM Parents WHERE user_id = ? AND student_id = ?`,
    [parentId, studentId],
    (error, results) => {
      if (error) {
        console.error('Error verifying parent-student relationship:', error);
        return res.status(500).json({ message: 'Server error verifying access' });
      }
      
      if (results[0].count === 0) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Get attendance data
      dbConnection.query(
        `SELECT a.attendance_id, a.class_date, a.status, s.subject_name
         FROM Attendance a
         JOIN Subjects s ON a.subject_id = s.subject_id
         WHERE a.student_id = ?
         ORDER BY a.class_date DESC`,
        [studentId],
        (error, attendance) => {
          if (error) {
            console.error('Error fetching attendance:', error);
            return res.status(500).json({ message: 'Server error fetching attendance data' });
          }
          
          // Get attendance summary
          dbConnection.query(
            `SELECT 
              COUNT(*) as total,
              SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present,
              SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absent,
              SUM(CASE WHEN status = 'Late' THEN 1 ELSE 0 END) as late
             FROM Attendance 
             WHERE student_id = ?`,
            [studentId],
            (error, summary) => {
              if (error) {
                console.error('Error fetching attendance summary:', error);
                return res.status(500).json({ message: 'Server error fetching attendance summary' });
              }
              
              res.json({
                attendance: attendance,
                summary: summary[0]
              });
            }
          );
        }
      );
    }
  );
};

// Get student performance
const getStudentPerformance = (req, res) => {
  const { studentId } = req.params;
  const parentId = req.user.id;
  
  // Verify this student belongs to the parent
  dbConnection.query(
    `SELECT COUNT(*) as count FROM Parents WHERE user_id = ? AND student_id = ?`,
    [parentId, studentId],
    (error, results) => {
      if (error) {
        console.error('Error verifying parent-student relationship:', error);
        return res.status(500).json({ message: 'Server error verifying access' });
      }
      
      if (results[0].count === 0) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Get performance data
      dbConnection.query(
        `SELECT r.result_id, r.marks_obtained, r.grade, e.exam_name, e.exam_date, s.subject_name
         FROM Results r
         JOIN Exams e ON r.exam_id = e.exam_id
         JOIN Subjects s ON r.subject_id = s.subject_id
         WHERE r.student_id = ?
         ORDER BY e.exam_date DESC`,
        [studentId],
        (error, performance) => {
          if (error) {
            console.error('Error fetching performance:', error);
            return res.status(500).json({ message: 'Server error fetching performance data' });
          }
          
          // Get performance by subject
          dbConnection.query(
            `SELECT s.subject_name, AVG(r.marks_obtained) as avg_marks
             FROM Results r
             JOIN Subjects s ON r.subject_id = s.subject_id
             WHERE r.student_id = ?
             GROUP BY s.subject_name`,
            [studentId],
            (error, bySubject) => {
              if (error) {
                console.error('Error fetching performance by subject:', error);
                return res.status(500).json({ message: 'Server error fetching performance summary' });
              }
              
              res.json({
                performance: performance,
                bySubject: bySubject
              });
            }
          );
        }
      );
    }
  );
};

// Get calendar events
const getCalendarEvents = (req, res) => {
  const parentId = req.user.id;
  
  // Get student IDs for this parent
  dbConnection.query(
    `SELECT student_id FROM Parents WHERE user_id = ?`,
    [parentId],
    (error, students) => {
      if (error) {
        console.error('Error fetching parent students:', error);
        return res.status(500).json({ message: 'Server error fetching students' });
      }
      
      if (students.length === 0) {
        return res.json({ events: [] });
      }
      
      // Extract student IDs
      const studentIds = students.map(s => s.student_id);
      const placeholders = studentIds.map(() => '?').join(',');
      
      // Get exams
      dbConnection.query(
        `SELECT e.exam_id, e.exam_name, e.exam_date, c.class_name
         FROM Exams e
         JOIN Students s ON e.class_id = s.class_id
         JOIN Classes c ON e.class_id = c.class_id
         WHERE s.student_id IN (${placeholders})
         ORDER BY e.exam_date`,
        studentIds,
        (error, exams) => {
          if (error) {
            console.error('Error fetching exams:', error);
            return res.status(500).json({ message: 'Server error fetching exams' });
          }
          
          // Get events
          dbConnection.query(
            `SELECT e.event_id, e.event_name, e.event_date, e.description, u.username as organizer
             FROM Events e
             JOIN Teachers t ON e.organizer_id = t.teacher_id
             JOIN Users u ON t.user_id = u.user_id
             ORDER BY e.event_date`,
            (error, events) => {
              if (error) {
                console.error('Error fetching events:', error);
                return res.status(500).json({ message: 'Server error fetching events' });
              }
              
              // Combine exams and events into one calendar list
              const calendarEvents = [
                ...exams.map(e => ({
                  id: `exam-${e.exam_id}`,
                  title: e.exam_name,
                  start: e.exam_date,
                  type: 'exam',
                  className: 'bg-red-100'
                })),
                ...events.map(e => ({
                  id: `event-${e.event_id}`,
                  title: e.event_name,
                  start: e.event_date,
                  description: e.description,
                  organizer: e.organizer,
                  type: 'event',
                  className: 'bg-blue-100'
                }))
              ];
              
              res.json({ events: calendarEvents });
            }
          );
        }
      );
    }
  );
};

module.exports = {
  getDashboardData,
  getChildren,
  getChildDetails,
  getStudentAttendance,
  getStudentPerformance,
  getCalendarEvents
};
