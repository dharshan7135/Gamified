import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [missions, setMissions] = useState([
        { id: 1, title: "Setup Profile", xp: 50, completed: false },
        { id: 2, title: "Add Income Source", xp: 100, completed: false },
        { id: 3, title: "Create Budget", xp: 150, completed: false },
    ]);

    // Level up logic
    useEffect(() => {
        const nextLevelXp = level * 500;
        if (xp >= nextLevelXp) {
            setLevel(l => l + 1);
            // Could add toast notification here
        }
    }, [xp, level]);

    const completeMission = (id) => {
        setMissions(prev => prev.map(m => {
            if (m.id === id && !m.completed) {
                setXp(x => x + m.xp);
                return { ...m, completed: true };
            }
            return m;
        }));
    };

    const addXp = (amount) => {
        setXp(x => x + amount);
    };

    return (
        <GameContext.Provider value={{ xp, level, missions, completeMission, addXp }}>
            {children}
        </GameContext.Provider>
    );
};
