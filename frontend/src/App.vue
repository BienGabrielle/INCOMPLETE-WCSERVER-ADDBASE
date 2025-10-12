<template>
  <div id="app">
    <header class="app-header">
      <h1 class="logo">BudgetWise</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/transactions">Transactions</router-link>
        <router-link to="/budgets">Budgets</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>

    <main>
  <router-view :key="$route.fullPath" />
</main>

    <footer class="app-footer">
      <p>© 2025 BudgetWise. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav a {
  margin: 0 0.75rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
}

nav a.router-link-exact-active {
  border-bottom: 2px solid white;
}

main {
  padding: 2rem;
  min-height: 80vh;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  background-color: #f3f4f6;
  font-size: 0.9rem;
  color: #555;
}
</style>
