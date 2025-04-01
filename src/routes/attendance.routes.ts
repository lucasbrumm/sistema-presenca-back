import { Router, RequestHandler } from 'express';
import { AttendanceController } from '../controllers/AttendanceController';

const router = Router();
const attendanceController = new AttendanceController();

const checkIn: RequestHandler = async (req, res) => {
  await attendanceController.checkIn(req, res);
};

const getEventAttendance: RequestHandler = async (req, res) => {
  await attendanceController.getEventAttendance(req, res);
};

const getUserAttendance: RequestHandler = async (req, res) => {
  await attendanceController.getUserAttendance(req, res);
};

const syncOfflineAttendance: RequestHandler = async (req, res) => {
  await attendanceController.syncOfflineAttendance(req, res);
};

// Routes
router.post('/attendance/check-in', checkIn);
router.get('/attendance/event/:eventId', getEventAttendance);
router.get('/attendance/user/:userId', getUserAttendance);
router.post('/attendance/sync', syncOfflineAttendance);

export default router;
