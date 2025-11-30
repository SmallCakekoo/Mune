import { motion } from 'framer-motion';
import { IconUsers, IconLayoutDashboard, IconRocket } from '@tabler/icons-react';

const steps = [
    {
        id: 1,
        title: "Create Your Room",
        description: "Start a new project space in seconds. No setup required.",
        icon: <IconLayoutDashboard size={40} className="text-white" />,
        color: "bg-primary-500"
    },
    {
        id: 2,
        title: "Invite Your Team",
        description: "Share your name room and start collaborating in real-time instantly.",
        icon: <IconUsers size={40} className="text-white" />,
        color: "bg-secondary-cyan-500"
    },
    {
        id: 3,
        title: "Start Creating",
        description: "Brainstorm, plan, and build together with powerful tools.",
        icon: <IconRocket size={40} className="text-white" />,
        color: "bg-tertiary-500"
    }
];

const HowItWorks = () => {
    return (
        <section id="about" className="py-24 bg-background-500 relative overflow-hidden">
            {/* Decorative Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get Started in Seconds</h2>
                    <p className="text-white">Simple, fast, and built for flow.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative text-center group"
                        >
                            <div className="mb-8 relative inline-block">
                                <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300 relative z-10`}>
                                    {step.icon}
                                </div>
                                <div className={`absolute inset-0 ${step.color} blur-xl opacity-40`} />

                                {/* Number badge */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background-300 border border-white/10 flex items-center justify-center z-20 font-bold text-white">
                                    {step.id}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-neutral-5/80 leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
