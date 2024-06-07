import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Problems from './Problems'; 
import UpdateProfile from './UpdateProfile';
import AddProblem from './AddProblem';
import IndividualProblem from './IndividualProblem';

function App() {
  return (
    <div style={{ marginTop: '-3.5rem' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Problems" element={<Problems />} /> 
          <Route path="/UpdateProfile" element={<UpdateProfile/>}/>
          <Route path="/AddProblem" element={<AddProblem/>}/>
          <Route path="/IndividualProblem/:id" element={<IndividualProblem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
