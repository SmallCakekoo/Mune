import { motion } from 'framer-motion';
import { IconBrush, IconChecklist, IconMusic } from '@tabler/icons-react';

const features = [
    {
        icon: <IconBrush size={32} className="text-primary-500" />,
        title: "Visual Workspace",
        description: "Infinite canvas with zoom, pan, and drag-drop notes. Collaborate in real-time with your team.",
        gradient: "from-primary-500/20 to-primary-500/5"
    },
    {
        icon: <IconChecklist size={32} className="text-primary-500" />,
        title: "Notes & To-Dos",
        description: "Create text notes and interactive to-do lists. Keep everything organized in one place.",
        gradient: "from-primary-500/20 to-primary-500/5"
    },
    {
        icon: <IconMusic size={32} className="text-primary-500" />,
        title: "Music Together",
        description: "Search, play, and queue music. Create the perfect ambiance for your creative flow.",
        gradient: "from-primary-500/20 to-primary-500/5"
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
                    <h2 className="text-3xl md:text-5xl font-bold text-neutral-5 mb-4">
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
                            className="group relative p-8 rounded-2xl bg-white dark:bg-background-400/30 border border-neutral-200 dark:border-white/5 hover:border-primary-500 transition-all overflow-hidden shadow-lg dark:shadow-none"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="mb-6 p-3 bg-primary-500/10 rounded-xl w-fit border border-primary-500/20">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-neutral-5 mb-3">{feature.title}</h3>
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
