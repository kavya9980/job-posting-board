import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                companyName,
                email,
                password,
            });
            alert('Registration successful!');
        } catch (error) {
            console.error('There was an error registering!', error);
            alert('Registration failed!');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Registration;