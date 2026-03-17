import { Head } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';



export default function Index() {
    return (
        <>
            <Head title="Industries">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            <Hero 
                title="Industries We Serve"
                subtitle="Tailored technology solutions for diverse sectors"
                ctaText="Get Started"
                ctaLink="/contact"
                isHomepage={false}
            />
            <Footer />
        </>
    );
}
