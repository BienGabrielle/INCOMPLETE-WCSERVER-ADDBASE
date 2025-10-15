<template>
  <div class="register-page">
    <div class="register-card">
      <div class="register-header">
        <h2>💰 BudgetWise</h2>
        <p>Create your account and start managing your budget.</p>
      </div>

      <form class="register-form" @submit.prevent="handleRegister">
        <label>Full Name</label>
        <div class="input-group">
          <i data-feather="user"></i>
          <input v-model="name" type="text" placeholder="John Doe" required />
        </div>

        <label>Email Address</label>
        <div class="input-group">
          <i data-feather="mail"></i>
          <input v-model="email" type="email" placeholder="you@example.com" required />
        </div>

        <label>Password</label>
        <div class="input-group">
          <i data-feather="lock"></i>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="btn-primary">Sign Up</button>

        <p class="login-text">
          Already have an account?
          <router-link to="/login">Sign in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import feather from "feather-icons";
import axios from "axios";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

// ⚙️ Base URL of your backend (adjust if needed)
const API_BASE = "http://localhost:5000/api/users";

onMounted(() => {
  feather.replace();
});

const handleRegister = async () => {
  try {
    const response = await axios.post(`${API_BASE}/register`, {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    alert("✅ Registration successful!");
    console.log("User registered:", response.data);
    router.push("/");
  } catch (error) {
    console.error("Registration error:", error.response || error);
    alert(
      `❌ Registration failed: ${
        error.response?.data?.message || "Server unreachable"
      }`
    );
  }
};
</script>


<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fb;
}

.register-card {
  background: white;
  width: 400px;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.register-header h2 {
  font-size: 1.8rem;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

.register-header p {
  color: #555;
  font-size: 0.95rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #333;
}

.input-group {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.input-group i {
  margin-right: 0.5rem;
  color: #555;
}

.input-group input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.95rem;
}

.btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #1e3a8a);
  color: white;
  border: none;
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

.login-text {
  text-align: center;
  color: #555;
  font-size: 0.9rem;
}

.login-text a {
  color: #1e3a8a;
  font-weight: 600;
  text-decoration: none;
}
</style>
