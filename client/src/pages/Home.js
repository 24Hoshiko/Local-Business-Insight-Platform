// src/pages/HomePage.js
import React, { useEffect } from 'react';
import styles from './Home.module.css'; // Updated to use CSS modules

function HomePage() {
  useEffect(() => {
    // Handle Customer form submission
    const signUpFormCustomer = document.getElementById('customerFields');
    const signUpFormBusiness = document.getElementById('businessFields');

    const handleCustomerSubmit = (e) => {
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
    };

    const handleBusinessSubmit = (e) => {
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
    };

    signUpFormCustomer?.addEventListener('submit', handleCustomerSubmit);
    signUpFormBusiness?.addEventListener('submit', handleBusinessSubmit);

    // Cleanup event listeners on unmount
    return () => {
      signUpFormCustomer?.removeEventListener('submit', handleCustomerSubmit);
      signUpFormBusiness?.removeEventListener('submit', handleBusinessSubmit);
    };
  }, []);

  // Function to toggle between Sign In and Sign Up forms
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

  // Function to select user type and display the relevant fields
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

  // Function to show a success notification
  const showNotification = (message) => {
    const notificationDiv = document.getElementById('successNotification');
    const notificationMessage = document.getElementById('notificationMessage');

    // Update notification message and display it
    notificationMessage.textContent = message;
    notificationDiv.style.display = 'block';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button id="signInBtn" className={`${styles.toggleBtn} active`} onClick={() => toggleForm('signIn')}>Sign In</button>
        <button id="signUpBtn" className={styles.toggleBtn} onClick={() => toggleForm('signUp')}>Sign Up</button>
      </div>

      <div className={styles.formContainer}>
        <form id="signInForm" className={`${styles.form} active`}>
          <label htmlFor="signInEmail">Email</label>
          <input type="email" id="signInEmail" name="email" required />
          <label htmlFor="signInPassword">Password</label>
          <input type="password" id="signInPassword" name="password" required />
          <button type="submit">Submit</button>
          <p>Don't have an account? <a href="#" onClick={() => toggleForm('signUp')}>Sign Up</a></p>
        </form>

        <form id="signUpForm" className={styles.form}>
          <div className={styles.userTypeContainer}>
            <button type="button" id="customerBtn" className={styles.userTypeBtn} onClick={() => selectUserType('customer')}>Customer</button>
            <button type="button" id="businessOwnerBtn" className={styles.userTypeBtn} onClick={() => selectUserType('business')}>Business Owner</button>
          </div>
          <h3 id="registrationTitle" className={styles.registrationTitle}>User Registration</h3>

          <div id="customerFields" className={styles.userFields} style={{ display: 'none' }}>
            <label htmlFor="signUpName">Name</label>
            <input type="text" id="signUpName" name="name" required />
            <label htmlFor="signUpEmail">Email</label>
            <input type="email" id="signUpEmail" name="email" required />
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" required />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
            <p id="passwordMismatch" className={styles.errorMessage} style={{ display: 'none' }}>Passwords do not match!</p>
            <button type="submit" className={styles.submitBtn}>Submit</button>
          </div>

          <div id="businessFields" className={styles.userFields} style={{ display: 'none' }}>
            <label htmlFor="businessName">Name</label>
            <input type="text" id="businessName" name="name" required />
            <label htmlFor="businessEmail">Email</label>
            <input type="email" id="businessEmail" name="email" required />
            <label htmlFor="contactNumber">Contact</label>
            <input type="tel" id="contactNumber" name="contact" required />
            <label htmlFor="newPasswordBusiness">New Password</label>
            <input type="password" id="newPasswordBusiness" name="newPasswordBusiness" required />
            <label htmlFor="confirmPasswordBusiness">Confirm Password</label>
            <input type="password" id="confirmPasswordBusiness" name="confirmPasswordBusiness" required />
            <p id="businessPasswordMismatch" className={styles.errorMessage} style={{ display: 'none' }}>Passwords do not match!</p>
            <label htmlFor="logoUpload">Business Logo</label>
            <input type="file" id="logoUpload" name="logo" accept="image/*" />
            <button type="submit" className={styles.submitBtn}>Submit</button>
          </div>

          <p>Already have an account? <a href="#" onClick={() => toggleForm('signIn')}>Sign In</a></p>
        </form>
      </div>

      <div id="successNotification" className={styles.notification} style={{ display: 'none' }}>
        <p id="notificationMessage"></p>
        <button onClick={() => document.getElementById('successNotification').style.display = 'none'}>Close</button>
      </div>
    </div>
  );
}

export default HomePage; // Make sure to export as HomePage
