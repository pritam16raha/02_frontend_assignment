# 🚀 Frontend Dashboard Assignment

This project is a **Dynamic Widget-based Dashboard** built as part of the Frontend Trainee Assignment. It allows users to dynamically add, view, search, and remove widgets from multiple dashboard categories.

## 🛠 Tech Stack

- **React.js** (with Vite)
- **Zustand** for state management
- **Tailwind CSS** for UI styling
- **Recharts** for visualizations
- **TypeScript** for type safety

---

## 📂 Features

- ✅ Add and remove widgets dynamically under 4 categories:
  - CSPM
  - CWPP
  - Image (Registry Scan)
  - Ticket
- ✅ Each widget shows randomized chart data (Pie/Bar/Segmented bar)
- ✅ Add widget drawer opens from the right side on button click
- ✅ Cross icon to remove individual widgets
- ✅ Unified **Search bar** filters widgets by name across all categories
- ✅ All data is **persisted to localStorage** using Zustand `persist` middleware
- ✅ Responsive grid layout for multiple screen sizes

---

## 🧪 How to Run Locally

1. **Clone the repository / unzip the folder**

```bash
git clone https://github.com/your-username/frontend-dashboard-assignment.git
cd frontend-dashboard-assignment
Install dependencies

bash
Copy
Edit
npm install
Start development server

bash
Copy
Edit
npm run dev
Visit in browser

arduino
Copy
Edit
http://localhost:5173

http://localhost:5173/dashboard

🧼 Folder Structure
bash
Copy
Edit
src/
├── components/            # Common components like top bar
├── pages/
│   └── dashboard/         # All dashboards and AddWidgetDrawer
├── store/                 # Zustand store for widgets
├── types/                 # Shared TypeScript types
└── App.tsx

Dashboard View	Add Widget Drawer	Search Feature

📌 Notes
All widget data is stored in localStorage under the key dashboard-widgets

Fully functional without any backend API

Ready for integration with real-time or remote data if needed

🙌 Made by Pritam Raha