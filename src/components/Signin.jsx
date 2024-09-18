import React, { useState, useEffect } from 'react';
import bg from '../static/icons/logo.svg';
import vector from '../static/icons/vector.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [Role, setRole] = useState(false); // State to track if the user is superuser

    const navigate = useNavigate(); // Initialize the useNavigate hook

     // Check if user is already authenticated
     useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            navigate('/'); // If already logged in, navigate to the home page
        }
    }, [navigate]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('role', response.data.role);
            
            // Update the state based on response
            setRole(response.data.role);

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

            toast.success('Login successful!');
            navigate('/'); // Navigate to the homepage after successful login
        } catch (error) {
            console.error('Login failed', error);
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer /> {/* Add ToastContainer */}
            {loading && <LoadingSpinner />} {/* Display the spinner if loading */}
            <div className="container flex2" style={{ height: "100vh", justifyContent: "space-around" }}>
                <div className="leftchild flex4">
                    <div className="imagechild">
                        <img src={vector} alt="" />
                    </div>
                </div>
                <form onSubmit={handleSignIn} className='rightchild flex' style={{ width: "22rem" }}>
                    <div className="imagech flex4">
                        <img src={bg} style={{ width: "116px" }} alt="" />
                    </div>
                    <h1 className="textgradient">Log in to your account</h1>
                    <label htmlFor="username" style={{ marginTop: "18px" }}>Username</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                    <label htmlFor="password" style={{ marginTop: "15px" }}>Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                    <div className="flex3">
                        <div className="flex2">
                            <input style={{ width: "20px", marginTop: "0" }} type="checkbox" />
                            <label htmlFor="remember">Remember for 30 days</label>
                        </div>
                        <a href="/">Forgot Password</a>
                    </div>
                    <button className="btn" id="sub" type="submit" style={{ outline: "none", backgroundColor: "#1366D9", color: "white", marginTop: "23px" }}>Sign in</button>
                </form>
            </div>
        </>
    );
}

export default Signin;