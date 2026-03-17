import { Link } from "@inertiajs/react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { about, services, projects } from '@/routes';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: about() },
    { name: "Services", href: services() },
    { name: "Projects", href: projects() },
  ];
  
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-gray-300 relative z-10">
      {/* Newsletter Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 mb-6">
            Stay updated with our latest news, innovations, and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-gray-800 border-gray-700 text-white rounded-full px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-3 font-semibold transition-all">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-8 border-t border-gray-700">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img src="/assets/logos/logo-light.png" alt="Ndoto Company" className="h-10 brightness-200" />
            </Link>
            <p className="mb-6 text-gray-400">
              Leading technology solutions provider delivering innovative digital services to businesses worldwide.
            </p>
            <div className="flex space-x-4 mt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition transform hover:-translate-y-1 hover:scale-110"
                  aria-label="Social link"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-500 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {["Web Development", "App Development", "IT Consulting", "Data Analytics"].map((service, i) => (
                <li key={i}>
                  <Link href={`/services/${service.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-blue-500 transition">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-gray-400">Kampala, Uganda</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-blue-500 flex-shrink-0" />
                <a href="tel:+256750346788" className="text-gray-400 hover:text-blue-500">+256 750 346 788</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-blue-500 flex-shrink-0" />
                <a href="mailto:info@ndototech.com" className="text-gray-400 hover:text-blue-500">info@ndototech.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 border-t border-gray-700 text-sm text-center text-gray-400">
        <p>© {currentYear} Ndoto Company Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;