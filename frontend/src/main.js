import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

loadFonts();
let app;

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App).use(store).use(router).use(vuetify).mount("#app");
  }

  store.commit("setUser", user);
});
