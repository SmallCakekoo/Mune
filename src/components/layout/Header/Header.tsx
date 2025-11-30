import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import MuneLogo from '../../../assets/images/MuneExpanded.svg';

interface HeaderProps {
    showNavLinks?: boolean;
}

const Header = ({ showNavLinks = true }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-500/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.05)] py-4' : 'bg-transparent py-6'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 flex items-center justify-between relative">
                <Link to="/" className="flex items-center gap-2">
                    <img src={MuneLogo} alt="Mune" className="h-8 w-auto" />
                </Link>

                {showNavLinks && (
                    <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                        {['Features', 'About'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-neutral-5 hover:text-white font-medium transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-white hover:text-neutral-200 font-medium transition-colors px-4 py-2"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-primary-500 hover:bg-primary-400 text-white px-5 py-2.5 rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(58,139,255,0.3)]"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
