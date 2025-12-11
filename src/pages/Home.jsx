import React, { useState } from 'react';
import { ProLayout } from '../components/layout/ProLayout';
import { MonolithView } from '../components/pyramid/MonolithView';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Zap } from 'lucide-react';
import { SyncModal } from '../components/ui/SyncModal';
import { BattleArena } from '../components/gamification/BattleArena';

export default function Home() {
    const { level, missions, completeMission } = useGame();
    const [timeProjection, setTimeProjection] = useState(0);
    const [isSyncOpen, setIsSyncOpen] = useState(false);

    return (
        <ProLayout>
            <SyncModal isOpen={isSyncOpen} onClose={() => setIsSyncOpen(false)} />
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Command Deck</h1>
                    <p className="text-slate-400">Welcome back, Commander. Systems nominal.</p>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setIsSyncOpen(true)}
                        className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                    >
                        Sync Accounts
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Center Stage: The Monolith */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
                    <h2 className="text-xl font-bold text-cyan-400 mb-8 flex items-center">
                        <Zap className="w-5 h-5 mr-2" /> Status: LEVEL {level}
                    </h2>
                    <MonolithView currentLevel={level} />

                    {/* Time Travel Slider */}
                    <div className="w-full mt-12 p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Present</span>
                            <span>+5 Years</span>
                            <span>+10 Years</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={timeProjection}
                            onChange={(e) => setTimeProjection(e.target.value)}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <p className="text-center text-xs text-cyan-400 mt-2">
                            Projected Net Worth: <span className="font-bold text-white">${(timeProjection * 12000).toLocaleString()}</span>
                        </p>
                    </div>
                </div>

                {/* Right Panel: Missions & Stats */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10"
                        >
                            <p className="text-slate-400 text-sm mb-1">Total Net Worth</p>
                            <h3 className="text-3xl font-bold text-white">$12,450</h3>
                            <div className="flex items-center text-green-400 text-sm mt-2">
                                <TrendingUp className="w-4 h-4 mr-1" /> +12% this month
                            </div>
                        </motion.div>

                        <div className="col-span-2">
                            <BattleArena />
                        </div>
                    </div>

                    {/* Active Missions */}
                    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Active Operations</h3>
                        <div className="space-y-3">
                            {missions.map((mission) => (
                                <motion.div
                                    key={mission.id}
                                    whileHover={{ x: 5 }}
                                    className={`p-4 rounded-xl border transition-all flex justify-between items-center cursor-pointer ${mission.completed
                                        ? 'bg-green-500/10 border-green-500/30 opacity-50'
                                        : 'bg-white/5 border-white/10 hover:border-cyan-500/50'
                                        }`}
                                    onClick={() => !mission.completed && completeMission(mission.id)}
                                >
                                    <div>
                                        <h4 className={mission.completed ? 'line-through text-slate-500' : 'text-white font-medium'}>
                                            {mission.title}
                                        </h4>
                                        <p className="text-xs text-slate-400">Reward: {mission.xp} XP</p>
                                    </div>
                                    {!mission.completed && (
                                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-cyan-400" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ProLayout>
    );
}
