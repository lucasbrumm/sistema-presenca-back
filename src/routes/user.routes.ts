import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyFirebaseToken } from '../middleware/firebaseAuth';

const router = Router();
const userController = new UserController();

// Rota para criar novo usuário
router.post('/register', async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

// Rota de autenticação com Firebase
router.post('/auth/firebase', async (req: Request, res: Response) => {
  await userController.loginWithFirebase(req, res);
});

// Rotas públicas acima

// Rotas protegidas que requerem autenticação abaixo
router.use(verifyFirebaseToken);

// Rota para obter perfil do usuário autenticado
router.get('/profile', async (req: Request, res: Response) => {
  await userController.getUserProfile(req, res);
});

export default router;
