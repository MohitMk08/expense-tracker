# 💰 AI-Powered Expense Tracker

A modern, responsive expense tracking web application built with React and Firebase.
Track expenses & credits, categorize by events, visualize data, and get smart insights on your spending.

---

## 🚀 Features

* 🔐 **Authentication**

  * Email & Password login/signup
  * Google Sign-in
  * Forgot password flow

* 💸 **Expense & Credit Management**

  * Add, delete transactions
  * Track both **expenses and collected amounts (credits)**
  * Real-time updates using Firebase

* 🏷️ **Dynamic Event Categories**

  * Create custom categories (e.g., Volleyball, Trip, Wedding)
  * Auto-suggest events from existing data
  * Filter transactions by event tabs

* 🧠 **Smart Insights (AI-like)**

  * Detect overspending
  * Highlight top spending category
  * Show savings behavior

* 📊 **Data Visualization**

  * Pie chart for expense distribution
  * Clean financial summary (Expense, Credit, Balance)

* 📄 **PDF Export**

  * Download styled expense report
  * Includes totals and event-based data

* 🖼️ **Receipt Upload**

  * Upload and preview images (Base64)

* 🌗 **Dark / Light Mode**

  * Persistent theme using localStorage

* ⚡ **Premium UX**

  * Animated UI (Framer Motion)
  * Global loader (React Loader Spinner)
  * Responsive design (mobile + desktop)

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Backend:** Firebase

  * Authentication
  * Firestore (Realtime DB)
* **Charts:** Recharts
* **PDF Generation:** jsPDF
* **Loader:** react-loader-spinner

---

## 📂 Project Structure

```
src/
 ┣ components/
 ┣ pages/
 ┣ context/
 ┣ firebase/
 ┣ utils/
 ┗ App.jsx
```

---

## ⚙️ Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

2. Install dependencies

```bash
npm install
```

3. Add Firebase config
   Create `.env` file and add:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

4. Run the app

```bash
npm run dev
```

---

## 🔐 Firebase Setup

* Enable:

  * Email/Password Authentication
  * Google Authentication
* Create Firestore database
* Add security rules:

```js
allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
```

---

## 📊 Key Concepts Implemented

* Real-time data sync using `onSnapshot`
* Context API for global state (Auth & Theme)
* Dynamic filtering & aggregation
* Controlled forms & file handling
* Reusable component architecture

---

## 💼 Use Case

Perfect for:

* Personal expense tracking
* Event budget management (e.g., tournaments, trips)
* Learning full-stack React + Firebase

---

## 🧠 Future Enhancements

* AI-powered insights using OpenAI API
* Monthly analytics dashboard
* Expense trends & forecasting
* Profile management

---

## 🙌 Author

Developed by **Mohit K**

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
