import React from 'react';
import Logo from '../images/Logo.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-yellow-500 ">
              <img
                src={Logo}
                alt="logo"
                className="bg-white rounded-lg"
                height={100}
                width={100}
              />
            </h1>
          </div>

          {/* Links Section */}
          <div className="flex space-x-6">
            <Link
              to="/home"
              className="hover:text-yellow-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="hover:text-yellow-500 transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-yellow-500 transition duration-300"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="hover:text-yellow-500 transition duration-300"
            >
              Privacy
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center mt-6">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Facial Police. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
