<template>
  <div class="budgets-page">
    <!-- Header -->
    <section class="header">
      <h1>Manage Your Budgets</h1>
      <p>Set limits for each spending category and track your progress.</p>
    </section>

    <!-- Category Balance Feature -->
    <section class="category-balance">
      <h2>Category Balance</h2>
      <form @submit.prevent>
        <select v-model="selectedCategory" class="category-select">
          <option disabled value="">Select Category</option>
          <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </form>
      <div v-if="selectedCategory">
        <p>
          Balance for <strong>{{ selectedCategory }}</strong>:
          <span class="balance-amount">${{ getCategoryBalance(selectedCategory).toFixed(2) }}</span>
        </p>
      </div>
    </section>

    <!-- Add Budget Form -->
    <section class="add-budget">
      <h2>Add a New Budget</h2>
      <form @submit.prevent="addBudget">
        <input v-model="newBudget.category" type="text" placeholder="Category" required />
        <input v-model.number="newBudget.limit" type="number" placeholder="Limit Amount" required />
        <input v-model.number="newBudget.spent" type="number" placeholder="Spent (optional)" />
        <button type="submit" class="button">Add Budget</button>
      </form>
    </section>

    <!-- Budget List -->
    <section class="budget-list">
      <h2>Your Budgets</h2>
      <div v-if="budgets.length > 0" class="budget-container">
  <div class="budget-card" v-for="budget in budgets" :key="budget._id">
          <h3>{{ budget.category }}</h3>
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: Math.min(budgetProgress(budget), 100) + '%', background: getProgressColor(budget) }"
            ></div>
          </div>
          <p>
            ${{ budget.spent }} / ${{ budget.limit }}
            <span :class="{ 'over-limit': budget.spent > budget.limit }">
              ({{ budgetProgress(budget).toFixed(0) }}%)
            </span>
          </p>
          <button class="delete-btn" @click="deleteBudget(budget._id)">Delete</button>
        </div>
      </div>
      <p v-else class="no-data">No budgets added yet. Add one above!</p>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "Budgets",
  setup() {
    const budgets = ref([]);
    const newBudget = ref({ category: "", limit: null, spent: 0 });
    const transactions = ref([]);
    const selectedCategory = ref("");
    const API_URL = "http://localhost:5000/api/Budgets";

    // Fetch all budgets from backend
    const fetchBudgets = async () => {
      try {
        const res = await axios.get(API_URL);
        budgets.value = res.data;
      } catch (err) {
        console.error("❌ Failed to fetch budgets:", err);
      }
    };

    // Fetch all transactions from backend
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/transactions");
        transactions.value = res.data;
      } catch (err) {
        console.error("❌ Failed to fetch transactions:", err);
      }
    };

    // Get all unique categories from budgets and transactions
    const allCategories = ref([]);
    const updateCategories = () => {
      const budgetCats = budgets.value.map(b => b.category);
      const txCats = transactions.value.map(t => t.category);
      allCategories.value = Array.from(new Set([...budgetCats, ...txCats])).filter(Boolean);
      if (!selectedCategory.value && allCategories.value.length > 0) {
        selectedCategory.value = allCategories.value[0];
      }
    };

    // Add a new budget
    const addBudget = async () => {
      if (!newBudget.value.category || !newBudget.value.limit) return;
      try {
        await axios.post(API_URL, newBudget.value);
        newBudget.value = { category: "", limit: null, spent: 0 };
        await fetchBudgets();
        updateCategories();
      } catch (err) {
        console.error("❌ Failed to add budget:", err);
      }
    };

    // Delete a budget
    const deleteBudget = async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        await fetchBudgets();
        updateCategories();
      } catch (err) {
        console.error("❌ Failed to delete budget:", err);
      }
    };

    // Calculate remaining balance for a category: budget limit - expenses
    const getCategoryBalance = (category) => {
      if (!category) return 0;
      const budget = budgets.value.find(b => b.category === category);
      const expense = transactions.value.filter(tx => tx.category === category && tx.type === "Expense").reduce((sum, tx) => sum + tx.amount, 0);
      return budget ? budget.limit - expense : 0;
    };

    const budgetProgress = (budget) => (budget.spent / budget.limit) * 100;

    const getProgressColor = (budget) => {
      const percent = budgetProgress(budget);
      if (percent < 70) return "#34d399"; // green
      if (percent < 100) return "#fbbf24"; // yellow
      return "#ef4444"; // red
    };

    onMounted(async () => {
      await fetchBudgets();
      await fetchTransactions();
      updateCategories();
    });

    return {
      budgets,
      newBudget,
      addBudget,
      deleteBudget,
      budgetProgress,
      getProgressColor,
      transactions,
      selectedCategory,
      allCategories,
      getCategoryBalance,
    };
  },
};
</script>

<style scoped>
/* Category Balance styles */
.category-balance {
  text-align: center;
  margin-bottom: 30px;
}
.category-select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 160px;
  margin-bottom: 10px;
}
.balance-amount {
  font-weight: bold;
  color: #1e3a8a;
  font-size: 1.2em;
}
.header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 40px;
}

.add-budget {
  text-align: center;
  margin-bottom: 40px;
}

form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 160px;
}

.button {
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.budget-list {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.budget-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.budget-card {
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
  text-align: center;
}

.progress-bar {
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  height: 15px;
  margin: 10px 0;
}

.progress {
  height: 100%;
  transition: width 0.3s ease;
}

.over-limit {
  color: #ef4444;
  font-weight: bold;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.no-data {
  color: #555;
  margin-top: 20px;
}
</style>
