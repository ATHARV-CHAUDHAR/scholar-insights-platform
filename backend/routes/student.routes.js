
const express = require('express');
const studentController = require('../controllers/student.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply middleware to all routes
router.use(authenticate);
router.use(authorize(['student']));

// Student routes
router.get('/dashboard', studentController.getDashboardData);
router.get('/attendance', studentController.getAttendance);
router.get('/performance', studentController.getPerformance);
router.get('/calendar', studentController.getCalendarEvents);

module.exports = router;
