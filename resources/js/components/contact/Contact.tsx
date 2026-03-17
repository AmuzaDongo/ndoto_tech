import { useForm } from "@inertiajs/react"
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/contact', {
      onSuccess: () => {
        setIsSubmitted(true); // show success UI
        reset();              // clear form
      }
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      
      {/* Glow Background */}
      <div className="absolute -top-40 left-0 w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[140px] rounded-full"></div>

      <div className="container mx-auto px-8 relative z-10">

        <div className="grid lg:grid-cols-2 gap-14">

          {/* Contact Info */}
          <div className="space-y-10">

            <div>
              <h3 className="text-2xl font-bold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <MapPin className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-600">Kampala, Uganda
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Phone className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a
                      href="tel:+256788346788"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      +256 788 346 788
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Mail className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href="mailto:info@ndototech.com"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      info@ndototech.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Business Hours</h3>

              <div className="space-y-2 text-gray-600">

                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>

              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white border rounded-2xl p-10 shadow-lg">

            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="inline-flex p-4 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  Message Sent Successfully
                </h3>

                <p className="text-gray-600 mb-6">
                  Thank you for contacting Ndoto Company.
                  Our team will respond shortly.
                </p>

                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (

              <form onSubmit={handleSubmit} className="space-y-6">

                <h3 className="text-2xl font-bold">
                  Send a Message
                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Name"
                      value={data.name}
                      onChange={e=>setData('name',e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={data.email}
                      onChange={e=>setData('email',e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>

                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Project inquiry"
                    value={data.subject}
                    onChange={(e) => setData('subject', e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Message..."
                    value={data.message}
                    onChange={e=>setData('message',e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-xl"
                >
                  {processing ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </form>

            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;