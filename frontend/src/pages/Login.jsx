import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
       
       <Card animate className="w-full max-w-md p-8 relative z-10">
          <div className="flex justify-center mb-8">
             
          </div>
          
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">Log in to view your insights.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
             {error && <p className="text-sm text-red-500 text-center font-medium bg-red-500/10 py-2 rounded-lg">{error}</p>}
             
             <div className="space-y-1">
               <label className="text-sm font-medium pl-1 text-muted-foreground">Email</label>
               <input 
                 type="email" 
                 required
                 className="w-full bg-muted/30 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="name@example.com"
               />
             </div>
             
             <div className="space-y-1">
               <label className="text-sm font-medium pl-1 text-muted-foreground">Password</label>
               <input 
                 type="password" 
                 required
                 className="w-full bg-muted/30 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••"
               />
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className="w-full bg-primary text-primary-foreground font-medium rounded-xl py-3 hover:bg-primary/90 transition flex justify-center mt-4 disabled:opacity-50 shadow-md"
             >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
             </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account? <Link to="/register" className="text-accent hover:underline decoration-accent/50 underline-offset-4">Sign up</Link>
          </p>
       </Card>
    </div>
  );
}
