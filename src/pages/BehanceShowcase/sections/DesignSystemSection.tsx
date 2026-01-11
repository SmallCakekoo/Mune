import { motion } from 'framer-motion';

const DesignSystemSection = () => {
    const colors = [
        { name: 'Primary Blue', hex: '#3A8BFF', desc: 'Core brand identity and primary actions.', classes: 'bg-primary-500' },
        { name: 'Cyan Glow', hex: '#78DCF7', desc: 'Accents, highlights and secondary feedback.', classes: 'bg-secondary-cyan-500' },
        { name: 'Deep Space', hex: '#081528', desc: 'Base surface for all canvas operations.', classes: 'bg-background-500' },
        { name: 'Obsidian', hex: '#141414', desc: 'High-contrast UI surfaces and modal layers.', classes: 'bg-neutral-400' },
    ];

    return (
        <section className="py-24 px-6 md:py-60 bg-background-500 relative overflow-hidden" style={{ position: 'relative' }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-32">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="text-primary-400 font-sans font-bold tracking-[0.4em] uppercase text-xs mb-6 block"
                    >
                        Visual DNA
                    </motion.span>
                    <h2 className="text-6xl md:text-[10rem] font-display font-bold leading-[0.75] tracking-tighter opacity-10 select-none absolute">
                        SYSTEM
                    </h2>
                    <h2 className="text-6xl md:text-8xl font-display font-bold leading-none tracking-tight relative z-10 pt-10 md:pt-20">
                        A Blueprint for <br /> <span className="text-white/40">Continuity.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">
                    {/* Typography Segment */}
                    <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-[60px] p-12 md:p-20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-60 h-60 bg-primary-500/5 blur-[100px] group-hover:bg-primary-500/10 transition-colors" />

                        <div className="space-y-20 relative z-10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 opacity-40">
                                    <span className="text-xs uppercase tracking-widest font-sans">01</span>
                                    <div className="h-px w-8 bg-white" />
                                    <span className="text-xs uppercase tracking-widest font-sans">Display Face</span>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="space-y-2"
                                >
                                    <h3 className="text-7xl md:text-9xl font-display font-bold tracking-tighter">Pally</h3>
                                    <p className="text-xl md:text-2xl font-sans font-light opacity-50 max-w-md leading-relaxed">
                                        Geometric, assertive, and meticulously balanced for high-impact communication.
                                    </p>
                                </motion.div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 opacity-40">
                                    <span className="text-xs uppercase tracking-widest font-sans">02</span>
                                    <div className="h-px w-8 bg-white" />
                                    <span className="text-xs uppercase tracking-widest font-sans">Interface Face</span>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-5xl md:text-7xl font-sans font-medium">Outfit Variable</h3>
                                    <p className="text-lg md:text-xl font-sans font-light opacity-40 max-w-sm leading-relaxed">
                                        Engineered for legibility across all scales, from micro-labels to long-form reading.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Color Grid Segment */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-6">
                        {colors.map((color, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="group flex items-center gap-8 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all"
                            >
                                <div className={`w-24 h-24 rounded-2xl ${color.classes} border border-white/10 group-hover:scale-105 transition-transform duration-500 ring-1 ring-white/5`} />
                                <div>
                                    <h4 className="text-xl font-display font-bold mb-1">{color.name}</h4>
                                    <p className="text-xs font-sans uppercase tracking-widest opacity-40 mb-2">{color.hex}</p>
                                    <p className="text-sm opacity-30 font-sans font-light leading-tight">{color.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DesignSystemSection;
