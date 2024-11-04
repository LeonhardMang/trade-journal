/**
 * Formatiert die übergebene Number / String anhand des gegbenen Keys
 */
function formatEntry(data, key) {
    if (key.toLowerCase().includes('price') || key.toLowerCase().includes('balance')) {
        return data.toFixed(2) + ' €'
    }
    else if (key.toLowerCase().includes('date')) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(data).toLocaleDateString('de-DE', options);
    }

    return data;
}

export { formatEntry };