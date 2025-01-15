import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { initializeApp } from 'firebase/app';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrFIi7PCdl8bvNaMnyuthiqcY96I-Qikg",
  authDomain: "project2024tic.firebaseapp.com",
  projectId: "project2024tic",
  storageBucket: "project2024tic.appspot.com",
  messagingSenderId: "905148136435",
  appId: "1:905148136435:web:548b0ca6e3956d0fb7f086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

loadFonts();
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app');