import { Head } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import AboutSection from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import HomeServices from '@/components/sections/HomeServices';
import ProjectsSection from '@/components/sections/Projects';
import TestimonialsSection from '@/components/sections/Testimonials';

export default function Index() {
    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            <Hero 
                title="Innovative Technology Solutions for Business Growth"
                subtitle="At Ndoto Company Limited, we transform your vision into reality with cutting-edge technology solutions tailored to your business needs."
                ctaText="Consult Us"
                ctaLink="/contact"
                secondaryCtaText="Our Services"
                secondaryCtaLink="/services"
                isHomepage={true} 
            />
            <AboutSection />
            <HomeServices />

            <TestimonialsSection />

            <ProjectsSection />
            
            <Footer />
        </>
    );
}
