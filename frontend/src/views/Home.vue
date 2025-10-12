<template>
  <div>
    <section class="gradient-bg hero">
      <h1>Take Control of Your Finances with BudgetWise</h1>
      <p>Track your spending, manage budgets, and reach your savings goals with ease.</p>
      <router-link to="/register" class="button">Get Started Free</router-link>
    </section>

    <section class="features">
      <h2>Everything You Need to Stay Financially Fit</h2>
      <div class="features-container">
        <div class="feature-card">
          <h3>Expense Tracking</h3>
          <p>Easily record, categorize, and view all your daily transactions.</p>
        </div>
        <div class="feature-card">
          <h3>Budgets</h3>
          <p>Set monthly spending limits and stay within your financial goals.</p>
        </div>
        <div class="feature-card">
          <h3>Reports & Insights</h3>
          <p>View your financial performance through clean, visual dashboards.</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Start Building Better Financial Habits Today</h2>
      <p>Sign up and experience smarter budgeting with BudgetWise.</p>
      <router-link to="/register" class="button">Create an Account</router-link>
      <router-link to="/login" class="button-outline">Login</router-link>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 80px 20px;
  color: white;
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.features {
  padding: 60px 20px;
  text-align: center;
}

.features-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
}

.feature-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  margin: 10px;
  width: 280px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.cta {
  background-color: #1e3a8a;
  color: white;
  text-align: center;
  padding: 60px 20px;
}

.button {
  display: inline-block;
  margin-top: 15px;
  background: white;
  color: #1e3a8a;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}

.button-outline {
  display: inline-block;
  margin-top: 15px;
  margin-left: 10px;
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}
</style>
