import { DataTypes } from 'sequelize';

export const userModel = async (sequelize) => {
    const usuario = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: true, 
        },
        nombreCompleto: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        picture: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true,
        }
    }, {
        timestamps: false,
    });
    return usuario;
}
