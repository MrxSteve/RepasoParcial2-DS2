import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    }
);

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos exitosa');

        await sequelize.sync();
        console.log('Sincronizacion de la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

export {
    sequelize,
    connection,
}