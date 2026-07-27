import React, { useState } from "react";
import { FaBars, FaDumbbell, FaTimes } from "react-icons/fa";
import homeImg from "../../assets/homeImg-1.jpg";

// Section imports
import MembershipSection from "./MembershipSection";
import TestimonialsSection from "./TestimonialsSection";
import DietSection from "./DietSection";
import FeedbackSection from "./FeedbackSection";
import ContactSection from "./ContactSection";
import TrainingSection from "./TrainingSection";

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navItems = [
    { name: "Membership", id: "membership" },
    { name: "Training", id: "training" },
    { name: "Diet", id: "diet" },
    { name: "About", id: "feedback" }, // assuming FeedbackSection is the About
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className="w-full min-h-screen relative">
      {/* Hero Section */}
      <div className="relative h-screen w-full" id="home">
        {/* Background Image */}
        <img
          src={homeImg}
          alt="Home Background"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10" />

        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-30 px-6 py-4 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-white text-2xl sm:text-3xl font-extrabold font-serif">
            <FaDumbbell className="text-white text-3xl" />
            Fitness Warrior!
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-white font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-white text-2xl z-40"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-black/90 z-30 transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 py-4 text-white">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 text-center">
          <div className="max-w-3xl">
            <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif drop-shadow-xl mb-4 leading-tight">
              Push Harder Than Yesterday
            </h2>
            <p className="text-white text-base sm:text-lg lg:text-xl mb-6 font-light drop-shadow-lg">
              Transform your body, mind, and lifestyle with expert-led training
              tailored to you.
            </p>
            <a
              href="#membership"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg transition"
            >
              Start 7 Day Free Trial
            </a>
          </div>
        </div>
      </div>

      {/* Section Components with IDs for Scroll Navigation */}
      <div id="membership">
        <MembershipSection />
      </div>

      <div id="training">
        <TrainingSection />
      </div>

      <div id="diet">
        <DietSection />
      </div>

      <div id="feedback">
        <FeedbackSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <div>
        <TestimonialsSection />
      </div>
    </div>
  );
}
