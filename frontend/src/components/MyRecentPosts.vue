<template>
    <div class="page-container">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="card-container">
        <div v-for="post in userPosts" :key="post.id" class="blog-card">
          <h3>{{ post.title }}</h3>
          <div class="card-meta">
            <span class="author">By {{ post.author }}</span>
            <span class="date">{{ formatDate(post.createdAt) }}</span>
          </div>
          <p class="description">
            {{ truncateText(post.content) }}
          </p>
          <a @click="viewPost(post.id)" class="read-more">
            Read more
            <v-icon small>mdi-arrow-right</v-icon>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, query, getDocs, orderBy } from 'firebase/firestore';
  import { db } from '../firebase/firebase';
  import moment from 'moment';
  
  export default {
    name: 'MyRecentPosts',
    data() {
      return {
        userPosts: [],
        loading: true,
        error: null
      }
    },
    methods: {
      async fetchUserPosts() {
        try {
          this.loading = true;
          console.log('Fetching posts from Firestore...');
          
          const postsRef = collection(db, 'posts');
          const q = query(postsRef, orderBy('createdAt', 'desc'));
          
          const querySnapshot = await getDocs(q);
          
          if (querySnapshot.empty) {
            console.log('No posts found');
            this.userPosts = [];
            return;
          }
  
          this.userPosts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          console.log('Posts loaded:', this.userPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
          this.error = 'Failed to load posts: ' + error.message;
        } finally {
          this.loading = false;
        }
      },
      truncateText(text) {
        const words = text.split(' ');
        return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : text;
      },
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY HH:mm');
      },
      viewPost(postId) {
        this.$router.push({ name: 'BlogPost', params: { blogid: postId }});
      }
    },
    async mounted() {
      await this.fetchUserPosts();
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .page-container {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px 0;
  }
  
  .blog-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
  
    &:hover {
      transform: translateY(-2px);
    }
  
    h3 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #333;
    }
  
    .card-meta {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
      color: #666;
      font-size: 12px;
    }
  
    .description {
      flex-grow: 1;
      font-size: 14px;
      line-height: 1.5;
      color: #444;
    }
  
    .read-more {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 15px;
      color: #333;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
  
      &:hover {
        color: #000;
        gap: 8px;
      }
    }
  }
  
  @media (max-width: 1200px) {
    .card-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 900px) {
    .card-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 600px) {
    .card-container {
      grid-template-columns: 1fr;
    }
  }
  </style>