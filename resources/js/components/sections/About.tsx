import { Link } from '@inertiajs/react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const advantages = [
    'Expert team of developers and designers',
    'Customized solutions tailored to your business',
    'Proven track record of successful projects',
    'Commitment to quality and client satisfaction',
    'Ongoing support and maintenance services',
  ];

  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '10+', label: 'Years in Business' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden" id="about">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px]"></div>

      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                About <span className="text-blue-600">Ndoto Company</span>
              </h2>
              <div className="h-1 w-20 bg-blue-600 mb-6 rounded-full"></div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              Ndoto Company Limited is a leading technology solutions provider in Uganda. We create innovative digital solutions that help businesses transform and thrive in today's competitive landscape.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Founded in 2015, our team of passionate developers, designers, and consultants delivers excellence in every project. Our mission is to empower organizations through technology.
            </p>

            {/* Advantages List */}
            <ul className="space-y-3">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{advantage}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</span>
                  <span className="text-gray-500 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button asChild className="bg-blue-600 hover:bg-blue-700 mt-8 px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105">
              <Link href="/about">
                Learn More About Us
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
              <video
                src="/assets/about/ndoto.mp4"
                poster="/assets/about/ndoto.png"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('img');
                  fallback.src = "/assets/about/ndoto.png";
                  fallback.alt = "Ndoto Company Team";
                  fallback.className = "w-full h-full object-cover";
                  target.parentElement?.appendChild(fallback);
                }}
              />
              {/* Overlay Shape */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;