import { exec } from "child_process";
import generateFile from "./generateFile.js";
import { v4 as uuid } from "uuid";

const compiler = async (req, res) => {
  const basename = uuid();
  console.log("Request Body:", req.body);
  const { language, code, input } = req.body;
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

  let codeFilePath;
  try {
    if (language == "java") {
      codeFilePath = await generateFile(code, "Main", extension, "codes");
    } else {
      codeFilePath = await generateFile(code, basename, extension, "codes");
    }
    console.log(codeFilePath);
    const inputFilePath = await generateFile(input, basename, ".txt", "inputs");
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
        command = `cd codes && javac Main.java && java Main `;
        break;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error while compiling/executing code:", error);
        return res
          .status(500)
          .json({ error: "Error while compiling/executing code" });
      }
      return res.status(200).json({ output: stdout });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default compiler;
