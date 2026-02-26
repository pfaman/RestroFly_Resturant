# 🍔 Food Delivery Backend API

A production-ready REST API built using **Node.js, Express & MongoDB** that powers a complete food ordering system including:

* User Authentication (JWT)
* Restaurant Management
* Category Management
* Food Management
* Cart & Orders
* Admin Authorization

This project simulates a real-world food delivery backend like **Zomato / Swiggy**.

---

# 🚀 Features

## 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Admin Middleware
* Password Reset
* Update Password

---

## 🏪 Restaurant Module

* Create Restaurant
* Get All Restaurants
* Get Restaurant By ID
* Delete Restaurant

---

## 🥗 Category Module

* Create Category
* Get All Categories
* Get Single Category
* Update Category
* Delete Category

---

## 🍕 Food Module

* Create Food Item
* Get All Food
* Get Food By ID
* Get Food By Restaurant
* Update Food
* Delete Food

---

## 🛒 Orders Module

* Place Order
* Update Order Status
* Total Price Calculation
* Buyer Validation

---

# 🏗 Architecture

```text
Controllers
    ↓
Models (Mongoose Schemas)
    ↓
Middleware (Auth + Admin)
    ↓
MongoDB Database
```

Follows:

* MVC Pattern
* RESTful API principles
* Secure JWT Authentication
* Role-based Access

---

# 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs

---

# 🔐 Authentication Flow

1️⃣ User Registers
2️⃣ Password hashed using bcrypt
3️⃣ User logs in
4️⃣ JWT token generated
5️⃣ Protected routes require:

```http
Authorization: Bearer <token>
```

---

# 📌 API Endpoints

## 👤 Auth Routes

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | /api/auth/register        |
| POST   | /api/auth/login           |
| GET    | /api/auth/user            |
| PUT    | /api/auth/update          |
| PUT    | /api/auth/update-password |
| POST   | /api/auth/reset-password  |
| DELETE | /api/auth/delete          |

---

## 🏪 Restaurant Routes

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /api/restaurant     |
| GET    | /api/restaurant     |
| GET    | /api/restaurant/:id |
| DELETE | /api/restaurant/:id |

---

## 🍕 Food Routes

| Method | Endpoint                 |
| ------ | ------------------------ |
| POST   | /api/food                |
| GET    | /api/food                |
| GET    | /api/food/:id            |
| GET    | /api/food/restaurant/:id |
| PUT    | /api/food/:id            |
| DELETE | /api/food/:id            |

---

## 🥗 Category Routes

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/category     |
| GET    | /api/category     |
| GET    | /api/category/:id |
| PUT    | /api/category/:id |
| DELETE | /api/category/:id |

---

## 🛒 Order Routes

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /api/order     |
| PUT    | /api/order/:id |

---

# 📦 Installation

```bash
git clone <your-repo-url>
cd project-folder
npm install
```

---

# ⚙ Environment Variables (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# ▶ Run Project

```bash
npm run dev
```

or

```bash
node server.js
```

---

# 🔒 Role Based Access

Admin Middleware restricts certain routes:

```js
if (user.userType !== "admin") {
   return res.status(403).json({ message: "Only admin access" });
}
```

---

# 📈 Future Improvements

* Payment Gateway Integration (Stripe)
* Razorpay Integration
* Order History for Users
* Redis Caching
* Docker Support
* Swagger Documentation
* Image Upload (Cloudinary)
* Real-time Order Status (Socket.io)

Bataye next step kya rakhen? 🚀
