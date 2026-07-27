import React from "react";
import { FaCheck } from "react-icons/fa";
import dietImage from "../../assets/diet.jpg"; // Replace with your image

export default function DietSection() {
  return (
    <div className="w-full bg-[#121212] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-14">
        {/* Right Image on Mobile */}
        <div className="flex-1 order-2 md:order-1">
          <img
            src={dietImage}
            alt="Healthy Meal Plan"
            className="w-full h-auto rounded-2xl shadow-2xl object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Left Content */}
        <div className="flex-1 order-1 md:order-2 text-left">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-1 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full text-sm tracking-wide">
              Personalized Nutrition
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Fuel Your Fitness with a Custom Diet Plan
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
            Achieve optimal results with a meal plan designed to match your
            fitness goals, lifestyle, and dietary preferences.
          </p>

          {/* Feature List */}
          <ul className="space-y-4 text-gray-300 text-sm sm:text-base">
            {[
              "Tailored meal plans for your fitness journey",
              "Includes vegan, keto & high-protein diets",
              "Adjusts to your lifestyle & schedule",
              "Easily track your progress & macros",
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-green-400 text-green-400 text-xs">
                  <FaCheck />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition">
            Get Your Diet Plan Now
          </button>
        </div>
      </div>
    </div>
  );
}
