import { Link, usePage } from '@inertiajs/react';
import { Menu} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { dashboard, login, services, about } from '@/routes';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: about() },
    { title: 'Services', href: services() },
    { title: 'Industries', href: '/industries' },
    { title: 'Projects', href: '/projects' },
    { title: 'Contact', href: '/contact' },
  ];

  const { auth } = usePage().props;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src={isScrolled ? '/assets/logos/logo-dark.png' : '/assets/logos/logo-light.png'}
            alt="Ndoto Company"
            className="h-10 transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`relative font-medium transition-all hover:text-blue-600 ${
                isScrolled
                  ? 'text-gray-800'
                  : 'text-gray-300'
              }`}
            >
              {link.title}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {auth.user ? (
            <Link
              href={dashboard()}
              className="ml-6 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Dashboard
            </Link>
          ) : (
            <Button
              asChild
              className="ml-6 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-transform hover:scale-105"
            >
              <Link href={login()}>Log In</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={`lg:hidden ${
                isScrolled
                  ? 'text-gray-800'
                  : 'text-gray-100'
              }`}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[80%] sm:w-[350px] bg-white dark:bg-gray-900 p-6 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center">
                <img src="/assets/logos/logo-dark.png" alt="Ndoto Company" className="h-8" />
              </Link>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetTrigger>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-4">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="block text-gray-800 dark:text-gray-100 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 transition"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button */}
            <div className="mt-6">
              {auth.user ? (
                <Link
                  href={dashboard()}
                  className="block w-full text-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform hover:scale-105"
                >
                  Dashboard
                </Link>
              ) : (
                <Button
                  asChild
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  <Link href={login()}>Get Started</Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;