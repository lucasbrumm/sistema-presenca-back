import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async loginWithFirebase(firebaseToken: string) {
    try {
      if (!firebaseToken) {
        throw new Error('Token do Firebase não fornecido');
      }
      return await this.userService.loginWithFirebase(firebaseToken);
    } catch (error) {
      console.error('Erro ao autenticar com Firebase:', error);
      throw error;
    }
  }

  public async getUserProfile(firebaseUid: string) {
    try {
      return await this.userService.getUserProfile(firebaseUid);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      throw error;
    }
  }

  public async updateUserProfile(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.updateUserProfile(req.params.id, req.body);
      return res.json(user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Error updating user' });
    }
  };

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
