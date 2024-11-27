import express from 'express';
import { logout, login, register } from '../controllers/authController.js';

const router = express.Router();

router.post("/logout", logout);
router.post("/login", login);
router.post("/register", register);

export default router;


