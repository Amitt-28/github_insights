import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
           <div className="flex flex-shrink-0 items-center gap-3">
              <Link to="/" className="font-bold text-xl tracking-tight hidden sm:block">Pulse</Link>
           </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user ? (
                <div className="flex items-center gap-4">
                  {user?.username && (
                    <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition mr-2">
                      Hey, {user.username}
                    </Link>
                  )}
                  <Link to="/dashboard" className="text-sm font-medium hover:text-accent transition">New Analysis</Link>
                 <button onClick={logout} className="text-sm font-medium text-muted-foreground hover:text-red-500 transition">Logout</button>
               </div>
            ) : (
               <div className="flex items-center gap-3">
                 <Link to="/login" className="text-sm font-medium hover:text-foreground transition">Sign In</Link>
                 <Link to="/register" className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition shadow-sm">
                   Get Started
                 </Link>
               </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
