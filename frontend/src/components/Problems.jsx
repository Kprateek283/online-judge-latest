import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/listProblems`);
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleCodeButtonClick = (problemId) => {
    navigate(`/individualProblem/${problemId}`);
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 via-blue-500 to-purple-500 min-h-screen">
      <div className="flex justify-around p-5 bg-gray-800">
        <Link className="btn btn-primary" to="/Profile">Profile</Link>
        <Link className="btn btn-primary" to="/Home">Home</Link>
        <Link className="btn btn-primary" to="/Login">Logout</Link>
        <Link className="btn btn-primary" to="/AddProblem">Add Problem</Link>
      </div>
      <div className="container mt-5">
        {problems.map((problem) => (
          <div key={problem._id} className="mb-4 bg-white p-4 rounded-md">
            <h3>{problem.problemStatement}</h3>
            <p>Difficulty: {problem.difficulty}</p>
            <button
              className="btn btn-secondary"
              onClick={() => handleCodeButtonClick(problem.id)}
            >
              Code
            </button>
            <hr className="my-4 border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;
