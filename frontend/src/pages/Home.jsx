import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { GitBranch, Clock, ExternalLink, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/repos');
        setRepos(res.data);
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="min-h-[90vh] pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your History</h1>
          <p className="text-muted-foreground mt-1">Review and manage your previously analyzed repositories.</p>
        </div>
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition shadow-lg shadow-accent/20"
        >
          <Plus size={18} />
          <span>New Analysis</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 rounded-2xl bg-muted/20 animate-pulse border border-border/50" />
          ))}
        </div>
      ) : repos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.div
              key={repo._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card 
                className="group h-full flex flex-col justify-between hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all cursor-pointer"
                onClick={() => navigate(`/dashboard/${repo._id}`)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <GitBranch size={20} />
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
                      repo.status === 'completed' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-amber-500 border-amber-500/20 bg-amber-500/5'
                    }`}>
                      {repo.status}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold truncate group-hover:text-accent transition-colors">{repo.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">{repo.owner}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock size={12} />
                    <span>{new Date(repo.lastAnalyzed || repo.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 transition group-hover:text-accent font-bold">
                    <span>View Report</span>
                    <ExternalLink size={12} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-border/50 bg-transparent">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4 text-muted-foreground">
             <GitBranch size={32} />
          </div>
          <h3 className="text-xl font-bold">No history yet</h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Analyze your first repository to start building your pulse intelligence dashboard.
          </p>
          <Link to="/dashboard" className="mt-6 text-accent font-bold hover:underline">
            Analyze your first repo &rarr;
          </Link>
        </Card>
      )}
    </div>
  );
}
