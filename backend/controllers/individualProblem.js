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

    // Extract problem statement, difficulty, and test cases information
    const { problemStatement, difficulty, numTestCases, inputTestCases, outputTestCases } = problem;
    console.log(problem);
    // Return the required data in the response
    res.json({
      problemStatement,
      difficulty,
      numTestCases, // Include numTestCases in the response
      inputTestCases,
      outputTestCases,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default individualProblem;
