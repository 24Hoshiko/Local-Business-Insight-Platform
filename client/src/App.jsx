import React from 'react'
import Axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import Form from './pages/Form';
import BusinessOwner from './pages/BusinessOwner';
import Visualization from './pages/Visualization'; // Import Visualization Page
import RecentVisualization from './pages/RecentVisualization'; // Import Recent Visualization Page
import CustomerView from './pages/CustomerView'; // Import Customer View Page

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signin />} />
          <Route path="/form" element={<Form />} />
          <Route path="/business-owner" element={<BusinessOwner />} /> {/* Business Owner Page */}
          <Route path="/visualization" element={<Visualization />} /> {/* Visualization Page */}
          <Route path="/recent-visualization" element={<RecentVisualization />} /> {/* Recent Visualization Page */}
          <Route path="/customer-view" element={<CustomerView />} /> {/* Customer View Page */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
