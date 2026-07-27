import React, { useState } from "react";
import { FaBars, FaDumbbell, FaTimes } from "react-icons/fa";
import homeImg from "../../assets/homeImg-1.jpg";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import imgRight1 from "../../assets/imgRight-1.png";
import imgLeft1 from "../../assets/imgLeft-1.png";
import imgRight2 from "../../assets/imgRight-2.png";
import imgLeft2 from "../../assets/imgLeft-2.png";
import MembershipSection from "./MembershipSection";
import TestimonialsSection from "./TestimonialsSection";
import DietSection from "./DietSection";
import FeedbackSection from "./FeedbackSection";
import ContactSection from "./ContactSection";
import TrainingSection from "./TrainingSection";
import FooterSection from "./FooterSection";

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // or whatever key you use
    navigate("/"); // or "/login"
  };

  const navItems = [
    { name: "Membership", id: "membership" },
    { name: "Training", id: "training" },
    { name: "Diet", id: "diet" },
    { name: "Feedback", id: "feedback" }, // assuming FeedbackSection is the About
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
          <ul className="hidden md:flex gap-6 text-white font-medium items-center">
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
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
              >
                Logout
              </button>
            </li>
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
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
              >
                Logout
              </button>
            </li>
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

      {/* Features Section */}
      <div className="relative z-10 bg-[#121212] text-center py-16 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-white">
          We offer something for everybody
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {[
            { img: img1, label: "CrossFit Group Classes" },
            { img: img2, label: "Strength Training" },
            { img: img3, label: "Personal Training" },
            { img: img4, label: "Member Only Events" },
          ].map((item, index) => (
            <div
              key={index}
              className="relative w-72 h-60 rounded-xl overflow-hidden shadow-xl group"
            >
              {/* Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-green-500 opacity-40 z-10"></div>

              {/* Centered Text */}
              <div className="absolute inset-0 flex items-center justify-center z-20 text-center">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold leading-snug tracking-tight font-sans px-2">
                  {item.label}
                </h3>
              </div>

              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover brightness-105 transition duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 1 - Group CrossFit Section right*/}
      <div className="w-full bg-[#121212] py-16 px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Outlined Radio-style Button */}
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 border-2 border-green-400 text-white font-semibold rounded-full text-md">
                Group CrossFit Classes
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Get fit while having fun with our group CrossFit classes
            </h3>

            {/* Bullet Points */}
            <ul className="text-gray-300 space-y-4 text-base">
              {[
                "Just 30 minutes long",
                "Warm up & workout included",
                "Fun is guaranteed",
              ].map((text, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-green-400 text-green-400 text-xs font-bold">
                    ✓
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src={imgRight1}
              alt="Group CrossFit"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* 2 - Group CrossFit Section left*/}
      <div className="w-full bg-[#121212] py-16 px-6 md:px-16">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
          {/* Left: Image */}
          <div className="flex-1">
            <img
              src={imgLeft1}
              alt="Group CrossFit"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Right: Text */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Radio-style Label */}
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 border-2 border-green-400 text-white font-semibold rounded-full text-md">
                Group CrossFit Classes
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Get fit while having fun with our group CrossFit classes
            </h3>

            {/* Bullet List */}
            <ul className="text-gray-300 space-y-4 text-base">
              {[
                "Just 30 minutes long",
                "Warm up & workout included",
                "Fun is guaranteed",
              ].map((text, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-green-400 text-green-400 text-xs font-bold">
                    ✓
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Group CrossFit Section right*/}
      <div className="w-full bg-[#121212] py-16 px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Outlined Radio-style Button */}
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 border-2 border-green-400 text-white font-semibold rounded-full text-md">
                Group CrossFit Classes
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Get fit while having fun with our group CrossFit classes
            </h3>

            {/* Bullet Points */}
            <ul className="text-gray-300 space-y-4 text-base">
              {[
                "Just 30 minutes long",
                "Warm up & workout included",
                "Fun is guaranteed",
              ].map((text, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-green-400 text-green-400 text-xs font-bold">
                    ✓
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src={imgRight2}
              alt="Group CrossFit"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Group CrossFit Section left*/}
      <div className="w-full bg-[#121212] py-16 px-6 md:px-16">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
          {/* Left: Image */}
          <div className="flex-1">
            <img
              src={imgLeft2}
              alt="Group CrossFit"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Right: Text */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Radio-style Label */}
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 border-2 border-green-400 text-white font-semibold rounded-full text-md">
                Group CrossFit Classes
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Get fit while having fun with our group CrossFit classes
            </h3>

            {/* Bullet List */}
            <ul className="text-gray-300 space-y-4 text-base">
              {[
                "Just 30 minutes long",
                "Warm up & workout included",
                "Fun is guaranteed",
              ].map((text, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-green-400 text-green-400 text-xs font-bold">
                    ✓
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
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

      <div id="TestimonialsSection">
        <TestimonialsSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <div>
        <FooterSection />
      </div>
    </div>
  );
}
