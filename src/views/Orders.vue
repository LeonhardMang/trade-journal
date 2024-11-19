<script setup>
import AddOrder from '@/components/AddOrder.vue';
import OwnTable from '@/components/OwnTable.vue';
import { sortDate } from '@/composables/sortDate';
import { dataMixin } from '@/mixins/dataMixin';
</script>

<template>
    <main>
        <div class="container">
        <AddOrder @add-order="addOrderToOverview" class="mt-3" />
        <OwnTable :kategories="kategories" :items="sortDate(replaceIsSale, 'tradeDate')"
            :searchText="'Suche nach einem Aktiensymbol'" :searchKey="'shareSymbol'" class="mt-3" />
        </div>
    </main>
</template>

<script>
export default {
    components: 'OrderOverview',
    mixins: [dataMixin],
    data() {
        return {
            kategories: ['Aktiensymbol', 'Datum', 'Anzahl', 'Preis pro Aktie', 'Kauf / Verkauf']
        };
    },
    computed: {
        replaceIsSale() {
            return this.orders.map(order => {
                return {
                    // Kopiere alle Eigenschaften von `order`
                    ...order, 
                    // Ändere nur `isSale` in der Kopie
                    isSale: order.isSale ? 'Verkauf' : 'Kauf' 
                };
            });
        }
    },
    methods: {
        addOrderToOverview(order) { //TODO portfolio anpassen beim kauf neuer aktien
            console.log(order);
            if (order.isSale) {
                if (this.sellStock(order)) {
                    this.orders.push(order);
                }
            } else {
                console.log(this.orders)
                this.orders.push(order);
                console.log(this.orders)
            }
        },

        sellStock(sellOrder) {
            // Suche nach der Aktie im Portfolio
            const index = this.portfolio.findIndex(item => item.shareSymbol === sellOrder.shareSymbol);

            if (!this.portfolio[index]) {
                alert("Aktie nicht im Portfolio gefunden oder bereits verkauft.");
                return false;
            }

            // Überprüfen, ob genügend Aktien zum Verkauf vorhanden sind
            if (this.portfolio[index].quantity < sellOrder.quantity) {
                alert("Nicht genügend Aktien im Portfolio für den Verkauf.");
                return false;
            }

            this.updatePortfolio(index, sellOrder);

            this.createNewTrade(this.portfolio[index], sellOrder);

            console.log("Trades:", this.trades);
            console.log("Portfolio:", this.portfolio);
            console.log("Orders:", this.orders);
            return true;
        },


        updatePortfolio(portfolioIndex, sellOrder) {
            const portfolioItem = this.portfolio[portfolioIndex];

            // Aktualisiere die Menge im Portfolio
            portfolioItem.quantity -= sellOrder.quantity;

            // Wenn die Menge auf 0 fällt, entferne die Aktie aus dem Portfolio
            if (portfolioItem.quantity === 0) {
                if (portfolioIndex > -1) {
                    this.portfolio.splice(portfolioIndex, 1);
                }
            }
        },


        createNewTrade(buyOrder, sellOrder) {
            // Berechnung der Bilanz
            const bilance = (sellOrder.price - buyOrder.price) * sellOrder.quantity;

            // Berechnung der Haltedauer in Tagen
            const holdingDuration = (new Date(sellOrder.tradeDate) - new Date(buyOrder.tradeDate)) / (1000 * 60 * 60 * 24);


            // Erstelle das Trade-Objekt
            const trade = {
                shareSymbol: sellOrder.shareSymbol,
                buyDate: buyOrder.tradeDate,
                saleDate: sellOrder.tradeDate,
                quantity: sellOrder.quantity,
                buyPrice: buyOrder.price,
                salePrice: sellOrder.price,
                bilance: bilance,
                holdingDuration: holdingDuration
            };

            console.log("Aktie verkauft:", trade);

            // Füge das Trade-Objekt zu den Trades hinzu
            this.trades.push(trade);
        }
    }
};
</script>

<style scoped></style>