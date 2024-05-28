// utils/storeInDatabase.js
import Problem from "../models/problem.js";

const storeInDatabase = async (difficulty, problemStatement, inputFilePath, outputFilePath) => {
    try {
        const problem = new Problem({
            difficulty,
            problemStatement,
            inputTestCases: inputFilePath,
            outputTestCases: outputFilePath
        });

        await problem.save();

        console.log("Problem stored in the database successfully.");
    } catch (error) {
        console.error("Error storing problem in the database:", error);
    }
};

export default storeInDatabase;
