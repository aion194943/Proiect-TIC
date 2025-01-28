<template>
   <div class="landing" :style="{ backgroundImage: `url(${currentImage})` }"> 
     <div class="welcome-square">
     </div>
     <div class="text-box">
        <p class="subtext">Each fragrance unfolds a unique story, inviting you to explore the intricate details and nuances of scents.</p>
     </div>
  </div>>

</template>

<script>
export default {
  name: "blogPost",
  props: ["post"],
  data() {
    return {
      images: [
       'https://images.pexels.com/photos/9944432/pexels-photo-9944432.jpeg',
        'https://images.unsplash.com/photo-1591925463023-1ca6b0636780',
        'https://images.pexels.com/photos/3754300/pexels-photo-3754300.jpeg',
       'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
        'https://images.pexels.com/photos/4466492/pexels-photo-4466492.jpeg'
      ],
      currentImageIndex: 0,
      currentImage: '',
      rotationInterval: null
    };
  },
  mounted() {
    this.preloadImages();
    this.currentImage = this.images[this.currentImageIndex];
    this.startImageRotation();
  },
  beforeUnmount() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  },
  methods: {
    preloadImages() {
      this.images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    },
    startImageRotation() {
      this.rotationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.currentImage = this.images[this.currentImageIndex];
      }, 
      5000);
    }
  }
};
</script>


<style lang="scss" scoped>
.landing {
  //background-image: url(https://images.pexels.com/photos/9944432/pexels-photo-9944432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
  background-size:100% 100%;//sau auto? /sau cover? contain?
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: relative;
  transition: background-image 0.8s ease-in;

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