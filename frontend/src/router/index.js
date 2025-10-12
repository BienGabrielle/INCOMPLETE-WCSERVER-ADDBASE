import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Transactions from '../views/Transactions.vue';
import Budgets from '../views/Budgets.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/transactions', name: 'Transactions', component: Transactions },
  { path: '/budgets', name: 'Budgets', component: Budgets },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
