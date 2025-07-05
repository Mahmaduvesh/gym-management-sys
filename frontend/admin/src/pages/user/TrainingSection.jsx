import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import dayjs from "dayjs";

export default function TrainingSection() {
  const [trainings, setTrainings] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const fetchTrainings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/Training");
      const data = await res.json();
      setTrainings(data);
    } catch (err) {
      console.error("Error fetching training plans:", err);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const startOfMonth = currentDate.startOf("month").startOf("week");
  const endOfMonth = currentDate.endOf("month").endOf("week");
  const calendarDays = [];
  let day = startOfMonth;

  while (day.isBefore(endOfMonth)) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  const getTrainingsForDay = (date) =>
    trainings.filter((t) => dayjs(t.date).isSame(date, "day"));

  return (
    <div id="training" className="container mx-auto px-2 sm:px-4 py-6">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-black mb-1 text-center">
        📅 Monthly Training Schedule
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        View and track all scheduled training sessions for the month.
      </p>

      <div className="bg-gray-900 text-white rounded-lg shadow-md w-full overflow-x-auto">
        {/* Calendar Header */}
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h2 className="text-xl font-bold">
            {currentDate.format("MMMM YYYY")}
          </h2>
          <div className="flex gap-2">
            <button
              className="p-2 bg-gray-800 rounded hover:bg-gray-700"
              onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
            >
              <FaArrowLeft className="text-white" />
            </button>
            <button
              className="p-2 bg-gray-800 rounded hover:bg-gray-700"
              onClick={() => setCurrentDate(currentDate.add(1, "month"))}
            >
              <FaArrowRight className="text-white" />
            </button>
          </div>
        </div>

        {/* Week Headers */}
        <div className="grid grid-cols-7 min-w-[600px] sm:min-w-full text-sm text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
            <div
              key={idx}
              className="p-2 border-r border-b border-gray-800 font-semibold text-gray-300"
            >
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((date, idx) => (
            <div
              key={`${date.format("YYYY-MM-DD")}-${idx}`}
              className="h-32 md:h-36 border-r border-b border-gray-800 p-1 hover:bg-gray-800 transition"
            >
              <div className="text-right text-xs text-gray-500 mb-1">
                {date.date()}
              </div>

              <div className="space-y-1 overflow-y-auto h-[85%] pr-1">
                {getTrainingsForDay(date).map((t, i) => (
                  <div
                    key={`${t.title}-${i}`}
                    className="bg-blue-600 text-white rounded-md p-1 text-xs shadow-sm"
                  >
                    <div className="font-semibold truncate">{t.title}</div>
                    <div className="text-[10px] text-blue-100 leading-tight break-words">
                      {t.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
