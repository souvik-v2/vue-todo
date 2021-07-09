import axios from 'axios';
import { createStore } from 'vuex'

const userUrl = "http://localhost:3000/user/";
const todoURL = "http://localhost:3000/todo/";


export default createStore({
  state: {
    user: '',
    notice: '',
    todo: []
  },
  mutations: {
    setMyTodo(state, addTodo) {
      state.todo = addTodo;
    },
    logoutUser(state) {
      state.userID = '';
      state.user = '';
    },
    setNotice(state, info) {
      state.notice = info;
    },
    removeNotice(state) {
      state.notice = '';
    },
    validateUser(state, validUser) {
      state.user = validUser;
    }
  },
  actions: {
    async setTodoDone({commit}, payload) {
      let result = await axios.put(`${todoURL}/${payload.tdDetails.id}`, payload.tdDetails);
      this.state.todo.splice(payload.ind, 1, payload.tdDetails);
    },
    async deleteTodo({commit}, payload) {
      let result = await axios.delete(`${todoURL}/${payload.id}`);
      this.state.todo.splice(payload.index, 1);
    },
    async setMyTodo( {commit}, uid) {
      let result = await axios.get(todoURL);
      const myTodo = result.data.filter(r => r.user_id === uid.id);
      commit('setMyTodo', myTodo);
    },
    async addMyTodo( {commit}, addTodo) {
      let result = await axios.post(todoURL, addTodo);
      this.state.todo.push(result.data);
      commit('setNotice', 'Todo added successfully!!');
    },
    async deleteUser({commit}, userID) {
      let result = await axios.delete(`${userUrl}/${userID}`);
      commit('setNotice', 'User deleted successfully!!');
      commit('logoutUser');
    },
    async updateUser({commit}, userData) {
      let result = await axios.put(`${userUrl}/${userData.id}`, userData);
      commit('validateUser', userData);
      commit('setNotice', 'User updated successfully!!');
    },
    async registerUser({commit}, userData) {
      let result = await axios.post(userUrl, userData);
      commit('setNotice', 'User registered successfully!!');
    },
    async validateUser({commit}, userLoginData) {
      let result = await axios.get(userUrl);
      const user = result.data.find(r => (r.email === userLoginData.email && r.password === userLoginData.password)) || null;
      commit('validateUser', user);
      if(user !== null) commit('setNotice', 'User logged in successfully!!');
    }

  },
  getters: {
    getMyTodo(state) {
      return state.todo;
    },
    getLoginUser(state) {
      return state.user;
    },
    getNotice(state) {
      return state.notice;
    }
  },
  modules: {
  }
})
