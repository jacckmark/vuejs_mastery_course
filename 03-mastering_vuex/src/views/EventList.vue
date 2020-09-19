<template>
  <div>
    <!-- here we have to change the way we were accessing the user name value
      because it resides right now in separate module we have to access the module
      name first (user) and then state (user), only then we can access the 
      user name -->
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <BaseIcon name="activity" />
    <div class="pagination">
      <template v-if="page != 1">
        <router-link
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          >Prev page</router-link
        >
      </template>
      <template v-if="hasNextPage">
        <router-link
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          rel="next"
          >Next Page</router-link
        >
      </template>
    </div>
  </div>
</template>

<script>
  import EventCard from "@/components/EventCard.vue";
  import { mapState } from "vuex";
  export default {
    components: {
      EventCard,
    },
    created() {
      this.perPage = 3;
      this.$store.dispatch("event/fetchEvents", {
        perPage: this.perPage,
        page: this.page,
      });
    },
    computed: {
      ...mapState(["event", "user"]),
      hasNextPage() {
        return this.event.eventsTotal > this.page * this.perPage;
      },
      page() {
        return parseInt(this.$route.query.page) || 1;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.4);
    font-size: 1rem;
    font-weight: 600;
  }
  .icon {
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    margin-right: 6px;
  }
  .pagination {
    display: flex;
    :last-child {
      margin-left: auto;
    }
  }
</style>
