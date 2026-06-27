import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Files, Search, Copy, Trash2, Settings, HelpCircle, LogOut, FolderOpen, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/files', icon: Files, label: 'My Files' },
  { to: '/search', icon: Search, label: 'AI Search' },
  { to: '/duplicates', icon: Copy, label: 'Duplicates' },
  { to: '/trash', icon: Trash2, label: 'Trash' },
];

const bottomItems = [
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/help', icon: HelpCircle, label: 'Help' },
];

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onCloseMobile?.();
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
      isActive
        ? 'bg-accent/15 text-accent-light border border-accent/20 glow-sm'
        : 'text-ink-300 hover:text-ink-100 hover:bg-ink-800/60'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-50 flex flex-col
        glass border-r border-ink-800/60
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-ink-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <FolderOpen size={16} className="text-accent-light" />
            </div>
            <div>
              <p className="font-display font-700 text-sm text-ink-100 leading-none">AI File Manager</p>
              <p className="text-xs text-ink-400 mt-0.5">Workspace</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-ink-400 hover:text-ink-100 transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onCloseMobile}>
              <Icon size={17} className="shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-ink-800/60 space-y-1">
          {bottomItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onCloseMobile}>
              <Icon size={17} className="shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-400 hover:text-red-400 hover:bg-red-400/8 transition-all duration-200"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
