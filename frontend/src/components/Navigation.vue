<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">
          <v-icon class="logo-icon">mdi-bottle-tonic-outline</v-icon>
          La Maison des Senteurs
        </router-link>
      </div>
      <div class="nav-links-container">
        <ul v-show="!mobile">
         
          <!-- <router-link class="link" :to="{ name: 'Home' }">Home</router-link> -->
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link v-if="user" class="link" :to="{ name: 'CreatePost' }" >Create a Blog</router-link>
          <router-link class="link" :to="{ name: 'Something' }">Something</router-link>
        </ul>
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login</router-link>
       
        <div
          v-if="user"
          @click="toggleProfileMenu"
          class="profile"
          ref="profile"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <!-- <div class="info">
              <p class="initials">{{ this.$store.profileInitials }}</p>
              <div class="right">
                <p>{{ this.$store.state.user?.displayName }}</p>
              </div>
            </div> -->
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'UserProfile' }" @click="profileMenu = false">
                  <p>Profile details</p>
                </router-link>
              </div>
            </div>
            <!-- <div class="options">
              <div @click="SignOut" class="option">
                <p>Sign-Out</p>
              </div>
            </div> -->
          </div>
        </div>
        <div class="nav-user" v-if="user">
          <span class="user-name">{{ this.$store.state.user?.displayName }}</span>
        </div>
      </div>
    </nav>
    <img
      src="/src/assets/Icons/bars-1.svg"
      alt="Menu Icon"
      @click="toggleMobileNav"
      class="menu-icon"
      v-show="mobile"
    />




    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
     <!-- <router-link class="link" :to="{ name: 'Home' }">Home</router-link> -->
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link v-if="user" class="link" :to="{ name: 'CreatePost' }"
          >Create Post</router-link
        >
        <router-link class="link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </ul>
    </transition>
  </header>
  <!-- //<img src="/src/assets/Icons/bars-1.svg" alt="Menu Icon" /> -->
</template>




<script>
import MenuIcon from "@/assets/Icons/bars-1.svg";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
export default {
  name: "navigation",
  components: {
    MenuIcon,
  },
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    SignOut() {
      signOut(auth);
      window.location.reload();
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>




<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 15px; // Reduced padding
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 99;




  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px; // Increased from default
    max-width: 1400px; // Wider container
    margin: 0 auto;
    padding: 0 20px;
  }




  .branding {
    display: flex;
    align-items: center;
    justify-content: center;




    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #000;
      font-size: 22px;
      font-weight: 700; // Made bolder
     
      .logo-icon {
        font-size: 28px;
        margin-right: 8px; // Adjusted spacing
      }
    }
  }




  .link {
    font-weight: 580;
    padding: 0 8px;
    transition: 0.3s color ease-in-out;
    font-size: 18px;
    text-transform: capitalize;




    &:hover {
      color: red;
    }
  }




  nav {
    display: flex;
    padding: 25 px 0;




    .branding {
      display: flex;
      align-items: center;




      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: #000;
        font-weight: 600;
        font-size: 24px;
      }




      .logo-icon {
        font-size: 28px;
        color: #000;
      }
    }




    .nav-links-container {
      display: flex;
      align-items: center;
      height: 100%;




      ul {
        display: flex;
        align-items: center;
        gap: 32px;
        height: 100%;
        margin: 0;
        padding-right: 32px;
       
        .link {
          font-weight: 580;
          padding: 0 8px;
          transition: 0.3s color ease-in-out;
          font-size: 18px;
          text-transform: capitalize;
          height: 100%;
          display: flex;
          align-items: center;




          &:hover {
            color: red;
          }
        }
      }




      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;




        span {
          pointer-events: none;
        }




        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 150px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);




          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;




            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }




            .right {
              flex: 1;
              margin-left: 24px;




              p:nth-child(1) {
                font-size: 14px;
              }




              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }




          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;




              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }




              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }




    .mobile-user-menu {
      margin-right: 40px;
    }
  }




  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 32px;
    width: auto;
    height: 25px;
  }




  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;




    .link {
      padding: 15px 0;
      color: whitesmoke;
     
    }
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }




  .mobile-nav-enter {
    transform: translateX(-250px);
  }




  .mobile-nav-enter-to {
    transform: translateX(0);
  }




  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}




.nav-user {
  display: flex;
  align-items: center;
  margin-left: 10px;
 
  .user-name {
    font-weight: 500;
    color: #333;
    font-size: 18px;
  }
}
</style>
