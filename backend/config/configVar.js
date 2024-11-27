import dotenv from 'dotenv';

dotenv.config();

export const ENV_VAR = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: 5000 || process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV
}