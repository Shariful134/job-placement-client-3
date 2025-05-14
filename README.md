# 📚 Book Shop – Your Friendly Online Bookstore

A modern, secure, and responsive e-commerce web application for purchasing books. This platform enables users to browse books, manage orders, and handle product listings via a role-based dashboard. Built with seamless user experience and secure authentication in mind.

---

## 🎯 Project Overview & Objective

The goal of this project is to create a fully functional **Book Shop application** with:
- ✅ Secure role-based user authentication
- ✅ Product browsing and filtering
- ✅ Smooth checkout and order management
- ✅ Clean, responsive UI with proper error handling
- ✅ Admin and user dashboards for product and order management

---

## 🚀 Features

### 🔐 User Authentication (Role-Based)
- **Registration/Login**: Secure form with name, email, password
- **Password Security**: Hashed before storing in DB
- **JWT Token**: Issued at login and stored in local storage
- **Logout**: Clears session and redirects to login

### 🧭 Public Routes

#### 🏠 Home Page
- Logo, favicon, and responsive navbar
- Hero/banner section (optional carousel)
- **Featured Products** (up to 6 books) with *View All* navigation
- Extra content section (testimonials, blogs, etc.)
- Footer with links, contact info, and social media icons

#### 📚 All Products Page
- 🔍 **Search by**: Title, Author, or Category
- 🔄 **Dynamic Filters**: Price range, category, author, availability
- 📦 Product Cards: Name, author, category, price, view details

#### 📖 Product Details Page
- Detailed info + image
- “Buy Now” button linking to checkout

#### ℹ️ About Page
- Shop mission, values, and goals
- Contact and team information (if applicable)

---

## 🔒 Private Routes

### 💳 Checkout Page
- Display selected product info
- Order form includes: user data, total price, payment method
- Validate ordered quantity vs stock
- ✅ Integrated with **SurjoPay** payment gateway
- Order confirmation with *Order Now* button

### 🧑‍💼 Dashboard (Role-Based)

#### 🛠️ Admin Dashboard
- Manage **Users** (deactivate/reactivate)
- Manage **Products** (CRUD)
- Manage **Orders** (CRUD)

#### 👤 User Dashboard
- View past orders
- Update profile
- Change password (with current password confirmation)

---

## ✨ UI/UX Design

- Responsive layout for mobile, tablet, and desktop
- Proper alignment, clean typography, and intuitive design
- User feedback for key actions (success/error)

### 📦 Loading & Error Handling
- Loading spinners during async operations (login, fetch)
- Friendly error messages:
  - Invalid login credentials
  - Duplicate email on registration
  - Out-of-stock alerts

### 📣 Notifications
- Toast alerts for:
  - Successful login
  - Order placed
  - Profile update
  - Payment success/failure

---

## 💡 Optional Features

### 🌟 Product Reviews
- Users can submit reviews (rating + comment)
- View reviews on the Product Details Page
- Display reviewer name, comment, and rating

---

## 🛠️ Tech Stack

### Frontend
- **React / Next.js**
- **TypeScript**
- **Tailwind CSS** / ShadCN UI

### Backend
- **Node.js / Express**
- **MongoDB / Mongoose**
- **JWT + bcrypt** for authentication
- **SurjoPay** payment integration

---

## 🗃️ Database Collections

### Users
- Fields: name, email, password, role (user/admin), status

### Products
- Fields: title, author, category, price, stock, imageURL, description

### Orders
- Fields: productId, userId, quantity, total, status, date

### Reviews (optional)
- Fields: productId, userId, rating, comment, timestamp

---


## 🎯 Project Overview & Objective

The goal of this project is to create a fully functional **Book Shop application** with:
- ✅ Secure role-based user authentication
- ✅ Product browsing and filtering
- ✅ Smooth checkout and order management
- ✅ Clean, responsive UI with proper error handling
- ✅ Admin and user dashboards for product and order management

---

## 🚀 Features

### 🔐 User Authentication (Role-Based)
- **Registration/Login**: Secure form with name, email, password
- **Password Security**: Hashed before storing in DB
- **JWT Token**: Issued at login and stored in local storage
- **Logout**: Clears session and redirects to login

### 🧭 Public Routes

#### 🏠 Home Page
- Logo, favicon, and responsive navbar
- Hero/banner section (optional carousel)
- **Featured Products** (up to 6 books) with *View All* navigation
- Extra content section (testimonials, blogs, etc.)
- Footer with links, contact info, and social media icons

#### 📚 All Products Page
- 🔍 **Search by**: Title, Author, or Category
- 🔄 **Dynamic Filters**: Price range, category, author, availability
- 📦 Product Cards: Name, author, category, price, view details

#### 📖 Product Details Page
- Detailed info + image
- “Buy Now” button linking to checkout

#### ℹ️ About Page
- Shop mission, values, and goals
- Contact and team information (if applicable)

---

## 🔒 Private Routes

### 💳 Checkout Page
- Display selected product info
- Order form includes: user data, total price, payment method
- Validate ordered quantity vs stock
- ✅ Integrated with **SurjoPay** payment gateway
- Order confirmation with *Order Now* button

### 🧑‍💼 Dashboard (Role-Based)

#### 🛠️ Admin Dashboard
- Manage **Users** (deactivate/reactivate)
- Manage **Products** (CRUD)
- Manage **Orders** (CRUD)

#### 👤 User Dashboard
- View past orders
- Update profile
- Change password (with current password confirmation)

---

## ✨ UI/UX Design

- Responsive layout for mobile, tablet, and desktop
- Proper alignment, clean typography, and intuitive design
- User feedback for key actions (success/error)

### 📦 Loading & Error Handling
- Loading spinners during async operations (login, fetch)
- Friendly error messages:
  - Invalid login credentials
  - Duplicate email on registration
  - Out-of-stock alerts

### 📣 Notifications
- Toast alerts for:
  - Successful login
  - Order placed
  - Profile update
  - Payment success/failure

---

## 💡 Optional Features

### 🌟 Product Reviews
- Users can submit reviews (rating + comment)
- View reviews on the Product Details Page
- Display reviewer name, comment, and rating

---

## 🛠️ Tech Stack

### Frontend
- **React / Next.js**
- **TypeScript**
- **Tailwind CSS** / ShadCN UI

### Backend
- **Node.js / Express**
- **MongoDB / Mongoose**
- **JWT + bcrypt** for authentication
- **SurjoPay** payment integration

---

## 🗃️ Database Collections

### Users
- Fields: name, email, password, role (user/admin), status

### Products
- Fields: title, author, category, price, stock, imageURL, description

### Orders
- Fields: productId, userId, quantity, total, status, date

 ## Fronted Setup
1.Install All dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
3.Set up environment variables in a .env.local file:
```bash
CLOUDINARY_CLOUD_NAME=dhobkuiqj 
CLOUDINARY_API_KEY=342361686225584
CLOUDINARY_API_SECRET=K4AhK_3bvJSMKNsRfCJrGrvgTIo
NEXT_PUBLIC_BASE_URL=https://tutorlink-server-side.vercel.app/api/v1
```
3.Start the build your code:
``` bash
npm run build
```
4.Start the development Frontend:
``bash
npm run dev
```
