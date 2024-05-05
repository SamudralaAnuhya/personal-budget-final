import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/signup', {
                username: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200) {
                // Signup successful
                const { access_token, token_type } = response.data;
                // Store the access token securely (e.g., in local storage or state management)
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('token_type', token_type);
                console.log('Signup successful');
                // Perform any necessary actions (e.g., redirect to dashboard)
            } else {
                // Signup failed
                console.log('Signup failed');
                // Display an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any errors that occurred during the API request
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;