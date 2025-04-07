import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyFirebaseToken } from '../middleware/firebaseAuth';

const router = Router();
const userController = new UserController();

// Rota de autenticação com Firebase
router.post('/auth/firebase', async (req: Request, res: Response) => {
  await userController.loginWithFirebase(req, res);
});

// Rotas protegidas que requerem autenticação
router.use(verifyFirebaseToken);

// Rota para obter perfil do usuário autenticado
router.get('/profile', async (req: Request, res: Response) => {
  await userController.getUserProfile(req, res);
});

export default router;
