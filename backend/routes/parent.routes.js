
const express = require('express');
const parentController = require('../controllers/parent.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply middleware to all routes
router.use(authenticate);
router.use(authorize(['parent']));

// Parent routes
router.get('/dashboard', parentController.getDashboardData);
router.get('/children', parentController.getChildren);
router.get('/children/:id', parentController.getChildDetails);
router.get('/attendance/:studentId', parentController.getStudentAttendance);
router.get('/performance/:studentId', parentController.getStudentPerformance);
router.get('/calendar', parentController.getCalendarEvents);

module.exports = router;
