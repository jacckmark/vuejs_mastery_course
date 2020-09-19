import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js";
import * as event from "@/store/modules/event.js";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
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
    // this getter will allow us to access the categories length property from
    // anywhere in our application
    catLength: (state) => {
      return state.categories.length;
    },
    // we can do normal js operations in getters like filtering reducing etc.
    // which will return only needed elements
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    // we can also pass an getter obj to the getter method (thus we will be able
    // to access the another getter)
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
    // getters can (like a regular function) retrieve the arguments (here an id)
    getTodoById: (state) => (id) => {
      return state.todos.find((todo) => todo.id === id).text;
    },
  },
});
