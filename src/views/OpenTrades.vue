<script setup>
import OwnTable from '@/components/OwnTable.vue';
import { sortDate } from '@/composables/sortDate';
import { dataMixin } from '@/mixins/dataMixin';
</script>

<template>
    <main>
        <div class="container">
            <OwnTable :kategories="kategories" :items="sortDate(removeIsSale, 'saleDate')"
                :searchText="'Suche nach einem Aktiensymbol'" :searchKey="'shareSymbol'" />
        </div>
    </main>
</template>

<script>
export default {
    components: 'OwnTable',
    mixins: [dataMixin],
    data() {
        return {
            kategories: ['Aktiensymbol', 'Kaufdatum', 'Anzahl', 'Kaufpreis pro Aktie'],
        };
    },
    computed: {
        removeIsSale() {
            return this.portfolio.map(({ isSale, ...rest }) => rest);
        }
    }
};
</script>

<style scoped></style>