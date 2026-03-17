import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
  rating: number;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      content: "Ndoto Company transformed our outdated website into a modern, responsive platform that has significantly increased our customer engagement and conversion rates.",
      author: "Sarah Johnson",
      position: "CEO",
      company: "EcoTech Solutions",
      rating: 5,
    },
    {
      content: "The mobile application developed by Ndoto exceeded all our expectations. Their team was professional, responsive, and delivered the project ahead of schedule.",
      author: "Michael Ochieng",
      position: "Marketing Director",
      company: "Savanna Innovations",
      rating: 5,
    },
    {
      content: "Working with Ndoto on our digital transformation strategy was an excellent decision. Their expertise and insights helped us navigate complex technological challenges.",
      author: "David Mugisha",
      position: "CTO",
      company: "Global Logistics Ltd",
      rating: 4,
    },
    {
      content: "Ndoto's IT consulting services provided us with clear, actionable recommendations that have improved our operational efficiency and reduced costs.",
      author: "Rebecca Nakato",
      position: "Operations Manager",
      company: "Sunrise Healthcare",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 text-lg">
            Don't just take our word for it—hear from some of our satisfied clients about their experience working with Ndoto Company.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 py-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 transition-transform duration-300 hover:scale-105">

                <Card className="relative border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full">
  <CardContent className="p-8 flex flex-col h-full relative">

    {/* Watermark Quote */}
    <div className="absolute top-6 right-6 text-gray-100 text-6xl font-serif">
      ”
    </div>

    {/* Stars */}
    <div className="flex mb-4 z-10">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < testimonial.rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>

    <blockquote className="text-gray-700 mb-6 flex-grow italic z-10">
      "{testimonial.content}"
    </blockquote>

    <footer className="flex items-center mt-auto z-10">
      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mr-4">
        {testimonial.author.charAt(0)}
      </div>
      <div>
        <div className="font-semibold">{testimonial.author}</div>
        <div className="text-sm text-gray-500">
          {testimonial.position}, {testimonial.company}
        </div>
      </div>
    </footer>

  </CardContent>
</Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static" />
            <CarouselNext className="relative static" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;