<template>
  <div>
    <!-- Dashboard Header -->
    <section class="dashboard-hero">
      <h1>Welcome to Your Dashboard</h1>
      <p>Get a quick overview of your finances at a glance.</p>
    </section>

    <!-- Quick Stats -->
    <section class="stats">
      <div class="stat-card">
        <h3>Total Balance</h3>
        <p>${{ totalBalance.toFixed(2) }}</p>
      </div>
      <div class="stat-card">
        <h3>Monthly Income</h3>
        <p>${{ monthlyIncome.toFixed(2) }}</p>
      </div>
      <div class="stat-card">
        <h3>Monthly Expenses</h3>
        <p>${{ monthlyExpenses.toFixed(2) }}</p>
      </div>
    </section>

    <!-- Budget Overview -->
    <section class="budget-overview">
      <h2>Budgets</h2>
      <div class="budget-card" v-for="budget in budgets" :key="budget.category">
        <h4>{{ budget.category }}</h4>
        <div class="progress-bar">
          <div class="progress" :style="{ width: budget.progress + '%' }"></div>
        </div>
        <p>{{ budget.spent }} / {{ budget.limit }}</p>
      </div>
    </section>

    <!-- Goals Overview -->
    <section class="goals-overview">
      <h2>Goals</h2>
      <div class="goal-card" v-for="goal in goals" :key="goal.name">
        <h4>{{ goal.name }}</h4>
        <div class="progress-bar">
          <div class="progress" :style="{ width: goal.progress + '%' }"></div>
        </div>
        <p>${{ goal.current }} / ${{ goal.target }}</p>
      </div>
    </section>

    <!-- Recent Transactions -->
    <section class="transactions-overview">
      <h2>Recent Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in recentTransactions" :key="tx.id">
            <td>{{ tx.date }}</td>
            <td>{{ tx.category }}</td>
            <td>{{ tx.type }}</td>
            <td>${{ tx.amount }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Charts -->
    <section class="charts">
      <div class="chart-card">
        <h3>Income vs Expenses</h3>
        <canvas ref="lineChart"></canvas>
      </div>
      <div class="chart-card">
        <h3>Expenses by Category</h3>
        <canvas ref="pieChart"></canvas>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="actions">
      <router-link to="/transactions" class="button">Add Transaction</router-link>
      <router-link to="/budgets" class="button-outline">Set Budget</router-link>
      <router-link to="/goals" class="button">Add Goal</router-link>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
  ArcElement
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
  ArcElement
);

export default {
  name: 'Dashboard',
  setup() {
    // Quick stats
    const totalBalance = ref(5000.0);
    const monthlyIncome = ref(3000.0);
    const monthlyExpenses = ref(1200.0);

    // Budget Overview (dummy data)
    const budgets = ref([
      { category: 'Food', limit: 500, spent: 350, progress: 70 },
      { category: 'Transport', limit: 200, spent: 150, progress: 75 },
      { category: 'Entertainment', limit: 300, spent: 100, progress: 33 }
    ]);

    // Goals Overview (dummy data)
    const goals = ref([
      { name: 'Emergency Fund', target: 1000, current: 400, progress: 40 },
      { name: 'Vacation', target: 1500, current: 600, progress: 40 }
    ]);

    // Recent Transactions (dummy data)
    const recentTransactions = ref([
      { id: 1, date: '2025-10-01', category: 'Food', type: 'Expense', amount: 50 },
      { id: 2, date: '2025-10-02', category: 'Salary', type: 'Income', amount: 1000 },
      { id: 3, date: '2025-10-03', category: 'Transport', type: 'Expense', amount: 20 },
      { id: 4, date: '2025-10-04', category: 'Entertainment', type: 'Expense', amount: 40 }
    ]);

    // Chart references
    const lineChart = ref(null);
    const pieChart = ref(null);

    onMounted(async () => {
      await nextTick(); // ensures canvases exist before drawing

      // Income vs Expenses Line Chart
      new Chart(lineChart.value, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'rgba(102,126,234,0.2)',
              borderColor: '#667eea',
              data: [800, 700, 900, 600],
              fill: true
            },
            {
              label: 'Expenses',
              backgroundColor: 'rgba(236,72,153,0.2)',
              borderColor: '#ec4899',
              data: [300, 400, 350, 150],
              fill: true
            }
          ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } } }
      });

      // Expenses by Category Pie Chart
      new Chart(pieChart.value, {
        type: 'pie',
        data: {
          labels: budgets.value.map(b => b.category),
          datasets: [
            {
              label: 'Expenses by Category',
              data: budgets.value.map(b => b.spent),
              backgroundColor: ['#f87171', '#fbbf24', '#34d399']
            }
          ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } } }
      });
    });

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      budgets,
      goals,
      recentTransactions,
      lineChart,
      pieChart
    };
  }
};
</script>

<style scoped>
.dashboard-hero {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 40px;
}

.stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.stat-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  margin: 10px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.budget-overview,
.goals-overview,
.transactions-overview {
  max-width: 900px;
  margin: 20px auto;
}

.budget-card,
.goal-card {
  margin-bottom: 15px;
}

.progress-bar {
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  height: 15px;
  margin: 5px 0;
}

.progress {
  background: #667eea;
  height: 100%;
}

.transactions-overview table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-overview th,
.transactions-overview td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.charts {
  max-width: 900px;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.chart-card {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
  flex: 1 1 400px;
}

.actions {
  text-align: center;
  margin-bottom: 60px;
}

.button,
.button-outline {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
}

.button {
  background: #667eea;
  color: white;
}

.button-outline {
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
}
</style>
