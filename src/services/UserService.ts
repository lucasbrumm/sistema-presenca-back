import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { auth } from '../config/firebase.admin';
import { UpdateUserDTO } from '../dtos/user.dto';

export class UserService {
  public async loginWithFirebase(firebaseToken: string) {
    try {
      // Verifica o token do Firebase
      const decodedToken = await auth.verifyIdToken(firebaseToken);
      
      // Procura o usuário no banco de dados
      let user = await User.findOne({ firebaseUid: decodedToken.uid });
      
      // Se o usuário não existir, cria um novo
      if (!user) {
        user = await User.create({
          email: decodedToken.email,
          firebaseUid: decodedToken.uid,
          name: decodedToken.name || 'Usuário',
          role: 'ALUNO',
          course: 'Não definido',
          registration: `FB-${Date.now()}` // Gera um número de registro temporário
        });
      }

      // Gera o token JWT do backend
      const token = jwt.sign(
        { 
          userId: user._id,
          firebaseUid: decodedToken.uid,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET não está definido no ambiente'); })(),
        { expiresIn: '24h' }
      );

      return { user, token };
    } catch (error: unknown) {
      console.error('Erro no login com Firebase:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      throw new Error('Falha na autenticação com Firebase: ' + errorMessage);
    }
  }

  public async getUserProfile(firebaseUid: string) {
    try {
      const user = await User.findOne({ firebaseUid });
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return user;
    } catch (error: unknown) {
      console.error('Erro ao buscar perfil do usuário:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      throw new Error('Falha ao buscar perfil: ' + errorMessage);
    }
  }
  public async updateUserProfile(userId: string, updateData: UpdateUserDTO) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true }
      ).select('-password');

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async getAllUsers() {
    try {
      return await User.find().select('-password');
    } catch (error) {
      throw error;
    }
  }

  public async getUsersByType(role: string) {
    try {
      return await User.find({ role }).select('-password');
    } catch (error) {
      throw error;
    }
  }
}
