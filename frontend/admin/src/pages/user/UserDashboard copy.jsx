// UserDashboard.jsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import UserHome from "./UserHome";
// import MembershipSection from "../../pages/user/MembershipSection";
// import TrainingSection from "../../pages/user/TrainingSection";
// import DietSection from "../../pages/user/DietSection";
// import TestimonialsSection from "../../pages/user/TestimonialsSection";
// import FeedbackSection from "../../pages/user/FeedbackSection";
// import AboutContactSection from "../../pages/user/AboutContactSection";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <FaUserCircle className="text-6xl mx-auto text-blue-500" />
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 text-blue-400">
            Welcome, Fitness Warrior!
          </h1>
          <p className="text-gray-400 mt-2">
            Your personalized gym journey starts here.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <UserHome />
          {/* <MembershipSection /> */}
          {/* <TrainingSection /> */}
          {/* <DietSection /> */}
          {/* <TestimonialsSection /> */}
          {/* <FeedbackSection /> */}
          {/* <AboutContactSection /> */}
        </div>
      </div>
    </div>
  );
}
