// src/routes/auth.routes.ts

import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { AttendanceController } from '../controllers/AttendanceController';

const router = express.Router();

const authController = new AuthController();
const attendanceController = new AttendanceController();

// Rotas de autenticação
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

// Rota para marcar presença
//router.post('/marcar-presenca', attendanceController.marcarPresenca.bind(attendanceController));
//router.post('/mark-attendance', attendanceController.markAttendance.bind(attendanceController));

export default router;

