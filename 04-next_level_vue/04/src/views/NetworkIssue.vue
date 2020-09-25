<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>
      It looks like you have some network issue, please click refresh, or try
      again later.
    </h3>
    <router-link :to="{ name: 'event-list' }">go back to home page</router-link>
  </div>
</template>

<script>
  export default {};
</script>

<style>
</style>
