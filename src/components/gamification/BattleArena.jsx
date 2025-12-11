import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Sword, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

export function BattleArena({ debtName = "Student Loan", initialAmount = 15000 }) {
    const [health, setHealth] = useState(initialAmount);
    const [isHit, setIsHit] = useState(false);
    const [damage, setDamage] = useState(null);

    const handleAttack = () => {
        const dmg = 500; // Payment amount simulation
        setHealth(h => Math.max(0, h - dmg));
        setIsHit(true);
        setDamage(dmg);

        setTimeout(() => setIsHit(false), 200);
        setTimeout(() => setDamage(null), 1000);
    };

    const healthPercent = (health / initialAmount) * 100;

    return (
        <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-red-500/30 overflow-hidden">
            {/* Boss Visual */}
            <div className="flex justify-between items-center mb-6 relative z-10">
                <div>
                    <h3 className="text-red-500 font-bold text-lg uppercase tracking-widest flex items-center">
                        <Skull className="w-5 h-5 mr-2" /> Target: {debtName}
                    </h3>
                    <p className="text-xs text-red-400/60">Class: High Interest</p>
                </div>

                <motion.div
                    animate={isHit ? { x: [-10, 10, -10, 10, 0], color: '#ffffff' } : { y: [0, -10, 0] }}
                    transition={isHit ? { duration: 0.2 } : { duration: 2, repeat: Infinity }}
                    className={cn("p-4 rounded-full bg-red-900/20 border-2 border-red-500/50", isHit && "bg-red-500")}
                >
                    <Skull className={cn("w-12 h-12 text-red-500", isHit && "text-white")} />
                </motion.div>
            </div>

            {/* Health Bar */}
            <div className="mb-6 relative z-10">
                <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-red-400">HP</span>
                    <span className="text-white">${health.toLocaleString()} / ${initialAmount.toLocaleString()}</span>
                </div>
                <div className="h-4 bg-red-900/30 rounded-full overflow-hidden border border-red-500/20">
                    <motion.div
                        className="h-full bg-gradient-to-r from-red-600 to-orange-600"
                        initial={{ width: '100%' }}
                        animate={{ width: `${healthPercent}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center relative z-10">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAttack}
                    className="group relative px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-lg shadow-red-600/20 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center">
                        <Sword className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                        PAYMENT STRIKE ($500)
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                </motion.button>
            </div>

            {/* Damage Number Popup */}
            <AnimatePresence>
                {damage && (
                    <motion.div
                        initial={{ opacity: 1, y: -50, scale: 0.5 }}
                        animate={{ opacity: 0, y: -100, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-white pointer-events-none z-50"
                        style={{ textShadow: '0 0 10px #ef4444' }}
                    >
                        -{damage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Effects */}
            <div className="absolute inset-0 bg-red-500/5 z-0" />
            {isHit && <div className="absolute inset-0 bg-red-500/20 z-0 animate-pulse" />}
        </div>
    );
}
