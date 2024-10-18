import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditDetails = ({ userId }) => {
  const [formData, setFormData] = useState({
    fullName: '', 
    phone: '', 
    username: '', 
    password: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error('Invalid userId:', userId);
        return;
      }

      console.log(`Fetching data from: http://localhost:5000/users/${userId}`);

      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        console.log('User data fetched:', response.data); // Log data

        setFormData({
          fullName: response.data.fullName || '', 
          phone: response.data.phone || '', 
          username: response.data.username || '', 
          password: ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error); // Log error
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${userId}`, formData);
      toast.success('Details updated successfully');
    } catch (error) {
      toast.error('Failed to update details');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Edit Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="block w-full mb-2 p-2"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="block w-full mb-2 p-2"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="block w-full mb-2 p-2"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="block w-full mb-4 p-2"
        />
        <button type="submit" className="bg-red-900 text-white p-2 w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditDetails;
  