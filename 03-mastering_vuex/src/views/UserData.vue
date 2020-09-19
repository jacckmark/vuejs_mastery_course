<template>
  <div>
    <h1>Create Event {{ userName }}</h1>
    <p>This event was created by {{ userName }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <!-- this is how we would pass an property into vuex getter -->
    <div>This is an todo object nr 1 text "{{ getTodoById(1) }}"</div>
    <div>There are {{ doneTodos.length }} done todos</div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  export default {
    computed: {
      userName() {
        // in computed property we access the store with this, if we would like
        // to access the store property directly inside template we would ommit
        // this keyword
        return this.$store.state.user.user.name;
      },
      userId() {
        return this.$store.state.user.user.id;
      },
      catLength() {
        return this.$store.getters.catLength;
      },
      ...mapGetters(["getTodoById", "doneTodos"]),
      ...mapState({
        // if all our properties are in the root of state and we don't want to access
        // the properties we can write it also as an array of state properties)
        userName2: (state) => state.user.user.name,
        userId2: (state) => state.user.user.id,
        // if we have an element in root like categories and we don't access the
        // properties we can write it like this
        categories: "categories",
      }),
    },
  };
</script>

<style></style>
