import { promises as fs } from "fs";
import generateFile from "../controllers/generateFile.js";
import { v4 as uuid } from "uuid";
import { promisify } from "util";
import { exec as execAsync } from "child_process";

const exec = promisify(execAsync);

const ensureDirExists = async (dir) => {
  try {
    await fs.stat(dir);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
    } else {
      throw error;
    }
  }
};

const submit = async (req, res) => {
  try {
    const { language, code, numTestCases, inputTestCases, outputTestCases } =
      req.body;
    let passed = true;
    // Inside the submit function in the backend
    console.log("Request Body:", req.body);

    const results = [];

    // Iterate over each output
    for (let i = 0; i < numTestCases; i++) {
      const input = inputTestCases[i];
      let expectedOutput = outputTestCases[i];

      // Ensure expectedOutput is a string
      if (typeof expectedOutput !== "string") {
        expectedOutput = expectedOutput.toString();
      }

      const basename = uuid();
      let extension;

      switch (language) {
        case "c++":
          extension = ".cpp";
          break;
        case "python":
          extension = ".py";
          break;
        case "c":
          extension = ".c";
          break;
        case "java":
          extension = ".java";
          break;
        default:
          return res.status(400).json({ error: "Unsupported language" });
      }

      const codeFilePath = await generateFile(
        code,
        basename,
        extension,
        "codes"
      );
      const inputFilePath = await generateFile(
        input,
        basename,
        ".txt",
        "inputs"
      );
      const outputFilePath = `${codeFilePath.slice(0, -extension.length)}.out`;

      let command;

      switch (language) {
        case "c++":
          command = `g++ ${codeFilePath} -o ${outputFilePath} && ./${outputFilePath} < ${inputFilePath}`;
          break;
        case "python":
          command = `python ${codeFilePath} < ${inputFilePath}`;
          break;
        case "c":
          command = `gcc ${codeFilePath} -o ${outputFilePath} && ./${outputFilePath} < ${inputFilePath}`;
          break;
        case "java":
          command = `cd codes && javac Main.java && java Main`;
          break;
      }

      await ensureDirExists("codes");
      await ensureDirExists("inputs");

      try {
        const { stdout, stderr } = await exec(command);
        const result = {
          input: input,
          expectedOutput: expectedOutput,
          output: stdout,
          error: stderr ? stderr : null,
        };
        console.log(stdout);
        results.push(result);
        // Compare outputs after trimming whitespace and converting to lowercase
        if (
          expectedOutput.trim().toLowerCase() !== stdout.trim().toLowerCase()
        ) {
          passed = false;
        }
      } catch (error) {
        console.error("Error executing command:", error);
        return res.status(500).json({ error: "Error executing command" });
      }
    }
    console.log(passed);
    // Respond based on whether all test cases passed or not
    if (passed) {
      return res.json({ message: "Code accepted", correct: 1 });
    } else {
      return res.json({
        message: "Code not accepted",
        correct: 0,
      });
    }
    console.log(passed);
  } catch (error) {
    console.error("Error submitting code:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default submit;
