import React, { useState } from 'react';
import { ProLayout } from '../components/layout/ProLayout';
import { MonolithView } from '../components/pyramid/MonolithView';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Zap, Check } from 'lucide-react';
import { SyncModal } from '../components/ui/SyncModal';
import { BattleArena } from '../components/gamification/BattleArena';
import { MissionModal } from '../components/game/MissionModal';
import { ProfileCard } from '../components/ui/ProfileCard';
import { HaloAssistant } from '../components/ai/HaloAssistant';

export default function Home() {
    const { level, levelName, missions, completeMission, userProfile, financialData } = useGame();
    const [simMode, setSimMode] = useState("growth");
    const [isSyncOpen, setIsSyncOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState(null);

    const handleMissionClick = (mission) => {
        if (!mission.completed) {
            setSelectedMission(mission);
        }
    };

    return (
        <ProLayout>
            <SyncModal isOpen={isSyncOpen} onClose={() => setIsSyncOpen(false)} />
            {/* key prop forces re-mount on mission change to reset modal state */}
            <MissionModal
                key={selectedMission?.id || 'closed'}
                mission={selectedMission}
                onClose={() => setSelectedMission(null)}
            />

            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">NEXUS CONTROL</h1>
                    <p className="text-slate-400">System Status: ONLINE</p>
                </div>
                <div className="flex space-x-4 items-center">
                    <button
                        onClick={() => setIsSyncOpen(true)}
                        className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                    >
                        Sync Accounts
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Center Stage: The Monolith and Profile */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <ProfileCard />

                    <div className="flex flex-col items-center justify-center bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
                        <h2 className="text-xl font-bold text-cyan-400 mb-8 flex items-center">
                            <Zap className="w-5 h-5 mr-2" /> Status: LEVEL {level} ({levelName})
                        </h2>
                        <MonolithView currentLevel={level} />

                        {/* Temporal Wealth Simulator */}
                        <div className="w-full mt-12 p-1 bg-black/40 rounded-xl border border-white/10 backdrop-blur-md">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                    <Clock className="w-3 h-3 mr-2" /> Temporal Simulation
                                </h3>
                                <div className="flex space-x-1">
                                    {['safe', 'growth', 'hyper'].map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => setSimMode(mode)}
                                            className={`px-2 py-1 text-[10px] uppercase font-bold rounded transition-all ${simMode === mode
                                                ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                                                : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                                                }`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col items-center">
                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 mb-1">
                                    ₹ {(
                                        (financialData?.income || 12000) * 12 * 10 * (simMode === 'safe' ? 1.05 : simMode === 'growth' ? 1.12 : 1.25)
                                    ).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                </div>
                                <p className="text-xs text-cyan-500/80 font-mono mb-4">PROJECTED NET WORTH (T+10 YRS)</p>

                                {/* Visual Graph Bars */}
                                <div className="flex items-end space-x-2 h-16 w-full px-4 opacity-50">
                                    {[0.2, 0.4, 0.5, 0.7, 0.8, 0.9, 1].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: '10%' }}
                                            animate={{ height: `${h * 100}%` }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className={`flex-1 rounded-t-sm ${simMode === 'hyper' ? 'bg-purple-500' : simMode === 'growth' ? 'bg-cyan-500' : 'bg-emerald-500'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
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
                            <p className="text-slate-400 text-sm mb-1">Monthly Income</p>
                            <h3 className="text-3xl font-bold text-white">₹ {financialData?.income?.toLocaleString('en-IN') || '0'}</h3>
                            <div className="flex items-center text-green-400 text-sm mt-2">
                                <TrendingUp className="w-4 h-4 mr-1" /> Active
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
                                    onClick={() => handleMissionClick(mission)}
                                >
                                    <div>
                                        <h4 className={mission.completed ? 'line-through text-slate-500' : 'text-white font-medium'}>
                                            {mission.title}
                                        </h4>
                                        <p className="text-xs text-slate-400">Reward: {mission.xp} XP</p>
                                        {mission.desc && <p className="text-xs text-slate-500 mt-1">{mission.desc}</p>}
                                    </div>
                                    {!mission.completed ? (
                                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-cyan-400" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-green-400" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* AI Assistant */}
            <HaloAssistant />
        </ProLayout>
    );
}
