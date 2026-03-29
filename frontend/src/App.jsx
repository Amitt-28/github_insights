import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/30">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Redirect root to dashboard or login */}
              <Route path="/" element={
                 <ProtectedRoute>
                   <Home />
                 </ProtectedRoute>
              } />
              
              <Route path="/login" element={
                 <PublicRoute>
                   <Login />
                 </PublicRoute>
              } />
              
              <Route path="/register" element={
                 <PublicRoute>
                   <Register />
                 </PublicRoute>
              } />
              
              <Route path="/dashboard" element={
                 <ProtectedRoute>
                   <Dashboard />
                 </ProtectedRoute>
              } />

              <Route path="/dashboard/:id" element={
                 <ProtectedRoute>
                   <Dashboard />
                 </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
