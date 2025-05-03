import { usersModels } from '../config/db.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersModels.findAll();
        if (users.length === 0) {
            return res.status(200).json({
                "error": "No hay usuarios registrados",
            });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error al obtener los usuarios",
        });
    }
}

export const addUser = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const user = await usersModels.findOne({
            where: {
                email: email,
            }
        });
        if (user == null) {
            await usersModels.create(req.body);
            return res.status(201).json({
                message: "Usuario creado correctamente",
            });
        }

        return res.status(400).json({
            "error": "El usuario ya existe",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error al agregar el usuario",
        });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    try {
        const user = await usersModels.findOne({
            where: {
                id: id,
            }
        });
        
        if ( user != null ) {
            await usersModels.update(req.body, {
                where: {
                    id: id,
                }
            });
            return res.status(200).json({
                message: "Usuario actualizado correctamente",
            });
        }

        return res.status(400).json({
            "error": `Usuario con id ${id} no encontrado`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error interno al actualizar el usuario",
        });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersModels.findOne({
            where: {
                id: id,
            }
        });
        
        if ( user != null ) {
            await usersModels.destroy({
                where: {
                    id: id,
                }
            });
            return res.status(200).json({
                message: "Usuario eliminado correctamente",
            });
        }

        return res.status(400).json({
            "error": `Usuario con id ${id} no encontrado`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error interno al eliminar el usuario",
        });
    }
}