<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline grey darken-3 white--text d-flex">
        <div class="d-flex align-center">
          <v-icon left color="white">mdi-pencil</v-icon>
          <span class="font-weight-bold">Edit Post</span>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon dark class="ml-auto" height="36" width="36" @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-6">
        <v-form ref="form" v-model="valid" class="mt-4">
          <v-text-field
            v-model="editedPost.title"
            label="Title"
            :rules="titleRules"
            outlined
            dense
            class="mb-4"
          ></v-text-field>

          <v-textarea
            v-model="editedPost.content"
            label="Content"
            :rules="contentRules"
            rows="8"
            outlined
            auto-grow
            class="mb-4"
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          text
          color="grey darken-1"
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="black"
          dark
          :disabled="!valid"
          @click="saveChanges"
        >
          Save Changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      valid: true,
      dialog: true,
      editedPost: { ...this.post },
      titleRules: [
        v => !!v || 'Title is required',
        v => v.length >= 3 || 'Title must be at least 3 characters'
      ],
      contentRules: [
        v => !!v || 'Content is required',
        v => v.length >= 10 || 'Content must be at least 10 characters'
      ]
    }
  },
  methods: {
    saveChanges() {
      if (this.$refs.form.validate()) {
        this.$emit('update', this.editedPost);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 8px;
  
  &__title {
    font-size: 20px;
    letter-spacing: 0.5px;
  }
}

.v-text-field,
.v-textarea {
  margin-bottom: 12px;
}
</style>