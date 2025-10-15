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
          <tr v-for="tx in transactions" :key="tx._id">
            <td>{{ tx.date }}</td>
            <td>{{ tx.category }}</td>
            <td>{{ tx.type }}</td>
            <td>${{ tx.amount.toFixed(2) }}</td>
            <td>
              <button class="delete-btn" @click="deleteTransaction(tx._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Transactions',
  setup() {
    const transactions = ref([]);
    const newTransaction = ref({
      date: '',
      category: '',
      type: '',
      amount: null
    });

    const apiUrl = "http://localhost:5000/api/transactions";

    const fetchTransactions = async () => {
      try {
        const res = await axios.get(apiUrl);
        transactions.value = res.data;
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    const addTransaction = async () => {
      try {
        await axios.post(apiUrl, newTransaction.value);
        await fetchTransactions();
        newTransaction.value = { date: '', category: '', type: '', amount: null };
      } catch (err) {
        console.error("Error adding transaction:", err);
      }
    };

    const deleteTransaction = async (id) => {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        await fetchTransactions();
      } catch (err) {
        console.error("Error deleting transaction:", err);
      }
    };

    onMounted(fetchTransactions);

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
