import { Head } from '@inertiajs/react';
import ContactSection from '@/components/contact/Contact';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';



export default function Index() {
    return (
        <>
            <Head title="Contact Us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            <Hero 
                title="Let's Build Something Great"
                subtitle="Whether you need a website, mobile app, or digital transformation, our team is ready to help bring your ideas to life."
                ctaText = 'Schedule a Consultation'
                ctaLink = {'/consultation'}
                isHomepage={false}
            />
            <ContactSection />
            <Footer />
        </>
    );
}
