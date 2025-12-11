import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Sword, Zap, AlertTriangle, Crosshair, ShieldAlert, CheckCircle, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useGame } from '../../context/GameContext';

export function BattleArena({ debtName = "Student Loan" }) {
    const { financialData, completeMission } = useGame();

    // Use real debt from context, default to 15000 if 0 (for demo initial feel)
    const currentDebt = financialData.debt !== undefined ? financialData.debt : 15000;
    const initialAmount = 15000; // Static max for the level bar visualization for now

    const [isHit, setIsHit] = useState(false);
    const [damage, setDamage] = useState(null);

    const handleAttack = () => {
        if (currentDebt <= 0) return;

        const dmg = 500;
        // Call the global mission/action handler to update real data
        completeMission('debt', { amount: dmg });

        setIsHit(true);
        setDamage(dmg);

        setTimeout(() => setIsHit(false), 200);
        setTimeout(() => setDamage(null), 1000);
    };

    const healthPercent = Math.max(0, Math.min(100, (currentDebt / initialAmount) * 100));

    // VICTORY STATE
    if (currentDebt <= 0) {
        return (
            <div className="relative w-full overflow-hidden text-center bg-black border-2 border-green-500/50 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] p-8">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,0,0.06),rgba(0,255,0,0.02))] z-[5] bg-[length:100%_2px,3px_100%] pointer-events-none" />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 flex flex-col items-center justify-center py-10"
                >
                    <Trophy className="w-24 h-24 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                    <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">NEMESIS ELIMINATED</h2>
                    <p className="text-green-400 font-mono text-lg mb-8">THREAT NEUTRALIZED // DEBT FREE</p>

                    <div className="px-6 py-3 bg-green-500/20 rounded-full border border-green-500/50 flex items-center text-green-300">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>MISSION ACCOMPLISHED</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden text-left bg-black border-2 border-red-500/50 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_2px,3px_100%] pointer-events-none" />

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#220505_1px,transparent_1px),linear-gradient(to_bottom,#220505_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 z-0" />

            <div className="relative z-10 p-6 md:p-8">
                {/* Header / HUD */}
                <div className="flex justify-between items-start mb-8 border-b border-red-900/50 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg animate-pulse">
                            <Skull className="w-8 h-8 text-red-500" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{debtName}</h3>
                                <div className="px-2 py-0.5 bg-red-600 text-black text-[10px] font-bold rounded uppercase">Lvl 10 Boss</div>
                            </div>
                            <div className="flex space-x-4 mt-1 font-mono text-xs text-red-400">
                                <span className="flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> THREAT: EXTREME</span>
                                <span className="flex items-center text-red-300"><Crosshair className="w-3 h-3 mr-1" /> WEAKNESS: CASH FLOW</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boss Visual & Health */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    {/* Boss Avatar */}
                    <div className="relative group shrink-0">
                        <motion.div
                            animate={isHit ? { x: [-5, 5, -5, 5, 0], filter: "brightness(2)" } : { y: [0, -10, 0] }}
                            transition={isHit ? { duration: 0.2 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className={cn(
                                "w-32 h-32 rounded-full border-4 flex items-center justify-center relative bg-black",
                                isHit ? "border-white bg-red-500" : "border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                            )}
                        >
                            <ShieldAlert className={cn("w-16 h-16 transition-colors", isHit ? "text-white" : "text-red-600")} />

                            {/* Glitch Overlay */}
                            {!isHit && <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping opacity-20" />}
                        </motion.div>
                    </div>

                    {/* Dynamic Health Bar */}
                    <div className="w-full space-y-2">
                        <div className="flex justify-between font-mono text-sm font-bold text-red-500 mb-1">
                            <span>INTEGRITY</span>
                            <span>{healthPercent.toFixed(1)}%</span>
                        </div>
                        <div className="h-8 bg-black border border-red-900 rounded-sm relative overflow-hidden flex space-x-[2px] p-1">
                            {/* Segmented HP */}
                            <motion.div
                                className="h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                                initial={{ width: '100%' }}
                                animate={{ width: `${healthPercent}%` }}
                                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            />
                        </div>
                        <div className="text-right font-mono text-xs text-red-400">
                            REMAINING: ₹ {currentDebt.toLocaleString('en-IN')}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-8 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(220,38,38,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAttack}
                        className="relative group w-full md:w-auto px-12 py-6 bg-gradient-to-t from-red-900 to-red-600 border-2 border-red-400 rounded-lg overflow-hidden uppercase font-black text-xl text-white tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            <Sword className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                            DEPLOY QUANTUM PAYDOWN (₹ 500)
                        </span>

                        {/* Hover Light Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                    </motion.button>
                </div>

                {/* Floating Damage Text */}
                <AnimatePresence>
                    {damage && (
                        <motion.div
                            initial={{ opacity: 1, y: -50, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 0, y: -150, scale: 2, rotate: 10 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-white pointer-events-none z-50 flex items-center"
                            style={{ textShadow: '4px 4px 0px #991b1b' }}
                        >
                            <Zap className="w-12 h-12 text-yellow-400 mr-2" />
                            CRITICAL HIT! -{damage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
