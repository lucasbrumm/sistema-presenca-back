import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase.admin';

declare global {
  namespace Express {
    interface Request {
      user?: {
        firebaseUid: string;
        email?: string;
      };
    }
  }
}

export const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    console.log('aq?');
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);

    req.user = {
      firebaseUid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Estende o tipo Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        firebaseUid: string;
        email?: string;
      };
    }
  }
}
