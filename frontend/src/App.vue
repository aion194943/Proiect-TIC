
<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="!navigation"/>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import{auth, db} from '../src/firebase/firebase.js'
export default {
  name: "app",
  components: {Navigation},
  data() {
    return {
      navigation: null,
    };
  },
  //git remote add origin https://github.com/aion194943/vue-firebase_project

  created() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.$store.commit("updateUser", user);
    //   if (user) {
    //   this.$store.dispatch("getCurrentUser", user);
    //   }
    //  }); 
    // this.checkRoute();
  },
  mounted() {

    
  },
  methods: {
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register" ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};

</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Playfair+Display:wght@300;400;500;600;700&display=swap");



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Playfair Display", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.error{
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrap{
  position: relative;
  padding: 80px 16px;
  background: color #f1f1f1;
  @media(min-width:500px){
    padding:100px 16px;
  }

  .blog-cards{
    display:grid;
    gap:32px;
    grid-template-columns: 1fr;
    @media(min-width: 500px){
      grid-template-columns: repeat(2,1fr);
    }
    @media(min-width: 900px){
      grid-template-columns: repeat(3,1fr);
    }
    @media(min-width: 1200px){
      grid-template-columns: repeat(4,1fr);
    }

  }
  
}
</style>
