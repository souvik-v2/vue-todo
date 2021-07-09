<template>
    <div id="modal">
        <div class="backdrop" @click="hideOrderForm"></div>
        <div class="modalBody">
        <div class="formContainer" id="orderForm">
            <h3 class="text-center">Provide Address</h3>
            <form class="orderForm" @submit.prevent="onSubmit">
            <ul>
                <li>
                <input
                    type="text"
                    v-model="name"
                    class="fieldStyle fieldSplit alignLeft"
                    placeholder="Name"
                />
                <input
                    type="text"
                    v-model="phone"
                    class="fieldStyle fieldSplit alignRight"
                    placeholder="Phone no."
                />
                <input
                    type="hidden"
                    v-model.number="total"
                    class="fieldStyle fieldSplit alignRight"
                />
                </li>
                <li>
                <textarea
                    v-model="address"
                    class="fieldStyle"
                    placeholder="Address"
                ></textarea>
                </li>
                <li>
                <input type="submit" value="Submit" />
                </li>
            </ul>
            </form>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrdersForm',
  props: {
        cart: {
            type: Array,
            required: true
        },
        totals: {
            type: Number,
            required: true
        }
  },
  data() {
        return {
            name: '',
            phone: '',
            address: ''
        }
    },
    methods: {
        hideOrderForm() {
            this.$emit("toggle-order-form");
        },
        onSubmit() {
            let orderDetails = {
                name: this.name,
                phone: this.phone,
                address: this.address,
                total: this.totals
            }
            //console.log(orderDetails);
            this.hideOrderForm();
            this.$emit("clear-cart");
            if(confirm("Do you really want to order?")){
                this.$store.commit('setNotice', `Thank you for your recent order, will reach at ${orderDetails.address} soon.`);
            }
        }
    }
}
</script>