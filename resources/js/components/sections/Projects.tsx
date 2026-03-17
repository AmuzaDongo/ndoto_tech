import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  image: string;
  categories: string[];
  link: string;
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "nistioHub",
      description: "Find the Perfect Mentor to Accelerate Your Growth.",
      image: "/assets/projects/4.png",
      categories: ["Web Development", "E-commerce"],
      link: "/projects/hitablebar"
    },
    {
      title: "Y77Farm",
      description: "y77farm is committed to providing quality crops, poultry, and livestock.",
      image: "/assets/projects/3.png",
      categories: ["Web Application", "Agriculture"],
      link: "/projects/y77farm"
    },
    {
      title: "AgroSys Agriculture Platform",
      description: "A comprehensive agriculture Platform for livestock, crops, poultry and agricultural inputs.",
      image: "/assets/projects/1.png",
      categories: ["Mobile App", "Agriculture"],
      link: "/projects/agrosys-agriculture-management"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Our Work
          </span>
          <h2 className="text-4xl font-bold mt-3 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We design and build powerful digital solutions that help businesses scale,
            automate operations, and increase efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.link}
              className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/800x600/e2e8f0/64748b?text=Project+${index + 1}`;
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 group-hover:translate-y-[-4px] transition-all duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-3">
                  {project.description}
                </p>

                {/* CTA */}
                <div className="flex items-center mt-4 text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-500">
                  View Case Study
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/projects">
              View All Projects
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;