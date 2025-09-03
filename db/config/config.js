// require('dotenv').config(); // Load .env into process.env
import dotenv from 'dotenv';

dotenv.config();

export default {
 development: {
   use_env_variable: 'DB_CONNECTION',
   dialect: "mysql"
 },
 test: {
   use_env_variable: 'DB_CONNECTION',
   dialect: "mysql"
 },
 production: {
   use_env_variable: 'DB_CONNECTION',
   dialect: "mysql"
 }
};