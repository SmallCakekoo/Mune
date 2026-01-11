import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import OverviewSection from './sections/OverviewSection';
import FeaturesSection from './sections/FeaturesSection';
import DesignSystemSection from './sections/DesignSystemSection';
import ArchitectureSection from './sections/ArchitectureSection';
import ShowcaseSection from './sections/ShowcaseSection';
import TechStackSection from './sections/TechStackSection';
import ClosingSection from './sections/ClosingSection';

const BehanceShowcase = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        // Smooth scroll behavior for the entire page
        document.documentElement.style.scrollBehavior = 'smooth';

        // Hide main app navbar/footer if they were global (not applicable in this project as per requirements)

        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="bg-background-500 text-neutral-5 font-sans selection:bg-primary-500 selection:text-white relative overflow-hidden" data-theme="blue">
            {/* Global Grainy Texture */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary-500 origin-left z-[101]"
                style={{ scaleX }}
            />

            {/* Main Sections */}
            <main className="relative z-10">
                <HeroSection />

                <div className="relative">
                    <OverviewSection />
                </div>

                <FeaturesSection />

                <DesignSystemSection />

                <ArchitectureSection />

                <ShowcaseSection />

                <TechStackSection />

                <ClosingSection />
            </main>

            {/* Footer Branding */}
            <footer className="py-24 px-6 border-t border-white/5 text-center relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                    <div className="text-4xl font-display font-bold tracking-tighter opacity-20">MUNE.</div>
                    <p className="opacity-30 text-xs tracking-[0.3em] uppercase">© 2026 Mune Project • Built with Passion</p>
                </div>
            </footer>
        </div>
    );
};

export default BehanceShowcase;
