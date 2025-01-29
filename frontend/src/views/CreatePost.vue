<template>
  <div class="create-post">
    <h2>Create New Post</h2>
    <div class="post-form">
      <input 
        type="text" 
        v-model="post.title" 
        placeholder="Post Title"
        class="form-input"
        :class="{ 'error': titleError }"
      />
      <span v-if="titleError" class="error-message">Title must contain at least one word</span>
      
      <textarea 
        v-model="post.content" 
        placeholder="Write your post content here..."
        class="form-input"
        :class="{ 'error': contentError }"
        rows="6"
      ></textarea>
      <span v-if="contentError" class="error-message">Content must be at least 10 characters long</span>
      
      <v-btn @click="validateAndSubmit" class="submit-btn">
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
      contentError: false
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
      this.contentError = this.post.content.trim().length < 10;
      
      if (!this.titleError && !this.contentError) {
        this.submitPost();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.create-post {
  //max-width: 800px;
 // margin: 40px auto;
  // padding: 20px;
  // background: white;
  // border-radius: 8px;
  // box-shadow: 0 2px 4px rgba(0,0,0,0.1);

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
</style>
