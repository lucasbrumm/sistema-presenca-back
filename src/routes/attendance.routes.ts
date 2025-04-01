import { Router, Request, Response } from 'express';
import { AttendanceController } from '../controllers/AttendanceController';

const router = Router();
const attendanceController = new AttendanceController();

// Routes
router.post('/attendance/mark', async (req: Request, res: Response) => {
  await attendanceController.markAttendance(req, res);
});

router.post('/attendance/verify', async (req: Request, res: Response) => {
  await attendanceController.verifyAttendance(req, res);
});

router.post('/attendance/sync/:eventId', async (req: Request, res: Response) => {
  await attendanceController.syncAttendance(req, res);
});

router.get('/attendance/event/:eventId', async (req: Request, res: Response) => {
  await attendanceController.getEventAttendance(req, res);
});

router.get('/attendance/user/:userId', async (req: Request, res: Response) => {
  await attendanceController.getUserAttendance(req, res);
});

router.get('/attendance/report/:eventId', async (req: Request, res: Response) => {
  await attendanceController.generateReport(req, res);
});

export default router;
