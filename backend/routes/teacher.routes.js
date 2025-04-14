
const express = require('express');
const teacherController = require('../controllers/teacher.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply middleware to all routes
router.use(authenticate);
router.use(authorize(['teacher', 'admin']));

// Teacher routes
router.get('/dashboard', teacherController.getDashboardData);
router.get('/students', teacherController.getStudents);
router.get('/student/:id', teacherController.getStudentDetails);
router.get('/attendance', teacherController.getAttendance);
router.post('/attendance', teacherController.markAttendance);
router.get('/performance', teacherController.getPerformance);
router.post('/performance', teacherController.recordPerformance);
router.get('/calendar', teacherController.getCalendarEvents);

module.exports = router;
