import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing Routes instead of Switch
import Signin from './pages/Signin';
import './App.css';

const App = () => {
    return (
        <div>
            <Signin /> {/* Rendering the Signin component */}
        </div>
    );
};

export default App;
