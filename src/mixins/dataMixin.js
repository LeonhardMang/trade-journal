export const dataMixin = {
    data() {
        return {
            trades: [
                { 
                    shareSymbol: 'INTEL', 
                    buyDate: '2023-01-02', 
                    saleDate: '2023-03-02', 
                    quantity: 1, 
                    buyPrice: 1.00, 
                    salePrice: 1.04, 
                    bilance: 0.04,
                    holdingDuration:59 
                },
                {
                    shareSymbol: 'TSLA',
                    buyDate: '2023-03-01',
                    saleDate: '2023-03-03',
                    quantity: 1,
                    buyPrice: 1.00,
                    salePrice: 0.98,
                    bilance: -0.02,
                    holdingDuration: 2
                }               
            ],
            portfolio: [
                { shareSymbol: 'AAPL', tradeDate: '2023-01-01', quantity: 1, price: 1.00, isSale: false },
                { shareSymbol: 'AMD', tradeDate: '2023-04-01', quantity: 1, price: 1.00, isSale: false },
                { shareSymbol: 'GOOGL', tradeDate: '2023-02-01', quantity: 1, price: 1.00, isSale: false },
            ],
            orders: [
                { shareSymbol: 'AAPL', tradeDate: '2023-01-01', quantity: 1, price: 1.00, isSale: false },

                { shareSymbol: 'INTEL', tradeDate: '2023-01-02', quantity: 1, price: 1.00, isSale: false },
                { shareSymbol: 'INTEL', tradeDate: '2023-03-02', quantity: 1, price: 1.04, isSale: true },

                { shareSymbol: 'AMD', tradeDate: '2023-04-01', quantity: 1, price: 1.00, isSale: false },

                { shareSymbol: 'GOOGL', tradeDate: '2023-02-01', quantity: 1, price: 1.00, isSale: false },

                { shareSymbol: 'TSLA', tradeDate: '2023-03-01', quantity: 1, price: 1.00, isSale: false },
                { shareSymbol: 'TSLA', tradeDate: '2023-03-03', quantity: 1, price: 0.98, isSale: true }
            ],
        };
    }
};