import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconArrowRight, IconPlayerPlay } from '@tabler/icons-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/20 via-background-500 to-background-500 z-0" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay" />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <span className="text-primary-300 text-sm font-medium">✨ The all-in-one creative workspace</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Where Collaboration <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-cyan-300">
                            Meets Creativity
                        </span>
                    </h1>

                    <p className="text-xl text-neutral-5 mb-10 max-w-2xl mx-auto leading-relaxed">
                        The digital playground that blends Figma's canvas, Notion's organization, and shared music experiences in one seamless workspace.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group bg-primary-500 hover:bg-primary-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-[0_0_30px_rgba(58,139,255,0.4)] flex items-center gap-2"
                            >
                                Get Started
                                <IconArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm flex items-center gap-2"
                        >
                            <IconPlayerPlay size={20} />
                            Watch Demo
                        </motion.button>
                    </div>
                </motion.div>

                {/* Floating Cards Visual */}
                <div className="mt-20 relative h-[400px] w-full max-w-5xl mx-auto perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20, y: 100 }}
                        animate={{ opacity: 1, rotateX: 10, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative w-full h-full bg-background-400/50 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden p-6"
                    >
                        {/* Mock UI Elements */}
                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-error-400" />
                                <div className="w-3 h-3 rounded-full bg-warning-400" />
                                <div className="w-3 h-3 rounded-full bg-success-400" />
                            </div>
                            <div className="h-6 w-64 bg-white/5 rounded-md" />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 space-y-4">
                                <div className="h-32 bg-primary-500/10 rounded-xl border border-primary-500/20 p-4">
                                    <div className="w-8 h-8 rounded-full bg-primary-500/20 mb-3" />
                                    <div className="h-4 w-3/4 bg-primary-500/20 rounded mb-2" />
                                    <div className="h-4 w-1/2 bg-primary-500/20 rounded" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-24 w-1/2 bg-secondary-cyan-500/10 rounded-xl border border-secondary-cyan-500/20" />
                                    <div className="h-24 w-1/2 bg-tertiary-500/10 rounded-xl border border-tertiary-500/20" />
                                </div>
                            </div>
                            <div className="col-span-1 space-y-4">
                                <div className="h-full bg-white/5 rounded-xl border border-white/10 p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 rounded-full bg-success-400" />
                                        <div className="h-3 w-20 bg-white/10 rounded" />
                                    </div>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="flex items-center gap-2 mb-3">
                                            <div className="w-4 h-4 border border-white/20 rounded" />
                                            <div className="h-2 w-full bg-white/5 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 bg-background-300 p-4 rounded-xl border border-white/10 shadow-xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-400 to-secondary-cyan-400" />
                            <div>
                                <div className="h-3 w-24 bg-white/20 rounded mb-1" />
                                <div className="h-2 w-16 bg-white/10 rounded" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-5 -left-5 bg-background-300 p-4 rounded-xl border border-white/10 shadow-xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-tertiary-400 flex items-center justify-center">
                                <IconPlayerPlay size={14} className="text-white ml-0.5" />
                            </div>
                            <div>
                                <div className="h-3 w-20 bg-white/20 rounded mb-1" />
                                <div className="h-2 w-12 bg-white/10 rounded" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
