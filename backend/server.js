import express from "express";
import cors from 'cors';
import router from './routes/routes.js';
import { DBConnection } from "./database/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/user.js"; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

DBConnection();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));