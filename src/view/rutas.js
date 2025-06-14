import express from 'express';
import { getProfile, googleLogin, updateProfile } from '../controller/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { addProduct, deleteProduct, getAllProducts, searchProducts, updateProduct } from '../controller/productController.js';

const router = express.Router();

// Ruta auth
router.post('/auth/google', googleLogin);

// Rutas protegidas de perfil
router.get('/me', authenticateToken, getProfile);
router.put('/me', authenticateToken, updateProfile);

// Productos
// Rutas publicas
router.get('/products/getAll', getAllProducts);
router.get('/products/search', searchProducts);

// Rutas protegidas
router.post('/products/add', authenticateToken, addProduct);
router.put('/products/update/:id', authenticateToken, updateProduct);
router.delete('/products/delete/:id', authenticateToken, deleteProduct);

export default router;
