<template>
    <div class="blog-card">
        <img :src="images[`./${post.blogCoverPhoto}.jpg`]" alt="">
        <div class="info">
            <h4>{{post.blogTitle}}</h4>
            <v-btn 
                class="view-btn" 
                @click="$router.push({ name: 'BlogPost', params: { blogid: post.blogID }})"
                text
            >
                View The Post
                <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogCard',
    props: ["post"],
    data() {
        return {
            images: import.meta.globEager('../assets/blogCards/*.jpg')
        }
    }
}
</script>

<style lang="scss" scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: white;
    min-height: 420px;
    transition: 0.5s ease all;
    margin-bottom: 32px; // Add bottom margin
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: white;
            transition: 0.5s ease all;

            &:hover {
                background-color: #303030;
            }

            &:nth-child(1) {
                margin-right: 8px;
            }

            .edit, 
            .delete {
                pointer-events: none;
                height:20px;
                width: auto;
                max-width: 100%; 
               
            }
          
        }
    }

    img {
        display: block;
        border-radius: 8px 8px 0 0;
        z-index: 1;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        z-index: 3;
        padding: 32px 16px 40px; // Increased bottom padding
        color: #000;

        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: 300;
        }
        .link{
            display: inline;
            align-items: center;
            margin-top: auto;
            padding-top: 30px; // Increased top padding

        }

        .view-btn {
            background-color: rgb(24, 24, 24) !important;
            color: white !important;
            text-transform: capitalize !important;
            padding: 0 20px !important;
            height: 40px !important;
            margin-top: 20px;
            transition: all 0.3s ease;

            &:hover {
                background-color: rgb(45, 45, 45) !important;
                transform: translateY(-2px);
            }
        }
    }
}
</style>
