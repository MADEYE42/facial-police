import React, { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../components/Footer";
import Logo from "../images/Logo.png";

const ThreeD = () => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [stream, setStream] = useState(null);
  const chunks = useRef([]);

  const toggleOptions = () => {
    setOptionsVisible((prevState) => !prevState);
  };

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const startRecording = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = userStream;
      videoRef.current.play();
      setStream(userStream);

      const mediaRecorder = new MediaRecorder(userStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks.current, { type: "video/mp4" });
        setVideoBlob(videoBlob);
        chunks.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    stream.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  };

  const downloadRecording = () => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recorded-video.mp4";
      link.click();
    }
  };

  return (
    <div className="font-[Poppins] bg-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 shadow-lg bg-gray-800 text-white flex justify-between items-center">
        <img src={Logo} alt="LOGO" className="h-20 w-20" />
        <div
          className="w-12 h-12 bg-yellow-500 text-black flex items-center justify-center rounded-full text-lg font-semibold cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={toggleOptions}
        >
          GM
        </div>

        {isOptionsVisible && (
          <div className="absolute right-4 mt-12 space-y-2 font-bold bg-gray-800 p-4 rounded shadow-lg z-50">
            <button
              className="block text-yellow-500 hover:underline text-lg transition duration-300"
              onClick={toggleOptions}
            >
              Edit Details
            </button>
            <button
              className="block text-yellow-500 hover:underline text-lg transition duration-300"
              onClick={toggleOptions}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-yellow-400 w-full p-6">
        {/* Back Button */}
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={handleBackButtonClick}
        >
          <FaArrowLeft
            size={40}
            className="hover:text-yellow-400 transition duration-300"
          />
          <h1 className="text-4xl ml-4">Blurry to Clear Reconstruction</h1>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-hidden mb-6">
          <p className="text-xl text-center mb-4">
            Perform 3D face reconstruction from blurry images or videos.
          </p>
          <h2 className="text-xl font-bold mt-4 text-center text-yellow-400">
            Steps to Use:
          </h2>
          <ol className="list-decimal mx-4 text-left text-lg text-white mb-4">
            <li>Click the input field below to start recording.</li>
            <li>Click "Stop Recording" when done, and download the video.</li>
          </ol>
        </div>

        {/* Video Recording */}
        <div className="mt-6 flex flex-col items-center w-full max-w-3xl">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md transform hover:scale-105 w-full mb-4"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-black px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 shadow-md transform hover:scale-105 w-full mb-4"
            >
              Stop Recording
            </button>
          )}

          {videoBlob && (
            <button
              onClick={downloadRecording}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md transform hover:scale-105 w-full"
            >
              Download Video
            </button>
          )}
        </div>

        {/* Webcam Display */}
        <video ref={videoRef} className="mt-6 w-full max-w-3xl" />

        {videoBlob && (
          <div className="mt-6 text-center bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold text-yellow-400">
              Recorded Video:
            </h2>
            <p className="text-lg text-white">
              You can download the recorded video now.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer className="bg-gray-800 text-white p-4 text-center mt-auto" />
    </div>
  );
};

export default ThreeD;
