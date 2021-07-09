<template>
  <div class="vue-tempalte">
    <h3>Todo</h3>

    <div class="input-group mb-3">
      <input
        type="text"
        required
        v-model="title"
        :class="{ 'border border-danger': hasError }"
        class="form-control"
        placeholder="Enter todo"
        aria-label="Todo"
        aria-describedby="basic-addon2"
        @keyup.enter="addTodo"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="addTodo"
        >
          <i class="bi bi-plus"></i>
        </button>
      </div>
    </div>
    <div class="input-group mb-3">
      <ul class="list-group">
        <li class="list-group-item" v-for="(v, k) in getMyTodo" :key="k">
          {{ v.title }}
          <i class="bi bi-check2-circle" v-if="v.done"></i>
          <i class="bi bi-hourglass" v-if="!v.done" @click="todoDone(v.user_id, v.title, v.id, k)"></i>
          <i class="bi bi-trash" @click="removeTodo(v.id, k)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todo",
  data() {
    return {
      title: "",
      hasError: false,
    };
  },
  computed: {
    ...mapGetters(["getMyTodo"]),
  },
  methods: {
    ...mapActions(["addMyTodo", "setMyTodo", "deleteTodo", "setTodoDone"]),
    addTodo() {
      if (this.title.length > 0) {
        this.hasError = false;
        let todos = {
          user_id: this.$store.state.user.id,
          title: this.title,
          done: false,
        };
        this.addMyTodo(todos);
        this.title='';
      } else {
        this.hasError = true;
      }
    },
    removeTodo(id, index) {
      if(confirm("Do you really want to delete the task?")){
        this.deleteTodo({id, index});
      }
    },
    todoDone(u, t, i, ind) {
      let tdDetails = {
        user_id: u,
        title: t,
        done: true,
        id: i
      }
      if(confirm("Is your task done?")){
      this.setTodoDone({tdDetails, ind});
      }
    }
  },
  created() {
    this.setMyTodo(this.$store.state.user);
  },
  
};
</script>
<style scoped>
.bi.bi-trash {
  float: right;
  cursor: pointer;
}
i.bi.bi-check2-circle, i.bi.bi-hourglass {
    float: left;
    margin-right: 10px;
}
</style>