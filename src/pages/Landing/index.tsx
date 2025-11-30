import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import HowItWorks from '../../components/landing/HowItWorks';
import Testimonials from '../../components/landing/Testimonials';
import CTA from '../../components/landing/CTA';

const Landing = () => {
    return (
        <div className="min-h-screen bg-background-500 text-white font-sans selection:bg-primary-500/30">
            <Header />

            <main>
                <Hero />
                <Features />
                <HowItWorks />
                <Testimonials />
                <CTA />
            </main>

            <Footer />
        </div>
    );
};

export default Landing;
