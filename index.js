import app from "./app.js";
import { sequelize } from "./src/database/database.js";
import dotenv from "dotenv"; //traemos las variables de entorno
dotenv.config({path: '.env'})
import './src/models/User.js'

async function main() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        //if no exist CREATE tables
        await sequelize.sync({ force: false });
        app.listen(process.env.PORT)
        console.log(`Servidor en el puerto ${process.env.PORT}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main()
