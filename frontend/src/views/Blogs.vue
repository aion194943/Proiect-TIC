<template>
  <div class="blog-cards">
    <BlogCard :post="post" v-for="(post, index) in SampleBlogCards" :key="index" />
  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue';
export default {
  name: "Home",
  components: { BlogCard },
  computed: {
    SampleBlogCards() {
      return this.$store.state.SampleBlogCards;
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-cards {
  background-color: rgb(241, 241, 241); 
  color: rgb(0, 0, 0); 
  padding: 20px; 
  h3{
    font-weight:300;
    font-size:28px;
    margin-bottom: 32px;
  }}
</style>