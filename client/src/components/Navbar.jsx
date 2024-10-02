import React, {useState} from 'react'
import logo from '../assets/logo.jpeg'
import { Link } from 'react-router-dom';

function Navbar() {
  const [sideBarMenu, setSideBarMenu] = useState(false);

  const toggleSidebar = () => {
    setSideBarMenu(!sideBarMenu);
  }

  return (
    <nav className="bg-orange-300 shadow-lg">
    <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <div className='flex'>
          <img
            src={logo}
            alt="Business Insights Logo"
            className="hidden md:block md:w-12 md:rounded-full"
          />
          <a href="#" className="flex items-center mx-2 text-xl md:text-3xl font-bold text-gray-800">
            Local Business Insights Platform
          </a>
        </div>
        <div className="flex space-x-4 justify-self-end">
          <div className="hidden md:flex items-center space-x-4 text-lg">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
            <Link to="/signup" className="text-gray-700 hover:text-gray-900">
              Sign Up
            </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
            <button onClick={toggleSidebar} className="mobile-menu-button">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
        </div>
      </div>
    </div>
    {/* Mobile menu */}
    <div className={`md:hidden ${sideBarMenu ? "block" : "hidden"}`}>
        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-orange-400">
          About Us
        </Link>
        <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-orange-400">
          Contact
        </Link>
        <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-orange-400">
          Sign Up
        </Link>
      </div>
  </nav>
  )
}

export default Navbar