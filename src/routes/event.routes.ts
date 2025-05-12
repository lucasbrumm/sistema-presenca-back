import { Router, RequestHandler } from 'express';
import { EventController } from '../controllers/EventController';

const router = Router();
const eventController = new EventController();

const createEvent: RequestHandler = async (req, res) => {
  await eventController.createEvent(req, res);
};

const updateEvent: RequestHandler = async (req, res) => {
  await eventController.updateEvent(req, res);
};

const deleteEvent: RequestHandler = async (req, res) => {
  await eventController.deleteEvent(req, res);
};

const getEventById: RequestHandler = async (req, res) => {
  await eventController.getEventById(req, res);
};

const getAllEvents: RequestHandler = async (req, res) => {
  await eventController.getAllEvents(req, res);
};

const getEventsByCreator: RequestHandler = async (req, res) => {
  await eventController.getEventsByCreator(req, res);
};

const registerForEvent: RequestHandler = async (req, res) => {
  await eventController.registerForEvent(req, res);
};

const generateQRCode: RequestHandler = async (req, res) => {
  await eventController.generateQRCode(req, res);
};

const getAttendees: RequestHandler = async (req, res) => {
  await eventController.getAttendees(req, res);
};

// Agora as rotas não incluem /events, pois o prefixo virá do server.ts
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/:id', getEventById);
router.get('/', getAllEvents);
router.get('/creator/:creatorId', getEventsByCreator);
router.post('/:id/register', registerForEvent);
router.get('/:id/qrcode', generateQRCode);
router.get('/:id/attendees', getAttendees);

export default router;

