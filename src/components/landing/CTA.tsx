import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background-500 to-primary-900/20" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-neutral-5 mb-6">
                        Ready to Transform Your Workflow?
                    </h2>
                    <p className="text-xl text-neutral-5 mb-10">
                        Join teams who are already creating together in a whole new way.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <Link to="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary-500 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-[0_0_40px_rgba(58,139,255,0.3)] flex items-center gap-2"
                            >
                                Get Started Free
                                <IconArrowRight className="text-white" />
                            </motion.button>
                        </Link>
                        <p className="text-neutral-5/60 text-sm">No credit card required</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
