import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [role, setRole] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    try {
      if (!name || !email || !originalEmail || !role) {
        setErrorMessage("Please enter all the information.");
        return;
      }

      const payload = {
        updatedName: name,
        originalEmail: originalEmail,
        updatedRole: role,
        securityKey: role === "Admin" ? securityKey : null,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/updateProfile`,
        payload
      );

      console.log(response.data);
      alert("Profile Updated Successfully");

      navigate("/Profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <p className="mb-4">
        Note: If you do not want to change your credentials then instead of new
        credentials enter the original ones
      </p>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-bold mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            placeholder="Your new name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="originalEmail" className="block font-bold mb-1">
            Original Email:
          </label>
          <input
            type="email"
            id="originalEmail"
            className="w-full p-2 border rounded"
            placeholder="Your current email"
            value={originalEmail}
            onChange={(e) => setOriginalEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role" className="block font-bold mb-1">
            Role:
          </label>
          <select
            id="role"
            className="w-full p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        {role === "Admin" && (
          <div>
            <label htmlFor="securityKey" className="block font-bold mb-1">
              Security Key:
            </label>
            <input
              type="text"
              id="securityKey"
              className="w-full p-2 border rounded"
              placeholder="Enter security key"
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
            />
          </div>
        )}
        <div>
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update Profile
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div>
          <Link
            to="/Profile"
            className="bg-blue-500 text-white py-2 px-4 rounded inline-block"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
