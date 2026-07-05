<div align="center">
  <h1>🛒 EasyCart - Full Stack E-Commerce Platform</h1>
  <p>A professional, scalable, and fully functional MERN stack e-commerce web application.</p>

  [![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-success?style=for-the-badge&logo=vercel)](https://easycart-m8dj.onrender.com/)
</div>

---

## 🚀 Live Website
**Experience the live application here:** [https://easycart-m8dj.onrender.com/](https://easycart-m8dj.onrender.com/)

---

## 📖 About The Project

**EasyCart** is a comprehensive, full-stack e-commerce application built using the modern MERN (MongoDB, Express, React, Node.js) stack. It provides a seamless shopping experience for users, featuring robust product management, secure authentication, cart functionality, and integrated payment gateways.

---

## ✨ Features

### For Users:
- **Authentication:** Secure user registration, login, and password reset functionalities using JWT and bcrypt.
- **Product Discovery:** Browse products, search, filter, and view detailed product information.
- **Shopping Cart:** Add, remove, and adjust product quantities in the cart securely.
- **Checkout & Payments:** Seamless and secure checkout experience integrated with **Razorpay**.
- **User Profile:** Manage profile details and view order history.
- **Responsive Design:** A beautiful and fully responsive UI built with Material UI, providing a great experience on both desktop and mobile.

### For Admins:
- **Admin Dashboard:** Centralized control for managing the store.
- **Product Management:** Add, update, and delete products easily.
- **Image Hosting:** Cloud-based image management using **Cloudinary** for product photos.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React.js (via Vite)
- **State Management:** Redux Toolkit & React-Redux
- **Styling:** Material UI (@mui/material, @emotion)
- **Routing:** React Router v7
- **API Calls:** Axios
- **Notifications:** React Toastify

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Payment Gateway:** Razorpay
- **Image Storage:** Cloudinary & Multer
- **Emails:** Nodemailer

---

## ⚙️ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas cluster)
- Cloudinary Account (for image uploads)
- Razorpay Account (for payments)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vikashkr96/EasyCart.git
   cd EasyCart
   ```

2. **Install Root Dependencies:**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   npm run build
   # (This command installs both root and frontend dependencies as configured in package.json)
   ```
   Or manually:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Variables Configuration:**
   Create a `config.env` file in the `backend/config/` directory and add the following keys:

   ```env
   PORT=3000
   NODE_ENV=DEVELOPMENT
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=5
   
   # Cloudinary Setup
   CLOUDINARY_NAME=your_cloudinary_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret

   # Razorpay Setup
   RAZORPAY_API_KEY=your_razorpay_key
   RAZORPAY_API_SECRET=your_razorpay_secret

   # Email Setup (Nodemailer)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SERVICE=gmail
   SMTP_MAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   ```

5. **Run the Application:**

   To run the backend server:
   ```bash
   npm run dev
   ```

   To run the frontend development server (open a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

---

## 📁 Folder Structure

```
E-COMMERCE PROJECT/
├── backend/               # Express API and Backend logic
│   ├── config/            # Configuration and environment variables
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middlewares (auth, errors, etc.)
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Helper functions
│   ├── app.js             # Express app setup
│   └── server.js          # Entry point for backend
├── frontend/              # React Frontend Application
│   ├── public/            # Static assets
│   ├── src/               # React components, pages, Redux slices
│   ├── index.html         # Main HTML file
│   └── package.json       # Frontend dependencies
├── uploads/               # Local fallback for uploads
└── package.json           # Root package and scripts
```

---

## 👨‍💻 Author

**Vikash Kumar**

- GitHub: [vikashkr96](https://github.com/vikashkr96)
