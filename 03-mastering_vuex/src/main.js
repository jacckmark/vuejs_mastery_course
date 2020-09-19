import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

// this is how we can register globally the components (no need to import them
// every time we need to use them)

// import BaseIcon from "@/components/BaseIcon.vue";
// Vue.component("BaseIcon", BaseIcon);

// we can also use something called Automatic Global Registration of Base Components
// which will allow us to register globally all components which have name starting
// with 'Base'
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
