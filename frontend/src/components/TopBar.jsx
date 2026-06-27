import { Menu, Upload, Bell, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TopBar({ onMenuToggle, onUploadClick }) {
  const { user } = useApp();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3.5 glass border-b border-ink-800/60">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-ink-400 hover:text-ink-100 hover:bg-ink-800/60 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <p className="text-xs text-ink-400 font-mono">AI FILE MANAGER</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 px-3.5 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-all duration-200 glow-sm hover:glow"
        >
          <Upload size={15} />
          <span className="hidden sm:inline">Upload File</span>
          <span className="sm:hidden">Upload</span>
        </button>

        <button className="relative p-2 text-ink-400 hover:text-ink-100 hover:bg-ink-800/60 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
        </button>

        <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
          <User size={15} className="text-accent-light" />
        </div>
      </div>
    </header>
  );
}
