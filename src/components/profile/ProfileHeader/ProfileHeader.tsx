import React from 'react';
import { motion } from 'framer-motion';
import {
    IconSettings,
    IconBrandDiscord,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter
} from '@tabler/icons-react';
import type { User } from '../../../types/user.types';

interface ProfileHeaderProps {
    user: User;
    onSettingsClick?: () => void;
    isOwnProfile?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onSettingsClick, isOwnProfile = true }) => {

    return (
        <div className="relative overflow-hidden rounded-3xl bg-primary-600 p-8 shadow-2xl">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group shrink-0"
                >
                    <img
                        src={user.avatar || '/src/assets/images/cats/Default.png'}
                        alt={user.name}
                        className="w-40 h-40 rounded-2xl object-cover border-4 border-white/20 shadow-xl group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.currentTarget.src = '/src/assets/images/cats/Default.png';
                        }}
                    />
                </motion.div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-1">
                        <h1 className="text-4xl font-bold text-white tracking-tight">
                            {user.name}
                        </h1>
                        {isOwnProfile && onSettingsClick && (
                            <button
                                onClick={onSettingsClick}
                                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all hover:rotate-45"
                            >
                                <IconSettings size={22} />
                            </button>
                        )}
                    </div>

                    <p className="text-primary-200 font-medium mb-4">@{user.username}</p>

                    <p className="text-primary-100 text-lg mb-6 max-w-lg leading-relaxed">
                        {user.bio || "No bio yet..."}
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {user.socialLinks?.discord && (
                            <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/5 py-1.5 px-3 rounded-lg border border-white/10 backdrop-blur-sm">
                                <IconBrandDiscord size={18} />
                                <span className="text-sm font-medium">{user.socialLinks.discord}</span>
                            </div>
                        )}
                        {user.socialLinks?.github && (
                            <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/5 py-1.5 px-3 rounded-lg border border-white/10 backdrop-blur-sm">
                                <IconBrandGithub size={18} />
                                <span className="text-sm font-medium">{user.socialLinks.github}</span>
                            </div>
                        )}
                        {user.socialLinks?.linkedin && (
                            <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/5 py-1.5 px-3 rounded-lg border border-white/10 backdrop-blur-sm">
                                <IconBrandLinkedin size={18} />
                                <span className="text-sm font-medium">{user.socialLinks.linkedin}</span>
                            </div>
                        )}
                        {user.socialLinks?.twitter && (
                            <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/5 py-1.5 px-3 rounded-lg border border-white/10 backdrop-blur-sm">
                                <IconBrandTwitter size={18} />
                                <span className="text-sm font-medium">{user.socialLinks.twitter}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 md:flex-col lg:flex-row shrink-0">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[140px] text-center border border-white/10 shadow-lg"
                    >
                        <p className="text-2xl font-bold text-white">¡{user.stats?.roomsCreated || 0}!</p>
                        <p className="text-xs text-primary-100 uppercase tracking-wider font-bold mt-1">Rooms Created</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-secondary-cyan-500/80 backdrop-blur-md rounded-2xl p-4 min-w-[140px] text-center border border-white/10 shadow-lg"
                    >
                        <p className="text-2xl font-bold text-white">¡{user.stats?.minutesSpent || 0}!</p>
                        <p className="text-xs text-white/90 uppercase tracking-wider font-bold mt-1">Minutes here</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
