import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconHome, IconSearch, IconPlus } from '@tabler/icons-react';
import { cn } from '../../../utils/cn';
import { useAuth } from '../../../hooks/useAuth';

const MuneLogo = new URL('../../../assets/images/MuneCollapsed.svg', import.meta.url).href;

const RoomSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const items = [
        { icon: IconHome, label: 'Home', path: '/home' },
        { icon: IconPlus, label: 'Add Note', action: () => { } }, // Canvas will handle this
        { icon: IconSearch, label: 'Search', path: '/search' },
    ];

    return (
        <aside className="w-20 bg-background-500 border-r border-white/5 flex flex-col items-center py-6 h-full justify-between">
            <div className="flex flex-col items-center gap-8 w-full">
                {/* Logo */}
                <div className="mb-4">
                    <img src={MuneLogo} alt="Mune" className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => navigate('/home')} />
                </div>

                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => item.path ? navigate(item.path) : item.action?.()}
                        className={cn(
                            "p-3 rounded-2xl transition-all duration-300 relative group",
                            location.pathname === item.path
                                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                                : "text-neutral-50 hover:bg-white/5"
                        )}
                    >
                        <item.icon size={24} stroke={1.5} />

                        {/* Tooltip */}
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-background-400 border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
                            {item.label}
                        </div>

                        {location.pathname === item.path && (
                            <motion.div
                                layoutId="activeSidebar"
                                className="absolute -left-1 top-2 bottom-2 w-1 bg-primary-400 rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Avatar Bottom */}
            <div className="mt-auto">
                <button
                    onClick={() => navigate('/profile')}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500/20 hover:border-primary-500/50 transition-all group relative"
                >
                    <img
                        src={user?.avatar || '/src/assets/images/cats/Default.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = '/src/assets/images/cats/Default.png';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </aside>
    );
};

export default RoomSidebar;
