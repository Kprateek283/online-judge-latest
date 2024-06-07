import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/login', { email, password }, {
                withCredentials: true, 
            });
            const data = response.data;
            if (data.success) {
                console.log("Login Success");
                // Setting cookies manually (optional, but ensure they are being set correctly)
                document.cookie = `email=${data.email}; path=/; SameSite=None; Secure`;
                document.cookie = `token=${data.token}; path=/; SameSite=None; Secure`;
                
                alert('Login successful!');
                navigate('/Home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert('An error occurred while logging in. Please try again later.');
        }
    }

    return (
        <div className="flex justify-center items-center text-center min-h-screen" style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}>
            <div className="bg-white p-6 rounded-md shadow-md w-11/12 max-w-md">
                <h2 className='mb-4 text-2xl font-bold text-primary'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-left">
                        <label htmlFor="exampleInputEmail1" className="block text-sm font-medium text-gray-700">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                            id="exampleInputEmail1" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="exampleInputPassword1" className="block text-sm font-medium text-gray-700">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                            id="exampleInputPassword1" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-black font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
                </form>
                <p className='my-2'>Don&apos;t have an account?</p>
                <Link to='/Register' className="inline-block py-2 px-4 bg-gray-500 text-black font-bold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Register</Link>
            </div>
        </div>
    )
}

export default Login;
