import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import UserData from "../views/UserData.vue";
import NProgress from "nprogress";
import store from "@/store";

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
    props: true,
    // this will run before this route gets loaded
    beforeEnter: (to, from, next) => {
      // here we are running the store fetchEvent which will either fetch the
      // info from store or get it from database (using our EventService)
      store.dispatch("event/fetchEvent", to.params.id).then((event) => {
        // we are passing the props (event obj from store) to the component, this
        // way we don't have to access store inside component, because we already
        // have these data
        to.params.event = event;
        next();
      });
    },
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
  mode: "history",
  routes,
});

// we start the progress bar on every route we try to enter
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
