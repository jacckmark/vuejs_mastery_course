<template>
  <div id="nav" class="nav">
    <!-- when using router links we can use exact url or the name (here using url) -->
    <router-link to="/" class="brand">Real World Events</router-link>
    <nav>
      <!-- when using router links we can use exact url or the name (here using route name) -->
      <router-link :to="{ name: 'event-list' }">List</router-link>
      <span> | </span>
      <router-link :to="{ name: 'event-create' }">Create</router-link>
      <span> | </span>
      <router-link :to="{ name: 'user-data' }">User Data</router-link>
    </nav>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }
  .nav > .brand {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 1.5em;
    color: #39b982;
    text-decoration: none;
  }
  .nav .nav-item {
    box-sizing: border-box;
    margin: 0 5px;
    color: rgba(0, 0, 0, 0.5);
    text-decoration: none;
  }
  .nav .nav-item.router-link-exact-active {
    color: #39b982;
    border-bottom: solid 2px #39b982;
  }
</style>
