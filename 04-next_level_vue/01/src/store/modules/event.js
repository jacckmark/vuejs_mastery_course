import EventService from "@/services/EventService.js";

// this ensures that all mutations, actions and getters will be namespaces under
// event (thus accessing them would look for example like event/createEvent)
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
};

export const mutations = {
  // we can name the mutations as we please (don't have to use caps)
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  // commit is an context object and event in this example is an payload
  createEvent({ commit, dispatch }, event) {
    // here action is using the mutation in order to change (mutate) the events state
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event has been created!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: `There was a problem creating your event: ${error.message}`,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  // we can also use the store to handle data from service (here events list)
  // store is doing request using EventService and storing the result data inside
  // events array
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
        commit("SET_EVENTS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: `There was a problem fetching events: ${error.message}`,
        };
        // root set to true will allow our dispacher (dispaching method) to go to
        // root store, find our notification state and run add method
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    // here we are using the getters from store and we try to access the event
    // with given id, if we have it we don't do a request, else we do a regular
    // request to the API
    let event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit("SET_EVENT", response.data);
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: `There was a problem fetching event: ${error.message}`,
          };
          dispatch("notification/add", notification, { root: true });
        });
    }
  },
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
