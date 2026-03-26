import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { servicesDetails } from '@/data/services';
import { services } from '@/wayfinder/routes';

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="uppercase text-xs font-semibold tracking-widest text-gray-500">What We Offer</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600">
            Innovative technology solutions designed to help your business grow, transform, and thrive in the digital age.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesDetails.map((service) => (
            <Link
              key={service.id}
              href={services.url() }   // ← Updated to match your route
              className="group"
            >
              <Card className="h-full overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(service.title)}`;
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Service Icon / Badge */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Professional
                  </div>
                </div>

                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="flex items-center text-blue-600 font-medium group-hover:gap-3 transition-all">
                    Explore Service
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;