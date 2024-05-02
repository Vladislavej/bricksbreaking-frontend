import React, { useState } from 'react';
import authenticationService from "../services/AuthenticationService";
import "./../css/Register.css"

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const success = await authenticationService.register(username, password);
            if (success) {
                setSuccessMessage('Registration successful');
                setError('');
            } else {
                setError('Registration failed');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;