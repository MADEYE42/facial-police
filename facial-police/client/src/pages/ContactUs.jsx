import React, { useState } from "react";

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
          alert("We received your submission, thank you!");
          setName("");
          setEmail("");
          setMessage("");
        } else if (response.code === 422) {
          setError(response.message);
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        setError(error.message ? error.message : error);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6 font-poppins">
          Contact Us
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="formcarry-block">
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-black font-poppins"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-yellow-500 focus:border-yellow-500 font-poppins"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="formcarry-block">
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-black font-poppins"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-yellow-500 focus:border-yellow-500 font-poppins"
              placeholder="example@domain.com"
              required
            />
          </div>

          <div className="formcarry-block">
            <label
              htmlFor="message"
              className="block text-lg font-semibold text-black font-poppins"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-yellow-500 focus:border-yellow-500 font-poppins"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <div className="formcarry-block">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 font-poppins"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
