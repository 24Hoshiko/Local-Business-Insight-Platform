import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Signin.css'; 

const Signin = () => {
    const [notification, setNotification] = useState('');
    const [error, setError] = useState({ customer: '', business: '', login: '' });
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const handleCustomerSubmit = (e) => {
            e.preventDefault();
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password === confirmPassword) {
                setNotification('Registration successful!');
                setError({ ...error, customer: '', login: '' });
                // Navigate to BusinessOwner page
                navigate('/business-owner');
            } else {
                setError({ ...error, customer: 'Passwords do not match!' });
            }
        };

        const handleBusinessSubmit = (e) => {
            e.preventDefault();
            const password = document.getElementById('newPasswordBusiness').value;
            const confirmPassword = document.getElementById('confirmPasswordBusiness').value;

            if (password === confirmPassword) {
                setNotification('Registration successful!');
                setError({ ...error, business: '', login: '' });
                // Navigate to BusinessOwner page
                navigate('/business-owner');
            } else {
                setError({ ...error, business: 'Passwords do not match!' });
            }
        };

        const handleLogin = (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Here you can add your login logic (e.g., API call)
            // For demonstration, we'll just check if fields are filled
            if (email && password) {
                setNotification('Login successful!');
                setError({ ...error, login: '' });
                // Navigate to BusinessOwner page
                navigate('/business-owner');
            } else {
                setError({ ...error, login: 'Please enter valid email and password!' });
            }
        };

        const signUpCustomerBtn = document.querySelector('#customerFields .submit-btn');
        const signUpBusinessBtn = document.querySelector('#businessFields .submit-btn');
        const loginBtn = document.querySelector('#signInForm .submit-btn'); // Select login button

        if (signUpCustomerBtn) {
            signUpCustomerBtn.addEventListener('click', handleCustomerSubmit);
        }
        if (signUpBusinessBtn) {
            signUpBusinessBtn.addEventListener('click', handleBusinessSubmit);
        }
        if (loginBtn) {
            loginBtn.addEventListener('click', handleLogin); // Add event listener for login button
        }

        return () => {
            if (signUpCustomerBtn) {
                signUpCustomerBtn.removeEventListener('click', handleCustomerSubmit);
            }
            if (signUpBusinessBtn) {
                signUpBusinessBtn.removeEventListener('click', handleBusinessSubmit);
            }
            if (loginBtn) {
                loginBtn.removeEventListener('click', handleLogin); // Clean up listener
            }
        };
    }, [error, navigate]); // Add navigate to the dependency array

    const toggleForm = (formType) => {
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        const signInBtn = document.getElementById('signInBtn');
        const signUpBtn = document.getElementById('signUpBtn');

        if (formType === 'signIn') {
            signInForm.classList.add('active');
            signUpForm.classList.remove('active');
            signInBtn.classList.add('active');
            signUpBtn.classList.remove('active');
            signInForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            signInForm.classList.remove('active');
            signUpForm.classList.add('active');
            signInBtn.classList.remove('active');
            signUpBtn.classList.add('active');
            selectUserType('customer');
            signUpForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const selectUserType = (userType) => {
        const customerFields = document.getElementById('customerFields');
        const businessFields = document.getElementById('businessFields');
        const registrationTitle = document.getElementById('registrationTitle');

        if (userType === 'customer') {
            customerFields.style.display = 'block';
            businessFields.style.display = 'none';
            registrationTitle.textContent = 'User Registration';
        } else {
            customerFields.style.display = 'none';
            businessFields.style.display = 'block';
            registrationTitle.textContent = 'Business Registration';
        }
    };

    return (
        <div className="main-container">
            <div className="container">
                <div className="header">
                    <button
                        id="signInBtn"
                        className="toggle-btn active"
                        aria-pressed="true"
                        onClick={() => toggleForm('signIn')}
                    >
                        Sign In
                    </button>
                    <button
                        id="signUpBtn"
                        className="toggle-btn"
                        aria-pressed="false"
                        onClick={() => toggleForm('signUp')}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="form-container">
                    {notification && (
                        <div id="successNotification" className="notification">
                            <p id="notificationMessage">{notification}</p>
                        </div>
                    )}
                    {error.login && <p className="error-message">{error.login}</p>} {/* Show login error */}

                    <div id="signInForm" className="form active">
                        <h2>Sign In</h2>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required />
                        </div>
                        <button className="submit-btn">Login</button>
                        <p>
                            Don't have an account?{' '}
                            <a onClick={() => toggleForm('signUp')}>Sign Up</a>
                        </p>
                    </div>

                    <div id="signUpForm" className="form">
                        <div className="user-type-container" style={{ marginTop: '-50px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <button
                                className="user-type-btn active"
                                onClick={() => selectUserType('customer')}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c2925e'} // Hover color
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d8b48b'} // Original color
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    backgroundColor: '#d8b48b', // Original color
                                    color: 'rgb(45, 27, 4)',
                                    cursor: 'pointer',
                                    whiteSpace: 'normal',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                }}
                            >
                                Customer
                            </button>
                            <button
                                className="user-type-btn"
                                onClick={() => selectUserType('business')}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c2925e'} // Hover color
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d8b48b'} // Original color
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    backgroundColor: '#d8b48b', // Original color
                                    color: 'rgb(45, 27, 4)',
                                    cursor: 'pointer',
                                    whiteSpace: 'normal',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                }}
                            >
                                Business
                            </button>
                        </div>

                        <br />
                        <h2 id="registrationTitle" style={{ textAlign: 'center' }}>User Registration</h2>

                        <br />

                        <div id="customerFields" className="user-fields" style={{ display: 'block' }}>
                            <div className="formGroup">
                                <label htmlFor="customerName">Full Name</label>
                                <input type="text" id="customerName" required />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="newPassword">New Password</label>
                                <input type="password" id="newPassword" required />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" required />
                            </div>
                            {error.customer && <p className="error-message">{error.customer}</p>}
                            <button className="submit-btn">Submit</button>
                        </div>

                        <div id="businessFields" className="user-fields" style={{ display: 'none' }}>
                        <div className="formGroup">
                            <label htmlFor="businessName">Business Name</label>
                            <input type="text" id="businessName" required />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="businessEmail">Email</label>
                            <input type="email" id="businessEmail" required />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="contactNumber">Contact</label>
                            <input type="tel" id="contactNumber" required />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="newPasswordBusiness">New Password</label>
                            <input type="password" id="newPasswordBusiness" required />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="confirmPasswordBusiness">Confirm Password</label>
                            <input type="password" id="confirmPasswordBusiness" required />
                        </div>
                            {error.business && <p className="error-message">{error.business}</p>}
                            <button className="submit-btn">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
