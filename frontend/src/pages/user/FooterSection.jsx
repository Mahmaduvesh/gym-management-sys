import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp } from "react-icons/fa";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-10 pb-6 px-6 md:px-16">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-600 pb-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Fitness Warrior!</h2>
          <p className="text-gray-400 max-w-sm">
            Your ultimate destination for transforming body and mind with elite
            training & diet plans.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12 text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#membership" className="hover:text-blue-400">
                  Membership
                </a>
              </li>
              <li>
                <a href="#training" className="hover:text-blue-400">
                  Training
                </a>
              </li>
              <li>
                <a href="#diet" className="hover:text-blue-400">
                  Diet
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-blue-400">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm text-center md:text-left">
          © 2025 |{" "}
          <span className="font-semibold text-white">Fitness Warrior!</span>
        </p>

        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
          title="Back to Top"
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
}
