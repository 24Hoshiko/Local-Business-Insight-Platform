import React, { useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './App.css';
import AppRouter from './Router.js';

function App() {
  return (
    <Router>
      <div className="App">
        <AppRouter />
        {/* <Analytics /> */}
      </div>
    </Router>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [showNotification, setShowNotification] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful submission
    console.log('Form data submitted:', formData);
    setShowNotification(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleOkayButton = () => {
    setShowNotification(false);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.overlay}></div>
      <main className={styles.content}>
        <h1 className={styles.contactUsTitle}>Contact Us</h1>
        <p className={styles.titleDesc}>
          If you have a new and innovative scalable project, unique idea, or research you'd like to pursue, fill out the form below. We're here to help guide and support you!
        </p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject*</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Description*</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit">Send Message</button>
          </div>
        </form>
        {showNotification && (
          <div className={styles.notificationPopup}>
            <div className={styles.notificationContent}>
              <h2>Message sent successfully!</h2>
              <p>Your message has been sent. Thank you for reaching out!</p>
              <button onClick={handleOkayButton}>Okay</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export { App, Contact };
