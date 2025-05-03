import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connection } from './src/config/db.js';
import router from './src/view/rutas.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})

connection();