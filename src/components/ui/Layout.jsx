import React from 'react';
import { Trophy, LayoutDashboard, User, TrendingUp } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export function Layout({ children }) {
    const { xp, level } = useGame();

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans">
            {/* Top Navigation */}
            <nav className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                            GameFi Pyramid
                        </span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex flex-col items-end">
                            <span className="text-xs text-slate-400">Level {level}</span>
                            <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${(xp % 500) / 5}%` }}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-400">
                            <Trophy className="w-5 h-5" />
                            <span className="font-bold">{xp} XP</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-4 md:p-8">
                {children}
            </main>

            {/* Bottom Nav (Mobile) or Sidebar could go here */}
        </div>
    );
}
