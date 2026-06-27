import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Files, HardDrive, Copy, Search, Eye, MoreHorizontal, ArrowRight, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { recentFiles } from '../data/mockData';
import TypeBadge from '../components/TypeBadge';

const StatCard = ({ icon: Icon, label, value, sub, color, delay }) => (
  <div className={`glass rounded-2xl p-5 glass-hover transition-all duration-300 animate-slide-up ${delay}`}>
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <TrendingUp size={14} className="text-ink-500" />
    </div>
    <p className="text-ink-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
    <p className="font-display text-2xl font-bold text-ink-100">{value}</p>
    {sub && <p className="text-xs text-ink-500 mt-0.5">{sub}</p>}
  </div>
);

export default function DashboardPage() {
  const { user } = useApp();
  const displayName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'User';

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-100">
            Welcome, {displayName} 👋
          </h1>
          <p className="text-ink-400 text-sm mt-1">Here's what's happening with your files today.</p>
        </div>
        <div className="text-xs text-ink-500 font-mono glass px-3 py-1.5 rounded-lg self-start sm:self-auto">
          Thursday, May 28, 2026
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={Files} label="Total Files" value="1,248" sub="+12 this week" color="bg-accent/15 text-accent-light" delay="delay-100" />
        <StatCard icon={HardDrive} label="Storage Used" value="12.4 GB" sub="of 50 GB" color="bg-blue-500/15 text-blue-400" delay="delay-200" />
        <StatCard icon={Copy} label="Duplicates Found" value="128" sub="8.2 GB wasted" color="bg-orange-500/15 text-orange-400" delay="delay-300" />
        <StatCard icon={Search} label="AI Searches" value="342" sub="this month" color="bg-emerald-500/15 text-emerald-400" delay="delay-400" />
      </div>

      {/* Recent files */}
      <div className="glass rounded-2xl overflow-hidden animate-slide-up delay-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-800/60">
          <h2 className="font-display font-semibold text-ink-100">Recent Files</h2>
          <Link to="/files" className="flex items-center gap-1 text-xs text-accent-light hover:text-accent transition-colors">
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-800/40">
                {['File Name', 'Type', 'Size', 'Uploaded On', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-ink-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentFiles.slice(0, 5).map((f, i) => (
                <tr key={f.id} className="border-b border-ink-800/20 hover:bg-ink-800/20 transition-colors group">
                  <td className="px-5 py-3.5">
                    <Link to={`/files/${f.id}`} className="font-medium text-ink-200 hover:text-accent-light transition-colors">
                      {f.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5"><TypeBadge type={f.type} /></td>
                  <td className="px-5 py-3.5 text-ink-400 font-mono text-xs">{f.size}</td>
                  <td className="px-5 py-3.5 text-ink-400 text-xs">{f.uploadedOn}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-ink-500 hover:text-ink-100 hover:bg-ink-700 rounded-lg transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 text-ink-500 hover:text-ink-100 hover:bg-ink-700 rounded-lg transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card list — mobile */}
        <div className="md:hidden divide-y divide-ink-800/30">
          {recentFiles.slice(0, 5).map((f) => (
            <Link to={`/files/${f.id}`} key={f.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-ink-800/20 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-ink-800 border border-ink-700 flex items-center justify-center shrink-0">
                <Files size={16} className="text-ink-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-200 truncate">{f.name}</p>
                <p className="text-xs text-ink-500 mt-0.5">{f.size} · {f.uploadedOn}</p>
              </div>
              <TypeBadge type={f.type} />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-slide-up delay-300">
        {[
          { to: '/search', icon: Search, label: 'AI Search', desc: 'Search files with natural language', color: 'from-accent/20 to-purple-500/10' },
          { to: '/duplicates', icon: Copy, label: 'Find Duplicates', desc: 'Reclaim wasted storage space', color: 'from-orange-500/15 to-red-500/10' },
          { to: '/files', icon: Files, label: 'Browse Files', desc: 'View and organize all your files', color: 'from-blue-500/15 to-cyan-500/10' },
        ].map(({ to, icon: Icon, label, desc, color }) => (
          <Link
            key={to}
            to={to}
            className={`glass rounded-2xl p-5 bg-gradient-to-br ${color} glass-hover transition-all duration-300 group`}
          >
            <Icon size={22} className="text-ink-300 mb-3 group-hover:text-accent-light transition-colors" />
            <p className="font-display font-semibold text-ink-100 mb-1">{label}</p>
            <p className="text-xs text-ink-400">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
