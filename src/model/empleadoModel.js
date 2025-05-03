import { DataTypes } from 'sequelize';

export const empleadoModel = async (sequelize) => {
    const empleado = sequelize.define('empleados', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: false,
        }
    }, {
        timestamps: true,
    });

    return empleado;
}