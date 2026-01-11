import { motion } from 'framer-motion';

const ArchitectureSection = () => {
    return (
        <section className="py-24 px-6 md:py-60 bg-background-500 relative overflow-hidden" style={{ position: 'relative' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-40">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary-400 font-sans font-bold tracking-[0.5em] uppercase text-xs mb-8 block"
                    >
                        The Infrastructure
                    </motion.span>
                    <h2 className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-none mb-12">
                        Built for <span className="italic text-white/50">Speed.</span>
                    </h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-sm mx-auto" />
                </div>

                <div className="relative p-12 md:p-24 bg-background-400 border border-white/[0.05] rounded-[80px] overflow-hidden">
                    {/* SVG Flow Visualization 2.0 */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1200 800"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M-50,400 C150,200 350,600 550,400 S950,200 1250,400"
                            stroke="url(#grad1)"
                            strokeWidth="2"
                            strokeDasharray="10 20"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                        />

                        <motion.path
                            d="M-50,450 C200,650 400,250 600,450 S1000,650 1250,450"
                            stroke="rgba(120, 220, 247, 0.2)"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                        />

                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="var(--color-primary-500)" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                        {[
                            {
                                id: "01",
                                title: "Edge Ingestion",
                                desc: "Events captured globally at sub-millisecond speeds, utilizing distributed node networks.",
                                color: "border-primary-500/20"
                            },
                            {
                                id: "02",
                                title: "Delta Engine",
                                desc: "Proprietary algorithm that calculates only changed states to minimize bandwidth and CPU overhead.",
                                color: "bg-primary-500 text-white shadow-2xl shadow-primary-500/30"
                            },
                            {
                                id: "03",
                                title: "Real-time Relay",
                                desc: "Bidirectional data stream ensuring that every participant sees exactly what you see, when you see it.",
                                color: "border-secondary-cyan-500/20"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className={`p-10 rounded-[40px] border relative group ${item.color}`}
                            >
                                <span className="text-xs uppercase tracking-[0.3em] opacity-40 mb-6 block font-sans">{item.id}</span>
                                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">{item.title}</h3>
                                <p className={`text-sm leading-relaxed font-sans font-light ${i === 1 ? 'text-white/80' : 'opacity-40'}`}>
                                    {item.desc}
                                </p>

                                {/* Interactive Dot */}
                                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${i === 1 ? 'bg-white' : 'bg-primary-500'} animate-ping opacity-20`} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
                >
                    {[
                        { label: "Throughput", val: "1.2GB/s" },
                        { label: "Sync Nodes", val: "148+" },
                        { label: "Concurrent", val: "50k" },
                        { label: "Encryption", val: "AES-256" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2 border-l border-white/5 pl-8">
                            <span className="text-3xl font-display font-medium text-white/80">{stat.val}</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-30 font-sans">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ArchitectureSection;
