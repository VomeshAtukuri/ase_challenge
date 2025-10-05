# 🛒 Shopping Cart App

A simple fullstack **Shopping Cart application** built with **Next.js 14, TypeScript, and TailwindCSS**.  
This project was developed as part of a hiring challenge to demonstrate frontend + backend development skills.

## 🚀 Features

### Core
- Browse a list of products (fetched from a Next.js API route).
- Add items to a cart with quantity updates and removal.
- View a cart page with total price.
- Simulated checkout that calls the backend API.

### Extra Features ✨
- **Admin Page**: Add or remove products dynamically.
- **Authentication**: Simple login for users and admins (admin-only access to product management).
- **Persistence**:
  - Cart saved in **localStorage** (survives page refresh).
  - Admin product changes stored in memory.
- **Reusable Components**: ProductCard, CartItem, Navbar.
- **Responsive UI**: Styled with TailwindCSS for a clean minimal look.

## 🛠️ Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- React Context for state management
- API Routes for backend (`/api/products`, `/api/checkout`)

## 📂 Project Structure

```` bash
/app
/api
/products/route.ts     → GET: return product list
/checkout/route.ts     → POST: simulate checkout
/cart/page.tsx           → Cart page
/admin/page.tsx          → Admin product management
/login/page.tsx          → Login for user/admin
/page.tsx                → Home (product listing)

/components
Navbar.tsx
ProductCard.tsx
CartItem.tsx

/lib
types.ts                → Product and Cart types

````

## ▶️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone https://github.com/vomeshatukuri/ase_challenge.git
cd shopping-cart-app
npm install
````

### Run locally

```bash
npm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000).

---

## 📦 API Endpoints

* **GET /api/products** → Returns list of products (in-memory).
* **POST /api/checkout** → Accepts `{ items: [{ id, qty }] }`, logs order, returns `{ success: true }`.

---

## 🔐 Login Credentials

* **Admin**

  * username: `admin@shop.test`
  * password: `admin123`
* **User**

  * username: `user@shop.test`
  * password: `user123`

---

## 🚀 Deployment

Easily deployable on **Vercel**:

```bash
vercel --prod
```

---

## 📹 Demo Video

A short Loom recording explaining the project: [Insert Loom link here]

---

## 📌 Future Improvements

* Connect to a real database (e.g., PostgreSQL or MongoDB).
* Implement secure session-based authentication.
* Add payment gateway integration (Stripe).
* Add unit and integration tests.

