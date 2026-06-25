# 🛒 My Shop Backend


<p align="center">
  🚀 Express.js • 🔒 JWT Authentication • 🗄️ PostgreSQL • 📦 Product Management • 👥 Role-Based Access Control
</p>

---

> ⚠️ **Work in Progress**
>
> This project is actively under development. New features, improvements, and optimizations are being added regularly.

## ✨ Overview

**My Shop Backend** is a production-ready REST API built with **Express.js**, **TypeScript**, and **PostgreSQL** to power modern e-commerce applications.

Designed with scalability, security, and maintainability in mind, it provides everything needed to manage users, products, authentication, and administrative operations through a clean and structured architecture.

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT-based authentication
* Secure HTTP-only cookie support
* Password hashing with bcrypt
* Protected routes and middleware
* CORS configuration for secure API access

### 👤 User Management

* User registration & login
* User profile management
* Role-based authorization
* Admin-only operations

### 📦 Product Management

* Create, read, update, and delete products
* Product catalog management
* Admin-restricted product modifications

### ✅ Validation & Error Handling

* Request validation with Zod
* Centralized error handling
* Consistent API responses

### 📊 Monitoring & Logging

* Winston-powered logging
* Daily log rotation
* Structured application logs

### 🏗️ Developer Experience

* TypeScript for type safety
* Hot reload development environment
* Modular architecture
* Easy-to-maintain codebase

---

## 🛠️ Tech Stack

| Category       | Technologies                       |
| -------------- | ---------------------------------- |
| Backend        | Express.js 5, TypeScript           |
| Database       | PostgreSQL                         |
| Authentication | JWT, bcrypt                        |
| Validation     | Zod                                |
| Logging        | Winston, Winston Daily Rotate File |
| Environment    | dotenv                             |
| Development    | tsx, Nodemon, ts-node-dev          |

---

## 📂 Project Architecture

```text
src/
├── config/          # Database & application configuration
├── controllers/     # Route controllers
├── middleware/      # Authentication & custom middleware
├── routes/          # API endpoints
├── schema/          # Zod validation schemas
├── services/        # Business logic layer
├── types/           # TypeScript interfaces & types
├── utils/           # Logger and utility helpers
├── app.ts           # Express application setup
└── server.ts        # Application entry point
```

---

## ⚡ Quick Start

### Prerequisites

Before getting started, ensure you have:

* Node.js (v16+)
* PostgreSQL
* npm or yarn

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd my-shop-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/my_shop_db
JWT_SECRET=your_super_secret_key
NODE_ENV=development
PORT=3000
```

### 4️⃣ Set Up Database

```bash
psql -U username -d my_shop_db -f database.sql
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

🎉 Server running at:

```text
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| POST   | `/api/auth/logout`   | Logout user         |

### 👥 Users

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/users`     | Get all users (Admin) |
| GET    | `/api/users/:id` | Get user by ID        |
| PUT    | `/api/users/:id` | Update user profile   |
| DELETE | `/api/users/:id` | Delete user (Admin)   |

### 📦 Products

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/products`     | Get all products       |
| GET    | `/api/products/:id` | Get product by ID      |
| POST   | `/api/products`     | Create product (Admin) |
| PUT    | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

---

## 🔒 Security Features

* JWT Authentication
* Password Encryption with bcrypt
* Role-Based Access Control (RBAC)
* Secure Cookie Support
* Input Validation
* Centralized Error Handling
* Environment-Based Configuration

---

## 🎯 Roadmap

### Current

* [x] User Authentication
* [x] Product CRUD Operations
* [x] Admin Authorization
* [x] Logging System
* [x] Validation Layer

### Upcoming

* [ ] Order Management
* [ ] Shopping Cart APIs
* [ ] Payment Integration
* [ ] Product Categories
* [ ] Search & Filtering
* [ ] API Documentation (Swagger)
* [ ] Docker Support
* [ ] CI/CD Pipeline


---

## 📜 License

ISC License

---


<p align="center">
  🚀 Continuously improving and adding new features
</p>
