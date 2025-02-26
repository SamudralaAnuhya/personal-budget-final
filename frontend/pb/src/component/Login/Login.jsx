import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [login, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = isLogin ? '/signin' : '/signup';
            const response = await axios.post(`http://localhost:8080/api/v1/auth${endpoint}`, {
                login: login,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200) {
                // Login/Signup successful
                const { access_token, token_type } = response.data;
                // Store the access token securely (e.g., in local storage or state management)
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('token_type', token_type);
                console.log(`${isLogin ? 'Login' : 'Signup'} successful`);
                // Perform any necessary actions (e.g., redirect to dashboard)
                navigate('/homepage');
            } else {
                // Login/Signup failed
                console.log(`${isLogin ? 'Login' : 'Signup'} failed`);
                // Display an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any errors that occurred during the API request
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login">Username:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <div>
                {isLogin ? (
                    <p>
                        Don't have an account?{' '}
                        <button onClick={toggleForm}>Signup</button>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <button onClick={toggleForm}>Login</button>
                    </p>
                )}
            </div>
            <div>
                <a href="#">Forgot Password?</a>
            </div>
        </div>
    );
};

export default Login;