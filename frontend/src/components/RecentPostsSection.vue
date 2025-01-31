<template>
  <div class="recent-posts-section">
    <h2>Recent Posts</h2>
    <div v-if="loading">Loading...</div>
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
      error: null
    }
  },
  methods: {
    async fetchRecentPosts() {
      try {
        this.loading = true;
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'), limit(6));
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
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    truncateText(text, length = 150) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    viewPost(postId) {
      this.$router.push({ name: 'BlogPost', params: { id: postId }});
    }
  },
  mounted() {
    this.fetchRecentPosts();
  }
}
</script>

<style lang="scss" scoped>
.recent-posts-section {
  padding: 50px;
  max-width: 1200px;
  margin: 0 auto;

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
</style>