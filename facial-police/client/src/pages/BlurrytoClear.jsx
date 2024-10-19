import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa";

const BlurrytoClear = () => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  const [output, setOutput] = useState("");
  const initials = "GM";
  const navigate = useNavigate();

  const toggleOptions = () => {
    setOptionsVisible((prevState) => !prevState);
  };

  const handleFileInputChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (!fileInput) {
      setOutput("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput);

    try {
      const response = await fetch("http://localhost:5000/process-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setOutput(data.result);
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error processing the file.");
    }
  };

  return (
    <div className="font-[Poppins] bg-gray-900 min-h-screen flex flex-col">
      <nav className="w-full p-4 shadow-lg bg-white text-black flex justify-between items-center">
        <img src={Logo} alt="LOGO" className="h-16 w-16" />
        <div
          className="w-12 h-12 bg-yellow-500 text-black flex items-center justify-center rounded-full text-lg font-semibold cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={toggleOptions}
        >
          {initials}
        </div>

        {isOptionsVisible && (
          <div className="absolute right-4 mt-12 space-y-2 font-bold bg-white p-4 rounded shadow-lg z-50">
            <Link
              to="/edit-details"
              className="block text-yellow-500 hover:underline text-lg transition duration-300"
              onClick={toggleOptions}
            >
              Edit Details
            </Link>
            <Link
              to="/login"
              className="block text-yellow-500 hover:underline text-lg transition duration-300"
              onClick={toggleOptions}
            >
              Logout
            </Link>
          </div>
        )}
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center text-yellow-500 w-full p-6">
        <div
          className="flex items-center mb-8 cursor-pointer"
          onClick={handleBackButtonClick}
        >
          <FaArrowLeft
            size={40}
            className="hover:text-yellow-400 transition duration-300"
          />
          <h1 className="text-4xl ml-4">Blurry to Clear Reconstruction</h1>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-6xl mb-6 text-white">
          <h2 className="text-center text-3xl font-semibold mb-4">
            Upload Image or Video
          </h2>
          <p className="text-lg text-center mb-4">
            Perform 3D face reconstruction from blurry images or videos.
          </p>
          <ol className="list-decimal mx-6 text-left text-lg mb-4">
            <li>Select an image or video file using the field below.</li>
            <li>Click 'Reconstruct' to process the file.</li>
            <li>View the result on the screen.</li>
          </ol>
        </div>

        <div className="w-full max-w-6xl flex flex-col items-center">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInputChange}
            className="border border-yellow-500 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 shadow-md mb-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-black px-6 py-4 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md w-full max-w-6xl"
          >
            Reconstruct
          </button>
        </div>

        {output && (
          <div className="mt-6 text-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-xl font-bold text-yellow-500">Output:</h2>
            <p className="text-lg text-white">{output}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlurrytoClear;
