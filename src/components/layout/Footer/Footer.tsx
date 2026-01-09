import { IconBrandTwitter, IconBrandGithub, IconBrandDiscord } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import MuneLogo from '../../../assets/images/MuneExpanded.svg';

const Footer = () => {
    return (
        <footer className="bg-background-500 border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <img src={MuneLogo} alt="Mune" className="h-8 w-auto mb-6" />
                        <p className="text-neutral-5/80 text-sm leading-relaxed">
                            The digital playground that blends Figma's canvas, Notion's organization, and shared music experiences.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4">
                            {['Features'].map((item) => (
                                <li key={item}>
                                    <Link to="/#features" className="text-white hover:text-primary-300 text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/#about" className="text-white hover:text-primary-300 text-sm transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/#contact" className="text-white hover:text-primary-300 text-sm transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Legal</h4>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-white hover:text-primary-300 text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white text-sm">
                        © 2026 Mune. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-white hover:text-primary-300 transition-colors">
                            <IconBrandTwitter size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-primary-300 transition-colors">
                            <IconBrandGithub size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-primary-300 transition-colors">
                            <IconBrandDiscord size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
