<template>
   <nav class="navbar navbar-expand-md navbar-dark bg-primary">
    <a href="#" class="navbar-brand">
        <img src="../assets/logo.png" height="28" alt="CoolBrand">
    </a>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link active">Task Management</router-link>
        </div>
        <div class="navbar-nav ml-auto" v-if="!getLoginUser">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link to="/about" class="nav-item nav-link">About</router-link>
            <router-link to="/login" class="nav-item nav-link">Login</router-link>
            <router-link to="/register" class="nav-item nav-link">Register</router-link>
        </div>
        <div class="navbar-nav ml-auto" v-if="getLoginUser">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link to="/about" class="nav-item nav-link">About</router-link>
            <router-link to="/todo" class="nav-item nav-link">Todo</router-link>
            <router-link to="/profile" class="nav-item nav-link">Profile</router-link>
            <a href="javascript:void(0)" @click="logout()" class="nav-item nav-link">Logout</a>
            <a href="javascript:void(0)" class="nav-item nav-link active">Howdy, {{getLoginUser.name}}</a>
        </div>
    </div>
</nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "Nav",
    computed: {
    ...mapGetters(['getLoginUser', 'getLoginUserID']),
    },
    methods: {
        //...mapActions(['logOutUser']),
        logout() {
            this.$store.commit('logoutUser');
            this.$router.push("/");
            this.$store.commit('setNotice', 'Logged out successfully!!');
        }
    }
}
</script>
<style>
.router-link-active {
 color: #fff;
 font-weight: 600;
}
</style>