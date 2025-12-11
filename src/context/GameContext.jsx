import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [userProfile, setUserProfile] = useState({ name: '', title: '', avatar: null });
    const [financialData, setFinancialData] = useState({
        income: 0,
        budget: { needs: 0, wants: 0, savings: 0 },
        connectedBanks: [],
        savings: 0,
        investments: 0,
        debt: 0,
        insurance: { health: false, life: false },
        courses: [],
        realEstate: []
    });

    const [missions, setMissions] = useState([
        { id: 'profile', title: "Setup Profile", xp: 50, completed: false, type: 'PROFILE' },
        { id: 'income', title: "Add Income Source", xp: 100, completed: false, type: 'INCOME' },
        { id: 'budget', title: "Create Budget", xp: 150, completed: false, type: 'BUDGET' },
    ]);

    const LEVEL_THRESHOLDS = {
        1: 0,
        2: 300,
        3: 1000,
        4: 2500,
        5: 5000
    };

    const LEVEL_NAMES = {
        1: "Survival",
        2: "Stability",
        3: "Security",
        4: "Growth",
        5: "Freedom"
    };

    const LEVEL_MISSIONS = {
        2: [
            { id: 'efund', title: "Build Emergency Fund", xp: 300, completed: false, type: 'GENERIC', desc: "Save ₹1,00,000 for unexpected expenses." },
            { id: 'debt', title: "Crush High Interest Debt", xp: 400, completed: false, type: 'GENERIC', desc: "Pay off credit cards or high interest loans." }
        ],
        3: [
            { id: 'invest', title: "Start Investing", xp: 600, completed: false, type: 'GENERIC', desc: "Open a brokerage account and buy an index fund." },
            { id: 'insurance', title: "Protect Your Assets", xp: 500, completed: false, type: 'GENERIC', desc: "Ensure you have health and life insurance." },
            { id: 'skills', title: "Upskill Yourself", xp: 400, completed: false, type: 'GENERIC', desc: "Purchase a course or certification to increase income." }
        ],
        4: [
            { id: 'realestate', title: "Real Estate Investment", xp: 1000, completed: false, type: 'GENERIC', desc: "Buy your first property or REIT." },
            { id: 'business', title: "Start a Side Business", xp: 1500, completed: false, type: 'GENERIC', desc: "Generate ₹10k/mo in passive income." }
        ],
        5: [
            { id: 'estate', title: "Estate Planning", xp: 2000, completed: false, type: 'GENERIC', desc: "Create a will and trust." },
            { id: 'mentor', title: "Mentor Others", xp: 500, completed: false, type: 'GENERIC', desc: "Help someone else start their journey." }
        ]
    };

    // Level up logic
    useEffect(() => {
        const nextLevelThreshold = LEVEL_THRESHOLDS[level + 1];
        if (nextLevelThreshold && xp >= nextLevelThreshold) {
            const newLevel = level + 1;
            setLevel(newLevel);

            // Unlock new missions for the new level
            if (LEVEL_MISSIONS[newLevel]) {
                setMissions(prev => {
                    // Avoid duplicates if effect runs multiple times
                    const existingIds = new Set(prev.map(m => m.id));
                    const newMissions = LEVEL_MISSIONS[newLevel].filter(m => !existingIds.has(m.id));
                    return [...prev, ...newMissions];
                });
            }
        }
    }, [xp, level]);

    const completeMission = (id, data = null) => {
        setMissions(prev => prev.map(m => {
            if (m.id === id && !m.completed) {
                // Award XP only if not already completed
                setXp(x => x + m.xp);
                return { ...m, completed: true };
            }
            return m;
        }));

        if (data) {
            // Handle specific data updates based on mission
            if (id === 'profile') setUserProfile(prev => ({ ...prev, name: data.name, title: data.title, avatar: data.file }));
            if (id === 'income') setFinancialData(prev => ({ ...prev, income: data.amount, connectedBanks: data.bank ? [...prev.connectedBanks, data.bank] : prev.connectedBanks }));
            if (id === 'budget') setFinancialData(prev => ({ ...prev, budget: data }));

            // New Interactive Missions Logic
            if (id === 'efund') setFinancialData(prev => ({ ...prev, savings: (prev.savings || 0) + parseFloat(data.amount || 0) }));
            if (id === 'debt') setFinancialData(prev => ({ ...prev, debt: (prev.debt || 0) - parseFloat(data.amount || 0) }));
            if (id === 'invest') setFinancialData(prev => ({ ...prev, investments: (prev.investments || 0) + parseFloat(data.amount || 0) }));
            if (id === 'insurance') setFinancialData(prev => ({ ...prev, insurance: { health: data.health || false, life: data.life || false } }));
            if (id === 'skills') setFinancialData(prev => ({ ...prev, courses: [...(prev.courses || []), { name: data.courseName, cost: data.cost }] }));
            // Real Estate Logic
            if (id === 'realestate') setFinancialData(prev => ({ ...prev, realEstate: [...(prev.realEstate || []), { type: data.propertyType, value: parseFloat(data.value || 0), income: parseFloat(data.rentalIncome || 0) }] }));
        }
    };

    const addXp = (amount) => {
        setXp(x => x + amount);
    };

    return (
        <GameContext.Provider value={{
            xp,
            level,
            levelName: LEVEL_NAMES[level],
            missions,
            userProfile,
            financialData,
            completeMission,
            addXp
        }}>
            {children}
        </GameContext.Provider>
    );
};
