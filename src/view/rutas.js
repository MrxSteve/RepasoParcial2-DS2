import express from 'express';
import { addEmpleado, deleteEmpleado, getAllEmpleados, updateEmpleado } from '../controller/empleadoController.js';

const router = express.Router();

router.get('/empleados/getAll', getAllEmpleados);
router.post('/empleados/add', addEmpleado);
router.put('/empleados/update/:id', updateEmpleado);
router.delete('/empleados/delete/:id', deleteEmpleado);

export default router;