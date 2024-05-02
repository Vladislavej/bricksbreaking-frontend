import React, { useState } from 'react';
import authenticationService from "../services/AuthenticationService";
import "../css/Login.css";
import Register from "./Register";

const Login = ({ user, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = async () => {
        try {
            const userData = await authenticationService.login(username, password);
            if (userData) {
                onLogin(userData);
                console.log('Login successful');
            } else {
                setError('Invalid login details');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        }
    };

    const handleGuestLogin = () => {
        const guestUserData = { username: 'Guest' };
        onLogin(guestUserData);
    };

    return (
        <div className="login-container">
            {user ? (
                <p>Welcome, {user.username}!</p>
            ) : (
                <>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <div className="error-container">
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </div>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleGuestLogin}>Sign in as guest</button>
                    <button onClick={() => setShowRegister(true)}>Register</button>
                    {showRegister && <Register />}
                </>
            )}
        </div>
    );
};

export default Login;