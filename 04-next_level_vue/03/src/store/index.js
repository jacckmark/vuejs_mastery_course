import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js";
import * as event from "@/store/modules/event.js";
import * as notification from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification,
  },
  state: {
    todos: [
      { id: 1, text: "todo text 1", done: true },
      { id: 2, text: "todo text 2", done: false },
      { id: 3, text: "todo text 3", done: true },
      { id: 4, text: "todo text 4", done: false },
    ],
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
    getTodoById: (state) => (id) => {
      return state.todos.find((todo) => todo.id === id).text;
    },
  },
});
