<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>
        Organized by {{ event.organizer ? event.organizer.name : "none" }}
      </h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <BaseIcon name="map"><h2>Location</h2></BaseIcon>
    <address>{{ event.location }}</address>
    <h2>Event details</h2>
    <p>{{ event.description }}</p>
    <h2>
      Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    props: ["id"],
    created() {
      // without mapActions we would use action fetchEvent like this:
      //   this.$store.dispatch("event/fetchEvent", this.id);
      // thanks to the mapActions we can write it like this
      this.fetchEvent(this.id);
    },
    computed: mapState({
      event: (state) => state.event.event,
    }),
    // we can write it in two ways (the first one is usefull especially when we
    // have more than one namespaced action which needs importing, first argument
    // is the namespace and second the array of actions to map)
    methods: mapActions("event", ["fetchEvent"]),
    // methods: mapActions(["event/fetchEvent"]),
  };
</script>

<style scoped>
  .location {
    margin-bottom: 0;
  }
  .location > .icon {
    margin-left: 10px;
  }
  .event-header > .title {
    margin: 0;
  }
  .list-group {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list-group > .list-item {
    padding: 1em 0;
    border-bottom: solid 1px #e5e5e5;
  }
</style>
