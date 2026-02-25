# ⛽ gas.josephdev – Fuel Station Management System

> A modern, full-stack fuel station management system for managing pumps, nozzles, attendants, fuel inventory, sales, and expenses — built for operational control and profit optimization.

---

## 🚀 Overview

gas.josephdev is a comprehensive fuel station management software designed to help fuel businesses:

- Monitor real-time fuel inventory
- Assign attendants to nozzles
- Track pump activity
- Automatically calculate sales totals
- Record and monitor expenses
- Analyze revenue and profit margins

Built for scalability, security, and operational efficiency.

---

## 🎯 Core Features

### ⛽ Fuel Inventory Management

- Manage multiple fuel types (PMS, Diesel, LPG, Gasoline)
- Track fuel volume and remaining stock
- Set price per litre/gallon
- Automatic stock deduction on sale

### 🛢 Pump & Nozzle Management

- Monitor pump status (Active, Maintenance, Inactive)
- Assign nozzles to pumps
- Assign attendants to nozzles
- Prevent duplicate assignments

### 👨‍🔧 User & Role System

- Role-based access:
  - `ADMIN`
  - `ATTENDANT`
  - - `MANAGER`
- Secure authentication
- Profile management

### 💰 Sales Management

- Record litres sold
- Automatic total price calculation
- Track which:
  - User made the sale
  - Pump was used
  - Nozzle was used
- Optional customer name recording

### 🧾 Expense Tracking

- Record station expenses
- Categorize expenses
- Upload receipt (with metadata support)
- Monitor cost vs revenue

### 📊 Analytics & Reporting

- Real-time revenue tracking
- Fuel volume sold metrics
- Profit margin monitoring
- Expense overview

---

## 🏗 Tech Stack

### Frontend

- React
- TailwindCSS
- shadcn/ui
- Framer Motion
- TanStack Query

### Backend

- Node.js
- Prisma ORM
- PostgreSQL

---

## 🗄 Database Architecture

Core Models:

- `User`
- `Profile`
- `FuelMgt`
- `Pump`
- `Nozzle`
- `PumpFuel`
- `Sale`
- `Expense`
- `Customer`
- `NozzleUserTask`

### Relationship Flow

User → NozzleUserTask → Nozzle → Pump
Pump → PumpFuel → FuelMgt
Sale → User + PumpFuel + Nozzle

This ensures:

- Accurate assignment tracking
- Controlled sales flow
- Strong relational integrity
- Data consistency

---

## 📦 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/fuelmgt-pro.git
cd fuelmgt-pro

```

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Setup Environment Variables

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

### 4️⃣ Run Prisma Migration

npx prisma migrate dev

### 5️⃣ Start Development Server

npm run dev

🔐 Role Permissions

| Role      | Permissions                             |
| --------- | --------------------------------------- |
| ADMIN     | Full system control                     |
| ATTENDANT | Record sales, view assignments          |
| MANAGER   | ALMOST the same priviledge as the Admin |

📈 Why gas.josephdev?

Fuel stations operate on tight margins. This system helps:

Prevent fuel leakage

Detect operational inconsistencies

Monitor employee performance

Track profit margins in real time

Control expenses efficiently

It transforms traditional fuel station operations into a data-driven system.

🔮 Future Improvements

Multi-branch support

Advanced analytics dashboard

Automated PDF reporting

SMS sale notifications

Payment integration

Fuel discrepancy detection

Cloud-hosted SaaS deployment
