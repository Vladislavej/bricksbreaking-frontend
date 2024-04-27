import React, { useState } from 'react';
import authenticationService from "./services/AuthenticationService";

const Login = ({ user, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await authenticationService.login(username, password);
            if (userData) {
                onLogin(userData);
                console.log('Login successful');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            {user ? (
                <p>Welcome, {user.username}!</p>
            ) : (
                <>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                </>
            )}
        </div>
    );
};

export default Login;