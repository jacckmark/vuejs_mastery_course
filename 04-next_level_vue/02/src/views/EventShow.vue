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
  import { mapState } from "vuex";
  import NProgress from "nprogress/nprogress.js";
  import store from "@/store";
  export default {
    props: ["id"],
    // here using the route navigation guard to add the progress bar
    beforeRouteEnter(to, from, next) {
      // here we are adding the progress to our component before it is rendered
      // we are then dispatching a call to store and if it is done we are hiding
      // our progress bar and calling next to resume the execution of component
      NProgress.start();
      store.dispatch("event/fetchEvent", to.params.id).then(() => {
        NProgress.done();
        // this needs to be called, otherwise the component won't render. We can
        // call next with route (this can be route name also) to redirect user to
        // and also we can pass false thus canceling the navigation
        next();
      });
    },
    computed: mapState({
      event: (state) => state.event.event,
    }),
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
