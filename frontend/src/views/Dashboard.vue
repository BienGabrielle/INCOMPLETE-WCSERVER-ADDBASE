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
          <tr v-for="tx in recentTransactions" :key="tx._id">
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
    </section>

    <!-- Quick Actions -->
    <section class="actions">
      <router-link to="/transactions" class="button">Add Transaction</router-link>
      <router-link to="/budgets" class="button-outline">Set Budget</router-link>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';
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
    const totalBalance = ref(0);
    const monthlyIncome = ref(0);
    const monthlyExpenses = ref(0);

    // Data
    const budgets = ref([]);
    const recentTransactions = ref([]);
    const lineChart = ref(null);
    const pieChart = ref(null);

    // Fetch budgets and transactions from backend
    const fetchBudgets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Budgets");
        budgets.value = res.data.map(b => ({
          ...b,
          progress: b.limit ? Math.min((b.spent / b.limit) * 100, 100) : 0
        }));
      } catch (err) {
        console.error("Failed to fetch budgets:", err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/transactions");
        // Sort by date descending, take latest 5
        recentTransactions.value = res.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        // Calculate stats
        const income = res.data.filter(tx => tx.type === "Income").reduce((sum, tx) => sum + tx.amount, 0);
        const expenses = res.data.filter(tx => tx.type === "Expense").reduce((sum, tx) => sum + tx.amount, 0);
        monthlyIncome.value = income;
        monthlyExpenses.value = expenses;
        totalBalance.value = income - expenses;
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    onMounted(async () => {
      await fetchBudgets();
      await fetchTransactions();
      await nextTick();

      // Income vs Expenses Line Chart (monthly summary)
      // For demo, use weekly split from transactions
      // You can enhance this to group by week/month
      const txRes = await axios.get("http://localhost:5000/api/transactions");
      const txs = txRes.data;
      // Group by week (simple split for demo)
      const weeks = [[], [], [], []];
      txs.forEach(tx => {
        const day = new Date(tx.date).getDate();
        if (day <= 7) weeks[0].push(tx);
        else if (day <= 14) weeks[1].push(tx);
        else if (day <= 21) weeks[2].push(tx);
        else weeks[3].push(tx);
      });
      const weekIncome = weeks.map(w => w.filter(tx => tx.type === "Income").reduce((sum, tx) => sum + tx.amount, 0));
      const weekExpenses = weeks.map(w => w.filter(tx => tx.type === "Expense").reduce((sum, tx) => sum + tx.amount, 0));

      new Chart(lineChart.value, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'rgba(102,126,234,0.2)',
              borderColor: '#667eea',
              data: weekIncome,
              fill: true
            },
            {
              label: 'Expenses',
              backgroundColor: 'rgba(236,72,153,0.2)',
              borderColor: '#ec4899',
              data: weekExpenses,
              fill: true
            }
          ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } } }
      });

      // Expenses by Category Pie Chart
      const expenseBudgets = budgets.value.filter(b => b.spent > 0);
      new Chart(pieChart.value, {
        type: 'pie',
        data: {
          labels: expenseBudgets.map(b => b.category),
          datasets: [
            {
              label: 'Expenses by Category',
              data: expenseBudgets.map(b => b.spent),
              backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6']
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
