import { Router, RequestHandler } from 'express';
import { EventController } from '../controllers/EventController';

const router = Router();
const eventController = new EventController();

const createEvent: RequestHandler = async (req, res) => {
  await eventController.create(req, res);
};

const getAllEvents: RequestHandler = async (req, res) => {
  await eventController.findAll(req, res);
};

const getEventById: RequestHandler = async (req, res) => {
  await eventController.findById(req, res);
};

const updateEvent: RequestHandler = async (req, res) => {
  await eventController.update(req, res);
};

const deleteEvent: RequestHandler = async (req, res) => {
  await eventController.delete(req, res);
};

const registerForEvent: RequestHandler = async (req, res) => {
  await eventController.register(req, res);
};

const updateAttendeeStatus: RequestHandler = async (req, res) => {
  await eventController.updateAttendeeStatus(req, res);
};

router.post('/events', createEvent);
router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

router.post('/events/:id/register', registerForEvent);
router.put('/events/attendee/status', updateAttendeeStatus);

export default router;
