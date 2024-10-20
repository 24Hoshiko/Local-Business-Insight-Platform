import React from 'react'
import Axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Signin from './pages/SignIn';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import Form from './pages/Form';

function App() {
  return (
      <Router>
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/signup" element={<Signin />} />
                <Route path="/form" element={<Form />} />
            </Routes>
            <Footer/>
        </div>
    </Router>
  )
}

export default App