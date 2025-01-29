<template>
  <div class="page-container">
    <div class="blog-container">
      <div class="blog-post" v-if="post">
        <div class="action-buttons">
          <v-btn icon small class="edit-btn">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small class="delete-btn">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </div>
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <span class="author">By {{ post.author }}</span>
          <span class="date">{{ formatDate(post.createdAt) }}</span>
        </div>
        <div class="post-content">
          <p>{{ post.content }}</p>
        </div>
      </div>
    </div>

    <div class="card-container">
      <div class="blog-card">
        <h3>Preview Card</h3>
        <div class="card-meta">
          <span class="author">By {{ post?.author }}</span>
          <span class="date">{{ formatDate(post?.createdAt) }}</span>
        </div>
        <p class="description">
          {{ truncateText(post?.content || '') }}
        </p>
        <span class="read-more">
          Read more
          <v-icon small>mdi-arrow-right</v-icon>
        </span>
        <span class="preview-text">
          (this is how your post card will look)
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import moment from 'moment';

export default {
  name: 'BlogPost',
  props: ['id'],
  data() {
    return {
      post: null
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm');
    },
    async fetchPost() {
      try {
        const docRef = doc(db, 'posts', this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.post = docSnap.data();
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
    truncateText(text) {
      const words = text.split(' ');
      return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : text;
    }
  },
  created() {
    this.fetchPost();
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  gap: 40px;
  margin: 40px auto;
  max-width: 1200px;
  padding: 0 20px;
}

.blog-container {
  max-width: 800px;
  width: 100%;
  margin: 40px auto;
  padding: 20px;
  min-height: 100vh;
}

.blog-post {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: auto;
  overflow-wrap: break-word;
  position: relative;

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
  }

  .post-meta {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    color: #666;
    font-size: 14px;
  }

  .post-content {
    font-size: 16px;
    line-height: 1.6;
    color: #444;

    p {
      margin-bottom: 20px;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  }
}

.card-container {
  width: 300px;
}

.blog-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

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
    font-size: 14px;
    transition: all 0.2s ease;
    cursor: default;
  }

  .preview-text {
    display: block;
    margin-top: 10px;
    color: #2196F3;
    font-size: 14px;
    font-style: italic;
  }
}

.action-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 2;

  .v-btn {
    width: 36px;
    height: 36px;
    background: white !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .edit-btn {
    color: #2196F3 !important;
  }

  .delete-btn {
    color: #F44336 !important;
  }
}

@media (max-width: 768px) {
  .page-container {
    flex-direction: column;
  }

  .blog-container {
    padding: 10px;
  }
 
  .blog-post {
    padding: 20px;
  }

  .card-container {
    width: 100%;
    margin-top: 20px;
  }
}
</style>