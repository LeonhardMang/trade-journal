<script setup>
import { dataMixin } from '@/mixins/dataMixin';
</script>

<template>
    <main>
        <div class="container text-center">
            <div class="card card-body">
                <div class="row row-cols-3 custom-row">
                    <div v-for="(info, index) in dashboardInfo" :key="index" class="col">
                        <div class="row justify-content-center">{{ info.description }}
                        </div>
                        <div class="row justify-content-center">{{ info.value }}</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    mixins: [dataMixin],
    data() {
        return {
            dashboardInfo: [
                {
                    description: 'Depotwert:',
                    value: null
                },
                {
                    description: 'Abgeschlossener Trades:',
                    value: null
                },
                {
                    description: 'Trefferwahrscheinlichkeit',
                    value: null
                },
                {
                    description: 'Profitfaktor',
                    value: null
                },
                {
                    description: 'Durchschnittsgewinn/Verlust',
                    value: null
                },
                {
                    description: 'Durchschnittliche Haltedauer',
                    value: null
                },
            ]
        };
    },
    mounted() {
        this.calcDashboardValues()
    },
    methods: {
        /**
         * Berechnet die Dashboard-Werte mit verschiedenen Finanzkennzahlen.
         */
        calcDashboardValues() {
            // Berechnet die Gewinne/Verluste pro Trade
            this.calcProfitPerTrade();

            // Gesamtwert des Depots
            this.dashboardInfo[0].value = this.calcDepotvalue() + '€';

            // Anzahl der abgeschlossenen Trades
            this.dashboardInfo[1].value = this.amountFinishedTrades();

            // Trefferquote
            this.dashboardInfo[2].value = this.calcHitProbability() + '%';

            // Profitfaktor
            this.dashboardInfo[3].value = this.calcProfitfactor();

            // Durchschnittlicher Gewinn und Verlust
            const { averageProfit, averageLoss } = this.calcAverageProfitLoss();

            // Anzeige im Dashboard
            this.dashboardInfo[4].value = averageProfit + ' / ' + averageLoss;

            // Durchschnittliche Haltedauer
            this.dashboardInfo[5].value = this.calcAverageHoldingDuration();
        },

        /**
         * Berechnet den Gewinn oder Verlust für jede Verkaufsorder im Portfolio.
         */
        calcProfitPerTrade() {
            // Speichere letzte Kauforder für jedes Symbol
            const buyOrders = {};

            this.orders.forEach(order => {
                const { shareSymbol, quantity, price, isSale } = order;

                if (!isSale) {
                    // Kauforder: Speichere Kaufpreis und Menge und setze profit auf 0
                    buyOrders[shareSymbol] = { price, quantity };
                    order.profit = 0;  // Kauforter haben immer profit 0
                } else if (isSale && buyOrders[shareSymbol]) {
                    // Verkauf: Berechne Profit/Verlust
                    const buyInfo = buyOrders[shareSymbol];
                    order.profit = ((price - buyInfo.price) * quantity).toFixed(2);
                }
            });
        },

        /**
         * Berechnet den Depotwert auf Basis der Orders im Portfolio.
         *
         * @return {number} Depotwert als String mit zwei Dezimalstellen.
         */
        calcDepotvalue() {
            return this.portfolio.reduce((total, { quantity, price }) => {
                return total + (quantity * price);
            }, 0).toFixed(2);
        },

        /**
         * Berechnet die Anzahl der abgeschlossenen (verkauften) Trades im Portfolio.
         *
         * @return {number} Anzahl der abgeschlossenen Trades.
         */
        amountFinishedTrades() {
            return this.orders.reduce((total, order) => total + (order.isSale ? 1 : 0), 0);
        },

        /**
         * Berechnet die Trefferquote (Hit Probability) der Trades im Portfolio.
         *
         * @return {number} Trefferquote in Prozent, z. B. 75.00.
         */
        calcHitProbability() {
            // Berechne die Gesamtzahl der Verkäufe und die Anzahl der profitablen Verkäufe
            const totalTrades = this.orders.filter(order => order.isSale).length;
            const profitableTrades = this.orders.filter(order => order.isSale && order.profit > 0).length;

            // Trefferquote berechnen und zurückgeben
            return (totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0).toFixed(2);
        },

        /**
         * Berechnet den Profitfaktor des Portfolios, ein Maß für die Handelsperformance.
         *
         * @return {number} Profitfaktor als number mit zwei Dezimalstellen, z.B. 1.25 oder Infinity.
         */
        calcProfitfactor() {
            // Summiere alle Gewinne aus profitablen Verkaufsorders
            const totalProfit = this.orders
                .filter(order => order.isSale && order.profit > 0)
                .reduce((sum, order) => sum + order.profit, 0);

            // Summiere alle Verluste aus unprofitablen Verkaufsorders
            const totalLoss = this.orders
                .filter(order => order.isSale && order.profit < 0)
                .reduce((sum, order) => sum + Math.abs(order.profit), 0);

            // Berechne den Profitfaktor, wobei Division durch 0 zu "Infinity" führt, wenn keine Verluste vorliegen
            return totalLoss > 0 ? (totalProfit / totalLoss).toFixed(2) : Infinity;
        },

        /**
         * Berechnet den durchschnittlichen Gewinn und Verlust aus den Verkaufsorders im Portfolio.
         * 
         * @return {{ averageProfit: number, averageLoss: number }} Objekt mit durchschnittlichem Gewinn und Verlust als Strings.
         */
        calcAverageProfitLoss() {
            // Summiere Gewinne und Verluste separat
            let totalProfit = 0, totalLoss = 0;
            let profitCount = 0, lossCount = 0;

            this.trades.forEach(trade => {
                if (trade.bilance > 0) {
                    totalProfit += trade.bilance;
                    profitCount++;
                } else if (trade.bilance < 0) {
                    totalLoss += trade.bilance;
                    lossCount++;
                }
            });

            // Berechne Durchschnittswerte
            const averageProfit = (profitCount > 0 ? totalProfit / profitCount : 0).toFixed(2);
            const averageLoss = (lossCount > 0 ? totalLoss / lossCount : 0).toFixed(2);

            return {
                averageProfit: averageProfit,
                averageLoss: averageLoss
            };
        },

        /**
         * Berechnet die durchschnittliche Haltedauer der Aktien im Portfolio.
         * 
         * @return {number} Durchschnittliche Haltedauer in Tagen als Number mit zwei Dezimalstellen, z.B. 12.50.
         */
        calcAverageHoldingDuration() {
            // Summiere alle holdingDuration-Werte
            const totalDuration = this.trades.reduce((sum, trade) => sum + trade.holdingDuration, 0);
            // Berechne den Durchschnitt
            return (totalDuration / this.trades.length).toFixed(2);
        }
    }
};
</script>

<style scoped></style>