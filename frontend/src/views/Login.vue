<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <h2>💰 BudgetWise</h2>
        <p>Welcome back! Please log in to your account.</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
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

        <div class="options">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" class="btn-primary">Sign in</button>

        <p v-if="message" class="message">{{ message }}</p>

        <p class="signup-text">
          Don’t have an account?
          <router-link to="/register">Sign up</router-link>
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
import { inject } from "vue";

const email = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();
// Use a global login state (provide/inject pattern)
const setLoggedIn = inject("setLoggedIn", null);

// Backend base URL (adjust if needed)
const API_BASE = "http://localhost:5000/api/users";

const handleLogin = async () => {
  try {
    const response = await axios.post(`${API_BASE}/login`, {
      email: email.value,
      password: password.value,
    });

    message.value = "✅ Login successful! Redirecting...";
    localStorage.setItem("user", JSON.stringify(response.data.user));
    if (setLoggedIn) setLoggedIn(true); // update global login state
    router.push("/dashboard");
  } catch (error) {
    console.error("Login error:", error.response || error);
    message.value = `❌ ${
      error.response?.data?.message || "Invalid email or password"
    }`;
    if (setLoggedIn) setLoggedIn(false);
  }
};

onMounted(() => {
  feather.replace();
});
</script>


<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fb;
}

.login-card {
  background: white;
  width: 400px;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-header h2 {
  font-size: 1.8rem;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

.login-header p {
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

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.options a {
  color: #1e3a8a;
  text-decoration: none;
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

.message {
  text-align: center;
  color: #1e3a8a;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.divider {
  text-align: center;
  position: relative;
  margin: 1rem 0;
  color: #777;
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-btn {
  border: 1px solid #ddd;
  background: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s ease;
}

.social-btn:hover {
  background: #f3f4f6;
}

.signup-text {
  text-align: center;
  color: #555;
  font-size: 0.9rem;
}

.signup-text a {
  color: #1e3a8a;
  font-weight: 600;
  text-decoration: none;
}
</style>
