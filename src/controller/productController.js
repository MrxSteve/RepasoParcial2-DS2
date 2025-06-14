import { productsModel } from '../config/db.js';
import { Op } from 'sequelize';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.findAll();
        if (products.length === 0) {
            return res.status(200).json({
                "error": "No hay productos registrados",
            });
        }
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error al obtener los productos",
        });
    }
}

export const addProduct = async (req, res) => {
    const { nombre, marca, categoria, picture, precio } = req.body;
    try {
        await productsModel.create({ nombre, marca, categoria, picture, precio });
        return res.status(201).json({
            message: "Producto creado correctamente",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error al agregar el producto",
        });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, categoria, picture, precio } = req.body;

    try {
        const product = await productsModel.findOne({ where: { id } });

        if (product) {
            await productsModel.update(
                { nombre, marca, categoria, picture, precio },
                { where: { id } }
            );
            return res.status(200).json({
                message: "Producto actualizado correctamente",
            });
        }
        return res.status(400).json({
            "error": `Producto con id ${id} no encontrado`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error interno al actualizar el producto",
        });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productsModel.findOne({ where: { id } });

        if (product) {
            await productsModel.destroy({ where: { id } });
            return res.status(200).json({
                message: "Producto eliminado correctamente",
            });
        }
        return res.status(400).json({
            "error": `Producto con id ${id} no encontrado`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error interno al eliminar el producto",
        });
    }
}

export const searchProducts = async (req, res) => {
    const { nombre, marca, categoria, precioMin, precioMax } = req.query;

    try {
        const filters = {};

        if (nombre) filters.nombre = { [Op.iLike]: `%${nombre}%` };
        if (marca) filters.marca = { [Op.iLike]: `%${marca}%` };
        if (categoria) filters.categoria = { [Op.iLike]: `%${categoria}%` };

        if (precioMin || precioMax) {
            filters.precio = {};
            if (precioMin) filters.precio[Op.gte] = parseFloat(precioMin);
            if (precioMax) filters.precio[Op.lte] = parseFloat(precioMax);
        }

        const products = await productsModel.findAll({ where: filters });

        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Error al buscar productos",
        });
    }
}

