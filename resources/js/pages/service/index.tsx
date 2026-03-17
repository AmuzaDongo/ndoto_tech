import { Head } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';



export default function Index() {
    return (
        <>
            <Head title="Services">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            <Hero 
                title="Our Services"
                subtitle="We provide comprehensive technology solutions to meet your business needs and drive growth."
                ctaText="Get in Touch"
                ctaLink="/contact"
                isHomepage={false}
            />
            <Footer />
        </>
    );
}
