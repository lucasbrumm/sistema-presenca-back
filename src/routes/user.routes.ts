import { Router, RequestHandler } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

const createUser: RequestHandler = async (req, res) => {
  await userController.create(req, res);
};

const getAllUsers: RequestHandler = async (req, res) => {
  await userController.findAll(req, res);
};

const getUserById: RequestHandler = async (req, res) => {
  await userController.findById(req, res);
};

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

export default router;
