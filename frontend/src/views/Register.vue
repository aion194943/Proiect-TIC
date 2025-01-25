<template>
  <v-app>
    <div class="form-wrap">
      <form class="register">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </p>
        <h2>Create Your Account</h2>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Username" v-model="username" />
          </div>
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
          </div>
          <div class="input">
            <input type="password" placeholder="Password" v-model="password" />
          </div>
          <div v-show="error" class="error">{{ errorMsg }}</div>
        </div>

        <!-- Set color="black" for the button -->
        <v-container>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn @click.prevent="register" dense color="black"
                >Sign Up</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </form>
      <div class="background"></div>
    </div>
  </v-app>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
export default {
  name: "Register",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      console.log("Registering...");
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.username !== "" &&
        this.password.length >= 8 &&
        this.username.length >= 3
      ) {
        try {
          this.error = false;
          this.errorMsg = "";

          // Create user in Firebase Authentication
          // const auth = getAuth(firebase); // Use getAuth function to get the auth instance
          const createUser = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );

          await updateProfile(createUser.user, {
            displayName: this.username,
          });

          // Save user data in Firestore
          const result = createUser.user;
          console.log(result.uid);
          await setDoc(doc(db, "users", result.uid), {
            name: this.username,
            email: this.email,
          });

          this.$router.push({ name: "Home" });
        } catch (error) {
          this.error = true;
          this.errorMsg = error.message;
        }
      } else {
        if (this.password.length < 8) {
          this.errorMsg = "Password should be at least 8 characters long";
        } else if (this.username.length < 3) {
          this.errorMsg = "Username should be at least 3 characters long";
        }
        this.error = true;
      }
    },
  },
};
</script>

<!--   
  <script>
  import email from "../assets/Icons/envelope-regular.svg";
  import password from "../assets/Icons/lock-alt-solid.svg";
  import user from "../assets/Icons/user-alt-light.svg";
  import firebase from "firebase/app";
  import "firebase/auth";
  import db from "../firebase/firebaseInit";
</script>-->

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
