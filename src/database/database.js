import { Sequelize } from "sequelize";
import dotenv from "dotenv"; //traemos las variables de entorno
dotenv.config({path: '.env'})

export const sequelize = new Sequelize(process.env.SECRET_KEY)