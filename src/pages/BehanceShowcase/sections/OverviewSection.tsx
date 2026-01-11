import { motion } from 'framer-motion';

const OverviewSection = () => {
    return (
        <section className="py-32 px-6 md:py-60 bg-background-500 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                {/* Left Column: Disruptive Headline */}
                <div className="lg:col-span-6 sticky top-32">
                    <div className="overflow-hidden mb-4">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-secondary-cyan-500 font-sans font-bold tracking-[0.4em] uppercase text-xs block"
                        >
                            The Vision
                        </motion.span>
                    </div>

                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%", skewY: 7 }}
                            whileInView={{ y: 0, skewY: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter"
                        >
                            Redefining the <br />
                            <span className="text-white/20 outline-text">Creative</span> <br />
                            Nexus.
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-32 h-1 bg-secondary-cyan-500 mt-12 origin-left"
                    />
                </div>

                {/* Right Column: High-End Typography & Content */}
                <div className="lg:col-span-6 flex flex-col gap-24 pt-8 lg:pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <p className="text-2xl md:text-4xl font-light text-neutral-5 opacity-80 leading-snug">
                            In a world of fragmented workflows, Mune stands as a monolith of <span className="text-primary-400 font-medium italic">simplicity</span>.
                        </p>
                        <p className="text-lg md:text-xl text-neutral-5 opacity-40 leading-relaxed font-sans font-light">
                            We've stripped away the noise to leave only what matters: your ideas and the people you build them with. No more tab-switching, no more lost context. Just flow.
                        </p>
                    </motion.div>

                    {/* Stats Bar Component */}
                    <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                        {[
                            { label: "Sync Latency", value: "<100ms", accent: "text-primary-400" },
                            { label: "Uptime", value: "99.9%", accent: "text-secondary-cyan-500" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + (i * 0.2) }}
                                className="p-10 bg-background-500/50 flex flex-col gap-2"
                            >
                                <span className={`text-4xl md:text-5xl font-display font-bold ${stat.accent}`}>{stat.value}</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-sans">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    >
                        <p className="text-xl md:text-2xl text-neutral-5 opacity-60 leading-relaxed">
                            Every pixel, every interaction, and every line of code has been audited to ensure Mune isn't just a tool, but a cognitive extension.
                        </p>
                    </motion.div>
                </div>
            </div>

            <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          color: transparent;
        }
      `}</style>
        </section>
    );
};

export default OverviewSection;
