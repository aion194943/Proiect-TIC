<template>
  <div class="home">
    <BlogPost :post="welcomeScreen"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>Enjoy our best blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post"  v-for="(post, index) in SampleBlogCards" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import BlogPost from '@/components/BlogPost.vue';
import BlogCard from '@/components/BlogCard.vue';
export default {
    name: "Home",
    components: { BlogPost, BlogCard },
    data() {
        return {
    
        };
    },
    computed:{
      SampleBlogCards(){
        return this.$store.state.SampleBlogCards;
      }
    }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap{
  background-color: rgb(241, 241, 241); 
  color: rgb(0, 0, 0); 
  padding: 20px;
  h3{
    font-weight:300;
    font-size:28px;
    margin-bottom: 32px;
  }
}
</style>