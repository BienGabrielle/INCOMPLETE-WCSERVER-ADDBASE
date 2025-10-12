<template>
  <div class="transactions-page">
    <section class="header">
      <h1>Your Transactions</h1>
      <p>View, add, and manage your income and expenses.</p>
    </section>

    <!-- Add Transaction Form -->
    <section class="add-transaction">
      <h2>Add Transaction</h2>
      <form @submit.prevent="addTransaction">
        <input v-model="newTransaction.date" type="date" required />
        <input v-model="newTransaction.category" type="text" placeholder="Category" required />
        <select v-model="newTransaction.type" required>
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input v-model.number="newTransaction.amount" type="number" placeholder="Amount" required />
        <button type="submit" class="button">Add</button>
      </form>
    </section>

    <!-- Transactions Table -->
    <section class="transactions-table">
      <h2>All Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in transactions" :key="tx.id">
            <td>{{ tx.date }}</td>
            <td>{{ tx.category }}</td>
            <td>{{ tx.type }}</td>
            <td>${{ tx.amount.toFixed(2) }}</td>
            <td>
              <button class="delete-btn" @click="deleteTransaction(tx.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Transactions',
  setup() {
    const transactions = ref([
      { id: 1, date: '2025-10-01', category: 'Food', type: 'Expense', amount: 25.5 },
      { id: 2, date: '2025-10-02', category: 'Salary', type: 'Income', amount: 1500 },
      { id: 3, date: '2025-10-03', category: 'Transport', type: 'Expense', amount: 50 }
    ]);

    const newTransaction = ref({
      date: '',
      category: '',
      type: '',
      amount: null
    });

    const addTransaction = () => {
      if (!newTransaction.value.date || !newTransaction.value.category || !newTransaction.value.type || !newTransaction.value.amount) return;

      const newTx = { ...newTransaction.value, id: Date.now() };
      transactions.value.push(newTx);

      newTransaction.value = { date: '', category: '', type: '', amount: null };
    };

    const deleteTransaction = (id) => {
      transactions.value = transactions.value.filter(tx => tx.id !== id);
    };

    return { transactions, newTransaction, addTransaction, deleteTransaction };
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

.add-transaction {
  text-align: center;
  margin-bottom: 40px;
}

form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

input,
select {
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

.transactions-table {
  max-width: 900px;
  margin: 0 auto;
}

.transactions-table table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th,
.transactions-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
