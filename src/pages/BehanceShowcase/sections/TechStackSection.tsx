import { motion } from 'framer-motion';
import {
    IconBrandReact,
    IconBrandTailwind,
    IconBrandTypescript,
    IconBrandFramer,
    IconBrandVite,
    IconDatabase
} from '@tabler/icons-react';

const techs = [
    { name: "React", icon: <IconBrandReact />, desc: "Component Architecture" },
    { name: "TypeScript", icon: <IconBrandTypescript />, desc: "Type Safety & Scale" },
    { name: "Tailwind CSS", icon: <IconBrandTailwind />, desc: "Atomic Styling" },
    { name: "Framer Motion", icon: <IconBrandFramer />, desc: "Motion Physics" },
    { name: "Vite", icon: <IconBrandVite />, desc: "Modern Tooling" },
    { name: "Firebase", icon: <IconDatabase />, desc: "Real-time Sync" },
];

const TechStackSection = () => {
    return (
        <section className="py-24 px-6 md:py-60 bg-background-500 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <span className="text-primary-400 font-sans font-bold tracking-[0.4em] uppercase text-xs mb-6 block">The Tech</span>
                            <h2 className="text-6xl font-display font-bold tracking-tighter leading-[0.9] mb-12">
                                Modern <br /> Powerhouse.
                            </h2>
                            <p className="text-lg text-neutral-5 opacity-40 font-sans font-light leading-relaxed">
                                Mune is built on a cutting-edge stack that prioritizes performance, security, and developer joy.
                            </p>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {techs.map((tech, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] flex flex-col gap-8 hover:bg-white/[0.05] hover:border-primary-500/20 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-background-400 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 scale-100 group-hover:scale-110">
                                        {typeof tech.icon === 'object' ? (
                                            <tech.icon.type {...tech.icon.props} size={28} />
                                        ) : (
                                            tech.icon
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-white mb-2">{tech.name}</h3>
                                        <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-sans">{tech.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStackSection;
