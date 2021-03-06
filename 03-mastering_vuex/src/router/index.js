import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import UserData from "../views/UserData.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    // thanks to this the id passed as the route parameter can be captured by component
    // as the props and used (we can also omit it and use this.$route.params.id)
    props: true,
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/user/data",
    name: "user-data",
    component: UserData,
  },
];

const router = new VueRouter({
  // this will remove hash from our page url (no more localhost:8080/#/user)
  mode: "history",
  routes,
});

export default router;
