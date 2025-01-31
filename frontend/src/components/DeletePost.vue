<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline">
        Delete Post
      </v-card-title>
      <v-card-text>
        Do you wish to delete this blog?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="error" text @click="confirmDelete">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default {
  name: 'DeletePost',
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    show() {
      this.dialog = true;
    },
    async confirmDelete() {
      try {
        await deleteDoc(doc(db, 'posts', this.postId));
        this.$router.push('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
      this.dialog = false;
    }
  }
}
</script>