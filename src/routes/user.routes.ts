import { Router, RequestHandler } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

const register: RequestHandler = async (req, res) => {
  await userController.register(req, res);
};

const login: RequestHandler = async (req, res) => {
  await userController.login(req, res);
};

const getUserProfile: RequestHandler = async (req, res) => {
  await userController.getUserProfile(req, res);
};

const updateUserProfile: RequestHandler = async (req, res) => {
  await userController.updateUserProfile(req, res);
};

const getAllUsers: RequestHandler = async (req, res) => {
  await userController.getAllUsers(req, res);
};

const getUsersByType: RequestHandler = async (req, res) => {
  await userController.getUsersByType(req, res);
};

const deleteUser: RequestHandler = async (req, res) => {
  await userController.deleteUser(req, res);
};

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/users/profile/:id', getUserProfile);
router.put('/users/profile/:id', updateUserProfile);
router.get('/users', getAllUsers);
router.get('/users/type/:role', getUsersByType);
router.delete('/users/:id', deleteUser);

export default router;
