import { Link } from '@inertiajs/react';
import { ArrowRight, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

const teamMembers: TeamMember[] = [
  // Add your actual team members here
  {
    name: "John Doe",
    position: "Founder & CEO",
    bio: "Visionary leader with over 12 years of experience in digital transformation across East Africa.",
    image: "/assets/team/john-doe.jpg",
    linkedin: "#",
    twitter: "#",
  },
  // ... add more members
];

const MeetOurTeam = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden" id="team">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f610_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-gray-200 mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-600 tracking-wider">OUR EXPERTS</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The passionate minds and experienced professionals driving innovation at Ndoto Company
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/600x600/e2e8f0/475569?text=${encodeURIComponent(member.name)}`;
                  }}
                />

                {/* Social Icons Overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 hover:bg-white p-2 rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 hover:bg-white p-2 rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">{member.position}</p>

                <p className="text-gray-600 text-[15px] leading-relaxed flex-1">
                  {member.bio}
                </p>

                {/* Optional subtle divider */}
                <div className="h-px bg-gray-100 my-6" />

                <Button
                  variant="ghost"
                  className="w-full justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/btn"
                  asChild
                >
                  <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                    View Profile
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-2xl text-base font-medium shadow-lg shadow-blue-200 hover:shadow-xl transition-all active:scale-[0.985]"
          >
            <Link href="/careers">
              Join Our Growing Team
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-gray-500 text-sm mt-4">
            We’re always looking for talented individuals who share our passion for technology
          </p>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;