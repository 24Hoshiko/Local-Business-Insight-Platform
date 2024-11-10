import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import Form from './pages/Form';
import BusinessOwner from './pages/BusinessOwner';
import Visualization from './pages/Visualization';
import RecentVisualization from './pages/RecentVisualization';
import CustomerView from './pages/CustomerView';
import ThankYou from './pages/ThankYouReview';

function App() {
  return (
      <Router>
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/signup" element={<Signin />} />
                <Route path="/form/:id" element={<Form />} />
                <Route path="/business-owner/:id" element={<BusinessOwner />} />
                <Route path="business-owner/:id/visualization" element={<Visualization />} />
                <Route path="/business-owner/:id/recent-visualization" element={<RecentVisualization />} />
                <Route path="/business-owner/:id/customer-view" element={<CustomerView />} />
                <Route path="/business-owner/:id/thank-you-review" element={<ThankYou />} />
            </Routes>
            <Footer />
        </div>
    </Router>
  );
}

export default App;
