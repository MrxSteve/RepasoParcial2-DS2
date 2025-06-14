import { OAuth2Client } from 'google-auth-library';
import { usersModels } from '../config/db.js';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // Verificar el token enviado desde el frontend
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await usersModels.findOne({ where: { email } });

        if (!user) {
            user = await usersModels.create({
                nombreCompleto: name,
                email,
                picture
            });
        }

        const appToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login exitoso',
            token: appToken,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Token de Google invalido' });
    }
};

export const getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await usersModels.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
};

export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { username, nombreCompleto, telefono } = req.body;

    try {
        await usersModels.update(
            { username, nombreCompleto, telefono },
            { where: { id: userId } }
        );

        const updatedUser = await usersModels.findByPk(userId);
        res.status(200).json({
            message: "Perfil actualizado correctamente",
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al actualizar el perfil" });
    }
};