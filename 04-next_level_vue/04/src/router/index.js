import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
import NotFound from "../views/NotFound.vue";
import NProgress from "nprogress";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true,
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter: (to, from, next) => {
      store
        .dispatch("event/fetchEvent", to.params.id)
        .then((event) => {
          to.params.event = event;
          next();
        })
        .catch((error) => {
          // we are redirecting user to 404 only if there is a 404 error, if not
          // then this is probably problem with network, so we display the network
          // issue page
          if (error.response && error.response.status == 404) {
            // we are catching when number of event does not exist, redirecting
            // to the 404 and passing the event as props (in order to display info
            // like: 'The event you are looking for is not here')
            next({ name: "404", params: { resource: "event" } });
          } else {
            next({ name: "network-issue" });
          }
        });
    },
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: NetworkIssue,
  },
  {
    // this will redirect you to the 404 page every time no route from router
    // routes gets matched
    path: "*",
    // we have to specify missing resource (here page), to display it on 404 page
    // ('The page you are looking for is not here')
    redirect: { name: "404", params: { resource: "page" } },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
