<template>
  <div>
    <h1>Create Event {{ userName }}</h1>
    <p>This event was created by {{ userName }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <div>This is an todo object nr 1 text "{{ getTodoById(1) }}"</div>
    <div>There are {{ doneTodos.length }} done todos</div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  export default {
    computed: {
      userName() {
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
        userName2: (state) => state.user.user.name,
        userId2: (state) => state.user.user.id,
        categories: "categories",
      }),
    },
  };
</script>

<style></style>
