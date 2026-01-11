import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Spring configurations for premium feel
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    const titleWords = ["MUNE", "."];

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 bg-background-500">
            {/* Dynamic Background Parallax Blobs */}
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute top-[-20%] right-[-10%] w-[80%] aspect-square bg-primary-500/10 rounded-full blur-[160px] pointer-events-none"
            />
            <motion.div
                style={{ y: useTransform(scrollY, [0, 500], [0, -150]), opacity }}
                className="absolute bottom-[-10%] left-[-10%] w-[60%] aspect-square bg-secondary-cyan-500/10 rounded-full blur-[140px] pointer-events-none"
            />

            {/* Main Content */}
            <div className="max-w-7xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12"
                >
                    <span className="inline-block px-4 py-1 border border-primary-500/30 rounded-full text-primary-400 font-sans font-medium tracking-[0.3em] uppercase text-xs md:text-sm backdrop-blur-sm bg-primary-500/5">
                        Modern Workspace — v2.0
                    </span>
                </motion.div>

                <div className="overflow-hidden mb-12 flex justify-center items-baseline gap-1">
                    {titleWords.map((word, i) => (
                        <motion.h1
                            key={i}
                            custom={i}
                            initial={{ y: "100%", skewY: 10 }}
                            animate={{ y: 0, skewY: 0 }}
                            transition={{
                                duration: 1.5,
                                delay: 0.2 + (i * 0.1),
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className={`text-8xl md:text-[14rem] font-display font-bold leading-[0.85] tracking-tighter ${i === 1 ? 'text-secondary-cyan-500' : 'text-white'}`}
                        >
                            {word}
                        </motion.h1>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <p className="text-2xl md:text-5xl font-light text-neutral-5 leading-[1.1] tracking-tight">
                        Elevating collaboration <br className="hidden md:block" />
                        through <span className="text-secondary-cyan-500 italic">deliberate</span> design.
                    </p>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-sm mx-auto"
                    />
                </motion.div>

                {/* Sophisticated Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1, type: "spring", ...springConfig }}
                    className="mt-32 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 font-sans">Scroll to Explorer</span>
                    <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                        <motion.div
                            animate={{
                                y: [-64, 64],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.5,
                                ease: "easeInOut"
                            }}
                            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary-500 to-transparent"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Decorative Floating Numbers / Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <motion.div
                    animate={{
                        x: [0, 20, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute top-[20%] left-[10%] text-9xl font-display font-bold"
                >
                    01
                </motion.div>
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="absolute bottom-[30%] right-[15%] text-9xl font-display font-bold"
                >
                    C2
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
