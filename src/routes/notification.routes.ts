//presencaapp/backend/sistema-presenca-back/src/routes/notification.routes.ts

import { Router, Request, Response } from 'express';
import { NotificationController } from '../controllers/NotificationController';

const router = Router();
const notificationController = new NotificationController();

// Rotas principais
router.post('/', async (req: Request, res: Response) => {
  await notificationController.create(req, res);
});

router.get('/user/:userId', async (req: Request, res: Response) => {
  await notificationController.getUserNotifications(req, res);
});

// Aqui você já tem o patch para marcar como lida, mas vamos adicionar o PUT para atualizações completas.
router.put('/:id', async (req: Request, res: Response) => {
  await notificationController.update(req, res);  // Usando o novo método `update`
});

router.patch('/:id/read', async (req: Request, res: Response) => {
  await notificationController.markAsRead(req, res);
});

router.patch('/user/:userId/read-all', async (req: Request, res: Response) => {
  await notificationController.markAllAsRead(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await notificationController.delete(req, res);
});

// Novas rotas
router.post('/event/:eventId/remind', async (req: Request, res: Response) => {
  await notificationController.sendEventReminder(req, res);
});

router.post('/attendance/confirm', async (req: Request, res: Response) => {
  await notificationController.sendAttendanceConfirmation(req, res);
});

router.post('/event/:eventId/update', async (req: Request, res: Response) => {
  await notificationController.sendUpdateNotification(req, res);
});

// Rota para enviar notificação
router.post('/send-push-notification', async (req: Request, res: Response) => {
  await notificationController.sendPushNotification(req, res);
});


export default router;
 
