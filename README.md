# 📚 LexiCart – Online Book Delivery Management System

## 🚀 [Live Website](https://lexi-cart.vercel.app)

---

## 📖 Project Overview

**LexiCart** is a modern full-stack online book delivery management platform that connects readers, librarians, and administrators in one ecosystem. Users can browse books, request doorstep delivery through secure Stripe payments, manage their reading history, and leave verified reviews. Librarians can upload and manage book inventories, while administrators oversee users, book approvals, transactions, and platform analytics.

The project demonstrates role-based authentication, secure payment integration, image hosting, JWT authorization, responsive UI design, and real-time dashboard management.

---

## 🎯 Purpose

The primary goal of LexiCart is to modernize traditional library services by allowing readers to borrow books without visiting libraries physically. It provides:

- Easy online book discovery
- Secure delivery request system
- Digital library inventory management
- Role-based dashboards
- Verified review system
- Admin monitoring and analytics

---

## ✨ Key Features

### 🔐 Authentication

- Better Auth Authentication
- Email & Password Login
- Google Social Login
- Role Selection (Reader / Librarian)
- JWT Protected Routes
- Secure Cookie Authentication

### 📚 Book Management

- Browse all published books
- Search books by title
- Filter by category, availability & delivery fee
- Server-side pagination
- Book details page
- Verified reviews
- Delivery status tracking

### 👤 User Dashboard

- Delivery history
- Reading list
- Review management
- Dashboard statistics
- Charts & analytics

### 📖 Librarian Dashboard

- Add new books
- Image upload using ImgBB
- Manage inventory
- Delivery request management
- Earnings overview
- Pending/Published/Unpublished status management

### 🛡️ Admin Dashboard

- Manage users
- Change user roles
- Book approval system
- Platform-wide inventory management
- Transaction history
- Revenue analytics
- Category charts

### 💳 Payment

- Stripe Checkout Integration
- Secure delivery fee payment
- Automatic delivery request creation

### 🎨 UI/UX

- Fully Responsive Design
- Framer Motion Animations
- Skeleton Loading
- Global Loading Spinner
- Custom 404 Page
- Error Boundary
- Toast Notifications
- Modern Dashboard Layout
- Mobile Friendly

---

# 🔒 Environment Variables

Create a `.env` file in the root directory.

```env
BETTER_AUTH_SECRET=your_better_auth_secret

BETTER_AUTH_URL=your_better_auth_url

MONGO_URI=your_mongodb_uri

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

AUTH_DB_NAME=your_database_name

NEXT_PUBLIC_BASE_URL=http://localhost:8000

NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imbb_api

NEXT_PUBLIC_IMBB_KEY=your_imbb_api_key
```

---

## 🛠️ Technologies Used

### Frontend

- NextJs
- Tailwind CSS
- Better Auth
- HeroUI
- Framer Motion
- Recharts
- React Hot Toast
- React Icons
- Stripe

### Backend

- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Stripe API

---

## 📦 NPM Packages Used

### Client

- react
- framer-motion
- recharts
- react-icons
- react-hot-toast
- tailwindcss

### Server

- express
- mongoose
- jsonwebtoken
- cookie-parser
- cors
- dotenv
- stripe
- cors
- dotenv
- nodemon
- jose

---

## 🔒 Security Features

- Environment variables for sensitive credentials
- JWT authentication
- Protected API routes
- Session-based authorization
- MongoDB credentials secured
- Better Auth session management
- Stripe secure payment gateway

---

## 📂 Main Functionalities

- Role-Based Authentication
- Book Browsing
- Delivery Requests
- Stripe Payment
- Book & Delivery Approval Workflow
- Inventory Management
- Verified Reviews
- Transaction Management
- Dashboard Analytics
- Image Upload with ImgBB

---

## 👨‍💻 Admin Credentials

**Email:** admin@gmail.com

**Password:** Admin@123

---

## 📞 Contact

If you have any questions or suggestions, feel free to reach out through GitHub or tanjiya098@gmail.com

---

### ⭐ Thank you for visiting LexiCart!
