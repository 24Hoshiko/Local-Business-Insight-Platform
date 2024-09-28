import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing Routes instead of Switch
import Signin from './pages/Signin';
import './App.css';

const App = () => {
    return (
        <div>
            <h1>Welcome to My App</h1>
            <Signin /> {/* Rendering the Signin component */}
        </div>
    );
};

export default App;
