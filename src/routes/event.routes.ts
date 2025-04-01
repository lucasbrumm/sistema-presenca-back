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

router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.get('/events/:id', getEventById);
router.get('/events', getAllEvents);
router.get('/events/creator/:creatorId', getEventsByCreator);
router.post('/events/:id/register', registerForEvent);
router.get('/events/:id/qrcode', generateQRCode);
router.get('/events/:id/attendees', getAttendees);

export default router;
