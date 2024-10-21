import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import { Link, useNavigate } from 'react-router-dom';  
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User logged in:", userCredential);
                navigate('/dashboard');  
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <p>
              Don't have an account? <Link to="/">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;