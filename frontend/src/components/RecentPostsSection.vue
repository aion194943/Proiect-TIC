<template>
  <div class="recent-posts-section" ref="postsSection">
    <h2 ref="sectionTitle">Recent Posts</h2>
    <div v-if="loading && !loadingMore">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="card-container">
      <div v-for="post in recentPosts" :key="post.id" class="blog-card">
        <h3>{{ post.title }}</h3>
        <div class="card-meta">
          <span class="author">By {{ post.author }}</span>
          <span class="date">{{ formatDate(post.createdAt) }}</span>
        </div>
        <p class="description">
          {{ truncateText(post.content) }}
        </p>
        <span class="read-more" @click="viewPost(post.id)">
          Read more
          <v-icon small>mdi-arrow-right</v-icon>
        </span>
      </div>
    </div>

    <!-- Load More Button -->
    <div class="load-more-container" v-if="recentPosts.length >= postsLimit">
      <v-btn
        :loading="loadingMore"
        :disabled="loadingMore"
        @click="loadMore"
        class="custom-btn"
        color="primary"
        outlined
      >
        Load More Posts
      </v-btn>
    </div>

    <!-- Scroll to Top Button -->
    <v-btn
      v-if="showScrollTop"
      fab
      dark
      fixed
      bottom
      right
      class="scroll-top-btn"
      @click="handleScrollClick"
    >
      <v-icon>{{ scrollIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import moment from 'moment';

export default {
  name: 'RecentPostsSection',
  data() {
    return {
      recentPosts: [],
      loading: true,
      loadingMore: false,
      error: null,
      postsLimit: 6,
      showScrollTop: false,
      isAboveTitle: false
    }
  },
  computed: {
    scrollIcon() {
      return this.isAboveTitle ? 'mdi-arrow-up':'mdi-arrow-down' 
    }
  },
  methods: {
    async fetchRecentPosts() {
      try {
        this.loading = true;
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'), limit(this.postsLimit));
        const querySnapshot = await getDocs(q);
        
        this.recentPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async loadMore() {
      try {
        this.loadingMore = true;
        const postsRef = collection(db, 'posts');
        const q = query(
          postsRef, 
          orderBy('createdAt', 'desc'), 
          limit(this.postsLimit + 6)
        );
        const querySnapshot = await getDocs(q);
        this.recentPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.postsLimit += 6;
        this.showScrollTop = true;
      } catch (error) {
        console.error('Error:', error);
        this.$toast.error('Failed to load more posts');
      } finally {
        this.loadingMore = false;
      }
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY-HH:mm');
    },
    truncateText(text, length = 150) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    viewPost(postId) {
      this.$router.push({ name: 'BlogPost', params: { id: postId }});
    },
    scrollToTop() {
      this.$refs.postsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    },
    checkScrollPosition() {
      const titlePosition = this.$refs.sectionTitle.getBoundingClientRect().top;
      this.isAboveTitle = window.scrollY > titlePosition;
    },
    handleScrollClick() {
      if (this.isAboveTitle) {
        this.$refs.sectionTitle.scrollIntoView({ behavior: 'smooth' });
      } else {
        this.scrollToTop();
      }
    }
  },
  mounted() {
    this.fetchRecentPosts();
    window.addEventListener('scroll', this.checkScrollPosition);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkScrollPosition);
  }
}
</script>

<style lang="scss" scoped>
.recent-posts-section {
  
  padding: 50px;
  max-width: 1200px;
  margin: 0 auto;
margin-top: 60px;
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.blog-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .read-more {
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    
    &:hover {
      opacity: 0.7;
    }
  }
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 30px;

  .custom-btn {
    background-color: rgb(24, 24, 24) !important;
    color: white !important;
    text-transform: capitalize !important;
    padding: 0 20px !important;
    height: 40px !important;
    transition: all 0.3s ease !important;

    &:hover {
      background-color: rgb(45, 45, 45) !important;
      transform: translateY(-2px);
    }
  }
}

.scroll-top-btn {
  border-radius: 40% !important;
  position: fixed !important;
  bottom: 60px !important;
  left: 100px !important;
  background-color: rgb(255, 255, 255) !important;
  z-index: 99 !important;
  transition: all 0.3s ease !important;

  &:hover {
    background-color: rgb(201, 201, 201) !important;
    transform: translateY(-2px);
  }
}
</style>