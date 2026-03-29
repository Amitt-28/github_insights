# Tokyo Pulse Frontend ⚛️

Tokyo Pulse Frontend is built with React and Vite, using Tailwind CSS for high-performance UI styling. It provides the dashboard interface for monitoring GitHub engineering metrics.

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) (v8+)

### 2. Setup
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 🛠️ Tech Stack
- **Framework**: [React](https://reactjs.org/) (v19+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📁 Repository Structure
- `src/components`: UI components (Button, Card, Heatmap, etc.)
- `src/pages`: Main application views (Dashboard, Home, Login/Register)
- `src/context`: Auth and Global State Management
- `src/assets`: Images and Static files

## 🤝 Notes
- The API base URL is hardcoded in the source for development. If you need to change it, look for `http://localhost:5000` in the `src` directory.
