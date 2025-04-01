import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { RegisterUserDTO, LoginDTO, UpdateUserDTO } from '../interfaces/user.interface';

export class UserService {
  public async register(userData: RegisterUserDTO) {
    try {
      // Verificar se o email já existe
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Hash da senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Criar usuário
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });

      // Gerar token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      const { password, ...userWithoutPassword } = user.toObject();
      return { ...userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }

  public async login(loginData: LoginDTO) {
    try {
      // Buscar usuário pelo email
      const user = await User.findOne({ email: loginData.email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Verificar senha
      const isValidPassword = await bcrypt.compare(loginData.password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Gerar token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Retornar usuário sem a senha e com o token
      const { password, ...userWithoutPassword } = user.toObject();
      return { ...userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }

  public async getUserProfile(userId: string) {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
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
