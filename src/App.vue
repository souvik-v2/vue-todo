<template>
<Nav />
  <div class="alert alert-success alert-dismissible fade show text-center" v-if="getNotice !== ''">{{getNotice}}</div>
  <div class="container-lg h-100">
    <div class="row h-100 align-items-center">
      <div class="col-md-9 mt-4 mx-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Nav from './components/Nav.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: { 
    Nav 
  },
  computed: {
    ...mapGetters(['getLoginUser', 'getNotice', 'getMyTodo']),
  },
  watch: {
    getNotice(a, b){
     // console.log('checkForAlert', this.getNotice);
      setTimeout(() => {
        this.$store.commit('removeNotice');
      }, 5000);
    },
  }
}
</script>
<style>
body, html {
  background-image: url('./assets/mountains.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.masthead {
  margin-top: 20px;
}

.spinner-border.text-primary.mx-auto.text-center {
    left: 50%;
    position: absolute;
}

</style>
