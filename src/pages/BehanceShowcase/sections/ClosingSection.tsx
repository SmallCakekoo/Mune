import { motion } from 'framer-motion';

const ClosingSection = () => {
    return (
        <section className="py-32 px-6 md:py-60 bg-background-500 relative flex flex-col items-center justify-center min-h-screen">
            {/* Background Decorative Rings */}
            <div className="absolute w-[200%] aspect-square border border-white-[0.03] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute w-[150%] aspect-square border border-white-[0.03] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-12"
                >
                    <span className="text-secondary-cyan-500 font-sans font-bold tracking-[0.4em] uppercase text-xs">Conclusion</span>

                    <h2 className="text-6xl md:text-[8rem] font-display font-bold leading-[0.85] tracking-tighter text-white">
                        Designing <br /> <span className="text-white/20 italic">Tomorrow.</span>
                    </h2>

                    <p className="text-xl md:text-3xl font-light text-neutral-5 opacity-40 leading-relaxed max-w-2xl mx-auto">
                        Mune is more than software. It's a statement on how digital tools should interact with our most valuable asset: human creativity.
                    </p>

                    <div className="pt-16">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-12 py-6 bg-white text-background-500 font-display font-bold text-xl rounded-full transition-all overflow-hidden"
                        >
                            <span className="relative z-10">The Journey Begins</span>
                            <div className="absolute inset-0 bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                Launch Mune
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Extreme Bottom Accents */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-20 opacity-10">
                <span className="text-[10px] tracking-widest uppercase font-sans">Design</span>
                <div className="w-12 h-px bg-white" />
                <span className="text-[10px] tracking-widest uppercase font-sans">Process</span>
                <div className="w-12 h-px bg-white" />
                <span className="text-[10px] tracking-widest uppercase font-sans">Vision</span>
            </div>
        </section>
    );
};

export default ClosingSection;
