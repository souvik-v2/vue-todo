<template>
    <div>
        <div class="icecream" id="icecream">
        <p class="cone"></p>
        <div class="scoop"
            v-for="(cartItem, c) in cart" :key="c"
            :class="cartItem.name.toLowerCase()"></div>
        <div class="cherry" v-if="cart.length > 0"></div>
        <div class="question" v-else></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'IceCream',
    props: {
        cart: {
            type: Array,
            required: true
        }
    },
    
}
</script>