import express from "express";
import signUp from '../controllers/signUp.js';
import logIn from '../controllers/logIn.js';

const router = express.Router();

router.post('/register', signUp);
router.post('/login', logIn);

export default router;