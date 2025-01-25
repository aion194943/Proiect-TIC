<template>
  <v-app>
    <div class="form-wrap">
      <form class="login">
        <p class="login-register">
          Don't have an account?
          <router-link class="router-link" :to="{ name: 'Register' }"
            >Register</router-link
          >
        </p>
        <h2>Login</h2>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
          </div>

          <div class="input">
            <input type="password" placeholder="Password" v-model="password" />
          </div>
          <div v-show="error" class="error">{{ this.errorMsg }}</div>
        </div>
        <!-- Set color="black" for the button -->
        <v-container>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn @click.prevent="signIn" dense color="black">Sign In</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </form>
      <div class="background"></div>
    </div>
  </v-app>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async signIn() {
      await signInWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredentials) => {
          this.$store.commit("setUser", userCredentials.user);
          this.error = false;
          console.log("Logged");
          this.errorMsg = "";
                   this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = err.message;
        });
    },
  },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
  .v-btn.black {
    color: #ffffff; /* White text */
  }
  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url(https://images.pexels.com/photos/9944432/pexels-photo-9944432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
