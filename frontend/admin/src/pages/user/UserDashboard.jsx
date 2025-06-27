import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import homeImg from "../../assets/homeImg.jpg"; // make sure this path is correct
import UserHome from "./UserHome";

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img src={homeImg} alt="Home" className="w-full h-screen object-cover" />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full bg-black/50">
        {/* Navbar */}
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-white text-3xl font-bold font-serif">
            Fitness Warrior!
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-white font-medium">
            <li className="hover:text-blue-400 cursor-pointer">Membership</li>
            <li className="hover:text-blue-400 cursor-pointer">Training</li>
            <li className="hover:text-blue-400 cursor-pointer">Diet</li>
            <li className="hover:text-blue-400 cursor-pointer">About</li>
            <li className="hover:text-blue-400 cursor-pointer">Contact</li>
          </ul>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden text-white text-2xl" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col items-center gap-4 pb-4 text-white bg-black/80">
            <li className="hover:text-blue-400 cursor-pointer">Membership</li>
            <li className="hover:text-blue-400 cursor-pointer">Training</li>
            <li className="hover:text-blue-400 cursor-pointer">Diet</li>
            <li className="hover:text-blue-400 cursor-pointer">About</li>
            <li className="hover:text-blue-400 cursor-pointer">Contact</li>
          </ul>
        )}
      </div>

      {/* Section Components */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="max-w-6xl mx-auto p-4">
          <UserHome />
          {/* Uncomment and add more sections as needed */}
        </div>
      </div>
    </div>
  );
}
