import express from "express";
import compiler from "../controllers/compiler.js";
import submit from "../controllers/submit.js";

const router = express.Router();

router.post('/compiler',compiler);
router.post('/submit',submit);

export default router;
