import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ProLayout } from '../components/layout/ProLayout';
import { Shield, ShieldAlert, ShieldCheck, Heart, User, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Protection() {
    const { financialData } = useGame();

    // Safety Net Calculations
    const monthlyExpenses = (financialData.budget?.needs || 0) + (financialData.budget?.wants || 0);
    const emergencyFund = financialData.savings || 0;
    const monthsCovered = monthlyExpenses > 0 ? (emergencyFund / monthlyExpenses).toFixed(1) : 0;

    // Status Checks
    const hasHealth = financialData.insurance?.health;
    const hasLife = financialData.insurance?.life;
    const isProtected = hasHealth && hasLife && monthsCovered >= 6;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <ProLayout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-7xl mx-auto space-y-8"
            >
                {/* Header */}
                <div className="relative">
                    <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-2 flex items-center">
                        <Shield className="w-10 h-10 mr-4 text-emerald-500" />
                        Defense Systems
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Manage risk and ensure operational continuity. Active shields and contingency protocols.
                    </p>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Primary Shield (Emergency Fund) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/20 rounded-3xl p-8 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Lock className="w-48 h-48 text-emerald-500" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">Primary Shield Generator</h3>
                                    <h2 className="text-3xl font-bold text-white">Emergency Fund</h2>
                                </div>
                                <div className={`px-4 py-2 rounded-full border ${monthsCovered >= 6 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-amber-500/20 border-amber-500/50 text-amber-400'}`}>
                                    <span className="font-bold flex items-center">
                                        {monthsCovered >= 6 ? <ShieldCheck className="w-4 h-4 mr-2" /> : <ShieldAlert className="w-4 h-4 mr-2" />}
                                        {monthsCovered >= 6 ? 'OPTIMAL' : 'VULNERABLE'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-slate-400 text-xs mb-2">Current Reserves</p>
                                    <p className="text-4xl font-mono font-bold text-white mb-4">₹ {emergencyFund.toLocaleString('en-IN')}</p>
                                    <p className="text-slate-500 text-sm">
                                        Covers <span className="text-white font-bold">{monthsCovered} months</span> of expenses.
                                    </p>
                                </div>

                                {/* Visaul Bar */}
                                <div className="flex flex-col justify-end">
                                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                                        <span>0 Months</span>
                                        <span>Target: 6 Months</span>
                                    </div>
                                    <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, (monthsCovered / 6) * 100)}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className={`h-full ${monthsCovered >= 6 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}
                                        />
                                    </div>
                                    {monthsCovered < 6 && (
                                        <p className="text-xs text-amber-500 mt-2 flex items-center">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            Recommend increasing reserves by ₹ {((monthlyExpenses * 6) - emergencyFund).toLocaleString('en-IN')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Defense Score */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center relative"
                    >
                        {/* Animated Circles */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-64 h-64 border-2 border-emerald-500/30 rounded-full border-dashed"
                            />
                        </div>

                        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Defense Level</h3>
                        <div className="relative">
                            <Shield className={`w-32 h-32 ${isProtected ? 'text-emerald-500' : 'text-amber-500'} transition-colors duration-500`} />
                            {isProtected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <CheckCircle className="w-16 h-16 text-emerald-900" />
                                </motion.div>
                            )}
                        </div>
                        <p className={`mt-6 text-2xl font-bold ${isProtected ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {isProtected ? 'FORTIFIED' : 'AT RISK'}
                        </p>
                    </motion.div>
                </div>

                {/* Insurance Protocols */}
                <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2 text-cyan-400" />
                    Active Protocols
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Health Protocol */}
                    <motion.div
                        whileHover={{ scale: hasHealth ? 1.02 : 1.0 }}
                        className={`p-6 rounded-2xl border transition-all ${hasHealth
                                ? 'bg-emerald-900/20 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                                : 'bg-slate-800/30 border-slate-700 opacity-70 grayscale'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-xl mr-4 ${hasHealth ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                                    <Heart className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className={`text-lg font-bold ${hasHealth ? 'text-white' : 'text-slate-400'}`}>Biological Shield</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Health Insurance</p>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${hasHealth ? 'bg-emerald-500 text-emerald-950' : 'bg-slate-700 text-slate-400'}`}>
                                {hasHealth ? 'ONLINE' : 'OFFLINE'}
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-slate-400">
                            {hasHealth
                                ? "Medical coverage active. Protection against critical biological failures and hospitalisation events."
                                : "No medical coverage detected. Biological assets at significant risk."}
                        </p>
                    </motion.div>

                    {/* Life Protocol */}
                    <motion.div
                        whileHover={{ scale: hasLife ? 1.02 : 1.0 }}
                        className={`p-6 rounded-2xl border transition-all ${hasLife
                                ? 'bg-cyan-900/20 border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                                : 'bg-slate-800/30 border-slate-700 opacity-70 grayscale'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-xl mr-4 ${hasLife ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700 text-slate-500'}`}>
                                    <User className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className={`text-lg font-bold ${hasLife ? 'text-white' : 'text-slate-400'}`}>Legacy Protocol</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Term Life Insurance</p>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${hasLife ? 'bg-cyan-500 text-cyan-950' : 'bg-slate-700 text-slate-400'}`}>
                                {hasLife ? 'ONLINE' : 'OFFLINE'}
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-slate-400">
                            {hasLife
                                ? "Wealth transfer protocol active. Beneficiaries secured against operator termination."
                                : "No legacy protection. Dependents vulnerable to income cessation."}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </ProLayout>
    );
}
