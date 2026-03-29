import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import {  Loader2 } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
       
       <Card animate className="w-full max-w-md p-8 relative z-10">
          <div className="flex justify-center mb-8">
             
          </div>
          
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground">Start analyzing your engineering metrics.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
             {error && <p className="text-sm text-red-500 text-center font-medium bg-red-500/10 py-2 rounded-lg">{error}</p>}
             
             <div className="space-y-1">
               <label className="text-sm font-medium pl-1 text-muted-foreground">Username</label>
               <input 
                 type="text" 
                 required
                 className="w-full bg-muted/30 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 placeholder="johndoe"
               />
             </div>

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
                 placeholder="Create a strong password"
               />
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className="w-full bg-primary text-primary-foreground font-medium rounded-xl py-3 hover:bg-primary/90 transition flex justify-center mt-4 disabled:opacity-50 shadow-md"
             >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Started'}
             </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account? <Link to="/login" className="text-accent hover:underline decoration-accent/50 underline-offset-4">Sign in</Link>
          </p>
       </Card>
    </div>
  );
}
