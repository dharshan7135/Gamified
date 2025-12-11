import React from 'react';
import { ProLayout } from '../components/layout/ProLayout';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Lock, Zap, CheckCircle } from 'lucide-react';

export default function Missions() {
    const { missions, level } = useGame();

    // Group missions by status/type if needed, or just list them clearly
    // For now, let's just show active vs completed vs locked (conceptual)

    return (
        <ProLayout>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Operations Center</h1>
                    <p className="text-slate-400">Available Missions & Objectives</p>
                </header>

                <div className="grid gap-4">
                    {missions.map((mission, index) => (
                        <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 rounded-2xl border flex items-center justify-between ${mission.completed
                                    ? 'bg-emerald-900/10 border-emerald-500/30'
                                    : 'bg-slate-800/50 border-white/10'
                                }`}
                        >
                            <div className="flex items-start space-x-4">
                                <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center ${mission.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                                    {mission.completed ? <CheckCircle className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className={`text-lg font-bold ${mission.completed ? 'text-emerald-400' : 'text-white'}`}>{mission.title}</h3>
                                    {mission.desc && <p className="text-slate-400 text-sm mt-1 mb-2">{mission.desc}</p>}
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                                        XP +{mission.xp}
                                    </span>
                                </div>
                            </div>

                            {mission.completed && (
                                <div className="text-right">
                                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Completed</span>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    <div className="p-6 rounded-2xl bg-black/20 border border-white/5 flex items-center justify-center text-slate-500 border-dashed">
                        <Lock className="w-5 h-5 mr-3" />
                        <span>Advance to Level {level + 1} to unlock more missions...</span>
                    </div>
                </div>
            </div>
        </ProLayout>
    );
}
