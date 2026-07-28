import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../utils/api";

export default function ContactSection() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().trim().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
        .required("Phone is required"),
      message: Yup.string().trim().required("Message is required"),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch(`${API_URL}/api/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send message");
        }

        toast.success("🎉 Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        resetForm();
      } catch (err) {
        console.error(err);

        toast.error(err.message || "❌ Failed to send message!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div id="contact" className="bg-[#121212] py-16 px-4 sm:px-10 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-300">
            We'd love to hear from you. Send us a message anytime.
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white text-black rounded-xl shadow-lg p-8 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full py-3 rounded-full font-semibold transition ${
              formik.isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {formik.isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
