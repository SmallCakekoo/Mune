import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RoomPresence } from '../../../types/room.types';
import { cn } from '../../../utils/cn';

interface ActiveUsersProps {
    members: RoomPresence[];
}

const ActiveUsers: React.FC<ActiveUsersProps> = ({ members }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#000000]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-5 w-72 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500">
                        Members
                    </h3>
                    <span className="text-[10px] font-bold text-primary-400/80">{members.length} Online</span>
                </div>
                <div className="flex -space-x-2.5">
                    {members.slice(0, 3).map((m) => (
                        <div
                            key={m.userId}
                            className="w-7 h-7 rounded-full border-2 border-black overflow-hidden bg-background-500 shadow-lg"
                        >
                            <img src={m.user.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-1.5">
                {members.map((member) => (
                    <button
                        key={member.userId}
                        onClick={() => navigate(`/user/${member.userId}`)}
                        className="w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-white/[0.03] transition-all group text-left relative"
                    >
                        <div className="relative">
                            <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 bg-background-500 group-hover:border-primary-500/50 transition-colors">
                                <img src={member.user.avatar} alt={member.user.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            </div>
                            <div className={cn(
                                "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#000000] z-10",
                                member.isWriting ? "bg-primary-500" : "bg-green-500"
                            )} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white/90 truncate group-hover:text-white transition-colors">
                                {member.user.name}
                            </p>
                            <div className="flex items-center gap-1.5">
                                {member.isWriting ? (
                                    <span className="flex gap-0.5 items-center">
                                        <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        <span className="ml-1 text-[10px] text-primary-400 font-bold uppercase tracking-wider">Writing</span>
                                    </span>
                                ) : (
                                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Online</span>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ActiveUsers;
