import React from 'react';
import { cn } from '../../lib/utils';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';

const levels = [
    { id: 5, name: "Freedom", description: "Retirement & Legacy", color: "bg-purple-500", width: "w-1/5" },
    { id: 4, name: "Growth", description: "Investments & Goals", color: "bg-blue-500", width: "w-2/5" },
    { id: 3, name: "Security", description: "Debt Repayment", color: "bg-green-500", width: "w-3/5" },
    { id: 2, name: "Stability", description: "Insurance & Emergency Fund", color: "bg-yellow-500", width: "w-4/5" },
    { id: 1, name: "Survival", description: "Income & Expenses", color: "bg-red-500", width: "w-full" },
];

export function PyramidView({ currentLevel = 1 }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-1 w-full max-w-2xl mx-auto">
            {levels.map((level) => {
                const isUnlocked = currentLevel >= level.id;
                const isCurrent = currentLevel === level.id;

                return (
                    <div
                        key={level.id}
                        className={cn(
                            "relative flex items-center justify-center p-4 rounded-lg transition-all duration-500 shadow-lg",
                            level.width,
                            isUnlocked ? level.color : "bg-slate-700 opacity-50",
                            isCurrent && "ring-4 ring-white ring-opacity-50 scale-105 z-10"
                        )}
                    >
                        <div className="text-center text-white">
                            <h3 className="font-bold text-lg uppercase tracking-wider">{level.name}</h3>
                            <p className="text-xs opacity-90">{level.description}</p>
                        </div>

                        <div className="absolute right-4">
                            {isUnlocked ? (
                                <CheckCircle className="w-5 h-5 text-white/80" />
                            ) : (
                                <Lock className="w-5 h-5 text-slate-400" />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
