import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const screens = [
    { id: 1, title: "The Nexus", sub: "Control Center", desc: "A unified dashboard for your entire digital ecosystem.", color: "from-primary-500/20 to-transparent" },
    { id: 2, title: "Spatial Canvas", sub: "Creative Flow", desc: "Boundless space for non-linear thinking and synthesis.", color: "from-secondary-cyan-500/20 to-transparent" },
    { id: 3, title: "Neural Link", sub: "Live Presence", desc: "Real-time collaboration markers that feel like magic.", color: "from-primary-400/20 to-transparent" },
    { id: 4, title: "The Archive", sub: "Deep Storage", desc: "Intelligent organization that grows with your project.", color: "from-background-300 to-transparent" },
];

const ShowcaseSection = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-background-500">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Section Header */}
                <div className="px-6 md:px-20 mb-20 relative z-20">
                    <motion.span
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                        className="text-primary-400 font-sans font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
                    >
                        The Interface
                    </motion.span>
                    <motion.h2
                        style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -50]), opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                        className="text-5xl md:text-8xl font-display font-bold tracking-tighter"
                    >
                        Visual <br /> Experience.
                    </motion.h2>
                </div>

                {/* Horizontal Track */}
                <motion.div style={{ x }} className="flex gap-12 px-6 md:px-20">
                    {screens.map((screen) => (
                        <div key={screen.id} className="relative flex-shrink-0 w-[80vw] md:w-[60vw]">
                            <div className={`aspect-[16/9] w-full bg-gradient-to-br ${screen.color} rounded-[60px] border border-white/10 overflow-hidden relative group p-12 md:p-24`}>
                                {/* Mock UI Overlay */}
                                <div className="absolute top-12 left-12 flex gap-3">
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                </div>

                                <div className="h-full flex flex-col justify-end">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <span className="text-secondary-cyan-500 font-sans font-bold tracking-widest uppercase text-xs">
                                            {screen.sub}
                                        </span>
                                        <h3 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                                            {screen.title}
                                        </h3>
                                        <p className="text-lg md:text-xl text-white/40 font-sans font-light max-w-sm">
                                            {screen.desc}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Abstract Visual Asset Placeholder */}
                                <div className="absolute top-1/2 right-12 -translate-y-1/2 w-1/2 aspect-square bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/5 flex items-center justify-center text-8xl font-display font-bold opacity-10 group-hover:scale-105 transition-transform duration-700">
                                    {screen.id}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll Hint */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] opacity-20 font-sans flex items-center gap-4">
                    <div className="w-8 h-px bg-white" />
                    Keep Scrolling
                    <div className="w-8 h-px bg-white" />
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;
