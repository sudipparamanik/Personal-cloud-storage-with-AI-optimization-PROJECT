import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FolderOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email || 'user@example.com');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — decorative, hidden on small screens */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-ink-900">
        {/* Ambient orbs */}
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-40px] w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-16">
            <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
              <FolderOpen size={18} className="text-accent-light" />
            </div>
            <span className="font-display font-semibold text-ink-100">AI File Manager</span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-tight text-ink-100 mb-6">
            Manage files<br />
            <span className="text-gradient">intelligently.</span>
          </h1>
          <p className="text-ink-400 text-lg leading-relaxed max-w-sm">
            Upload, search with AI, and detect duplicates — your entire file system, supercharged.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: 'Files Managed', value: '1,248' },
            { label: 'Storage Saved', value: '4.2 GB' },
            { label: 'AI Searches', value: '342' },
          ].map(({ label, value }) => (
            <div key={label} className="glass rounded-xl p-4">
              <p className="font-display font-bold text-2xl text-ink-100">{value}</p>
              <p className="text-xs text-ink-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-[-60px] right-[-60px] w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-sm relative z-10 animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <FolderOpen size={15} className="text-accent-light" />
            </div>
            <span className="font-display font-semibold text-ink-100">AI File Manager</span>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-ink-100 mb-2">Login</h2>
            <p className="text-ink-400 text-sm">Welcome back! Please login to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-ink-800/60 border border-ink-700 text-ink-100 placeholder-ink-500 text-sm focus:outline-none focus:border-accent/60 focus:bg-ink-800 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-ink-800/60 border border-ink-700 text-ink-100 placeholder-ink-500 text-sm focus:outline-none focus:border-accent/60 focus:bg-ink-800 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border-ink-700 bg-ink-800 accent-accent"
                />
                <span className="text-ink-400">Remember me</span>
              </label>
              <button type="button" className="text-accent-light hover:text-accent transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-medium transition-all duration-200 glow disabled:opacity-70 disabled:cursor-wait"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Login <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-ink-800" />
            <span className="text-xs text-ink-500">or continue with</span>
            <div className="flex-1 h-px bg-ink-800" />
          </div>

          <button
            onClick={() => { login('demo@example.com'); navigate('/dashboard'); }}
            className="w-full py-3 rounded-xl border border-ink-700 text-ink-300 hover:text-ink-100 hover:border-ink-600 text-sm font-medium transition-all duration-200 glass-hover"
          >
            Sign in with Demo Account
          </button>

          <p className="text-center text-sm text-ink-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent-light hover:text-accent transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
