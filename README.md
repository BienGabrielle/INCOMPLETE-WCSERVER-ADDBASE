BudgetWise

BudgetWise is a simple web app built with the MEVN stack (MongoDB, Express, Vue, Node.js) that helps users manage their expenses, budgets, and transactions easily.


Features:

Register and log in securely

Add, view, and delete transactions

Set and manage budgets per category

Organized and user-friendly design


Frontend: Vue.js (Vite) 

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

Tools: Axios, dotenv, cors, bcryptjs, nodemon


Installation Guide
1. Clone or Download the Project
git clone <your-repository-link>

2. Backend Setup
cd backend
npm installw (or npm install express mongoose dotenv cors bcryptjs nodemon)

Create a .env file inside the backend folder:
MONGO_URI=mongodb+srv://bdcayanan1_db_user:12345@andrew.re3kk4q.mongodb.net/Budgetwise
PORT=5000

Then run:
npm run dev

3. Frontend Setup
cd ../frontend
npm install (or npm install express mongoose dotenv cors bcryptjs nodemon)
npm run dev

The frontend (Vue) connects to the backend (Express) using CORS.
Backend allows requests from:
http://localhost:5173


Contributors:

Antonio, Aaron Joseph

Cayanan, Bart Andrew

Gonzales, John Patrick

Martinez, Sean Paolo

Pangilinan, Bien Gabrielle
