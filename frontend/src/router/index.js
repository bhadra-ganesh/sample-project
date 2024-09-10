import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/login.vue';
import register from '../components/register.vue';
import views from '../components/views.vue';

const routes = [
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/users', component: views} 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
