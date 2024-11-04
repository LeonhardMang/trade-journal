<script setup>
import { formatEntry } from '@/composables/formatEntry';
</script>

<template>
    <div class="card p-3">
        <form class="d-flex col-6" role="search" @submit.prevent>
            <input class="form-control me-2" type="search" :placeholder="searchText"
                aria-label="Suche" v-model="searchQuery">
        </form>
        <hr class="mt-1 mb-1" />
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(kategory, index) in kategories" :key="index" scope="col">{{ kategory }}</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(item, i_index) in filteredItems" :key="i_index">
                    <th v-for="(key, k_index) in Object.keys(item)" :key="k_index" scope="row">{{ formatEntry(item[key], key) }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        // Kategorien, die in der Tabelle angezeigt werden
        kategories: {
            type: Array,
            required: true
        },
        // Items, die in der Tabelle gelistet werden
        items: {
            type: Array,
            required: true
        },
        // Angezeigter Text im Suchfeld
        searchText: {
            type: String,
            required: true
        },
        // Key, nachdem gesucht werden kann
        searchKey: { 
            type: String,
            required: true
        }
    },
    data() {
        return {
            searchQuery: ''
        };
    },
    computed: {
        /**
         * Filtert die Items nach den eingegebenen Searchkey
         */
        filteredItems() {
            if (!this.items) return null;
            return this.items.filter(item => item[this.searchKey].toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    methods: {
        formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(date).toLocaleDateString('de-DE', options);
        }
    }
};
</script>

<style scoped></style>
