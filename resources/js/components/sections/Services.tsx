import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ServicesSection = () => {
  const services: Service[] = [
  {
    title: 'Web Development',
    description: 'Custom websites, web applications, and e-commerce platforms.',
    image: '/assets/services/web.jpg',
    link: '/services/web-development',
  },
  {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications.',
    image: '/assets/services/app.png',
    link: '/services/app-development',
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design solutions.',
    image: '/assets/services/uiux.jpg',
    link: '/services/ui-ux-design',
  },
  {
    title: 'IT Consulting',
    description: 'Strategic technology consulting services.',
    image: '/assets/services/consulting.jpg',
    link: '/services/it-consulting',
  },
  {
    title: 'Database Management',
    description: 'Comprehensive database solutions.',
    image: '/assets/services/database.jpg',
    link: '/services/database-management',
  },
  {
    title: 'Data Analytics',
    description: 'Turn raw data into valuable insights.',
    image: '/assets/services/analytics.jpg',
    link: '/services/data-analytics',
  },
];

  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg">
            We offer a comprehensive range of technology solutions to help your business thrive in the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group relative h-80 rounded-xl overflow-hidden"
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-200 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-blue-400 font-medium">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/services">
              View All Services
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;