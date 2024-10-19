import React, { useState } from "react";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    fetch("https://formcarry.com/s/BzzatWNBHoL", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          toast.success("We received your submission, thank you!");
          setName("");
          setEmail("");
          setMessage("");
        } else if (response.code === 422) {
          setError(response.message);
          toast.error(response.message);
        } else {
          setError(response.message);
          toast.error("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        setError(error.message ? error.message : error);
        toast.error(error.message ? error.message : "Error occurred!");
      });
  }

  function goBack() {
    window.history.back();
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-black font-bold">
        <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
            Contact Us
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="formcarry-block">
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="formcarry-block">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="example@domain.com"
                required
              />
            </div>

            <div className="formcarry-block">
              <label
                htmlFor="message"
                className="block text-lg font-semibold text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <div className="formcarry-block">
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Send
              </button>
            </div>
          </form>

          <button
            onClick={goBack}
            className="mt-4 w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} />

      <Footer />
    </div>
  );
}
