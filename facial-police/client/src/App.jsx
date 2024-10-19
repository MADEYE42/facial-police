import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import EditDetails from "./components/EditDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./components/LandingPage";
import ThreeD from "./pages/ThreeD";
import ContactUs from "./pages/ContactUs";
import BlurrytoClear from "./pages/BlurrytoClear";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/3d-face-reconstruction" element={<ThreeD />} />
          <Route path="/edit-details" element={<EditDetails />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blurry-to-clear-image" element={<BlurrytoClear />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
