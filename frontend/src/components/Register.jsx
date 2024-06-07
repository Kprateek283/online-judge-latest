import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const [secretKey, setSecretKey] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const postData = { name, email, password, role };
        if (role === 'Admin') {
            postData.secretKey = secretKey;
        }

        axios.post('http://65.0.179.162:8000/register', postData)
            .then(result => {
                setMessage(result.data.message);
                if (result.data.message === "You have successfully registered") {
                    alert('You have successfully Registered!');
                    navigate('/login');
                }
            })
            .catch(err => {
                console.error(err);
                setMessage(err.response ? err.response.data.message : "Registration failed. Please try again.");
            });
    }

    return (
        <div className="flex justify-center items-center text-center min-h-screen" style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}>
            <div className="bg-white p-6 rounded-md shadow-md w-11/12 max-w-md">
                <h2 className='mb-4 text-2xl font-bold text-primary'>Register</h2>
                {message && <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-left">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            <strong>Name</strong>
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                            id="name" 
                            onChange={(event) => setName(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                            id="email" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                            id="password" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            <strong>Role</strong>
                        </label>
                        <select 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                            id="role" 
                            onChange={(event) => setRole(event.target.value)}
                            value={role}
                            required
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    {role === 'Admin' && (
                        <div className="mb-4 text-left">
                            <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">
                                <strong>Secret Key</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Secret Key"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                id="secretKey" 
                                onChange={(event) => setSecretKey(event.target.value)}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-black font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button>
                </form>
                <p className='my-2'>Already have an account?</p>
                <Link to='/login' className="inline-block py-2 px-4 bg-gray-500 text-black font-bold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Login</Link>
            </div>
        </div>
    )
}

export default Register;
