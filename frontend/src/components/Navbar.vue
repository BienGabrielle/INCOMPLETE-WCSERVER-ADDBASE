<template>
  <nav class="navbar">
    <div class="logo">
      💰 <strong>BudgetWise</strong>
    </div>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/transactions">Transactions</router-link>
      <router-link to="/budgets">Budgets</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e3a8a;
  padding: 1rem 2rem;
  color: white;
}

.logo {
  font-size: 1.3rem;
  font-weight: bold;
}

.links a {
  margin-left: 1rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.links a.router-link-exact-active {
  border-bottom: 2px solid white;
}
</style>
