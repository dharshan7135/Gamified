import React from 'react';
import { ProLayout } from '../components/layout/ProLayout';

export default function Missions() {
    return (
        <ProLayout>
            <h1 className="text-3xl font-bold text-white mb-6">Active Missions</h1>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                <p className="text-slate-400">Complete quests to earn XP...</p>
            </div>
        </ProLayout>
    );
}
