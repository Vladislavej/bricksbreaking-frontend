import React, { useState } from 'react';
import authenticationService from "../services/AuthenticationService";

const Login = ({ user, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await authenticationService.login(username, password);
            if (userData) {
                onLogin(userData);
                console.log('Login successful');
            } else {
                setError('Invalid username or password');
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
        <div>
            {user ? (
                <p>Welcome, {user.username}!</p>
            ) : (
                <>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleGuestLogin}>Sign in as guest</button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </>
            )}
        </div>
    );
};

export default Login;