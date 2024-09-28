import React, { useEffect } from 'react';
import './Signin.module.css'; // Ensure the styles are imported

const Signin = () => {
    useEffect(() => {
        // Handle Customer form submission
        const signUpCustomerBtn = document.querySelector('#customerFields .submit-btn');
        if (signUpCustomerBtn) {
            signUpCustomerBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const password = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const errorMessage = document.getElementById('passwordMismatch');

                if (password === confirmPassword) {
                    showNotification('Registration successful!');
                    errorMessage.style.display = 'none';
                } else {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Passwords do not match!';
                }
            });
        }

        // Handle Business form submission
        const signUpBusinessBtn = document.querySelector('#businessFields .submit-btn');
        if (signUpBusinessBtn) {
            signUpBusinessBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const password = document.getElementById('newPasswordBusiness').value;
                const confirmPassword = document.getElementById('confirmPasswordBusiness').value;
                const errorMessage = document.getElementById('businessPasswordMismatch');

                if (password === confirmPassword) {
                    showNotification('Registration successful!');
                    errorMessage.style.display = 'none';
                } else {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Passwords do not match!';
                }
            });
        }
    }, []);

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
            registrationTitle.textContent = 'Business Owner Registration';
        }
    };

    const showNotification = (message) => {
        const notificationDiv = document.getElementById('successNotification');
        const notificationMessage = document.getElementById('notificationMessage');

        notificationMessage.textContent = message;
        notificationDiv.style.display = 'block';
    };

    return (
        <div className="container">
            <div className="header">
                <button id="signInBtn" className="toggle-btn active" aria-pressed="true" onClick={() => toggleForm('signIn')}>Sign In</button>
                <button id="signUpBtn" className="toggle-btn" aria-pressed="false" onClick={() => toggleForm('signUp')}>Sign Up</button>
            </div>
            <div className="form-container">
                <div id="successNotification" className="notification">
                    <p id="notificationMessage"></p>
                </div>

                <div id="signInForm" className="form active">
                    <h2>Sign In</h2>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                    <button className="submit-btn">Login</button>
                    <p>Don't have an account? <a onClick={() => toggleForm('signUp')}>Sign Up</a></p>
                </div>

                <div id="signUpForm" className="form">
                    <h2>Sign Up</h2>
                    <h3 id="registrationTitle">User Registration</h3>
                    <div className="user-type-container">
                        <button className="user-type-btn active" onClick={() => selectUserType('customer')}>Customer</button>
                        <button className="user-type-btn" onClick={() => selectUserType('business')}>Business Owner</button>
                    </div>

                    <div id="customerFields" className="user-fields" style={{ display: 'block' }}>
                        <label htmlFor="customerName">Full Name</label>
                        <input type="text" id="customerName" required />
                        <label htmlFor="customerEmail">Email</label>
                        <input type="email" id="customerEmail" required />
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id="newPassword" required />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" required />
                        <p id="passwordMismatch" className="error-message" style={{ display: 'none' }}></p>
                        <button className="submit-btn">Submit</button>
                    </div>

                    <div id="businessFields" className="user-fields" style={{ display: 'none' }}>
                        <label htmlFor="businessName">Business Name</label>
                        <input type="text" id="businessName" required />
                        <label htmlFor="businessEmail">Email</label>
                        <input type="email" id="businessEmail" required />
                        <label htmlFor="contactNumber">Contact</label>
                        <input type="tel" id="contactNumber" required />
                        <label htmlFor="newPasswordBusiness">New Password</label>
                        <input type="password" id="newPasswordBusiness" required />
                        <label htmlFor="confirmPasswordBusiness">Confirm Password</label>
                        <input type="password" id="confirmPasswordBusiness" required />
                        <p id="businessPasswordMismatch" className="error-message" style={{ display: 'none' }}></p>
                        <label htmlFor="logoUpload">Business Logo</label>
                        <input type="file" id="logoUpload" name="logo" accept="image/*" />
                        <button className="submit-btn">Submit</button>
                    </div>
                    <p>Already have an account? <a onClick={() => toggleForm('signIn')}>Sign In</a></p>
                </div>
            </div>
        </div>
    );
};

export default Signin; // Exporting the Signin component
