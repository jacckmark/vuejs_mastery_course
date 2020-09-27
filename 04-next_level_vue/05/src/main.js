import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "nprogress/nprogress.css";
import "@hokify/vuejs-datepicker/dist/vuejs-datepicker.css";
import Vuelidate from "vuelidate";
import ExclamationFilter from "./filters/exclamation_text";
// here we are importing and globally registering the filter (we also name it
// exclamation)
Vue.filter("exclamation", ExclamationFilter);

Vue.use(Vuelidate);

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/,
);
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, ""),
    ),
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
