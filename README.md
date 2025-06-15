# 🧩 Backend Developer Assignment – Future Code Technology

This project is a simple RESTful API built with **Node.js**, **Express**, and **Prisma (MySQL)** to demonstrate backend development skills. It includes:

- ✅ User Registration and Login (without JWT)
- ✅ CRUD operations for a Product model
- ✅ Custom Product ID generation
- ✅ Secure password handling with bcrypt

---

## 🚀 Technologies Used

- Node.js
- Express.js
- Prisma ORM
- MySQL (can adapt to other SQL databases)
- TypeScript
- bcrypt
- dotenv

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm install
```


### 3. Setup Environment Variables
Copy the `.env.example` file to `.env` and update the database connection string:
#### Create a .env file based on .env.example:
```bash
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/your-database-name"
```

### 4. Set Up the Database
#### Run Prisma migrations and generate client:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Server
```bash
npm run dev
Server runs at: http://localhost:3003
```

