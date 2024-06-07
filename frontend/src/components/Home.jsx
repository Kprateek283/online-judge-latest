import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 flex flex-col">
      <div className="flex justify-around p-5 bg-gray-900">
        <br></br>
        <br></br>
        <br></br>
        <Link className="btn btn-primary" to="/Problems">
          Problems List
        </Link>
        <Link className="btn btn-primary" to="/Profile">
          Profile
        </Link>
        <Link className="btn btn-primary" to="/Login">
          Logout
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center text-center flex-grow">
        <h1 className="text-6xl font-bold text-white">Welcome back</h1>
      </div>
    </div>
  );
}

export default Home;
