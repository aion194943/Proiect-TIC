<template>
    <div class="blog-card">
        <div class="icons">
            <div class="icon">
                <v-icon>mdi-pencil</v-icon>
            </div>
            <div class="icon">
                <v-icon>mdi-delete</v-icon>
            </div>
        </div>
        <img :src="images[`./${post.blogCoverPhoto}.jpg`]" alt="">
        <div class="info">
            <h4>
                {{post.blogTitle}}
            </h4>
            <router-link class="link" to="/">
                View The Post
                <v-icon>
                    mdi-arrow-right
                </v-icon>
            </router-link>
        </div>
    </div>
</template>
<script>
import Arrow from "@/assets/Icons/left-arrow.svg"
import Edit from "@/assets/Icons/edit.svg"
import Delete from "@/assets/Icons/trash.svg"

export default {
    name: 'BlogCard',
    props:["post"],
    components:{
        Arrow, Edit, Delete
    },
    data() {
        return {
            images: import.meta.globEager('../assets/blogCards/*.jpg')
        }
    },
    mounted() {
        console.log('post:', this.post);
        console.log('images:', this.images);
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
    background-color: rgba(155, 155, 155, 0.384);
    min-height: 420px;
    transition: .5s ease all;

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
        padding: 32px 16px;
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
            padding-top: 20px;

        }
    }
}
</style>
