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
          <div class="left">
            <i class="bi bi-check2-circle" v-if="v.done"></i>
            <i class="bi bi-hourglass" v-if="!v.done" @click="todoDone(v.user_id, v.title, v.id, k)"></i>
            <i class="bi bi-view-list" @click="todoDetails(v.id)"></i>
            <a href="javascript:void(0)" @click="todoDetails(v.id)">{{ v.title }}</a>
          </div>
          <div class="right">
             <i class="bi bi-trash" @click="removeTodo(v.id, k)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- modal start -->
  <div id="modal" v-if="isModal">
    <div class="backdrop" @click="hideOrderForm">X</div>
    <div class="modalBody"  id="orderForm">
      <div class="close" @click="isModal = !isModal">X</div>
      <h3>Todo Details</h3>
      <ul class="list-group">
        <li class="list-group-item">
            <b>ID: </b> <i>{{viewTodo.id}}</i>
        </li>
        <li class="list-group-item">
            <b>Title: </b> <i>{{viewTodo.title}}</i>
        </li>
        <li class="list-group-item">
            <b>Date: </b> <i>{{viewTodo.date}}</i>
        </li>
        <li class="list-group-item">
            <b>Status: </b> <i>{{(viewTodo.done ? ' Done' : ' in progress..')}}</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todo",
  data() {
    return {
      title: "",
      hasError: false,
      isModal: false,
      viewTodo: ''
    };
  },
  computed: {
    ...mapGetters(["getMyTodo"]),
  },
  methods: {
    ...mapActions(["addMyTodo", "setMyTodo", "deleteTodo", "setTodoDone"]),
    dateBuilder() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
    hideOrderForm() {
      this.isModal = false;
    },
    todoDetails(todoID) {
      this.isModal = true;
      var result = axios.get(`http://localhost:3000/todo/${todoID}`)
      .then( result => {
        this.viewTodo = result.data
      })
    },
    addTodo() {
      if (this.title.length > 0) {
        this.hasError = false;
        let todos = {
          user_id: this.$store.state.user.id,
          title: this.title,
          done: false,
          date: this.dateBuilder()
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
        date: this.dateBuilder(),
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
div.close {
  display: block;
  text-align: right;
  margin: 10px 20px 0 0;
  cursor: pointer;
}
.input-group .list-group-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.modalBody .list-group-item {
  display: grid;
  grid-template-columns: 0.2fr 1fr;
}

.bi.bi-trash {
    color: #007bff;
    font-size: 20px;
}
.left a {
  font-size: 18px;
  text-transform: capitalize;
}
.bi.bi-trash:hover {
  color: #ff0800;
  font-size: 20px;
  cursor: pointer;
}
i.bi.bi-view-list, i.bi.bi-check2-circle, i.bi.bi-hourglass {
    margin-right: 10px;
    font-size: 20px;
}
i.bi.bi-view-list:hover, i.bi.bi-hourglass:hover, .left a:hover {
  color: #9acd32;
}

i.bi.bi-check2-circle {
  color: #2bec3b;
}
i.bi.bi-view-list, i.bi.bi-hourglass {
    color: #007bff;
}
h3 {
    text-align: center;
    padding-top: 20px;
}
</style>