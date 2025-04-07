import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyFirebaseToken } from '../middleware/firebaseAuth';

const router = Router();
const userController = new UserController();

// Rota de autenticação com Firebase
router.post('/auth/firebase', ((req: Request, res: Response) => {
  (async () => {
    try {
      if (!req.body.firebaseToken) {
        res.status(400).json({ error: 'Token do Firebase não fornecido' });
        return;
      }
      const result = await userController.loginWithFirebase(req.body.firebaseToken);
      res.json(result);
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      res.status(401).json({ error: error instanceof Error ? error.message : 'Erro na autenticação' });
    }
  })();
}) as RequestHandler);

// Rotas protegidas que requerem autenticação
router.use(verifyFirebaseToken);

// Rota para obter perfil do usuário autenticado
router.get('/profile', (async (req: Request, res: Response) => {
  (async () => {
    try {
      if (!req.user?.firebaseUid) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const user = await userController.getUserProfile(req.user.firebaseUid);
      res.json(user);
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Erro ao obter perfil do usuário' });
    }
  })();
}) as RequestHandler);

export default router;
