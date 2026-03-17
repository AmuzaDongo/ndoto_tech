import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, HeartHandshake, GraduationCap, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const FoundationSection = () => {
  const initiatives = [
    {
      title: 'Tech Education',
      description: 'Providing computer science education and coding skills to underserved communities.',
      icon: <GraduationCap className="h-10 w-10 text-blue-600" />,
      link: '/foundation/education',
    },
    {
      title: 'Community Innovation',
      description: 'Supporting local tech entrepreneurs with resources, mentorship, and funding.',
      icon: <HeartHandshake className="h-10 w-10 text-blue-600" />,
      link: '/foundation/innovation',
    },
    {
      title: 'Digital Access',
      description: 'Working to bridge the digital divide by improving internet access in rural areas.',
      icon: <Globe className="h-10 w-10 text-blue-600" />,
      link: '/foundation/access',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Ndoto Foundation</h2>
          <p className="text-gray-600 text-lg">
            Giving back to our community through technology education and digital empowerment initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4">{initiative.icon}</div>
                <CardTitle className="text-xl">{initiative.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{initiative.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="text-blue-600 p-0" asChild>
                  <Link to={initiative.link} className="flex items-center">
                    Learn more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            The Ndoto Foundation is committed to empowering Uganda's next generation of tech leaders through education, innovation support, and improved digital access.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/foundation">
              Learn More About Our Foundation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FoundationSection;