import { Router, Request, Response } from 'express';
import { NotificationController } from '../controllers/NotificationController';

const router = Router();
const notificationController = new NotificationController();

// Rotas existentes
router.post('/notifications', async (req: Request, res: Response) => {
  await notificationController.create(req, res);
});

router.get('/notifications/user/:userId', async (req: Request, res: Response) => {
  await notificationController.getUserNotifications(req, res);
});

router.patch('/notifications/:id/read', async (req: Request, res: Response) => {
  await notificationController.markAsRead(req, res);
});

router.patch('/notifications/user/:userId/read-all', async (req: Request, res: Response) => {
  await notificationController.markAllAsRead(req, res);
});

router.delete('/notifications/:id', async (req: Request, res: Response) => {
  await notificationController.delete(req, res);
});

// Novas rotas
router.post('/notifications/event/:eventId/remind', async (req: Request, res: Response) => {
  await notificationController.sendEventReminder(req, res);
});

router.post('/notifications/attendance/confirm', async (req: Request, res: Response) => {
  await notificationController.sendAttendanceConfirmation(req, res);
});

router.post('/notifications/event/:eventId/update', async (req: Request, res: Response) => {
  await notificationController.sendUpdateNotification(req, res);
});

export default router;