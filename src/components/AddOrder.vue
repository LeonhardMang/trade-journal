<script setup>

</script>

<template>
    <div class="card p-3">
        <h6 class="card-header" data-bs-toggle="collapse" data-bs-target="#collapseExample">
            Neue Order hinzufügen
        </h6>
        <div class="card-body collapse" id="collapseExample">
            <div class="container">
                <form class="row row-cols-2 align-items-end g-3" @submit.prevent="addOrder">
                    <div class="col">
                        <label for="share_symbol" class="form-label">Aktiensymbol</label>
                        <input type="text" class="form-control" v-model="order.shareSymbol" id="share_symbol"
                            placeholder="EXAM" required>
                    </div>
                    <div class="col">
                        <label for="trade_date" class="form-label">Handelsdatum</label>
                        <input type="date" class="form-control" v-model="order.tradeDate" id="trade_date" required>
                    </div>
                    <div class="col">
                        <label for="quantity" class="form-label">Anzahl</label>
                        <input type="number" class="form-control" v-model="order.quantity" id="quantity" min="0"
                            step="1" placeholder="6" required>
                    </div>
                    <div class="col">
                        <label for="price" class="form-label">Preis</label>
                        <input type="number" class="form-control" v-model="order.price" id="price" min="0.00"
                            step="0.01" placeholder="10.00" required>
                    </div>
                    <div class="col ">
                        <label for="isSale" class="form-label">Kauf / Verkauf</label>
                        <select class="form-select" v-model="order.isSale" id="isSale" aria-label="Default select example">
                            <option value="false">Kauf</option>
                            <option value="true">Verkauf</option>
                        </select>
                    </div>
                    <div class="col">
                        <button type="submit" class="btn btn-primary">Order hinzufügen</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            order: {
                shareSymbol: '',
                tradeDate: null,
                quantity: null,
                price: null,
                isSale: null
            }
        };
    },
    methods: {
        addOrder() {
            this.order.isSale = this.order.isSale === 'true';
            console.log(this.order)
            this.$emit('add-order', this.order);
            this.order = {
                shareSymbol: '',
                tradeDate: null,
                quantity: null,
                price: null,
                isSale: null
            }
        }
    }

};
</script>

<style scoped>
.card-header {
    background-color: white;
    cursor: pointer;
}
</style>
