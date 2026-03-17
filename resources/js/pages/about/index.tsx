import { Head } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';



export default function Index() {
    return (
        <>
            <Head title="About Us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            <Hero 
                title="About Ndoto Company"
                subtitle="A leading technology solutions provider committed to transforming businesses through innovative digital solutions."
                ctaText="Our Services"
                ctaLink="/services"
                isHomepage={false}
            />
            <Footer />
        </>
    );
}
