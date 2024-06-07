import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const showProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        withCredentials: true,
      });
      const data = response.data;
      if (data.success) {
        setProfileData(data.profile);
      } else {
        alert(data.message);
        navigate("/login"); // Redirect to login if data is not successful
      }
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    showProfile();
  }, []);

  // Function to handle deleting the account
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleteUser`, {
        email: profileData.email,
      });
      console.log(response.data); // Log the response from the server
      navigate("/login"); // Redirect to login page after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
      }}
      className="min-h-screen"
    >
      <div className="flex justify-around p-5 bg-dark w-full">
        <Link className="btn btn-primary" to="/Problems">
          Problems List
        </Link>
        <Link className="btn btn-primary" to="/Home">
          Home
        </Link>
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Delete Account
        </button>
        <Link className="btn btn-primary" to="/UpdateProfile">
          Update Profile
        </Link>
        <Link className="btn btn-primary" to="/Login">
          Logout
        </Link>
      </div>
      <h3 className="text-center underline mt-4">Your Profile</h3>
      <br />
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <>
          <p className="text-center text-6xl">
            Welcome Back {profileData ? profileData.name : "loading..."}
          </p>
          {profileData && (
            <div className="container mx-auto">
              <div className="flex justify-between">
                <div className="text-left">
                  <p className="text-2xl">
                    <strong>Name:</strong> {profileData.name}
                  </p>
                  <p className="text-2xl">
                    <strong>Email:</strong> {profileData.email}
                  </p>
                  <p className="text-2xl">
                    <strong>Role:</strong> {profileData.role}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl">
                    <strong>Problems Solved:</strong> {profileData.problemsSolved}
                  </p>
                  <p className="text-2xl">
                    <strong>Problems Attempted:</strong> {profileData.problemsAttempted}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
