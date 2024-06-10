import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

import dotenv from 'dotenv';
import router from "./routes/routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://onlinejudgeprateek.vercel.app',
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));