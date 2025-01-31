<template>
  <div class="blogs-container">
    <div class="filter-section">
      <v-select
        v-model="sortOrder"
        :items="sortOptions"
        label="Sort by date"
        dense
        outlined
        class="sort-select"
        @change="fetchPosts"
      ></v-select>
    </div>
    
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="recent-posts">
      <RecentPostsSection :posts="sortedPosts" />
    </div>
  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
import RecentPostsSection from '@/components/RecentPostsSection.vue'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export default {
  name: "Home",
  components: { 
    BlogCard,
    RecentPostsSection 
  },
  data() {
    return {
      posts: [],
      loading: false,
      error: null,
      sortOrder: 'desc',
      sortOptions: [
        { text: 'Newest First', value: 'desc' },
        { text: 'Oldest First', value: 'asc' }
      ]
    }
  },
  computed: {
    sortedPosts() {
      return this.posts
    }
  },
  methods: {
    async fetchPosts() {
      try {
        this.loading = true
        this.error = null
        const postsRef = collection(db, 'posts')
        const q = query(postsRef, orderBy('createdAt', this.sortOrder))
        const snapshot = await getDocs(q)
        
        this.posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error('Error:', error)
        this.error = 'Failed to load posts'
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>

<style lang="scss" scoped>
.blogs-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  max-width: 200px;
  margin-bottom: 20px;
}

.blog-cards {
  background-color: rgb(241, 241, 241);
  color: rgb(0, 0, 0);
}

.recent-posts {
  margin-top: 40px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #ff5252;
}
</style>