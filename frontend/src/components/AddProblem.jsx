import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProblem = () => {
  const [problemStatement, setProblemStatement] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numTestCases, setNumTestCases] = useState(0);
  const [numInputs, setNumInputs] = useState(0);
  const [inputTypes, setInputTypes] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [numOutputs, setNumOutputs] = useState(0);
  const [outputTypes, setOutputTypes] = useState([]);
  const [outputs, setOutputs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare inputTestCases array
    const inputTestCases = [];
    for (let i = 0; i < numTestCases; i++) {
      const inputTestCase = [];
      for (let j = 0; j < numInputs; j++) {
        inputTestCase.push(inputs[i * numInputs + j]);
      }
      inputTestCases.push(inputTestCase);
    }

    // Prepare outputTestCases array
    const outputTestCases = [];
    for (let i = 0; i < numTestCases; i++) {
      const outputTestCase = [];
      for (let j = 0; j < numOutputs; j++) {
        outputTestCase.push(outputs[i * numOutputs + j]);
      }
      outputTestCases.push(outputTestCase);
    }

    // Prepare arrays of input and output types
    const inputTypeArray = Array(numInputs)
      .fill(null)
      .map((_, index) => inputTypes[index]);
    const outputTypeArray = Array(numOutputs)
      .fill(null)
      .map((_, index) => outputTypes[index]);

    // Prepare payload
    const payload = {
      difficulty,
      problemStatement,
      numTestCases,
      numInputs,
      numOutputs,
      inputTypes: inputTypeArray,
      outputTypes: outputTypeArray,
      inputTestCases,
      outputTestCases,
    };

    console.log("Payload:", payload); // Log the payload

    // Make POST request to server to add problem
    try {
      const response = await axios.post(
        "http://13.48.178.52:8000/addProblem",
        payload,
        { withCredentials: true }
      );
      console.log("Problem added successfully!", response.data);
      // Clear form fields after successful submission
      setProblemStatement("");
      setDifficulty("");
      setNumTestCases(0);
      setNumInputs(0);
      setInputTypes([]);
      setInputs([]);
      setNumOutputs(0);
      setOutputTypes([]);
      setOutputs([]);
    } catch (error) {
      console.error("Error adding problem:", error);
      console.log("Response data:", error.response.data);
    }
  };

  // Function to render input type fields
  const renderInputTypeFields = () => {
    const fields = [];
    for (let i = 0; i < numInputs; i++) {
      fields.push(
        <div key={i} className="mb-4">
          <label htmlFor={`inputType${i + 1}`} className="block font-bold mb-1">
            {`Input Type ${i + 1}`}
          </label>
          <select
            className="w-full p-2 border rounded"
            id={`inputType${i + 1}`}
            value={inputTypes[i] || ""}
            onChange={(e) => {
              const newInputTypes = [...inputTypes];
              newInputTypes[i] = e.target.value;
              setInputTypes(newInputTypes);
            }}
          >
            <option value="">Select</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
            <option value="object">Object</option>
          </select>
        </div>
      );
    }
    return fields;
  };

  // Function to render input fields
  const renderInputFields = () => {
    const fields = [];
    for (let i = 0; i < numTestCases * numInputs; i++) {
      fields.push(
        <div key={i} className="mb-4">
          <label htmlFor={`input${i + 1}`} className="block font-bold mb-1">
            {`Input ${i + 1}`}
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            id={`input${i + 1}`}
            placeholder={`Enter input ${i + 1}`}
            value={inputs[i] || ""}
            onChange={(e) => {
              const newInputs = [...inputs];
              newInputs[i] = e.target.value;
              setInputs(newInputs);
            }}
          />
        </div>
      );
    }
    return fields;
  };

  // Function to render output type fields
  const renderOutputTypeFields = () => {
    const fields = [];
    for (let i = 0; i < numOutputs; i++) {
      fields.push(
        <div key={i} className="mb-4">
          <label
            htmlFor={`outputType${i + 1}`}
            className="block font-bold mb-1"
          >
            {`Output Type ${i + 1}`}
          </label>
          <select
            className="w-full p-2 border rounded"
            id={`outputType${i + 1}`}
            value={outputTypes[i] || ""}
            onChange={(e) => {
              const newOutputTypes = [...outputTypes];
              newOutputTypes[i] = e.target.value;
              setOutputTypes(newOutputTypes);
            }}
          >
            <option value="">Select</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
            <option value="object">Object</option>
          </select>
        </div>
      );
    }
    return fields;
  };

  // Function to render output fields
  const renderOutputFields = () => {
    const fields = [];
    for (let i = 0; i < numTestCases * numOutputs; i++) {
      fields.push(
        <div key={i} className="mb-4">
          <label htmlFor={`output${i + 1}`} className="block font-bold mb-1">
            {`Output ${i + 1}`}
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            id={`output${i + 1}`}
            placeholder={`Enter output ${i + 1}`}
            value={outputs[i] || ""}
            onChange={(e) => {
              const newOutputs = [...outputs];
              newOutputs[i] = e.target.value;
              setOutputs(newOutputs);
            }}
          />
        </div>
      );
    }
    return fields;
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="problemStatement" className="block font-bold mb-1">
            Problem Statement
          </label>
          <textarea
            className="w-full p-2 border rounded"
            id="problemStatement"
            rows="3"
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            placeholder="Enter the problem statement"
          ></textarea>
        </div>
        <div>
          <label htmlFor="difficulty" className="block font-bold mb-1">
            Difficulty
          </label>
          <select
            className="w-full p-2 border rounded"
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label htmlFor="numTestCases" className="block font-bold mb-1">
            Number of Test Cases
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            id="numTestCases"
            value={numTestCases}
            onChange={(e) => setNumTestCases(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="numInputs" className="block font-bold mb-1">
            Number of Inputs
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            id="numInputs"
            value={numInputs}
            onChange={(e) => setNumInputs(Number(e.target.value))}
          />
        </div>

        {renderInputTypeFields()}

        {renderInputFields()}

        <div>
          <label htmlFor="numOutputs" className="block font-bold mb-1">
            Number of Outputs
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            id="numOutputs"
            value={numOutputs}
            onChange={(e) => setNumOutputs(Number(e.target.value))}
          />
        </div>

        {renderOutputTypeFields()}

        {renderOutputFields()}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
      <Link
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
        to="/Problems"
      >
        Back To List
      </Link>
    </div>
  );
};

export default AddProblem;