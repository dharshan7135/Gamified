import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Lock, Shield, TrendingUp, Zap, Flag } from 'lucide-react';

const levels = [
    { id: 5, name: "Freedom", icon: Flag, color: "from-purple-500 to-pink-500", glow: "shadow-purple-500/50" },
    { id: 4, name: "Growth", icon: TrendingUp, color: "from-blue-500 to-cyan-500", glow: "shadow-cyan-500/50" },
    { id: 3, name: "Security", icon: Shield, color: "from-green-500 to-emerald-500", glow: "shadow-emerald-500/50" },
    { id: 2, name: "Stability", icon: Zap, color: "from-yellow-500 to-orange-500", glow: "shadow-orange-500/50" },
    { id: 1, name: "Survival", icon: Lock, color: "from-red-500 to-rose-600", glow: "shadow-red-500/50" },
];

export function MonolithView({ currentLevel = 1 }) {
    return (
        <div className="relative flex flex-col items-center justify-center py-12 w-full max-w-md mx-auto perspective-1000">
            {/* Holographic Base */}
            <div className="absolute bottom-0 w-64 h-12 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />

            {levels.map((level, index) => {
                const isUnlocked = currentLevel >= level.id;
                const isCurrent = currentLevel === level.id;
                const Icon = level.icon;

                return (
                    <motion.div
                        key={level.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={cn(
                            "relative flex items-center justify-between w-full mb-2 p-4 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-500",
                            isUnlocked ? `bg-gradient-to-r ${level.color} bg-opacity-20` : "bg-slate-800/50 grayscale",
                            isCurrent && `scale-105 ring-2 ring-white/50 z-10 ${level.glow} shadow-lg`,
                            !isUnlocked && "opacity-60"
                        )}
                        style={{
                            width: `${100 - (index * 10)}%`, // Tapering effect
                        }}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={cn("p-2 rounded-lg bg-black/20", isCurrent && "animate-pulse")}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-white tracking-wider">{level.name}</span>
                        </div>

                        {isCurrent && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute inset-0 rounded-xl bg-white/5"
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
