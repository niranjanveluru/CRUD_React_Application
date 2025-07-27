## 📘 React CRUD Dashboard — Local Setup Guide

This is a simple React-based CRUD dashboard that connects to an Express backend. You can create, edit, delete, and view items in-memory. Perfect for learning or prototyping!

---

### 🛠️ Prerequisites

Make sure you have these installed:

- [Node.js & npm](https://nodejs.org/) (recommended: Node ≥ 16)
- [Git](https://git-scm.com/) (if cloning the repo)

---

### 🚀 How to Run Locally

#### 1. Clone the repository *(optional if you have local files)*

```bash
git clone https://github.com/your-username/crud-dashboard.git
cd crud-dashboard
```

#### 2. Install Frontend Dependencies

```bash
cd frontend    # or wherever your React app lives
npm install
```

#### 3. Start React App

```bash
npm start
```

It will launch at [http://localhost:3000](http://localhost:3000) by default.

#### 4. Install Backend Dependencies

```bash
cd ../backend   # or wherever your Express backend lives
npm install
```

#### 5. Start Express Server

```bash
node server.js
```

It will run at [http://localhost:5000](http://localhost:5000)

---

### 🧪 Test Login Credentials

Use this predefined user to log in:

- **Email**: `admin@test.com`
- **Password**: `1234`

---

### 📦 API Endpoints

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| `POST` | `/login`             | Authenticate user         |
| `GET`  | `/items`             | Fetch all items           |
| `POST` | `/items`             | Create new item           |
| `PUT`  | `/items/:id`         | Update item by ID         |
| `DELETE` | `/items/:id`       | Delete item by ID         |

---

### ✅ Features

- Add, update, and delete items
- Login/logout flow using JWT
- Fully styled dashboard with responsive layout

