import React, { useState } from 'react';
import authenticationService from "../services/AuthenticationService";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const success = await authenticationService.register(username, password);
            if (success) {
                console.log('Registration successful');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
