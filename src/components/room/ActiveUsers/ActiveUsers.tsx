import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { RoomPresence } from '../../../types/room.types';
import { cn } from '../../../utils/cn';
import { IconUserMinus, IconBan, IconChevronUp, IconUsers, IconChevronDown } from '@tabler/icons-react';
import toast from 'react-hot-toast';

interface ActiveUsersProps {
    members: RoomPresence[];
    isOwner?: boolean;
    currentUserId?: string;
}

const ActiveUsers: React.FC<ActiveUsersProps> = ({ members, isOwner, currentUserId }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleKick = (userId: string, name: string) => {
        console.log(`Kicking user ${userId}`);
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 800)),
            {
                loading: `Kicking ${name}...`,
                success: `${name} has been kicked from the room.`,
                error: 'Failed to kick user.',
            }
        );
    };

    const handleBan = (userId: string, name: string) => {
        console.log(`Banning user ${userId}`);
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 800)),
            {
                loading: `Banning ${name}...`,
                success: `${name} has been banned from the room.`,
                error: 'Failed to ban user.',
            }
        );
    };

    const handleUserClick = (userId: string) => {
        navigate(`/user/${userId}`);
    };

    return (
        <motion.div
            layout
            initial={false}
            animate={{
                width: isExpanded ? 320 : 70,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden overflow-x-hidden ml-auto"
        >
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    /* Estado Expandido - Lista Completa */
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-5"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                                    <IconUsers size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">
                                        Members
                                    </h3>
                                    <span className="text-xs font-semibold text-primary-400">{members.length} Online</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all active:scale-95"
                            >
                                <IconChevronUp size={20} />
                            </button>
                        </div>

                        {/* Members List */}
                        <div className="space-y-2 max-h-[400px] overflow-y-auto overflow-x-hidden pr-1">
                            {members.map((member, index) => (
                                <motion.div
                                    key={member.userId}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/8 transition-all group cursor-pointer relative"
                                >
                                    <div
                                        className="flex items-center gap-3 flex-1 min-w-0"
                                        onClick={() => handleUserClick(member.userId)}
                                    >
                                        <div className="relative flex-shrink-0">
                                            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-white/10 bg-background-500 group-hover:border-primary-500/40 transition-all shadow-lg">
                                                <img
                                                    src={member.user.avatar || '/src/assets/images/cats/Cat (1).png'}
                                                    alt={member.user.name}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                />
                                            </div>
                                            <div className={cn(
                                                "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background-500",
                                                member.isWriting ? 'bg-primary-500 shadow-lg shadow-primary-500/50' : 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                                            )} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-bold text-white truncate group-hover:text-primary-400 transition-colors">
                                                {member.user.name}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider">
                                                {member.isWriting ? (
                                                    <span className="flex gap-0.5 items-center">
                                                        <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                        <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                        <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                        <span className="ml-1 text-primary-400">Writing</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-emerald-400">Online</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Owner Actions */}
                                    {isOwner && member.userId !== currentUserId && (
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleKick(member.userId, member.user.name); }}
                                                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                                                title="Kick user"
                                            >
                                                <IconUserMinus size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleBan(member.userId, member.user.name); }}
                                                className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all active:scale-95"
                                                title="Ban user"
                                            >
                                                <IconBan size={16} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* Estado Compacto - Vista Vertical */
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsExpanded(true)}
                        className="p-4 cursor-pointer group"
                    >
                        <div className="flex flex-col items-center gap-3">
                            {/* Header Icon */}
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all">
                                <IconUsers size={18} className="text-white" />
                            </div>

                            {/* Avatar Stack Vertical */}
                            <div className="flex flex-col gap-2">
                                {members.slice(0, 4).map((m, i) => (
                                    <motion.div
                                        key={m.userId}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative"
                                    >
                                        <div className="w-10 h-10 rounded-full border-2 border-background-500 overflow-hidden bg-background-500 shadow-lg group-hover:border-primary-500/50 transition-all">
                                            <img
                                                src={m.user.avatar || '/src/assets/images/cats/Cat (1).png'}
                                                alt={m.user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className={cn(
                                            "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background-500",
                                            m.isWriting ? 'bg-primary-500' : 'bg-emerald-500'
                                        )} />
                                    </motion.div>
                                ))}
                                {members.length > 4 && (
                                    <div className="w-10 h-10 rounded-full border-2 border-background-500 bg-gradient-to-br from-primary-500/20 to-primary-600/20 backdrop-blur flex items-center justify-center shadow-lg">
                                        <span className="text-xs font-bold text-white">+{members.length - 4}</span>
                                    </div>
                                )}
                            </div>

                            {/* Count Badge */}
                            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5 w-full justify-center">
                                <span className="text-xs font-bold text-white">{members.length}</span>
                                <IconChevronDown size={14} className="text-white/70 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ActiveUsers;
