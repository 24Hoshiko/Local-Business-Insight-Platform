import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

function About() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-10 py-12"
      style={{
        background: 'linear-gradient(to bottom, #fff9f3, #ffecd0)', // Soft, light background gradient
        position: 'relative',
      }}
    >
      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto p-12 animate-fadeIn rounded-lg shadow-2xl bg-white bg-opacity-80 backdrop-blur-md">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Business Insights Logo"
            className="hidden md:inline-block w-40 h-40 rounded-full border-4 border-[#f4a261] shadow-lg mb-6"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-[#2a2a2a] mb-4">
            Welcome to InsightGo
          </h1>
        </div>

        {/* Card Box */}
        <div className="bg-[#f4a261] p-10 rounded-2xl shadow-lg border-t-8 border-[#ffecd0] text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <p className="text-gray-900 text-lg md:text-xl leading-relaxed mb-6">
            At <span className="font-semibold text-[#2a2a2a]">InsightGo</span>,
            we empower local businesses with tailored insights to thrive in the competitive world of small business. Whether it's a cozy bakery or a fast-growing enterprise, our analytics are crafted to help you make meaningful decisions.
          </p>
          <p className="text-gray-900 text-lg md:text-xl leading-relaxed mb-8">
            Register now to gain exclusive insights and discover strategies that elevate your business to new heights.
          </p>
          <Link to="/signup">
            <button className="bg-[#DE3163] text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:bg-[#264653] hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#264653] focus:ring-opacity-50 relative overflow-hidden">
              <span className="z-10">Get Started</span>
              <span className="absolute top-0 left-[-100%] w-full h-full bg-[#bb8fce ] transition-all duration-500 ease-in-out hover:left-0"></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
