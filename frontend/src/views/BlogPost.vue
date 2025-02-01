<template>
  <div class="page-container">
    <!-- Back Button -->
    <v-btn
      class="back-btn"
      text
      @click="goToBlogs"
    >
      <v-icon left>mdi-arrow-left</v-icon>
      Back to Blogs
    </v-btn>

    <div class="blog-container">
      <div class="blog-post" v-if="post">
        <div class="action-buttons" v-if="isOwner">
          <v-btn icon small class="edit-btn" @click="handleEdit">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small class="delete-btn" @click="showDeleteDialog">
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
        <div class="save-action" v-if="isOwner">
          <v-btn 
            outlined
            class="save-btn"
            @click="goToRecentPosts"
          >
            <v-icon left>mdi-check</v-icon>
            Save Changes
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Post</v-card-title>
        <v-card-text>Do you wish to delete this blog?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="handleDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Component -->
    <v-dialog v-model="editDialog" fullscreen hide-overlay>
      <EditPost 
        v-if="editDialog" 
        :post="post" 
        @close="editDialog = false"
        @update="handleUpdate"
      />
    </v-dialog>

    <!-- Preview Card - Only visible to owner -->
    <div class="card-container" v-if="isOwner && post">
      <div class="blog-card">
        <h3>{{ post.title }}</h3>
        <div class="card-meta">
          <span class="author">By {{ post.author }}</span>
          <span class="date">{{ formatDate(post.createdAt) }}</span>
        </div>
        <p class="description">
          {{ truncateText(post.content) }}
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
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import moment from 'moment';
import EditPost from './EditPost.vue';

export default {
  name: 'BlogPost',
  props: ['id'],
  components: {
    EditPost
  },
  data() {
    return {
      post: null,
      deleteDialog: false,
      editDialog: false
    }
  },
  computed: {
    isOwner() {
      return this.post?.userId === this.$store.state.user?.uid;
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
    },
    showDeleteDialog() {
      this.deleteDialog = true;
    },
    handleEdit() {
      this.editDialog = true;
    },
    async handleDelete() {
      try {
        await deleteDoc(doc(db, 'posts', this.id));
        this.$router.push('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
      this.deleteDialog = false;
    },
    async handleUpdate(updatedPost) {
      if (!this.isOwner) return;
      try {
        await updateDoc(doc(db, 'posts', this.id), updatedPost);
        this.post = { ...this.post, ...updatedPost };
        this.editDialog = false;
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
    async goToRecentPosts() {
      if (!this.isOwner) {
        this.$toast.error('Unauthorized to save changes');
        return;
      }
      this.$router.push({
        name: 'UserProfile',
        params: { activeSection: 'posts' }
      });
    },
    goToBlogs() {
      this.$router.push({ name: 'Blogs' });
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
  gap: 30px;
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
  background: rgb(250, 249, 249);
  border-radius: 8px;
  padding:60px;
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
  //padding: 20px;
  position: absolute;
  top: 15px;
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

.save-action {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}

.save-btn {
  min-width: 200px;
  height: 45px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.back-btn {
  margin: 20px 0;
  color: rgb(24, 24, 24) !important;
  text-transform: capitalize !important;
  font-weight: 500 !important;
  transition: transform 0.3s ease !important;

  &:hover {
    transform: translateX(-2px);
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