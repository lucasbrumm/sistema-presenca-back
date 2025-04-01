import { Request, Response } from 'express';
import { User, IUser } from '../models/User';

export class UserController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: IUser = await User.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Error creating user' });
    }
  }

  public findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users: IUser[] = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching users' });
    }
  }

  public findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: IUser | null = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching user' });
    }
  }
}
