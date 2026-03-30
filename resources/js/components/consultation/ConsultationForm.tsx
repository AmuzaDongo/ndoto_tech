import { router, usePage } from '@inertiajs/react';
import { useFormik } from "formik";
import React from "react";
import { toast } from 'sonner';
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import consultations from '@/wayfinder/routes/consultations';

interface ConsultationFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  service_id: string;
  budget: string;
  message: string;
}
interface Service {
  id: number;
  title: string;
}

const ConsultationForm: React.FC= () => {

  const { services = [] } = usePage().props as {
    services?: Service[];
  };

  const formik = useFormik<ConsultationFormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service_id: "",
      budget: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      service_id: Yup.string().required("Service is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      router.post(consultations.store(), {
        ...values,
        service_id: Number(values.service_id),
      }, {
        onSuccess: () => {
          toast.success('Consultation sent successfully');
          resetForm();
        },
        onFinish: () => setSubmitting(false),
      });
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
            name="service_id"
            value={formik.values.service_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Service</option>

            {services.length === 0 ? (
              <option disabled>Loading services...</option>
            ) : (
              services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))
            )}
          </select>

          {formik.touched.service_id && formik.errors.service_id && (
            <div className="text-red-500">{formik.errors.service_id}</div>
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