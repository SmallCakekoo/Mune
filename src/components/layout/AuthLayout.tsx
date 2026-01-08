import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MuneLogo from '../../assets/images/MuneCollapsed.svg';

interface AuthLayoutProps {
    reverse?: boolean;
}

const AuthLayout = ({ reverse = false }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background-500 relative overflow-hidden">
            {/* Background Elements - Similar to Landing */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-background-500 to-background-500 z-0" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0 mix-blend-overlay" />
            
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Floating blob shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary-500/5 rounded-full blur-3xl"
                />
            </div>

            {/* Single centered card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo at top */}
                <div className="mb-8 flex justify-center">
                    <Link to="/" className="inline-block hover:scale-105 transition-transform duration-300">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            src={MuneLogo}
                            alt="Mune Logo"
                            className="h-10 w-auto brightness-0 invert"
                        />
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-background-400/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 sm:p-10">
                    <Outlet />
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;
