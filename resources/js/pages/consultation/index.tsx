import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-datepicker/dist/react-datepicker.css";
import ConsultationForm from "@/components/consultation/ConsultationForm";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";

const benefits = [
  { title: "Tailored Solutions", desc: "Personalized advice for your business needs", icon: "📝" },
  { title: "Expert Guidance", desc: "Experienced developers & digital strategists", icon: "👨‍💻" },
  { title: "Flexible Scheduling", desc: "Choose a time that suits you", icon: "⏰" },
  { title: "Actionable Insights", desc: "Walk away with concrete next steps", icon: "💡" },
];

const faqs = [
  { q: "How long is a consultation?", a: "30–45 minutes" },
  { q: "Can I reschedule?", a: "Yes, with 24h notice" },
  { q: "Do you provide a meeting link?", a: "Yes, Zoom/Google Meet automatically" },
  { q: "Is it free?", a: "Yes, the first consultation is free" },
];

const testimonials = [
  { name: "Dongo Amuza", company: "Ndoto Company", quote: "Ndoto Company transformed our digital strategy. Their consultation was precise, actionable, and insightful." },
  { name: "Jane Doe", company: "Tech Startup", quote: "The consultation helped us plan our app development efficiently." },
  { name: "John Smith", company: "Enterprise Inc", quote: "Professional, actionable, and very knowledgeable team." },
];

export default function ConsultationPage() {

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="w-full">
        <Header />

        <Hero 
            title="Book a Strategy Consultation"
            subtitle="Get expert guidance on software, mobile apps, and digital solutions tailored for your business."
            ctaText = 'Schedule Your Consultation'
            ctaLink = {'#booking'}
            isHomepage={false}
        />

        <section className="py-16 px-8 bg-gray-50 text-center">
            <h2 className="text-3xl font-bold mb-12">Why Schedule a Consultation?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-xl mb-2">{b.title}</h3>
                <p className="text-gray-600">{b.desc}</p>
                </div>
            ))}
            </div>
        </section>
     
        <ConsultationForm />

        <section className="py-16 px-6 bg-gray-50 text-center">
            <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-left">
            {faqs.map((f, i) => (
                <div key={i} className="border rounded-lg p-4 cursor-pointer" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <h3 className="font-semibold text-lg">{f.q}</h3>
                {faqOpen === i && <p className="mt-2 text-gray-600">{f.a}</p>}
                </div>
            ))}
            </div>
        </section>

        <section className="py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
            <Swiper spaceBetween={30} slidesPerView={2} loop autoplay={{ delay: 5000 }}>
            {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                <div className="bg-gray-100 p-8 rounded-xl max-w-2xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">"{t.quote}"</p>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-gray-500">{t.company}</p>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </section>

        <Footer />
    </div>
  );
}