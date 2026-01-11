import { motion } from 'framer-motion';
import {
    IconLayout2,
    IconMessageCircle,
    IconDeviceLaptop,
    IconPalette,
    IconUsers,
    IconInfinity
} from '@tabler/icons-react';

const features = [
    {
        icon: <IconLayout2 stroke={1.5} />,
        title: "Quantum Canvas",
        description: "A boundless expanse for your mental models, optimized for spatial reasoning."
    },
    {
        icon: <IconMessageCircle stroke={1.5} />,
        title: "Contextual Chat",
        description: "Communication that lives where the work happens, not in a separate silo."
    },
    {
        icon: <IconUsers stroke={1.5} />,
        title: "Ghost Presence",
        description: "Feel the pulse of your team with non-intrusive live collaboration markers."
    },
    {
        icon: <IconPalette stroke={1.5} />,
        title: "Adaptive Chroma",
        description: "UI that breathes with you, switching themes to match your creative state."
    },
    {
        icon: <IconDeviceLaptop stroke={1.5} />,
        title: "Singularity Sync",
        description: "Perfect state persistence across every device you own. No lag, no friction."
    },
    {
        icon: <IconInfinity stroke={1.5} />,
        title: "Neural Core",
        description: "Built on high-performance architecture that scales as fast as your ideas."
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-24 px-6 md:py-48 bg-background-500 overflow-hidden relative" style={{ position: 'relative' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-16"
                >
                    <div className="max-w-2xl">
                        <span className="text-primary-400 font-sans font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Capabilities</span>
                        <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none">
                            The Engine of <br /> <span className="text-secondary-cyan-500">Creativity.</span>
                        </h2>
                    </div>
                    <p className="text-lg text-neutral-5 opacity-40 font-sans font-light max-w-sm">
                        Forged with the latest technology, Mune offers a toolset that feels like magic, but functions with surgical precision.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 1.2,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            whileHover={{ y: -12 }}
                            className="group relative p-12 bg-white/[0.02] backdrop-blur-3xl rounded-[48px] border border-white/[0.05] flex flex-col gap-10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                        >
                            {/* Animated Border Beam Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent animate-beam-x" />
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary-cyan-500/50 to-transparent animate-beam-x-reverse" />
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 ring-1 ring-primary-500/20 group-hover:ring-offset-4 group-hover:ring-offset-background-500 group-hover:ring-primary-500/50">
                                {typeof feature.icon === 'object' ? (
                                    <feature.icon.type {...feature.icon.props} size={32} />
                                ) : (
                                    feature.icon
                                )}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight">{feature.title}</h3>
                                <p className="text-neutral-5 opacity-40 font-sans font-light leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes beam-x {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes beam-x-reverse {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-beam-x {
          animation: beam-x 3s linear infinite;
        }
        .animate-beam-x-reverse {
          animation: beam-x-reverse 3s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default FeaturesSection;
