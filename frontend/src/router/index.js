import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreatePost from '../views/CreatePost.vue'
import UserProfile from '../views/UserProfile.vue'
import Something from '../views/Something.vue'
import BlogPost from '../views/BlogPost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },//excuse me 
  
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: "Blogs",
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: '/createpost',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: "CreatePost",
      requiresAuth: false,
    },
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: '/something',
    name: 'Something',
    component: Something,
    meta: {
      title: "Something",
      requiresAuth: false,
    },
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: () => import('@/views/BlogPost.vue'),
    props: true
  }
 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | La Maison des Senteurs`;
  next();
});

export default router;
