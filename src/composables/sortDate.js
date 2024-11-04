import { computed } from 'vue';

/**
 * Sortiert das übergebene Array, welches Objekte beinhaltet, anhand des Schlüssels
 * 
 * @param {*} data Array, welches sortiert werden soll
 * @param {*} sortKey 
 * @returns das sortierte Array
 */
export function sortDate(data, sortKey) {
    const sortedData = computed(() => {
        if (!data) return null;
        // sortiert die Orders nach dem Datum
        return data.sort((a, b) => new Date(b[sortKey]) - new Date(a[sortKey]));
    });
    return sortedData.value
}
