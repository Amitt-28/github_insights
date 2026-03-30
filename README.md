# Tokyo Pulse Dashboard 🚀

Tokyo Pulse is a high-performance engineering intelligence dashboard designed to provide actionable insights into GitHub repositories. It analyzes commit history, classifies impact using AI, and visualizes developer activity.

## 🌟 Features

- **AI-Powered Commit Analysis**: Intelligent classification of commits using Gemini AI.
- **Contribution Heatmap**: Real-time visualization of repository activity.
- **Impact Scoring**: Understand the depth and breadth of changes.
- **Repository Management**: Track multiple projects and monitor progress.
- **Modern UI**: Sleek, responsive design built with Vite, React, and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Framer Motion, Recharts, Lucide React, Tailwind CSS.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **AI**: Gemini Pro API (@google/genai).
- **Authentication**: JWT & Bcrypt.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/try/download/community) (Atlas)
- [Gemini API Key](https://ai.google.dev/)

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory (copy from `.env.example`):
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    GITHUB_TOKEN=your_optional_github_token
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The app should now be running at `http://localhost:5173`.

---

## 📁 Project Structure

```text
├── backend
│   ├── src
│   │   ├── models      # Mongoose Schemas
│   │   ├── routes      # API Endpoints
│   │   └── server.js   # Main Entry Point
│   └── .env            # Environment variables
├── frontend
│   ├── src
│   │   ├── components  # Reusable UI components
│   │   ├── pages       # Main Page/Routes
│   │   ├── context     # Global State (Auth)
│   │   └── App.jsx     # Main Component
│   └── vite.config.js
└── README.md
```

## 🤝 Contributing

1.  Create a new branch: `git checkout -b feature-name`.
2.  Make your changes and commit: `git commit -m 'Add some feature'`.
3.  Push to technical branch: `git push origin feature-name`.
4.  Submit a Pull Request.

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
