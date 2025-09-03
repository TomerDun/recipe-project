import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DB_CONNECTION);

export const sequelize = new Sequelize(process.env.DB_CONNECTION);
