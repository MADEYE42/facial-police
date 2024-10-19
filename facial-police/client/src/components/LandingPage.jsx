import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Logo from "../images/Logo.png"; // Ensure this path is correct
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Importing icons for features

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 min-h-screen flex flex-col font-[Poppins]">
      <Navbar />

      {/* Hero Section */}
      <div className="flex-grow flex flex-col justify-center items-center text-yellow-400 p-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl font-extrabold tracking-wide mb-4 mt-4 text-yellow-300">
            Welcome to Facial Police
          </h1>
          <p className="text-lg mb-6 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transforming blurry media into clear, high-quality reconstructions.
            Experience the next level of image clarity.
          </p>
          <Link to="/login">
            <motion.button
              className="bg-yellow-500 text-black px-8 py-4 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="w-full max-w-5xl bg-gray-800 p-10 rounded-lg shadow-xl mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-center text-4xl font-semibold text-yellow-400 mb-6">
            Our Features
          </h2>
          <ul className="space-y-6 text-gray-300 text-lg leading-relaxed">
            {[
              "High-quality image reconstruction",
              "Fast and efficient processing",
              "User-friendly interface",
              "Integration with AI and machine learning",
            ].map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <FaCheckCircle className="text-yellow-500 mr-3" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
