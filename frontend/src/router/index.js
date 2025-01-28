import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreatePost from '../views/CreatePost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
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




