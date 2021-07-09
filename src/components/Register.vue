<template>
  <div class="vue-tempalte container-lg">
    <form @submit.prevent="handleSubmit">
      <error v-if="error" :error="error" />
      <h3>Sign Up</h3>

      <div class="form-group">
        <label>Name</label>
        <input
          type="text"
          v-model="name"
          class="form-control form-control-lg"
          required
        />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          class="form-control form-control-lg"
          required
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          class="form-control form-control-lg"
          required
        />
      </div>

      <div class="spinner-border text-primary text-center" v-if="spinner">
          <span class="sr-only">Loading...</span>
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block" v-if="!spinner">
        Register
      </button>
      
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Error from "./Error.vue";
import NavVue from './Nav.vue';
import { mapActions } from 'vuex'

export default {
  name: "Register",
  components: {
    Error
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
      spinner: false
    };
  },
  methods: {
    ...mapActions(['registerUser']),
    jsUcfirst(string) 
    {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async handleSubmit() {
      this.spinner = true;
      try {
        const userInfo = {
          name: this.jsUcfirst(this.name),
          email: this.email,
          password: this.password,
        };

        this.registerUser(userInfo);

        setTimeout(() => {
          this.spinner= false;
          this.$router.push("/login");
        }, 2000);
        
      } catch (e) {
        this.error = "Some error occured!!";
      }
    },
  },
};
</script>
<style scoped>
.spinner-border {
  display: block;
  margin: 5px auto;
  background: transparent;
}
</style>