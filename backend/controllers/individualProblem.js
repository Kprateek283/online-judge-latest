// individualProblem.js

import Problem from "../models/problem.js";

const individualProblem = async (req, res) => {
  try {
    // Extract problem ID from request parameters
    const id = req.params.id;

    // Find problem by ID
    const problem = await Problem.findOne({ id: id });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Extract problem statement, difficulty, and first element of input/output test cases
    const { problemStatement, difficulty, inputTestCases, outputTestCases } = problem;
    const firstInputTestCase = inputTestCases.length > 0 ? inputTestCases[0] : null;
    const firstOutputTestCase = outputTestCases.length > 0 ? outputTestCases[0] : null;

    // Return the required data in the response
    res.json({
      problemStatement,
      difficulty,
      firstInputTestCase,
      firstOutputTestCase
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default individualProblem;
