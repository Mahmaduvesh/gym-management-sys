import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_URL from "../../utils/api";


// Custom arrows
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 cursor-pointer text-white hidden md:block"
    onClick={onClick}
  >
    <MdArrowBackIos size={28} />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 cursor-pointer text-white hidden md:block"
    onClick={onClick}
  >
    <MdArrowForwardIos size={28} />
  </div>
);

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    fetch(`${API_URL}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
        );
        setTestimonials(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch testimonials:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-[#121212] py-20 px-6 md:px-16 text-white relative">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold mb-3">What Our Members Say</h2>
        <p className="text-gray-300 text-lg">
          Real stories from real people who transformed their lives
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {loading ? (
          <p className="text-center text-gray-400">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500">No testimonials found.</p>
        ) : (
          <Slider {...settings}>
            {testimonials.map((item, index) => (
              <div key={item.id || index}>
                <TestimonialCard {...item} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

const TestimonialCard = ({ name, role, image, rating, text, message }) => (
  <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-lg text-center flex flex-col items-center justify-center min-h-[300px] transition hover:shadow-2xl mx-4">
    <img
      src={image || "https://via.placeholder.com/80"}
      alt={name}
      className="w-20 h-20 rounded-full object-cover border-4 border-green-500 mb-4"
    />
    <h3 className="text-xl font-semibold">{name}</h3>
    {role && <p className="text-sm text-gray-400 mb-2">{role}</p>}
    <div className="flex gap-1 justify-center mb-4">
      {Array(rating || 5)
        .fill(0)
        .map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-lg" />
        ))}
    </div>
    <p className="text-gray-300 max-w-xl mx-auto">
      “{text || message || "No testimonial message provided."}”
    </p>
  </div>
);
