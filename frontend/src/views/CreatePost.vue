<!-- COMPONENT AND VIEW AT THIS MOMENT -->

<template>
  <div class="create-post">
    <h2>Create a new blog</h2>
    <div class="post-form">
      <input 
        type="text" 
        v-model="post.title" 
        placeholder="Post Title - should be at least one word long"
        class="form-input"
        :class="{ 'error': titleError }"
      />
      <!-- <span v-if="titleError" class="error-message">Title must contain at least one word</span> -->
      
      <textarea 
        v-model="post.content" 
        placeholder="Write your post content here... should be at least 20 words long"
           
        class="form-input"
        :class="{ 'error': contentError }"
        rows="6"
      ></textarea>
      <span class="word-count" :class="{  'over-limit': wordCount > 400 }">
        {{ remainingWords }} words remaining
      </span>
      <span v-if="contentError" class="error-message">{{ contentError }}</span>
      
      <v-btn 
        @click="validateAndSubmit" 
        class="submit-btn"
        :disabled="!isValidWordCount || !post.title"
      >
        Create Post
      </v-btn>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default {
  name: "CreatePost",
  data() {
    return {
      post: {
        title: '',
        content: ''
      },
      titleError: false,
      contentError: ''
    }
  },
  computed: {
    wordCount() {
      return this.post.content.trim().split(/\s+/).length;
    },
    remainingWords() {
      return 400 - this.wordCount;
    },
    isValidWordCount() {
      return this.wordCount >= 20 && this.wordCount <= 400;
    }
  },
  methods: {
    async submitPost() {
      try {
        await addDoc(collection(db, 'posts'), {
          title: this.post.title,
          content: this.post.content,
          userId: this.$store.state.user.uid,
          author: this.$store.state.user.displayName,
          createdAt: new Date().toISOString(),
        });
        this.$router.push('/blogs');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    },
    validateAndSubmit() {
      this.titleError = this.post.title.trim().length < 1;
      this.contentError = this.post.content.trim().length < 10 ? 'Content must be at least 10 characters long' : '';
      
      if (this.wordCount < 20) {
        this.contentError = 'Content must have at least 20 words';
        return;
      }
      if (this.wordCount > 400) {
        this.contentError = 'Content cannot exceed 400 words';
        return;
      }
      if (!this.titleError && !this.contentError) {
        this.submitPost();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.create-post:not(.profile-create) {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.create-post {
  h2 {
     margin-bottom: 20px;
    font-size: 24px;
   }

  .form-input {
    width: 100%;
    margin-bottom: 20px;
    padding: 12px;
    border: 1px solid #363636;
    border-radius: 4px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #000;
    }
  }

  textarea.form-input {
    min-height: 200px;
    resize: vertical;
  }

  .submit-btn {
    background-color: rgb(24, 24, 24) !important;
    color: white !important;
    text-transform: capitalize !important;
    padding: 0 20px !important;
    height: 40px !important;

    &:hover {
      background-color: rgb(45, 45, 45) !important;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.form-input.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
}

.word-count {
  display: block;
  text-align: right;
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  
 
  
  &.over-limit {
    color: #ff4444;
  }
}
</style>
