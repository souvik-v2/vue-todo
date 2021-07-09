<template>
  <div class="table-responsive">
    <h2>{{ getLoginUser.name }} :: Profile Info</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{ getLoginUser.id }}</th>
          <td>{{ getLoginUser.name }}</td>
          <td>{{ getLoginUser.email }}</td>
          <td>{{ getLoginUser.password }}</td>
          <td>
            <i class="bi bi-pencil-square" @click="toggleModal"></i> | <i class="bi bi-trash" @click="removeUser(getLoginUser.id)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <!-- modal start -->
    <user-update
    :id="getLoginUser.id"
    :name="getLoginUser.name"
    :email="getLoginUser.email"
    :password="getLoginUser.password"
    v-if="showModal"
    @toggle-user-form="toggleModal"
    />
    <!-- modal end -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserUpdate from './UserUpdate.vue';
export default {
  components: { UserUpdate },
  name: "Profile",
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(["getLoginUser"]),
  },
  methods: {
    ...mapActions(['deleteUser']),

    toggleModal() {
      this.showModal = !this.showModal;
    },
    removeUser(uid) {
      //alert(uid)
      if(confirm("Do you really want to delete?")){
        this.deleteUser(uid);
        this.$router.push("/");
      }
    }
  },
};
</script>
<style>
#modal {
  margin-top: 50%;
}
</style>
