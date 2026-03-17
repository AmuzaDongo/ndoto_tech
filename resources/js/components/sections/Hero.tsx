import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  isHomepage?: boolean;
}

const Hero = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  isHomepage = false
}: HeroProps) => {
  return (
    <section
      className={`relative overflow-hidden ${
        isHomepage ? 'min-h-screen' : 'min-h-[50vh]'
      } flex items-center`}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />
        
        {/* Glow Orbs */}
        <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Optional Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 -z-20 opacity-30"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      {/* Content */}
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">

          {/* Small Label */}
          {isHomepage && (
            <span className="inline-block mb-6 px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-blue-300">
              Digital Transformation Partner
            </span>
          )}

          {/* Headline */}
          <h1
            className={`font-bold tracking-tight leading-tight mb-8 ${
              isHomepage
                ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
                : 'text-3xl md:text-5xl'
            }`}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-5">
            {ctaText && ctaLink && (
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href={ctaLink} className="flex items-center">
                  {ctaText}
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}

            {secondaryCtaText && secondaryCtaLink && (
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base rounded-xl border-white/30 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                asChild
              >
                <Link href={secondaryCtaLink}>
                  {secondaryCtaText}
                </Link>
              </Button>
            )}
          </div>

          {/* Trust Indicators */}
          {isHomepage && (
            <div className="mt-16 flex flex-wrap justify-center gap-10 text-sm text-gray-400">
              <span>✔ 50+ Projects Delivered</span>
              <span>✔ 98% Client Satisfaction</span>
              <span>✔ Enterprise-Grade Solutions</span>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Hero;