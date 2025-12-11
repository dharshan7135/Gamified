// Service to handle market data fetching
// In a production app, this would connect to a real API like AlphaVantage or Yahoo Finance
// For this Gamified interface, we simulate a live connection to Indian Market Indices (NIFTY, SENSEX) 

export const MarketDataService = {
    getMarketRates: async () => {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate varying market conditions
        const volatility = Math.random() * 0.05; // 0-5% volatility

        return {
            timestamp: new Date().toISOString(),
            indices: {
                nifty50: 24500 + (Math.random() * 500 - 250),
                sensex: 80000 + (Math.random() * 1000 - 500)
            },
            rates: {
                safe: 0.065 + (Math.random() * 0.005), // ~6.5-7% (FD/Debt Funds)
                growth: 0.12 + (volatility),           // ~12-15% (Index Funds)
                hyper: 0.20 + (volatility * 2)         // ~20-30% (Small Cap/Direct Equity)
            }
        };
    }
};
