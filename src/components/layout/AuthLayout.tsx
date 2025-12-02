import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MuneLogo from '../../assets/images/MuneCollapsed.svg';
import { cn } from '../../utils/cn';
import { Music2, Sparkles, Headphones } from 'lucide-react';

interface AuthLayoutProps {
    reverse?: boolean;
}

const AuthLayout = ({ reverse = false }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-8 bg-gradient-to-br from-background-500 via-primary-500/5 to-background-500">
            <div className="w-full max-w-[1200px] min-h-[600px] lg:h-[800px] max-h-[95vh] bg-white rounded-2xl sm:rounded-[32px] lg:rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-primary-500/10">
                {/* Branding Side */}
                <div className={cn(
                    "hidden lg:flex w-1/2 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative flex-col justify-between p-12 text-white overflow-hidden",
                    reverse ? "order-2" : "order-1"
                )}>
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <motion.div
                            animate={{
                                backgroundPosition: ['0% 0%', '100% 100%'],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                            className="w-full h-full"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                                backgroundSize: '50px 50px',
                            }}
                        />
                    </div>

                    {/* Floating decorative elements */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute top-20 right-20 opacity-20"
                    >
                        <Music2 size={120} strokeWidth={1} />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 15, 0],
                            rotate: [0, -5, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 1,
                        }}
                        className="absolute bottom-32 right-12 opacity-15"
                    >
                        <Headphones size={80} strokeWidth={1} />
                    </motion.div>

                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute top-1/2 left-12"
                    >
                        <Sparkles size={60} strokeWidth={1} />
                    </motion.div>

                    <div className="z-10">
                        <Link to="/" className="inline-block hover:scale-105 transition-transform duration-300">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={MuneLogo}
                                alt="Mune Logo"
                                className="h-14 w-auto drop-shadow-lg"
                            />
                        </Link>
                    </div>

                    <div className="z-10 max-w-md">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-5xl xl:text-6xl font-bold mb-6 font-display leading-tight drop-shadow-lg"
                        >
                            {reverse ? "Welcome Back!" : "Ready to Vibe?"}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl text-white/90 font-light leading-relaxed"
                        >
                            {reverse
                                ? "Let's pick up where the music left off and continue creating magic"
                                : "Step into your space where ideas and music flow seamlessly together"}
                        </motion.p>

                        {/* Feature highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mt-8 space-y-3"
                        >
                            <div className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                                <span className="text-sm">Personalized music experiences</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                                <span className="text-sm">AI-powered recommendations</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                                <span className="text-sm">Connect with your creativity</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Form Side */}
                <div className={cn(
                    "w-full lg:w-1/2 bg-white relative flex flex-col justify-center",
                    "p-6 sm:p-8 md:p-12 lg:p-16",
                    reverse ? "order-1" : "order-2"
                )}>
                    {/* Mobile logo - only show on mobile */}
                    <div className="lg:hidden mb-8 flex justify-center">
                        <Link to="/" className="inline-block">
                            <img src={MuneLogo} alt="Mune Logo" className="h-10 w-auto" />
                        </Link>
                    </div>

                    <div className="w-full max-w-md mx-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
