<template>
  <div class="user-log">
    <h2>Past Activity</h2>
    
    <div class="subsection">
      <h3 class="subsection-title">Activity Overview</h3>
      <div class="subsection-content">
        <p>Here you can see all your blog activities.</p>
        <p>Track your posts, updates, and interactions.</p>
      </div>
    </div>

    <div class="activity-list">
      <!-- Activity items will go here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLog',
  data() {
    return {
      message: 'Welcome to the User Log!'
    };
  }
}
</script>

<style lang="scss" scoped>
.user-log {
  margin-top: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
}

.subsection {
  margin: 20px 0;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 6px;
  border-left: 4px solid #333;

  .subsection-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }

  .subsection-content {
    p {
      margin: 8px 0;
      font-size: 15px;
      line-height: 1.5;
      color: #555;
    }
  }
}
</style>