import axios from "axios";
import NProgress from "nprogress";

const apiClient = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// this way we are intercepting the requests and starting/stopping the nprogress
// progress bar (this is not ideal solution if we are doing few requests at one
// time)
apiClient.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

apiClient.interceptors.request.use((response) => {
  NProgress.done();
  return response;
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
