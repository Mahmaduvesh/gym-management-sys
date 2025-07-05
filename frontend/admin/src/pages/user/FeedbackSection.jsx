import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackForm() {
  const user = JSON.parse(localStorage.getItem("user"));
  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const feedbackData = {
          ...values,
          name: user?.name || "",
          email: user?.email || "",
          date: today,
        };

        const res = await fetch("http://localhost:5000/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackData),
        });

        if (!res.ok) throw new Error("Failed to submit feedback");

        toast.success("Feedback submitted!");
        resetForm();
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <div id="feedback" className="bg-[#121212]  py-16 px-4 sm:px-10">
      {/* Title & Description */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-3">
          We Value Your Feedback
        </h2>
        <p className="text-gray-300">
          Let us know how we're doing. Your opinion matters and helps us
          improve!
        </p>
      </div>

      {/* Feedback Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          {formik.touched.subject && formik.errors.subject && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.subject}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows="5"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className="w-full border border-gray-300 px-4 py-2 rounded resize-none"
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full font-semibold transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
