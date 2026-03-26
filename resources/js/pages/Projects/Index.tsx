import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  year: number;
}

export default function Index() {
  const [filter, setFilter] = useState<string>('all');
  
  const projects: Project[] = [
    {
      id: "hitablebar",
      title: "Bar Management System",
      category: "Web Development",
      tags: ["E-commerce", "Web App", "Payment Integration"],
      description: "A fully responsive bar management system with integrated payment systems and inventory management.",
      challenge: "HiTableBar needed a modern bar management system that could handle their growing product catalog while providing a seamless shopping experience across all devices.",
      solution: "We developed a custom bar management system with an intuitive admin panel, secure payment processing, and real-time inventory management.",
      results: [
        "50% increase in online sales within 3 months",
        "35% reduction in cart abandonment rate",
        "Improved inventory accuracy and management efficiency"
      ],
      image: "/assets/images/projects/1.png",
      year: 2023
    },
    {
      id: "y77farm",
      title: "Y77Farm Web App",
      category: "Web Application",
      tags: ["Agriculture", "Web App", "Database"],
      description: "A comprehensive agriculture web app for livestock, crops, and poultry.",
      challenge: "Farmers faced challenges in managing their operations efficiently, leading to wasted resources and lost revenue. There was a lack of integrated solutions to track livestock health, crop yields, and market prices.",
      solution: "We developed a web-based agriculture web app with features for livestock tracking, crop monitoring, and market analysis.",
      results: [
        "Reduced administrative workload by 40%",
        "Improved appointment adherence by 25%",
        "Enhanced billing accuracy and reduced payment delays"
      ],
      image: "/assets/images/projects/9.png",
      year: 2025
    },
    {
      id: "agrosys-agriculture-management",
      title: "AgroSys Agriculture Management",
      category: "Web Application",
      tags: ["Agriculture", "Web App", "Database"],
      description: "A comprehensive agriculture management system for livestock, crops, and poultry.",
      challenge: "Farmers faced challenges in managing their operations efficiently, leading to wasted resources and lost revenue. There was a lack of integrated solutions to track livestock health, crop yields, and market prices.",
      solution: "We developed a web-based agriculture management system with features for livestock tracking, crop monitoring, and market analysis. The system included role-based access controls, secure data storage, and automated reporting features to improve operational efficiency.",
      results: [
        "Reduced administrative workload by 40%",
        "Improved appointment adherence by 25%",
        "Enhanced billing accuracy and reduced payment delays",
        "Decreased patient wait times by 35%",
        "Improved coordination between different departments"
      ],
      image: "/assets/images/projects/4.png",
      year: 2025
    }
  ];

  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <Layout>
      <Hero 
        title="Our Projects"
        subtitle="Explore our portfolio of successful projects delivered across various industries."
        ctaText="Stat You Project"
        ctaLink="/contact"
        isHomepage={false}
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? "default" : "outline"}
                className={filter === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group">
                <Link href={`/projects/${project.id}`} className="block">
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/640x360/e2e8f0/64748b?text=${project.title.replace(/\s+/g, '+')}`;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex gap-2 mb-2">
                        <Badge variant="secondary">{project.category}</Badge>
                        <Badge variant="outline">{project.year}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <Button variant="link" className="text-blue-600 p-0 flex items-center">
                        View Case Study
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}