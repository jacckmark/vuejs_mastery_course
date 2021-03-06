import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // this will result in throwing an error if API call takes more than 10 seconds
  timeout: 1000,
});

export default {
  getEvents(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  },
};
