import React, { useState, useEffect } from 'react';
import bg from '../static/icons/logo.svg';
import vector from '../static/icons/vector.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

import LoadingSpinner from './LoadingSpinner';
import Cookies from 'js-cookie';


const Signin = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(false); 

    const navigate = useNavigate(); 

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/csrf/');
                Cookies.set('csrftoken', response.data.csrfToken);
            } catch (error) {
                console.error('Error:', error.response.data);
                console.error('Failed to fetch CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const csrfToken = Cookies.get('csrftoken'); 
            const response = await axios.post('http://localhost:8000/api/token/', {
                email,
                password
            },
            {
                headers: {
                    'X-CSRFToken': csrfToken
                },
                withCredentials: true
            });
            
            // Save tokens and user role in local storage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('username', response.data.email);
    
            // Decode the JWT and set token expiration
            const decodedToken = jwtDecode(response.data.access);
            const expirationTime = decodedToken.exp * 1000; 
            localStorage.setItem('token_expiry', expirationTime);
            
            setRole(response.data.role);
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    
            toast.success('Login successful!');
            navigate('/'); // Redirect after successful login
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Login failed. Please check your credentials.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <ToastContainer />
            {loading && <LoadingSpinner />} 
                <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSignIn} class="space-y-6" >
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div class="mt-2">
                                <input id="email" name="email" type="email" value={email} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div class="flex items-center justify-between">
                                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="text-sm">
                                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                                </div>
                                <div class="mt-2">
                                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                            </div>
                        </form>
                    </div>

                    <p class="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                    </p>
                </div>
        </>
    );
}

export default Signin;
