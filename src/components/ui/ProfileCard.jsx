import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, User } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export function ProfileCard() {
    const { userProfile, level, levelName, xp } = useGame();

    // Calculate progress to next level
    // Hardcoded thresholds for display logic consistency with context
    const thresholds = { 1: 300, 2: 1000, 3: 2500, 4: 5000, 5: 10000 };
    const nextInfo = thresholds[level] || 10000;
    const prevInfo = level > 1 ? thresholds[level - 1] : 0;
    const progressPercent = Math.min(100, Math.max(0, ((xp - prevInfo) / (nextInfo - prevInfo)) * 100));

    // Fallback if no profile set
    const displayName = userProfile.name || "USERNAME";
    const displayTitle = userProfile.title || "Novice";

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-4 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 relative overflow-hidden group"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Avatar Section */}
            <div className="relative mr-4 flex-shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-cyan-500 p-1 relative z-10 bg-slate-900">
                    {userProfile.avatar ? (
                        <img src={userProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                            <User className="w-8 h-8 text-slate-500" />
                        </div>
                    )}
                </div>
                {/* Level Badge */}
                <div className="absolute -bottom-1 -right-1 z-20 bg-cyan-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900">
                    {level}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 min-w-0 z-10">
                <h3 className="text-white font-bold text-lg truncate">{displayName}</h3>
                <p className="text-cyan-400 text-xs uppercase tracking-wider mb-2">{levelName} {userProfile.title && `• ${userProfile.title}`}</p>

                {/* XP Bar */}
                <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                </div>
                <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-slate-500">XP {xp}</span>
                    <span className="text-[10px] text-slate-500">Next: {nextInfo}</span>
                </div>
            </div>
        </motion.div>
    );
}
