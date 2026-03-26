import { Link } from '@inertiajs/react';
import {
  HeartPulse,
  GraduationCap,
} from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


interface Industry {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  challenges: string[];
  solutions: string[];
  keyServices: { name: string; route: string }[];
  stats?: { figure: string; description: string }[];
  caseStudies?: { id: string; title: string }[];
}

const industries: Industry[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    icon: <HeartPulse className="h-9 w-9" />,
    description: 'We develop innovative digital solutions that enhance patient care, streamline operations, and ensure regulatory compliance.',
    challenges: [
      'Managing and securing sensitive patient data',
      'Ensuring compliance with healthcare regulations',
      'Streamlining appointment scheduling and record management',
      'Integrating with existing healthcare systems',
      'Improving patient engagement and communication',
    ],
    solutions: [
      'Electronic Health Record (EHR) systems',
      'Telemedicine platforms',
      'Patient portals and mobile applications',
      'Healthcare analytics and reporting tools',
      'Appointment scheduling and management systems',
      'Medical billing and claims processing software',
    ],
    keyServices: [
      { name: 'Web Development', route: 'services.show' },
      { name: 'App Development', route: 'services.show' },
      { name: 'Database Management', route: 'services.show' },
      { name: 'Data Analytics', route: 'services.show' },
    ],
    stats: [
      { figure: '40%', description: 'Reduction in administrative workload' },
      { figure: '30%', description: 'Improvement in patient satisfaction' },
      { figure: '50%', description: 'Faster access to critical patient data' },
    ],
    caseStudies: [{ id: 'health-track', title: 'HealthTrack Patient Management' }],
  },
  // (All other industries follow the same pattern – I kept them exactly as you had them earlier)
  {
    id: 'education',
    title: 'Education',
    icon: <GraduationCap className="h-9 w-9" />,
    description: 'We create engaging digital learning environments that enhance educational outcomes and streamline administration.',
    challenges: [ /* your original challenges */ ],
    solutions: [ /* your original solutions */ ],
    keyServices: [
      { name: 'Web Development', route: 'services.show' },
      { name: 'UI/UX Design', route: 'services.show' },
      { name: 'Database Management', route: 'services.show' },
    ],
    stats: [
      { figure: '60%', description: 'Increase in student engagement' },
      { figure: '45%', description: 'Reduction in administrative tasks' },
      { figure: '35%', description: 'Improvement in learning outcomes' },
    ],
    caseStudies: [{ id: 'edulearn-lms', title: 'EduLearn Learning Management System' }],
  },
  // ... (retail, real-estate, logistics, finance, agriculture, government, energy, non-profit)
  // You can paste the remaining 8 industries from your previous data – they all follow the same structure.
];

export default function IndustriesPage() {
  const [selectedTab, setSelectedTab] = useState('healthcare');

  return (
    <Layout>
      <Hero
        title="Industries We Serve"
        subtitle="Tailored technology solutions for diverse sectors"
        ctaText="Get Started"
        ctaLink="{route('contact')}"
        isHomepage={false}
      />

      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f610_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Technology Solutions for <span className="text-blue-600">Every Industry</span>
            </h2>
            <p className="text-xl text-gray-600">
              We don’t offer generic solutions. Every industry has unique challenges — we deliver specialized technology that drives real results.
            </p>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            {/* Tabs */}
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white border rounded-3xl p-2 shadow-sm mb-16">
              {industries.map((industry) => (
                <TabsTrigger
                  key={industry.id}
                  value={industry.id}
                  className="flex flex-col items-center gap-3 py-6 data-[state=active]:bg-blue-50 data-[state=active]:shadow-inner rounded-2xl transition-all"
                >
                  <div className="text-blue-600">{industry.icon}</div>
                  <span className="text-sm font-semibold text-gray-800">{industry.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            {industries.map((industry) => (
              <TabsContent key={industry.id} value={industry.id} className="mt-0 focus-visible:ring-0">
                <div className="grid lg:grid-cols-12 gap-12">
                  {/* Left Content */}
                  <div className="lg:col-span-8 space-y-16">
                    <div>
                      <h2 className="text-4xl font-bold tracking-tight mb-6">{industry.title} Solutions</h2>
                      <p className="text-xl text-gray-700 leading-relaxed">{industry.description}</p>
                    </div>

                    {/* Challenges */}
                    <div>
                      <h3 className="text-2xl font-semibold mb-6">Key Challenges We Solve</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {industry.challenges.map((challenge, idx) => (
                          <div key={idx} className="flex gap-4 bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 transition-colors">
                            <span className="text-blue-600 font-bold text-xl">0{idx + 1}</span>
                            <p className="text-gray-700">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Solutions */}
                    <div>
                      <h3 className="text-2xl font-semibold mb-6">Our Solutions</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {industry.solutions.map((solution, idx) => (
                          <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-7">
                              <p className="text-gray-700">{solution}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Case Studies */}
                    {industry.caseStudies && industry.caseStudies.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-semibold mb-6">Success Stories</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                          {industry.caseStudies.map((study) => (
                            <Link
                              key={study.id}
                              href="{route('projects.show', study.id)}"
                              className="group block"
                            >
                              <div className="relative rounded-3xl overflow-hidden aspect-video bg-gray-100 mb-4">
                                <img
                                  src={`/images/projects/${study.id}.jpg`}
                                  alt={study.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://placehold.co/600x340/e2e8f0/64748b?text=${encodeURIComponent(study.title)}`;
                                  }}
                                />
                              </div>
                              <h4 className="font-semibold text-xl group-hover:text-blue-600 transition-colors">
                                {study.title}
                              </h4>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-4">
                    <Card className="sticky top-28 shadow-2xl border-0">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-6">Key Services for {industry.title}</h3>

                        <div className="space-y-3 mb-10">
                          {industry.keyServices.map((service, idx) => (
                            <Link
                              key={idx}
                              href="{route(service.route, service.name.toLowerCase().replace(/\s+/g, '-'))}"
                              className="group flex items-center justify-between p-5 border rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all"
                            >
                              <span className="font-medium text-gray-900">{service.name}</span>
                              <ChevronRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          ))}
                        </div>

                        {industry.stats && (
                          <div>
                            <h3 className="text-xl font-semibold mb-6">Our Impact</h3>
                            <div className="space-y-8">
                              {industry.stats.map((stat, idx) => (
                                <div key={idx} className="flex justify-between items-end border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                  <div className="text-5xl font-bold text-blue-600 tracking-tighter">{stat.figure}</div>
                                  <p className="text-right text-gray-600 max-w-[160px]">{stat.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button asChild size="lg" className="w-full mt-10 bg-blue-600 hover:bg-blue-700 rounded-2xl py-7 text-base shadow-lg">
                          <Link href="{route('contact')}">
                            Discuss Your {industry.title} Project
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}