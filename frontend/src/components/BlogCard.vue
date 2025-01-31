<template>
  <div class="blog-card">
    <h3>{{ post.blogTitle }}</h3>
    <div class="card-meta">
      <span class="author">By {{ post.author }}</span>
      <span class="date">{{ formatDate(post.createdAt) }}</span>
    </div>
    <p class="description">
      {{ truncateText(post.content) }}
    </p>
    <span class="read-more" @click="$router.push({ name: 'BlogPost', params: { blogid: post.blogID }})">
      Read more
      <v-icon small>mdi-arrow-right</v-icon>
    </span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'BlogCard',
  props: ["post"],
  methods: {
    truncateText(text) {
      if (!text) return '';
      const words = text.split(' ');
      if (words.length > 10) {
        return words.slice(0, 10).join(' ') + '...';
      }
      return text;
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
    font-weight: 600;
    color: #222;
    margin-bottom: 12px;
    
    &:hover {
      color: #007bff;
    }
  }

  .metadata {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 12px;
    font-size: 13px;
    color: #666;

    .author, .date {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .description {
    font-size: 14px;
    line-height: 1.5;
    color: #444;
    margin-bottom: 15px;
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #007bff;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      color: darken(#007bff, 10%);
      gap: 8px;
    }

    .v-icon {
      font-size: 16px;
    }
  }
}
</style>
