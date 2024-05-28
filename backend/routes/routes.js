import express from "express";
import signUp from '../controllers/signUp.js';
import logIn from '../controllers/logIn.js';
import profile from '../controllers/profile.js';
import addProblem from '../controllers/addProblem.js';
import listProblems from '../controllers/listProblems.js';
import individualProblem from "../controllers/individualProblem.js";
import updateProfile from "../controllers/updateProfile.js";
import deleteUser from "../controllers/deleteUser.js";

const router = express.Router();

router.post('/register', signUp);
router.post('/login', logIn);
router.get('/profile', profile); 
router.post('/addProblem', addProblem);
router.get('/listProblems',listProblems);
router.get('/individualProblem/:id', individualProblem);
router.post('/updateProfile',updateProfile);
router.post('/deleteUser',deleteUser);

export default router;
