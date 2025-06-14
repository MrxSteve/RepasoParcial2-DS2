import { DataTypes } from 'sequelize';

export const productModel = async (sequelize) => {
    const producto = sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },
        marca: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        categoria: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        picture: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        }
    }, {
        timestamps: false,
    });
    return producto;
}