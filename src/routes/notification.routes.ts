import { Router, RequestHandler } from 'express';
import { NotificationController } from '../controllers/NotificationController';

const router = Router();
const notificationController = new NotificationController();

const createNotification: RequestHandler = async (req, res) => {
  await notificationController.create(req, res);
};

const getUserNotifications: RequestHandler = async (req, res) => {
  await notificationController.getUserNotifications(req, res);
};

const markAsRead: RequestHandler = async (req, res) => {
  await notificationController.markAsRead(req, res);
};

const markAllAsRead: RequestHandler = async (req, res) => {
  await notificationController.markAllAsRead(req, res);
};

const deleteNotification: RequestHandler = async (req, res) => {
  await notificationController.delete(req, res);
};

router.post('/notifications', createNotification);
router.get('/notifications/user/:userId', getUserNotifications);
router.put('/notifications/:id/read', markAsRead);
router.put('/notifications/user/:userId/read-all', markAllAsRead);
router.delete('/notifications/:id', deleteNotification);

export default router;
