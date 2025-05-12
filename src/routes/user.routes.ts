// src/routes/user.routes.ts
import { Request, Response } from 'express';
import { Router, RequestHandler } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// Função para registrar usuário
const register: RequestHandler = async (req, res) => {
  await userController.register(req, res);
};

// Função para login do usuário
const login: RequestHandler = async (req, res) => {
  await userController.login(req, res);
};

// Função para solicitar o link de login
const requestLoginLink: RequestHandler = async (req, res) => {
  await userController.requestLoginLink(req, res);
};

// Função para obter o perfil do usuário
const getUserProfile: RequestHandler = async (req, res) => {
  await userController.getUserProfile(req, res);
};

// Função para atualizar o perfil do usuário
const updateUserProfile: RequestHandler = async (req, res) => {
  await userController.updateUserProfile(req, res);
};

// Função para obter todos os usuários
const getAllUsers: RequestHandler = async (req, res) => {
  await userController.getAllUsers(req, res);
};

// Função para obter usuários por tipo (role)
const getUsersByType: RequestHandler = async (req, res) => {
  await userController.getUsersByType(req, res);
};

// Função para deletar um usuário
const deleteUser: RequestHandler = async (req, res) => {
  await userController.deleteUser(req, res);
};

// Função para enviar o link de login
const sendSignInLink: RequestHandler = async (req, res) => {
  await userController.sendSignInLink(req, res);
};

// Função para atualizar o FCM token
const updateFCMToken: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Lógica para atualizar o FCM token
    const { userId, fcmToken } = req.body;
    // Aqui você pode chamar um método do UserController para atualizar o token FCM
    // Exemplo: await userController.updateFCMToken(userId, fcmToken);

    res.status(200).json({ message: 'FCM token atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o FCM token:', error);
    res.status(500).json({ error: 'Erro ao atualizar FCM token' });
  }
};

// ROTAS DE USUÁRIO
router.post('/update-fcm-token', updateFCMToken); // Atualização da rota para usar o novo RequestHandler assíncrono

// Outras rotas
router.get('/', getAllUsers);
router.get('/type/:role', getUsersByType);
router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', updateUserProfile);
router.delete('/:id', deleteUser);

// ROTAS DE AUTENTICAÇÃO
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/request-login-link', requestLoginLink);
router.post('/auth/send-link', sendSignInLink);

export default router;

