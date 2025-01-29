<template>
    <div class="blog-container">
      <div class="blog-post">
        <h1>Your Blog Title</h1>
        <div class="post-meta">
          <span class="author">By John Doe</span>
          <span class="date">12/12/2023 14:30</span>
        </div>
        <div class="post-content">
          <p>This is your blog post content. It can contain multiple paragraphs and formatting.</p>
          <p>Add more paragraphs as needed to demonstrate the layout.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      name: 'Something'
  }
  </script>
  
  <style lang="scss" scoped>
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
  
  @media (max-width: 768px) {
    .blog-container {
      padding: 10px;
    }
    
    .blog-post {
      padding: 20px;
    }
  }
  </style>