import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Logo from '../images/Logo.png';
import threeD from '../images/3d-face.jfif';

const Home = () => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const initials = 'GM';

  const toggleOptions = () => {
    setOptionsVisible(prevState => !prevState);
  };

  return (
    <div className="bg-black text-white font-[Poppins] font-bold">
      <nav className="w-full p-2 md:p-4 shadow-lg bg-white text-black">
        <div className="flex justify-between items-center">
          <div>
            <img src={Logo} alt="LOGO" height={90} width={90} />
          </div>
          <div 
            className="w-12 h-12 bg-yellow-500 text-black flex items-center justify-center rounded-full text-lg font-semibold cursor-pointer"
            onClick={toggleOptions}
          >
            {initials}
          </div>
        </div>

        {isOptionsVisible && (
          <div className="mt-4 space-y-2">
            <Link 
              to="/edit-details" 
              className="block text-yellow-500 hover:underline text-lg md:text-base"
              onClick={toggleOptions}
            >
              Edit Details
            </Link>
            <Link 
              to="/login" 
              className="block text-yellow-500 hover:underline text-lg md:text-base"
              onClick={toggleOptions}
            >
              Logout
            </Link>
          </div>
        )}
      </nav>

      <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-white text-black rounded-lg shadow-lg p-6 max-w-sm w-full mx-4'>
          <h1 className='text-2xl font-semibold mb-4 text-center'>
            Realtime 3D Facial Reconstruction
          </h1>
          <img src={threeD} alt="3D Face" className='w-full h-auto rounded-md mb-4' />
          <button className='w-full py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition duration-300'>
            Try
          </button>
        </div>
        <div className='bg-white text-black rounded-lg shadow-lg p-6 max-w-sm w-full mx-4'>
          <h1 className='text-2xl font-semibold mb-4 text-center'>
            Realtime Facial Reconstruction
          </h1>
          <img src={threeD} alt="3D Face" className='w-full h-auto rounded-md mb-4' />
          <button className='w-full py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition duration-300'>
            Try
          </button>
        </div>
        <div className='bg-white text-black rounded-lg shadow-lg p-6 max-w-sm w-full mx-4'>
          <h1 className='text-2xl font-semibold mb-4 text-center'>
            Realtime Facial Reconstruction
          </h1>
          <img src={threeD} alt="3D Face" className='w-full h-auto rounded-md mb-4' />
          <button className='w-full py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition duration-300'>
            Try
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
