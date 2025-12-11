import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Building } from 'lucide-react';

export function SyncModal({ isOpen, onClose }) {
    const [status, setStatus] = useState('idle'); // idle, connecting, success

    const handleSync = () => {
        setStatus('connecting');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 1500);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Building className="w-5 h-5 mr-2 text-cyan-400" /> Connect Institution
                    </h2>

                    {status === 'idle' && (
                        <div className="space-y-3">
                            <button onClick={handleSync} className="w-full p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/5 flex items-center justify-between transition-colors">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3 font-bold">C</div>
                                    <span>Chase Bank</span>
                                </div>
                                <span className="text-xs text-green-400">Active</span>
                            </button>
                            <button onClick={handleSync} className="w-full p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/5 flex items-center justify-between transition-colors">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 font-bold">W</div>
                                    <span>Wells Fargo</span>
                                </div>
                                <span className="text-xs text-slate-400">Connect</span>
                            </button>
                        </div>
                    )}

                    {status === 'connecting' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                            <p className="text-slate-300">Establishing secure connection...</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                                <Check className="w-6 h-6 text-green-400" />
                            </div>
                            <p className="text-white font-bold">Accounts Synced Successfully!</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
