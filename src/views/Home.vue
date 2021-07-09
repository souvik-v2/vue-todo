<template>
<div class="mainBody" id="body">
    <div class="container" id="iceCreamBuilder">
      <ice-cream :cart="cart"></ice-cream>

      <div id="builder">
        <div class="builder">
          <h3>
            Build your cool Ice Cream
            <span
              class="quantity"
              :style="cart.length === 0 ? {color: 'red'} : {}"
              >{{cart.length}}</span
            >
          </h3>
          <div id="items">
            <ul>
              <li
                class="item"
                :key="variant.id"
                v-for="variant in variants"
              >
                <span>{{ variant.name }}</span>
                <div class="right">
                  <button
                    type="button"
                    class="plus rounded"
                    @click="addToCart(variant.id)"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    class="minus rounded"
                    @click="removeFromCart(variant.id)"
                  >
                    -
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div class="total" id="total">
            <div>Total Price</div>
            <div>₹{{ totals }}</div>
          </div>
          <button type="button" class="order rounded" @click="toggleModal">
            Proceed
          </button>
        </div>

        <!-- modal start -->
        <orders-form
          :cart="cart"
          :totals="totals"
          v-if="showModal"
          @toggle-order-form="toggleModal"
          @clear-cart="clearCart"
        ></orders-form>
        <!-- modal end -->
      </div>
      <!-- builder end -->
    </div>
  </div>
</template>

<script>
import IceCream from '../components/IceCream.vue';
import OrdersForm from '../components/OrdersForm.vue';
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    IceCream,
    OrdersForm
  },
  data() {
        return {
            variants: [
                {id: 1, name: 'Vanilla', price: 100},
                {id: 2, name: 'Chocolate', price: 120},
                {id: 3, name: 'Strawberry', price: 90},
                {id: 4, name: 'Orange', price: 70},
                {id: 5, name: 'Lemon', price: 30},
            ],
            cart: [],
            showModal: false
        }
    },
    methods: {
        addToCart(variantId) {
            this.cart.push(this.variants.find(variant => variant.id === variantId));
        },
        removeFromCart(variantId) {
            let position = this.cart.findIndex(variant => variant.id === variantId);

            this.cart.splice(position, 1);
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        clearCart() {
            this.cart = [];
        }
    },
    computed: {
        totals() {
            return this.cart.reduce((t, variant) => t + variant.price, 0);
        }
    }
}
</script>