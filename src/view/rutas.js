import express from 'express';
import { getProfile, googleLogin, updateProfile } from '../controller/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta auth
router.post('/auth/google', googleLogin);

// Rutas protegidas de perfil
router.get('/me', authenticateToken, getProfile);
router.put('/me', authenticateToken, updateProfile);

export default router;
