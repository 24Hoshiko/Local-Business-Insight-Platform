import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/BusinessOwner.css';
import v1 from '../assets/v1.png';
import v2 from '../assets/v2.png';
import v3 from '../assets/v3.png';
import axios from 'axios';


const BusinessOwner = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();


    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!csvFile) {
            alert("Please upload a CSV file.");
            return;
        }

        const formData = new FormData();
        formData.append('csvFile', csvFile);
        
        try {
            const response = await axios.post('http://localhost:8000/upload-csv/',formData)
            .then((response) => {
                console.log(response)
                if (response.status === 201) {
                    alert("File uploaded successfully! Redirecting to Recent Visualization.");
                    navigate("recent-visualization");
                }
                else{
                    alert(`Failed to upload the file: ${response.message}`); 
                }
            });
        } catch (error) {
            console.error("Error uploading the file:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="business-owner-container">
            <div className="business-owner-header">
                <div className="company-name">
                    <h2>Brown Bakery</h2>
                </div>
                <div className="profile-icon">
                    <button onClick={() => setShowProfile(true)} aria-label="Profile">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 16 16" 
                            width="24px" 
                            height="24px">
                            <path d="M8 0a4 4 0 0 1 4 4 4 4 0 1 1-8 0A4 4 0 0 1 8 0zM0 14s1.5-4 8-4 8 4 8 4v2H0v-2z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="business-owner-boxes">
                <Link to="visualization" className="box">
                    <img src={v1} alt="Visualization" className="box-image" />
                    <div className="csv-upload-container">
                        <br />
                        <button type="submit">Previous Report</button>
                    </div>
                </Link>
                <div className="box">
                    <img src={v2} alt="Recent Visualization" className="box-image" />
                    <div className="csv-upload-container1">
                        <form onSubmit={handleSubmit} className="csv-form">
                            <div className="file-input-container">
                                <input type="file" accept=".csv" onChange={handleFileChange} required />
                            </div>
                            <button type="submit">Import Data</button>
                        </form>
                    </div>
                </div>
                <Link to="customer-view" className="box">
                    <img src={v3} alt="Customer View" className="box-image" />
                    <div className="csv-upload-container">
                        <br />
                        <button type="submit">Customer Reviews</button>
                    </div>
                </Link>
            </div>

            {showProfile && (
                <div className="profile-sidebar">
                    <div className="sidebar-content">
                        <h3>Your Profile</h3>
                        <button onClick={() => setShowProfile(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusinessOwner;
