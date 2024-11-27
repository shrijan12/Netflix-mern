import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { ENV_VAR } from './config/configVar.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = ENV_VAR.PORT;
app.use(express.json()); //will allow us to parse req.body object
app.use("/api/v1/auth", authRoutes);
app.listen(PORT, ()=> {
    console.log("Server have been started at http://localhost:"+ PORT)
    connectDB();
});