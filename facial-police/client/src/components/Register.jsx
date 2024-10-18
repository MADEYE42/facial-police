import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', username: '', password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formData);
      toast.success('Registration successful');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div>
    <div className="min-h-screen flex flex-col justify-between font-[Poppins] bg-black text-white">
      <div className="flex justify-center items-center flex-grow">
        <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-yellow-500 mb-6 text-center">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full p-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full p-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full p-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <h1 className='mb-2'>If you have an account already. Kindly <span className='text-yellow-500'><Link to='/login'>Login</Link></span></h1>
            <button
              type="submit"
              className="w-full p-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 transition-colors duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Register;
