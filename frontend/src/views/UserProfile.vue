<template>
  <div class="page-wrapper">
    <div class="user-profile-container">
      <div class="sidebar">
        <div
          class="nav-item"
          :class="{ active: activeSection === 'profile' }"
          @click="setActiveSection('profile')"
        >
          <v-icon>mdi-account</v-icon>
          Profile
        </div>
        <div
          class="nav-item"
          :class="{ active: activeSection === 'posts' }"
          @click="setActiveSection('posts')"
        >
          <v-icon>mdi-post</v-icon>
          My Recent Posts
        </div>
        <div
          class="nav-item"
          :class="{ active: activeSection === 'create' }"
          @click="setActiveSection('create')"
        >
          <v-icon>mdi-plus-circle</v-icon>
          Create Post
        </div>
      </div>
     
      <div class="content">
        <div v-if="activeSection === 'profile'" class="section profile-section">
          <h1>Profile</h1>
          <div class="profile-info">
            <p><strong>Name:</strong> {{ this.$store.state.user?.displayName }}</p>
            <p><strong>Email:</strong> {{ this.$store.state.user?.email }}</p>
            <p><strong>Total Posts:</strong> {{ userPosts.length }}</p>
            <div class="profile-actions">
              <v-btn @click="resetPassword" class="action-btn">
                Reset Password
              </v-btn>
              <v-btn @click="signOut" color="error" class="action-btn">
                Sign Out
              </v-btn>
            </div>
          </div>
          <section class="past-activity">
            <UserLog />
          </section>
        </div>
       
        <div v-if="activeSection === 'posts'" class="section posts-section">
          <MyRecentPosts />
        </div>


        <div v-if="activeSection === 'create'" class="section create-section">
          <CreatePost class="profile-create" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import CreatePost from './CreatePost.vue';
import MyRecentPosts from '../components/MyRecentPosts.vue';
import UserLog from '@/components/UserLog.vue';

export default {
  name: 'UserProfile',
  components: {
    CreatePost,
    MyRecentPosts,
    UserLog
  },
  data() {
    return {
      activeSection: 'profile',
      userPosts: [],
      newPost: {
        title: '',
        description: ''
      }
    }
  },
  async mounted() {
    await this.getUserPosts();
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async getUserPosts() {
      const q = query(
        collection(db, 'posts'),
        where('userId', '==', this.$store.state.user.uid)
      );
      const querySnapshot = await getDocs(q);
      this.userPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
    async signOut() {
      const auth = getAuth();
      await signOut(auth);
      this.$router.push('/login');
    },
    resetPassword() {
      // Add your reset password logic here
    },
    async createPost() {
      this.activeSection = 'create'
    },
    setActiveSection(section) {
      console.log('Switching to section:', section);
      this.activeSection = section;
    }
  }
}
</script>


<style lang="scss" scoped>
.page-wrapper {
  min-height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  padding: 20px;
}


.user-profile-container {
  display: flex;
  gap: 20px;
  max-width: 1400px;
  margin: 50px auto;
  padding: 0;
  position: relative;
  left: 0;
}


.sidebar {
  position: sticky;
  top: 20px;
  left: 50px;
  width: 200px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;


  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    margin: 4px 0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #666;


    &:hover {
      background: #f5f5f5;
      color: #000;
    }


    &.active {
      background: rgb(24, 24, 24);
      color: white;
    }


    .v-icon {
      font-size: 20px;
    }
  }
}


.content {
  flex: 1;
  padding-right: 20px;
}


.section {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section {
  &.profile-section {
    h1 {
      font-size: 24px;
      font-weight: 900;
      margin-bottom: 30px;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
      color: #333;
    }
  }
}

h1, h2 {
  font-size: 24px;
    
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}


.profile-info p {
  font-size: 16px;
  margin: 15px 0;
  color: #333;
}


.posts-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));


  .post-card {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fafafa;
    transition: transform 0.2s ease;


    &:hover {
      transform: translateY(-2px);
    }
  }
}


.profile-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;


  .action-btn {
    background-color: rgb(24, 24, 24) !important;
    color: white !important;
    text-transform: capitalize !important;
    font-weight: 500 !important;
    padding: 0 20px !important;
    height: 40px !important;
    transition: all 0.3s ease !important;


    &:hover {
      background-color: rgb(45, 45, 45) !important;
      transform: translateY(-2px);
    }
  }
}


.profile-info {
  p {
    margin: 10px 0;
    font-size: 16px;
  }
}


.post-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 16px;
 
  &:focus {
    outline: none;
    border-color: #000;
  }
}


textarea.post-input {
  min-height: 150px;
  resize: vertical;
}


.nav-item {
  cursor: pointer;
  pointer-events: auto;
  z-index: 10;
}

.past-activity {
  margin-top: 40px;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
}
</style>
