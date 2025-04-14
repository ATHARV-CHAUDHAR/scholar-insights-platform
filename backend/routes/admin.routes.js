
const express = require('express');
const adminController = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply middleware to all routes
router.use(authenticate);
router.use(authorize(['admin']));

// Admin routes
router.get('/dashboard', adminController.getDashboardData);
router.get('/teachers', adminController.getTeachers);
router.post('/teachers', adminController.createTeacher);
router.get('/teacher/:id', adminController.getTeacherDetails);
router.put('/teacher/:id', adminController.updateTeacher);
router.delete('/teacher/:id', adminController.deleteTeacher);
router.get('/students', adminController.getStudents);
router.post('/students', adminController.createStudent);
router.get('/student/:id', adminController.getStudentDetails);
router.put('/student/:id', adminController.updateStudent);
router.delete('/student/:id', adminController.deleteStudent);
router.get('/classes', adminController.getClasses);
router.post('/classes', adminController.createClass);
router.get('/class/:id', adminController.getClassDetails);
router.put('/class/:id', adminController.updateClass);
router.delete('/class/:id', adminController.deleteClass);
router.get('/system-status', adminController.getSystemStatus);
router.get('/calendar', adminController.getCalendarEvents);

module.exports = router;
