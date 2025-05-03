import { empleadosModels } from '../config/db.js';

export const getAllEmpleados = async (req, res) => {
    try {
        const empleados = await empleadosModels.findAll();
        if (empleados.length === 0) {
            return res.status(200).json({
                "error": "No hay empleados registrados",
            });
        }
        return res.status(200).json(empleados);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error al obtener los empleados",
        });
    }
}

export const addEmpleado = async (req, res) => {
    const { nombre, correo, telefono } = req.body;
    try {
        const empleado = await empleadosModels.findOne({
            where: {
                correo: correo,
            }
        });
        if (empleado == null) {
            await empleadosModels.create(req.body);
            return res.status(201).json({
                message: "Empleado creado correctamente",
            });
        }

        return res.status(400).json({
            "error": "El empleado ya existe",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error al agregar el empleado",
        });
    }
}

export const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono } = req.body;
    try {
        const empleado = await empleadosModels.findOne({
            where: {
                id: id,
            }
        });
        
        if ( empleado != null ) {
            await empleadosModels.update(req.body, {
                where: {
                    id: id,
                }
            });
            return res.status(200).json({
                message: "Empleado actualizado correctamente",
            });
        }

        return res.status(400).json({
            "error": `Empleado con id ${id} no encontrado`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error interno al actualizar el empleado",
        });
    }
}

export const deleteEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const empleado = await empleadosModels.findOne({
            where: {
                id: id,
            }
        });
        
        if ( empleado != null ) {
            await empleadosModels.destroy({
                where: {
                    id: id,
                }
            });
            return res.status(200).json({
                message: "Empleado eliminado correctamente",
            });
        }

        return res.status(400).json({
            "error": `Empleado con id ${id} no encontrado`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error interno al eliminar el empleados",
        });
    }
}