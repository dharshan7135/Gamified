import React from 'react';
import { ProLayout } from '../components/layout/ProLayout';

export default function Wealth() {
    return (
        <ProLayout>
            <h1 className="text-3xl font-bold text-white mb-6">Wealth Management</h1>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                <p className="text-slate-400">Detailed asset tracking coming soon...</p>
            </div>
        </ProLayout>
    );
}
