import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "Mune has completely transformed how our design team collaborates. It's the missing link between our tools.",
        author: "Sarah Jenkins",
        role: "Product Designer",
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        quote: "The shared music feature is a game changer for remote work vibes. We feel connected even when miles apart.",
        author: "David Chen",
        role: "Frontend Developer",
        avatar: "https://i.pravatar.cc/150?u=david"
    },
    {
        quote: "Finally, a workspace that doesn't feel like a spreadsheet. It's actually fun to use.",
        author: "Elena Rodriguez",
        role: "Creative Director",
        avatar: "https://i.pravatar.cc/150?u=elena"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-background-500 border-t border-white/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Loved by Creators</h2>
                    <p className="text-neutral-5/80">Join thousands of teams building the future.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-background-400/30 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <p className="text-neutral-5 text-lg mb-6 leading-relaxed">"{t.quote}"</p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={t.avatar}
                                    alt={t.author}
                                    className="w-12 h-12 rounded-full border-2 border-primary-500/20"
                                />
                                <div>
                                    <h4 className="text-white font-bold">{t.author}</h4>
                                    <p className="text-neutral-5/60 text-sm">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
