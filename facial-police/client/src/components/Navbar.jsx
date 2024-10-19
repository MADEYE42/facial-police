import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.png'

const Navbar = () => {
  return (
    <nav className="bg-white p-4 text-black shadow-md  justify-between font-[Poppins]">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl">
          <img src={Logo} alt="logo" height={100} width={100} />
        </h1>
        <div>
          <Link
            to="/login"
            className="text-[20px] border border-white border-b-3 hover:font-bold duration-150 mr-4"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-[20px] p-2 bg-black border border-white text-yellow-500 rounded-md hover:bg-white  hover:border-black duration-300 "
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
