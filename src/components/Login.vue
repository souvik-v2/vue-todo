<template>
  <div class="vue-tempalte">
    <form @submit.prevent="handleSubmit">
      <error v-if="error" :error="error" />
      <h3>Sign In</h3>

      <div class="form-group">
        <label>Email address</label>
        <input
          type="email"
          v-model="email"
          class="form-control form-control-lg"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          class="form-control form-control-lg"
        />
      </div>

      <div class="spinner-border text-primary mx-auto text-center" v-if="spinner">
          <span class="sr-only">Loading...</span>
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block" v-if="!spinner">
        Login
      </button>
      
    </form>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  name: 'Login',
  components: {
    Error
  },
  data() {
    return {
      email: '',
      password: '',
      spinner: false,
      error: ''
    }
  },
  methods: {
    ...mapActions(['validateUser']),
    handleSubmit() {
      this.spinner = true;
      let loginData = {
        email: this.email,
        password: this.password
      }

      this.validateUser(loginData);

      setTimeout(() => {
          this.spinner= false;
          //console.log(this.$store.state.user)
          if( this.$store.state.user !== null ) {
            this.$router.push("/");
          } else {
            this.$store.commit("setNotice", "Invalid email/password");
          }
        }, 1000);
      

    }
  }
}
</script>

