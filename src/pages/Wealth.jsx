import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Building, Briefcase, Calculator } from 'lucide-react';

export default function Wealth() {
    const { financialData } = useGame();

    const assets = (financialData.savings || 0) + (financialData.investments || 0) + (financialData.realEstate?.reduce((acc, curr) => acc + curr.value, 0) || 0);
    const liabilities = financialData.debt || 0;
    const netWorth = assets - liabilities;

    // Calculate percentages for visualization
    const totalVolume = assets + liabilities;
    const assetPercent = totalVolume > 0 ? (assets / totalVolume) * 100 : 0;
    const liabilityPercent = totalVolume > 0 ? (liabilities / totalVolume) * 100 : 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-20 max-w-7xl mx-auto"
        >
            {/* Header */}
            <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2 relative z-10">
                    Wealth Command
                </h1>
                <p className="text-slate-400 max-w-xl text-lg relative z-10">
                    Advanced telemetry for your financial empire. Track assets, manage liabilities, and visualize your net worth growth.
                </p>
            </div>

            {/* Net Worth Overview Card */}
            <motion.div
                variants={itemVariants}
                className="col-span-1 md:col-span-3 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl shadow-cyan-900/20 group"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Activity className="w-64 h-64 text-cyan-500" />
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-cyan-400 mb-2 font-bold uppercase tracking-widest text-sm flex items-center">
                            <Calculator className="w-4 h-4 mr-2" /> Total Net Worth
                        </p>
                        <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            ₹ {netWorth.toLocaleString('en-IN')}
                        </h2>

                        <div className="flex space-x-8 text-sm font-medium">
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-emerald-500/20 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs">Total Assets</p>
                                    <p className="text-emerald-400 text-lg font-bold">₹ {assets.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-red-500/20 rounded-lg">
                                    <TrendingDown className="w-5 h-5 text-red-400" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs">Total Liabilities</p>
                                    <p className="text-red-400 text-lg font-bold">₹ {liabilities.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Bar Chart */}
                    <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <p className="text-slate-400 text-xs mb-4 uppercase tracking-wider">Portfolio Composition</p>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex mb-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${assetPercent}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${liabilityPercent}%` }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-red-500 to-orange-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Assets ({assetPercent.toFixed(0)}%)</span>
                            <span>Liabilities ({liabilityPercent.toFixed(0)}%)</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Asset Allocation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-emerald-500/30 transition-all group"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                            <DollarSign className="w-8 h-8 text-emerald-400" />
                        </div>
                        <span className="text-emerald-400 text-[10px] font-bold px-2 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">+12% APY</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Liquid Capital</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">₹ {(financialData.savings || 0).toLocaleString('en-IN')}</h3>
                    <div className="mt-4 h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[60%] rounded-full" />
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-purple-500/30 transition-all group"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                            <Briefcase className="w-8 h-8 text-purple-400" />
                        </div>
                        <span className="text-purple-400 text-[10px] font-bold px-2 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">Market</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Stock Holdings</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">₹ {(financialData.investments || 0).toLocaleString('en-IN')}</h3>
                    <div className="mt-4 h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[40%] rounded-full" />
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-slate-800/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-amber-500/30 transition-all group"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors">
                            <Building className="w-8 h-8 text-amber-400" />
                        </div>
                        <span className="text-slate-500 text-[10px] font-bold px-2 py-1 bg-slate-800 rounded-full border border-white/5">Illiquid</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Real Estate</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">₹ {(financialData.realEstate?.reduce((acc, curr) => acc + curr.value, 0) || 0).toLocaleString('en-IN')}</h3>
                    <div className="mt-4 h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[20%] rounded-full" />
                    </div>
                </motion.div>
            </div>

            {/* Detailed Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Real Estate List */}
                <motion.div
                    variants={itemVariants}
                    className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center">
                            <Building className="w-5 h-5 mr-3 text-cyan-500" />
                            Real Estate Holdings
                        </h3>
                        <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-mono">{financialData.realEstate?.length || 0} UNI</span>
                    </div>

                    {financialData.realEstate && financialData.realEstate.length > 0 ? (
                        <div className="space-y-4">
                            {financialData.realEstate.map((property, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="flex justify-between items-center p-5 bg-slate-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all group"
                                >
                                    <div>
                                        <p className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">{property.type}</p>
                                        <div className="flex items-center mt-1 text-emerald-400/80 text-xs">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            Rent: ₹ {property.income.toLocaleString('en-IN')}/mo
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500 mb-1">Market Value</p>
                                        <span className="text-white font-mono font-bold text-lg">₹ {property.value.toLocaleString('en-IN')}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-slate-500 border-2 border-dashed border-slate-800/50 rounded-2xl bg-slate-800/20">
                            <Building className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-medium">No properties acquired</p>
                            <p className="text-xs opacity-50">Complete the Real Estate mission to populate.</p>
                        </div>
                    )}
                </motion.div>

                {/* Upskilling List */}
                <motion.div
                    variants={itemVariants}
                    className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center">
                            <PieChart className="w-5 h-5 mr-3 text-indigo-500" />
                            Skill Capital
                        </h3>
                        <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-mono">{financialData.courses?.length || 0} CERT</span>
                    </div>

                    {financialData.courses && financialData.courses.length > 0 ? (
                        <div className="space-y-4">
                            {financialData.courses.map((course, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="flex justify-between items-center p-5 bg-slate-800/50 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all group"
                                >
                                    <div>
                                        <p className="text-white font-bold group-hover:text-indigo-400 transition-colors">{course.name}</p>
                                        <p className="text-xs text-slate-500 mt-1">Verified Credential</p>
                                    </div>
                                    <span className="text-indigo-400 font-mono font-bold">₹ {parseFloat(course.cost).toLocaleString('en-IN')}</span>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-slate-500 border-2 border-dashed border-slate-800/50 rounded-2xl bg-slate-800/20">
                            <Briefcase className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-medium">No skills tracked</p>
                            <p className="text-xs opacity-50">Invest in education to see returns here.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

