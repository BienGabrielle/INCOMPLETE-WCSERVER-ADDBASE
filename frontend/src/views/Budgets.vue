<template>
  <div class="budgets-page">
    <!-- Header -->
    <section class="header">
      <h1>Manage Your Budgets</h1>
      <p>Set limits for each spending category and track your progress.</p>
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
        <div class="budget-card" v-for="budget in budgets" :key="budget.id">
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
          <button class="delete-btn" @click="deleteBudget(budget.id)">Delete</button>
        </div>
      </div>
      <p v-else class="no-data">No budgets added yet. Add one above!</p>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Budgets',
  setup() {
    const budgets = ref([
      { id: 1, category: 'Food', limit: 500, spent: 320 },
      { id: 2, category: 'Transport', limit: 200, spent: 150 },
      { id: 3, category: 'Entertainment', limit: 300, spent: 280 }
    ]);

    const newBudget = ref({
      category: '',
      limit: null,
      spent: 0
    });

    const addBudget = () => {
      if (!newBudget.value.category || !newBudget.value.limit) return;
      const newEntry = { ...newBudget.value, id: Date.now() };
      budgets.value.push(newEntry);
      newBudget.value = { category: '', limit: null, spent: 0 };
    };

    const deleteBudget = (id) => {
      budgets.value = budgets.value.filter(b => b.id !== id);
    };

    const budgetProgress = (budget) => (budget.spent / budget.limit) * 100;

    const getProgressColor = (budget) => {
      const percent = budgetProgress(budget);
      if (percent < 70) return '#34d399'; // green
      if (percent < 100) return '#fbbf24'; // yellow
      return '#ef4444'; // red
    };

    return { budgets, newBudget, addBudget, deleteBudget, budgetProgress, getProgressColor };
  }
};
</script>

<style scoped>
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
