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
  createEvent({ commit }, event) {
    // here action is using the mutation in order to change (mutate) the events state
    return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },
  // we can also use the store to handle data from service (here events list)
  // store is doing request using EventService and storing the result data inside
  // events array
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
        commit("SET_EVENTS", response.data);
      })
      .catch((error) => {
        console.log(`There was an error: ${error}`);
      });
  },
  fetchEvent({ commit, getters }, id) {
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
          console.log(`There was an error: ${error.response}`);
        });
    }
  },
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
