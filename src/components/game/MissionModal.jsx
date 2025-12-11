import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Upload, Info, Lock, ExternalLink } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export function MissionModal({ mission, onClose }) {
    const { completeMission } = useGame();
    const [step, setStep] = useState(0); // For multi-step flows like Banking
    const [formData, setFormData] = useState({});
    const fileInputRef = useRef(null);
    const [status, setStatus] = useState('idle'); // idle, processing, success

    if (!mission) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('processing');

        // Simulate processing delay
        setTimeout(() => {
            setStatus('success');
            // Complete mission with gathered data
            setTimeout(() => {
                completeMission(mission.id, formData);
                onClose();
            }, 1000);
        }, 1500);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, file: URL.createObjectURL(file), fileName: file.name });
        }
    };

    // Validation Logic
    const isProfileValid = formData.name && formData.title && formData.file;
    const isIncomeValid = (formData.method === 'manual' && formData.amount) || (formData.method === 'bank' && formData.bank && step === 2);
    const isBudgetValid = formData.needs && formData.wants && formData.savings;

    // New Mission Validations
    const isEFundValid = formData.amount && parseFloat(formData.amount) > 0;
    const isDebtValid = formData.amount !== undefined && formData.amount !== '';
    const isInvestValid = formData.amount && parseFloat(formData.amount) > 0 && formData.ticker;
    const isInsuranceValid = formData.health || formData.life;
    const isSkillValid = formData.courseName && formData.cost;
    const isRealEstateValid = formData.propertyType && formData.value;

    const isGenericValid = true;

    const canSubmit = () => {
        if (mission.type === 'PROFILE') return isProfileValid;
        if (mission.type === 'INCOME') return isIncomeValid;
        if (mission.type === 'BUDGET') return isBudgetValid;

        if (mission.id === 'efund') return isEFundValid;
        if (mission.id === 'debt') return isDebtValid;
        if (mission.id === 'invest') return isInvestValid;
        if (mission.id === 'insurance') return isInsuranceValid;
        if (mission.id === 'skills') return isSkillValid;
        if (mission.id === 'realestate') return isRealEstateValid;

        return isGenericValid;
    };

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
                    className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20 overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <span className="w-1 bg-cyan-500 h-6 rounded-full mr-3" />
                            {mission.title}
                        </h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>

                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                            >
                                <Check className="w-8 h-8 text-green-400" />
                            </motion.div>
                            <p className="text-lg font-bold text-white">Mission Complete</p>
                            <p className="text-slate-400 text-sm">Reward Claimed: +{mission.xp} XP</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-8">
                                {mission.type === 'PROFILE' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Commander Name</label>
                                            <input
                                                type="text"
                                                value={formData.name || ''}
                                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                                placeholder="Enter your name"
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Rank / Title</label>
                                            <input
                                                type="text"
                                                value={formData.title || ''}
                                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                                placeholder="e.g. Financial Architect"
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Avatar / Clearance Badge</label>
                                            <div
                                                onClick={() => fileInputRef.current.click()}
                                                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${formData.file ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/20 hover:border-cyan-500/50 hover:bg-slate-800/50'}`}
                                            >
                                                {formData.file ? (
                                                    <div className="flex flex-col items-center">
                                                        <img src={formData.file} alt="Avatar" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-500" />
                                                        <span className="text-xs text-green-400">{formData.fileName}</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload className="w-8 h-8 text-slate-500 mb-2" />
                                                        <span className="text-sm text-slate-400">Click to upload image</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {mission.type === 'INCOME' && (
                                    <>
                                        {formData.method === 'bank' ? (
                                            step === 0 ? (
                                                <div className="space-y-3">
                                                    <p className="text-sm text-slate-400 mb-2">Select your financial institution:</p>
                                                    {[
                                                        { id: 'sbi', name: 'State Bank of India', color: 'bg-blue-600' },
                                                        { id: 'hdfc', name: 'HDFC Bank', color: 'bg-indigo-700' },
                                                        { id: 'icici', name: 'ICICI Bank', color: 'bg-orange-600' },
                                                        { id: 'axis', name: 'Axis Bank', color: 'bg-rose-700' },
                                                    ].map(bank => (
                                                        <button
                                                            key={bank.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData({ ...formData, bank: bank.name, method: 'bank' });
                                                                setStep(1);
                                                            }}
                                                            className="w-full p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/5 flex items-center justify-between transition-colors group"
                                                        >
                                                            <div className="flex items-center">
                                                                <div className={`w-8 h-8 rounded-full ${bank.color} flex items-center justify-center mr-3 font-bold text-white text-xs`}>
                                                                    {bank.name.substring(0, 2).toUpperCase()}
                                                                </div>
                                                                <span className="text-white group-hover:text-cyan-400 transition-colors">{bank.name}</span>
                                                            </div>
                                                            <Lock className="w-4 h-4 text-slate-500" />
                                                        </button>
                                                    ))}
                                                    <button type="button" onClick={() => setFormData({ ...formData, method: 'manual' })} className="text-xs text-center w-full text-slate-500 hover:text-white mt-4">Back to Manual Entry</button>
                                                </div>
                                            ) : step === 1 ? (
                                                <div className="space-y-4">
                                                    <p className="text-sm text-cyan-400">Connecting to {formData.bank}...</p>
                                                    <div>
                                                        <label className="block text-sm text-slate-400 mb-1">Customer ID / Mobile</label>
                                                        <input type="text" className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white" placeholder="XXXXXXXXXX" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-slate-400 mb-1">Password</label>
                                                        <input type="password" className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white" placeholder="••••••••" />
                                                    </div>
                                                    <button type="button" onClick={() => setStep(2)} className="w-full py-3 bg-cyan-600 rounded-lg font-bold text-white">Login Securely</button>
                                                    <button type="button" onClick={() => setStep(0)} className="text-xs text-center w-full text-slate-500 hover:text-white mt-2">Change Bank</button>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="bg-slate-800/50 p-4 rounded-lg border border-yellow-500/20">
                                                        <p className="text-sm text-yellow-500 mb-2">OTP Sent to registered mobile.</p>
                                                        <input type="text" className="w-full bg-black/20 border border-white/10 rounded text-center text-2xl tracking-widest p-2 text-white" placeholder="XXXX" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            setFormData({ ...formData, amount: 85000 });
                                                            handleSubmit(e);
                                                        }}
                                                        className="w-full py-3 bg-green-600 rounded-lg font-bold text-white"
                                                    >
                                                        Verify & Link
                                                    </button>
                                                </div>
                                            )
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="flex space-x-2 mb-4">
                                                    <button type="button" onClick={() => setFormData({ ...formData, method: 'manual' })} className={`flex-1 py-2 rounded-lg text-sm ${formData.method !== 'bank' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Manual Entry</button>
                                                    <button type="button" onClick={() => { setFormData({ ...formData, method: 'bank' }); setStep(0); }} className={`flex-1 py-2 rounded-lg text-sm ${formData.method === 'bank' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Connect Bank</button>
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-slate-400 mb-1">Net Monthly Income</label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                                        <input
                                                            type="number"
                                                            value={formData.amount || ''}
                                                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-cyan-500 focus:outline-none"
                                                            placeholder="0.00"
                                                            onChange={e => setFormData({ ...formData, amount: parseFloat(e.target.value), method: 'manual' })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {mission.type === 'BUDGET' && (
                                    <div className="space-y-4">
                                        <div className="bg-indigo-500/10 p-4 rounded-lg flex items-start space-x-3">
                                            <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
                                            <p className="text-xs text-indigo-200">The 50/30/20 rule is recommended. We'll help you allocate your funds.</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm text-slate-400 mb-1">Essentials (Needs)</label>
                                                <input
                                                    type="number"
                                                    value={formData.needs || ''}
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                                                    onChange={e => setFormData({ ...formData, needs: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-400 mb-1">Lifestyle (Wants)</label>
                                                <input
                                                    type="number"
                                                    value={formData.wants || ''}
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                                                    onChange={e => setFormData({ ...formData, wants: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-400 mb-1">Future (Savings)</label>
                                                <input
                                                    type="number"
                                                    value={formData.savings || ''}
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white"
                                                    onChange={e => setFormData({ ...formData, savings: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Specific Real-World Missions */}
                                {mission.id === 'efund' && (
                                    <div className="space-y-4">
                                        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 mb-4">
                                            <p className="text-emerald-400 text-sm">Goal: Build a safety net of 3-6 months expenses.</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Current Emergency Savings</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-cyan-500 focus:outline-none"
                                                    placeholder="1000.00"
                                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {mission.id === 'debt' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Amount Paid / Cleared</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-cyan-500 focus:outline-none"
                                                    placeholder="500.00"
                                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">Enter '0' if you are debt free.</p>
                                        </div>
                                    </div>
                                )}

                                {mission.id === 'invest' && (
                                    <div className="space-y-4">
                                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10 mb-2">
                                            <p className="text-slate-300 text-sm mb-3">Execute your trade on a regulated platform.</p>
                                            <a
                                                href="https://groww.in/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-3 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 font-bold rounded-lg hover:bg-emerald-500/20 transition-all flex items-center justify-center"
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Open Groww Platform
                                            </a>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Investment Amount</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-cyan-500 focus:outline-none"
                                                    placeholder="1000.00"
                                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Asset / Ticker Symbol</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                                placeholder="e.g. VTI, AAPL, BTC"
                                                onChange={e => setFormData({ ...formData, ticker: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {mission.id === 'insurance' && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-slate-400 mb-2">Check the policies you currently hold:</p>
                                        <label className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-white/5 cursor-pointer hover:border-cyan-500/50">
                                            <input type="checkbox" onChange={e => setFormData({ ...formData, health: e.target.checked })} className="form-checkbox h-5 w-5 text-cyan-500 rounded bg-slate-700 border-slate-600" />
                                            <span className="text-white">Health Insurance</span>
                                        </label>
                                        <label className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-white/5 cursor-pointer hover:border-cyan-500/50">
                                            <input type="checkbox" onChange={e => setFormData({ ...formData, life: e.target.checked })} className="form-checkbox h-5 w-5 text-cyan-500 rounded bg-slate-700 border-slate-600" />
                                            <span className="text-white">Life / Term Insurance</span>
                                        </label>
                                    </div>
                                )}

                                {mission.id === 'skills' && (
                                    <div className="space-y-4">
                                        <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 mb-4">
                                            <p className="text-indigo-400 text-sm">Invest in yourself to increase your earning potential.</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Course / Certification Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                                placeholder="e.g. React Advanced Patterns"
                                                onChange={e => setFormData({ ...formData, courseName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Cost of Investment</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-cyan-500 focus:outline-none"
                                                    placeholder="49.99"
                                                    onChange={e => setFormData({ ...formData, cost: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {mission.id === 'realestate' && (
                                    <div className="space-y-4">
                                        <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 mb-4">
                                            <p className="text-amber-400 text-sm">Build your tangible asset portfolio.</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Property Type</label>
                                            <select
                                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                                onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Residential">Residential Apartment</option>
                                                <option value="Commercial">Commercial Office</option>
                                                <option value="Land">Plot / Land</option>
                                                <option value="REIT">REIT (Real Estate Investment Trust)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Market Value</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-cyan-500 focus:outline-none"
                                                    placeholder="5000000"
                                                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Monthly Rental Income (if any)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-cyan-500 focus:outline-none"
                                                    placeholder="25000"
                                                    onChange={e => setFormData({ ...formData, rentalIncome: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Generic/Unlocks for Higher Levels */}
                                {(!['PROFILE', 'INCOME', 'BUDGET'].includes(mission.type) && !['efund', 'debt', 'invest', 'insurance', 'skills', 'realestate'].includes(mission.id)) && (
                                    <div className="space-y-4">
                                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                {mission.desc || "Confirm you have completed the requirements for this mission to advance your financial standing."}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-xs text-cyan-400">
                                            <Info className="w-4 h-4 mr-2" />
                                            <span>Action required outside of system simulation.</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Button */}
                            {status === 'processing' ? (
                                <button disabled className="w-full py-4 bg-slate-700 text-slate-300 rounded-xl font-bold cursor-wait flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                                    Processing System Data...
                                </button>
                            ) : (
                                /* Hide main button for Banking steps 1 & 2 as they have their own buttons */
                                !(mission.type === 'INCOME' && step > 0) && (
                                    <button
                                        type="submit"
                                        disabled={!canSubmit()}
                                        className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all transform active:scale-95 ${canSubmit() ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                                    >
                                        {mission.type === 'PROFILE' ? 'Initialize Profile' :
                                            mission.type === 'INCOME' && step === 0 ? 'Next' :
                                                'Confirm & Execute'}
                                    </button>
                                )
                            )}
                        </form>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
