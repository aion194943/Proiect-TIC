<template>
  <div class="landing"> 
     <div class="welcome-square">
     </div>
     <div class="text-box">
        <p class="subtext">Each fragrance unfolds a unique story, inviting you to explore the intricate details and nuances of scents.</p>
     </div>
  </div>
</template>

<script>
export default {
  name: "blogPost",
  props: ["post"],
  components: {
   
  },
};
</script>

<style lang="scss" scoped>
.landing {
  background-image: url(https://images.pexels.com/photos/9944432/pexels-photo-9944432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: relative;
}
.welcome-square {
  background-position: center;
  background-color: rgba(240, 240, 240, 0.247);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  height: 100vh;
  width: 100vw;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  padding-top: 20%;
}
.text-box {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgb(24, 24, 24);
  color: white;
  padding: 20px;
  width: 30%;
}
.welcome-text {
  font-size: 3em;
  color: azure;
  text-shadow: 2px 2px 4px #000000;
}
.subtext {
  font-size: 1.5em;
  color: white;
  text-shadow: 1px 1px 2px #000000;
}
</style>