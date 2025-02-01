<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
   
    <RecentPostsSection/>
  </div>
</template>

<script>
import BlogPost from "@/components/Welcome.vue";
import BlogCard from "@/components/BlogCard.vue";
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import RecentPostsSection from '@/components/RecentPostsSection.vue'
// import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  // components: { BlogPost, BlogCard, RecentPostsSection , Footer},
  components: { BlogPost, BlogCard, RecentPostsSection },
  data() {
    return {};
  },
  computed: {
    // SampleBlogCards() {
    //   return this.$store.state.SampleBlogCards;
    // },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => !!store.state.user);

    const fethUserData = async () => {
      if (!isAuthenticated.value) {
        console.log("User is not authenticated");
        return;
      }

      //user token to verify in BE
      let token;
      try {
        const user = store.state.user;
        if (user) {
          token = await user.getIdToken();
        }
      } catch (error) {
        console.error("Error getting user token:", error);
        return;
      }

      try {
        const userData = await fetch("http://localhost:3000/getMyUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("User data response:", userData);
        if (userData.status === 404) {
          console.log(userData);
          return;
        }

        if (!userData.ok) {
          throw new Error(
            `Failed to fetch playshares, status code: ${response.status}`
          );
        }
        const data = await userData.json();
        console.log("User data:", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    onMounted(() => {
      fethUserData();
    });

    return {
      isAuthenticated,
    };
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  background-color: rgb(241, 241, 241);
  color: rgb(0, 0, 0);
  padding: 20px;
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.home {
  .recent-posts-wrapper {
    margin: 40px 0;
  }
}
</style>
