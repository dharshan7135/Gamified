import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Radio, MessageSquare, Zap } from 'lucide-react';

export function HaloAssistant() {
    const [status, setStatus] = useState('idle'); // idle, scanning, speaking
    const [message, setMessage] = useState("System Nominal. Awaiting Input.");

    const messages = [
        "Analyzing market trends... Volatility detected in Sector 7.",
        "Credit utilization optimal. Keep maintaining velocity.",
        "Reminder: Emergency shields are at 40% capacity.",
        " Incoming transmission: 'Compound interest is the eighth wonder of the world.'",
        "Wealth algorithm efficiency increased by 1.2%.",
        "Detecting untapped equity potential. Advise: Real Estate mission."
    ];

    const cycleStatus = () => {
        setStatus('scanning');
        setTimeout(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            setMessage(randomMsg);
            setStatus('speaking');
            setTimeout(() => setStatus('idle'), 4000);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {status === 'speaking' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-24 right-0 w-64 bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 p-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="mt-1">
                                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1">H.A.L.O. Interface</h4>
                                <p className="text-white text-sm font-mono leading-relaxed typewriter">{message}</p>
                            </div>
                        </div>
                        {/* Connecting Line */}
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-slate-900 border-r border-b border-cyan-500/50 transform rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Orb Container */}
            <motion.button
                onClick={cycleStatus}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group w-16 h-16 flex items-center justify-center"
            >
                {/* Core Orb */}
                <div className="relative z-10 w-12 h-12 bg-black rounded-full border border-cyan-400 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                    <div className="absolute inset-0 bg-cyan-500/20 animate-pulse" />
                    <Brain className={`w-6 h-6 text-cyan-400 ${status === 'scanning' ? 'animate-spin' : ''}`} />

                    {/* Holographic Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.2)_50%)] bg-[length:100%_2px] pointer-events-none" />
                </div>

                {/* Outer Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-cyan-500/30 rounded-full border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 border border-blue-500/20 rounded-full border-dotted"
                />

                {/* Status Indicator */}
                <div className={`absolute top-0 right-0 w-3 h-3 rounded-full border border-black ${status === 'idle' ? 'bg-green-500' : 'bg-amber-500 animate-ping'}`} />
            </motion.button>
        </div>
    );
}
