import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import Gouresh from "../images/developers/gouresh-madye.jpeg";
import Avan from "../images/developers/avan-shetty.jpeg";
import Vivek from "../images/developers/vivek-venkat.jpeg";
import Harsh from "../images/developers/harsh-saindane.jpeg";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="font-[Poppins] bg-gray-900 min-h-screen flex flex-col">
      <nav className="w-full p-4 shadow-lg bg-white text-black flex justify-between items-center">
        <img src={Logo} alt="LOGO" className="h-16 w-16" />
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-yellow-500 hover:text-yellow-600 text-lg font-bold transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-yellow-500 hover:text-yellow-600 text-lg font-bold transition duration-300"
          >
            Contact
          </Link>
        </div>
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center text-yellow-500 w-full p-6">
        <div
          className="flex items-center mb-8 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft
            size={40}
            className="hover:text-yellow-400 transition duration-300"
          />
          <h1 className="text-4xl ml-4">About Us</h1>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-6xl text-white mb-6">
          <h2 className="text-center text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg text-center mb-4">
            We are a team of passionate developers dedicated to creating
            innovative solutions that combine AI and machine learning to solve
            real-world problems. Our project,{" "}
            <span className="text-yellow-500 font-bold">BlurrytoClear</span>,
            focuses on transforming blurry media into clear, high-quality
            reconstructions using cutting-edge technology.
          </p>

          <div className="text-center mt-6">
            <img
              src={Logo}
              alt="Company Logo"
              className="mx-auto w-24 h-24 mb-4"
            />
            <p className="text-lg">
              Our mission is to leverage technology to create solutions that
              enhance the quality of life. We are a group of enthusiastic and
              driven individuals with diverse skills, working together to
              develop groundbreaking applications.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-6xl text-white mb-6">
          <h2 className="text-center text-3xl font-semibold mb-4">
            Meet the Team
          </h2>
          <div className="flex justify-center space-x-12 mt-6">
            {/* Avan Shetty */}
            <div className="text-center">
              <img
                src={Avan}
                alt="Avan Shetty"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold text-yellow-500">Avan Shetty</h3>
              <p className="text-white">Developer</p>
            </div>

            {/* Gouresh Madye */}
            <div className="text-center">
              <img
                src={Gouresh}
                alt="Gouresh Madye"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold text-yellow-500">
                Gouresh Madye
              </h3>
              <p className="text-white">Developer</p>
            </div>

            {/* Vivek Venkatachalam */}
            <div className="text-center">
              <img
                src={Vivek}
                alt="Vivek Venkatachalam"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold text-yellow-500">
                Vivek Venkatachalam
              </h3>
              <p className="text-white">Developer</p>
            </div>

            {/* Harsh Saindane */}
            <div className="text-center">
              <img
                src={Harsh}
                alt="Harsh Saindane"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold text-yellow-500">
                Harsh Saindane
              </h3>
              <p className="text-white">Developer</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
