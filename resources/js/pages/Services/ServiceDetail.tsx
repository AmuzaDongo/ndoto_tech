import { Link, usePage } from '@inertiajs/react';
import { Check, ArrowRight, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { servicesDetails } from '@/data/services';
import { services } from '@/wayfinder/routes';

interface Service {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  approach?: Array<{ title: string; description: string }>;
  features?: Array<{ title: string; description: string }>;
  benefits: string[];
  technologies?: string[];
  faq?: Array<{ question: string; answer: string }>;
  relatedProjects?: Array<{ id: string; title: string; description: string }>;
}

export default function ServiceDetail() {
  const { service } = usePage<{ service: Service }>().props;

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageProps = usePage().props as any;
  const serviceIdFromUrl = pageProps.service?.id || '';

  const resolvedService = service || 
    servicesDetails.find(s => s.id === serviceIdFromUrl);

 

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!resolvedService) {
      window.location.href = '/services';
    }
  }, [resolvedService]);

  if (!resolvedService) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-gray-500">
        Service not found
      </div>
    );
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Layout>
      <Hero
        title={resolvedService.title}
        subtitle={resolvedService.description}
        ctaText="Get a Free Quote"
        ctaLink="/contact"
        isHomepage={false}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <Link
            href={services()}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-10 group"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to All Services
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-20">
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-100">
                <img
                  src={`/assets/images/services/${resolvedService.image}`}
                  alt={resolvedService.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/1200x675/e2e8f0/64748b?text=${encodeURIComponent(resolvedService.title)}`;
                  }}
                />
              </div>

              {/* Overview */}
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-6">Overview</h2>
                <p className="text-xl text-gray-700 leading-relaxed">{resolvedService.content}</p>
              </div>

              {/* Approach Timeline */}
              {resolvedService.approach && (
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-10">Our Proven Approach</h2>
                  <div className="relative pl-10 space-y-12 before:absolute before:left-5 before:top-8 before:bottom-8 before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-blue-400 before:to-transparent">
                    {resolvedService.approach.map((step, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute -left-10 w-10 h-10 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow">
                          <span className="text-blue-600 font-bold text-xl">{idx + 1}</span>
                        </div>
                        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {resolvedService.features && (
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-8">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {resolvedService.features.map((feature, idx) => (
                      <div key={idx} className="bg-gray-50 hover:bg-white border border-transparent hover:border-blue-100 p-8 rounded-3xl transition-all">
                        <Check className="h-8 w-8 text-emerald-600 mb-5" />
                        <h4 className="font-semibold text-2xl mb-3">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {resolvedService.faq && (
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-10">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {resolvedService.faq.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-3xl overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(idx)}
                          className="w-full px-8 py-7 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-xl pr-8">{item.question}</span>
                          <span className={`text-3xl text-blue-600 transition-transform duration-300 ${openFAQ === idx ? 'rotate-45' : ''}`}>
                            +
                          </span>
                        </button>
                        <div className={`overflow-hidden transition-all duration-400 px-8 ${openFAQ === idx ? 'max-h-96 pb-8' : 'max-h-0'}`}>
                          <p className="text-gray-600 text-lg leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - unchanged from previous version */}
            <div className="lg:col-span-4">
              <Card className="sticky top-24 shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-3xl">Ready to Begin?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-10">
                  {resolvedService.technologies && (
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">Technologies We Use</h4>
                      <div className="flex flex-wrap gap-2">
                        {resolvedService.technologies.map((tech, i) => (
                          <Badge key={i} className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-4 text-lg">Why Choose Ndoto?</h4>
                    <ul className="space-y-4">
                      {resolvedService.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex gap-3">
                          <Check className="h-6 w-6 text-emerald-600 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild size="lg" className="w-full py-8 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700">
                    <Link href="/contact">
                      Request Custom Quote
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}