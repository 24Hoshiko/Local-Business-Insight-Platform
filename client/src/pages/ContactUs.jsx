import React from 'react';

const ContactUs = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        background: 'linear-gradient(to bottom, #f4d6d7, #ffe4c4)', // Subtle gradient background
      }}
    >
      <h1 className="text-4xl font-semibold text-center mb-6 text-[#DE3163]">
        Contact Us
      </h1>
      <p className="text-lg text-center mb-8 text-gray-700">
        We'd love to hear from you! Please fill out the form below.
      </p>

      <form className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-10 transform hover:scale-105 transition-all duration-500 ease-in-out">
        <div className="mb-6">
          <label className="block text-[#264653] text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className="shadow-lg appearance-none border border-[#2A9D8F] rounded-xl w-full py-3 px-4 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] transition-all duration-300 ease-in-out"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#264653] text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            className="shadow-lg appearance-none border border-[#2A9D8F] rounded-xl w-full py-3 px-4 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] transition-all duration-300 ease-in-out"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#264653] text-sm font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Your Message"
            rows="4"
            className="shadow-lg appearance-none border border-[#2A9D8F] rounded-xl w-full py-3 px-4 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] transition-all duration-300 ease-in-out"
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#DE3163] hover:bg-[#DE3163] text-white font-bold py-3 px-8 rounded-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#DE3163]"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
