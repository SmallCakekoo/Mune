import { motion } from 'framer-motion';
import { IconBrush, IconChecklist, IconMusic } from '@tabler/icons-react';

const features = [
    {
        icon: <IconBrush size={32} className="text-primary-400" />,
        title: "Visual Workspace",
        description: "Infinite canvas with zoom, pan, and drag-drop notes. Collaborate in real-time with your team.",
        gradient: "from-primary-500/20 to-primary-500/5"
    },
    {
        icon: <IconChecklist size={32} className="text-secondary-cyan-400" />,
        title: "Notes & To-Dos",
        description: "Create text notes and interactive to-do lists. Keep everything organized in one place.",
        gradient: "from-secondary-cyan-500/20 to-secondary-cyan-500/5"
    },
    {
        icon: <IconMusic size={32} className="text-tertiary-400" />,
        title: "Music Together",
        description: "Search, play, and queue music. Create the perfect ambiance for your creative flow.",
        gradient: "from-tertiary-500/20 to-tertiary-500/5"
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24 relative bg-background-500">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Everything you need <br />
                        <span className="text-neutral-5/60">in one place</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group relative p-8 rounded-2xl bg-background-400/30 border border-white/5 hover:border-white/10 transition-all overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit border border-white/5">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-neutral-5/80 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
