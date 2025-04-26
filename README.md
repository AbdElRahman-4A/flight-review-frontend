# ✈️ Flight Review Website

A web application that allows users to review **specific airline flights** instead of general company reviews.

---

## 📋 Project Overview

- Traditional review platforms focus on airlines as a whole.
- This project allows reviewing **specific flights** (e.g., Cairo ➔ Riyadh flight SV302), including:
  - Staff service
  - Food quality
  - Cleanliness
  - Takeoff & Landing experience
- Each flight can have individual reviews with ratings and comments.

---

## 🛠️ Tech Stack

| Area           | Technology                       |
| -------------- | -------------------------------- |
| Frontend       | Next.js 14 + Tailwind CSS        |
| Backend        | Node.js + Express.js             |
| Database       | MongoDB Atlas                    |
| Authentication | JWT (Token-Based Authentication) |

---

## 🚀 How to Run the Project

### Backend:

```bash
cd server
npm install
npm run dev
```

Backend server will start on: `http://localhost:5000`

---

### Frontend:

```bash
cd client
npm install
npm run dev
```

Frontend server will start on: `http://localhost:3000`

---

## 🔐 Authentication Details

- Users must **Register** and **Login** to access features like:
  - Adding a flight review
- JWT Token is stored in `localStorage`
- Navbar dynamically changes based on authentication status.
- Protected Routes implemented (example: Add Review page).

---

## 🌟 Features

- User registration and login.
- Protected Add Review page (only accessible after login).
- Dynamic Home Page showing flights list.
- Flight Details page with:
  - Flight information
  - Animated ⭐️ stars for reviews
  - Passenger comments
- Toast notifications for actions (login, logout, review submission).
- Responsive Design for desktop and mobile.

---

## 📸 (Optional Screenshots Section)

> Could be added if needed before final delivery.

---

## 📚 Notes

- Frontend and Backend are separated for better architecture.
- Easy to scale with Admin features or flight management later.
- Could add pagination or rating averages in future versions.
