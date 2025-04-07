import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao criar usuário',
      });
    }
  }

  public async loginWithFirebase(req: Request, res: Response): Promise<Response> {
    try {
      const { firebaseToken } = req.body;
      if (!firebaseToken) {
        return res.status(400).json({ error: 'Token do Firebase não fornecido' });
      }
      const result = await this.userService.loginWithFirebase(firebaseToken);
      return res.json(result);
    } catch (error) {
      console.error('Erro ao autenticar com Firebase:', error);
      return res
        .status(401)
        .json({ error: error instanceof Error ? error.message : 'Erro na autenticação' });
    }
  }

  public async getUserProfile(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.firebaseUid) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }
      const user = await this.userService.getUserProfile(req.user.firebaseUid);
      return res.json(user);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Erro ao obter perfil do usuário',
      });
    }
  }

  public async updateUserProfile(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.updateUserProfile(req.params.id, req.body);
      return res.json(user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res
        .status(400)
        .json({ error: error instanceof Error ? error.message : 'Error updating user' });
    }
  }

  public getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(400).json({ error: 'Error fetching users' });
    }
  };

  public getUsersByType = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.getUsersByType(req.params.role);
      return res.json(users);
    } catch (error) {
      console.error('Error fetching users by type:', error);
      return res.status(400).json({ error: 'Error fetching users' });
    }
  };
}
