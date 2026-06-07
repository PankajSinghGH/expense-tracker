# 💰 Expense Tracker

A full-stack expense tracking application built with React and Node.js. Users can log daily expenses across categories, filter by date and category, and visualise spending with a bar chart.

This is Exercise 2 from the Studio Graphene Full Stack Developer assessment.

---

## Live Demo

- **Frontend:** (add Vercel link after deployment)
- **Backend:** (add Render link after deployment)

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React + Vite | Fast dev server, modern tooling |
| Styling | Tailwind CSS | Utility-first, responsive by default |
| Charts | Recharts | React-native chart library, simple API |
| HTTP Client | Axios | Cleaner syntax than fetch, easy error handling |
| Backend | Node.js + Express | Lightweight, widely used REST API framework |
| Persistence | JSON file | Simple, no setup needed, persists across restarts |
| IDs | uuid | Generates unique IDs for each expense |

---

## How to Run Locally

**Prerequisites:** Node.js installed

**1. Clone the repository**
```bash
git clone https://github.com/PankajSinghGH/expense-tracker.git
cd expense-tracker
```

**2. Start the backend**
```bash
cd server
npm install
npm run dev
```
Server runs on http://localhost:5001

**3. Start the frontend (new terminal)**
```bash
cd client
npm install
npm run dev
```
Frontend runs on http://localhost:5173

---

## API Documentation

Base URL: `http://localhost:5001/api`

| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | /expenses | — | Array of all expenses |
| POST | /expenses | `{ amount, category, date, note? }` | Created expense |
| PUT | /expenses/:id | `{ amount, category, date, note? }` | Updated expense |
| DELETE | /expenses/:id | — | `{ message }` |

**Expense object shape:**
```json
{
  "id": "uuid",
  "amount": 250.00,
  "category": "Food",
  "date": "2024-06-01",
  "note": "Lunch",
  "createdAt": "2024-06-01T10:00:00.000Z"
}
```

**Validation rules:**
- `amount` — required, must be a positive number
- `category` — required, one of: Food, Transport, Bills, Entertainment, Other
- `date` — required, cannot be a future date

---

## Project Structure

```
expense-tracker/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── SummaryPanel.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Toast.jsx
│   │   ├── hooks/
│   │   │   └── useExpenses.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/                   # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   │   └── expenseController.js
│   │   ├── routes/
│   │   │   └── expenses.js
│   │   ├── utils/
│   │   │   └── formatters.js
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## Next Steps

Given more time, I would:

- **Add authentication** — currently assumes a single user
- **PostgreSQL or MongoDB** — replace JSON file with a real database for production
- **Export to CSV** — let users download their expense data
- **Budget limits per category** — set a monthly budget and get alerts when exceeded
- **Unit tests** — add Jest tests for the controller functions and API endpoints
- **Search** — search expenses by note or category
- **Pagination** — paginate the expense table for large datasets

---

## Notes

- AI tools were used to assist in development. Every line of code has been reviewed and understood.
- The JSON file (`server/src/data/expenses.json`) is excluded from Git via `.gitignore` so user data is not committed.