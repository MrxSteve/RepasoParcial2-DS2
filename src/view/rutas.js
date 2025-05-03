import express from 'express';
import { addUser, deleteUser, getAllUsers, updateUser } from '../controller/userController.js';

const router = express.Router();

router.get('/users/getAllUsers', getAllUsers);
router.post('/users/addUser', addUser);
router.put('/users/updateUser/:id', updateUser);
router.delete('/users/deleteUser/:id', deleteUser)

export default router;