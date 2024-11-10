import React from 'react';
import logo from '../../assets/logo.jpg';

function About() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(to bottom, #f4d6d7, #ffe4c4)' }}
    >
      <div className="max-w-3xl mx-auto p-8">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Business Insights Logo"
            className="md:hidden w-32 m-auto mb-4"
          />
        </div>

        {/* Box with light brown background */}
        <div className="bg-[#d2b48c] p-8 rounded-lg shadow-lg text-center">
          <div className="text-3xl md:text-7xl font-bold text-gray-800 mb-4">Welcome to InsightGo</div>

          <div className="text-gray-600 text-lg leading-relaxed">
            <p>
              At <span className="font-semibold">InsightGo</span>, we are
              dedicated to empowering local businesses with the tools and insights
              they need to succeed. Our platform delivers tailored analytics that
              help you understand your business performance, identify growth
              opportunities, and stay ahead of the competition.
            </p>
            <p className="mt-4">
              Whether you're a small shop or a growing enterprise, our goal is to
              provide actionable, data-driven insights that turn your business
              challenges into opportunities. With a focus on simplicity and
              effectiveness, we make it easy for local businesses to leverage the
              power of analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
