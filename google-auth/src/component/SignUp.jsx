import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        await signInWithPopup(auth, provider)
            .then(user => {
                console.log(user);
            });
    };

    const handleSignUp = () => {
        setError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);
                setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    city: city,
                    email: email,
                    gender: gender,
                    mobile: mobile
                })
                    .then(() => {
                        console.log('User data stored in Firestore');
                        setName('');
                        setCity('');
                        setGender('');
                        setEmail('');
                        setPassword('');
                        setMobile('');
                    })
                    .catch((error) => {
                        console.error('Error storing user data:', error);
                        setError(error.message);
                    });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Sign Up</h1>

            <input
                className="signup-input name-input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="signup-input city-input"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <input
                className="signup-input email-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="signup-input password-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="gender-selection">
                <label className="signup-label">Gender</label> <br /><br />
                <label>
                    <input
                        className="gender-input"
                        type="radio"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                </label> <br />
                <label>
                    <input
                        className="gender-input"
                        type="radio"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                </label>
            </div>

            <input
                className="signup-input mobile-input"
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />

            <button className="signup-button" onClick={handleSignUp}>Sign Up</button>

          <button  className="google-signup" onClick={handleLogin}> <img src="data:image/png;base64,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" alt="" /> Sign Up With Google</button>

            {error && <p className="signup-error">{error}</p>}

            <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignUp;
