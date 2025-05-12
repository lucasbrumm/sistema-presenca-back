//presencaapp/backend/sistema-presenca-back/src/routes/attendance.routes.ts

import { Router, Request, Response } from 'express';
import { AttendanceController } from '../controllers/AttendanceController';

const router = Router();
const attendanceController = new AttendanceController();

// Rotas de presença
router.post('/mark', async (req: Request, res: Response) => {
  await attendanceController.markAttendance(req, res);
});

router.post('/verify', async (req: Request, res: Response) => {
  await attendanceController.verifyAttendance(req, res);
});

router.post('/sync/:eventId', async (req: Request, res: Response) => {
  await attendanceController.syncAttendance(req, res);
});

router.get('/event/:eventId', async (req: Request, res: Response) => {
  await attendanceController.getEventAttendance(req, res);
});

router.get('/user/:userId', async (req: Request, res: Response) => {
  await attendanceController.getUserAttendance(req, res);
});

router.get('/report/:eventId', async (req: Request, res: Response) => {
  await attendanceController.generateReport(req, res);
});

router.get('/event/:eventId/participants', async (req: Request, res: Response) => {
  await attendanceController.getEventParticipants(req, res);
});

router.get('/all-participants', async (req: Request, res: Response) => {
  await attendanceController.getAllParticipants(req, res);
});

export default router;

