import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

interface ConsultationFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  preferred_date: Date | null;
}

const ConsultationForm: React.FC = () => {

  const formik = useFormik<ConsultationFormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
      preferred_date: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      service: Yup.string().required("Please select a service"),
      message: Yup.string().required("Message is required"),
      consultation_slot_id: Yup.string().required("Please select a time slot"),
      preferred_date: Yup.date().nullable().required("Please select a date & time"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const res = await axios.post("/consultations", values);

        alert(res.data.message);

        resetForm();

      } catch (error: any) {

        console.error(error);

        alert(
          error?.response?.data?.message ||
          "Unable to submit consultation request"
        );

      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <section id="booking" className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Book Your Consultation</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500">{formik.errors.name}</div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500">{formik.errors.phone}</div>
          )}

          <input
            type="text"
            name="company"
            placeholder="Company (optional)"
            value={formik.values.company}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            name="service"
            value={formik.values.service}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Service</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="IT Consultance">IT Consultance</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Systems Integration">Systems Integration</option>
          </select>
          {formik.touched.service && formik.errors.service && (
            <div className="text-red-500">{formik.errors.service}</div>
          )}

          <input
            type="text"
            name="budget"
            placeholder="Budget (optional)"
            value={formik.values.budget}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Message / Project Details"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {formik.touched.message && formik.errors.message && (
            <div className="text-red-500">{formik.errors.message}</div>
          )}

          {/* Calendar Picker */}
          <div className="mt-4">

            <label className="block mb-2 font-semibold">Select Date & Time</label>
            <DatePicker
              selected={formik.values.preferred_date}
              placeholderText="Date and Time"
              onChange={(date: Date | null) => formik.setFieldValue("preferred_date", date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {formik.touched.preferred_date && formik.errors.preferred_date && (
              <div className="text-red-500">{formik.errors.preferred_date}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition w-full mt-4 disabled:opacity-50"
          >
            {formik.isSubmitting ? "Submitting..." : "Book Consultation"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConsultationForm;