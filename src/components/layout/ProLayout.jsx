import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Target, Shield, Wallet } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { cn } from '../../lib/utils';
import { Starfield } from '../ui/Starfield';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-300 group",
            active
                ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
        )}
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
        {active && (
            <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 w-1 h-8 bg-cyan-400 rounded-r-full"
            />
        )}
    </button>
);

export function ProLayout({ children }) {
    const { xp, level } = useGame();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: "Command Deck", path: "/" },
        { icon: Wallet, label: "Wealth", path: "/wealth" },
        { icon: Shield, label: "Protection", path: "/protection" },
        { icon: Target, label: "Missions", path: "/missions" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden flex">
            {/* Glass Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 h-screen p-6 flex flex-col z-50"
            >
                <div className="flex items-center space-x-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        GameFi
                    </h1>
                </div>

                <div className="space-y-2 flex-1">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                            active={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                        />
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="font-bold text-sm">LVL {level}</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Player One</p>
                            <p className="text-xs text-cyan-400">{xp} XP</p>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative">
                <Starfield />
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 blur-3xl pointer-events-none" />

                <div className="p-8 max-w-7xl mx-auto relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
