import User from "../models/user.js";
import mongoose from "mongoose";
import Problem from "../models/problem.js";
import { v4 as uuidv4 } from 'uuid';


const addProblem = async (req, res) => {
  try {
    console.log("Cookies :", req.cookies);
    const userEmail = req.cookies.email;
    if (!userEmail) {
      return res.status(400).json({ message: "Email Cookie is missing" });
    }
    const userProfile = await User.findOne({ email: userEmail });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    if (userProfile.role !== "Admin") {
      return res.status(403).json({ message: "You are not an Admin!" });
    }
    console.log("You are an admin");
    // Check if all required fields are present
    const {
      difficulty,
      problemStatement,
      numTestCases,
      numInputs,
      numOutputs,
      inputTypes,
      outputTypes,
      inputTestCases,
      outputTestCases,
    } = req.body;
    if (
      !difficulty ||
      !problemStatement ||
      !numTestCases ||
      !numInputs ||
      !numOutputs ||
      !inputTypes ||
      !outputTypes ||
      !inputTestCases ||
      !outputTestCases
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    console.log("All data Present");

    const problem = await Problem.create({
      id:uuidv4(),
      difficulty,
      problemStatement,
      numTestCases,
      numInputs,
      numOutputs,
      inputTypes,
      outputTypes,
      inputTestCases,
      outputTestCases,
    });
    console.log("No Problem while saving");
    console.log("Problem added:", problem);
    return res.status(200).json({ message: "Problem added" });
  } catch (error) {
    console.error("Error adding problem:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default addProblem;
