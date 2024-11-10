import React from 'react';

const Visualization = () => {
    return (
        <div 
            className="visualization-container" 
            style={{ 
                width: '100vw', 
                height: '100vh', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundImage: 'linear-gradient(to right, #f9e79f, #f1948a)', 
                color: '#333', 
                textAlign: 'center'
            }}
        >
            <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1rem', 
                fontFamily: 'Arial, sans-serif', 
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)' 
            }}>
                Visualizations
            </h2>
                <div style={{ width: '100%', height: '100%' }}>
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://lookerstudio.google.com/embed/reporting/e129832a-163a-4867-8bd8-ddebe40d4a14/page/AIOGE" // Replace with your actual Google Data Studio embed URL
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen
                    ></iframe>
                </div>
        </div>
    );
};

export default Visualization;
