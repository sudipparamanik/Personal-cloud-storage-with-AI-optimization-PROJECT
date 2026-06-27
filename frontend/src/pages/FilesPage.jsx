import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Grid, List, Eye, Download, Trash2, MoreHorizontal, Filter, Files } from 'lucide-react';
import { recentFiles } from '../data/mockData';
import TypeBadge from '../components/TypeBadge';

const TYPES = ['All', 'PDF', 'DOCX', 'XLSX', 'PPTX', 'FIG', 'ZIP'];

export default function FilesPage() {
  const [view, setView] = useState('list');
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filtered = recentFiles.filter((f) => {
    const matchQ = f.name.toLowerCase().includes(query.toLowerCase());
    const matchT = filterType === 'All' || f.type === filterType;
    return matchQ && matchT;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink-100">My Files</h1>
        <span className="text-xs text-ink-500 font-mono glass px-3 py-1.5 rounded-lg">{filtered.length} files</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            type="text"
            placeholder="Filter files…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ink-800/60 border border-ink-700 text-ink-100 placeholder-ink-500 text-sm focus:outline-none focus:border-accent/60 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Type filter — scrollable on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  filterType === t
                    ? 'bg-accent/20 text-accent-light border border-accent/30'
                    : 'text-ink-400 hover:text-ink-200 glass'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-1 glass p-1 rounded-lg shrink-0">
            <button onClick={() => setView('list')} className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-accent/20 text-accent-light' : 'text-ink-500 hover:text-ink-300'}`}>
              <List size={15} />
            </button>
            <button onClick={() => setView('grid')} className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-accent/20 text-accent-light' : 'text-ink-500 hover:text-ink-300'}`}>
              <Grid size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* File list */}
      {view === 'list' ? (
        <div className="glass rounded-2xl overflow-hidden">
          {/* Desktop table */}
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
                {filtered.map((f) => (
                  <tr key={f.id} className="border-b border-ink-800/20 hover:bg-ink-800/20 transition-colors group">
                    <td className="px-5 py-3.5">
                      <Link to={`/files/${f.id}`} className="font-medium text-ink-200 hover:text-accent-light transition-colors">{f.name}</Link>
                    </td>
                    <td className="px-5 py-3.5"><TypeBadge type={f.type} /></td>
                    <td className="px-5 py-3.5 text-ink-400 font-mono text-xs">{f.size}</td>
                    <td className="px-5 py-3.5 text-ink-400 text-xs">{f.uploadedOn}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/files/${f.id}`} className="p-1.5 text-ink-500 hover:text-ink-100 hover:bg-ink-700 rounded-lg transition-colors"><Eye size={14} /></Link>
                        <button className="p-1.5 text-ink-500 hover:text-ink-100 hover:bg-ink-700 rounded-lg transition-colors"><Download size={14} /></button>
                        <button className="p-1.5 text-ink-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-ink-800/30">
            {filtered.map((f) => (
              <div key={f.id} className="flex items-center gap-3 px-4 py-3.5">
                <div className="w-9 h-9 rounded-lg bg-ink-800 border border-ink-700 flex items-center justify-center shrink-0">
                  <Files size={16} className="text-ink-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/files/${f.id}`} className="text-sm font-medium text-ink-200 hover:text-accent-light truncate block">{f.name}</Link>
                  <p className="text-xs text-ink-500 mt-0.5">{f.size} · {f.uploadedOn}</p>
                </div>
                <div className="flex items-center gap-1">
                  <TypeBadge type={f.type} />
                  <button className="p-1.5 text-ink-500 hover:text-ink-300 transition-colors"><MoreHorizontal size={14} /></button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-ink-500">
              <Files size={32} className="mx-auto mb-2 opacity-40" />
              <p>No files match your filter</p>
            </div>
          )}
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((f) => (
            <Link
              key={f.id}
              to={`/files/${f.id}`}
              className="glass rounded-xl p-4 glass-hover transition-all duration-200 group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-ink-800 border border-ink-700 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                <Files size={20} className="text-ink-400" />
              </div>
              <div className="text-center w-full">
                <p className="text-xs font-medium text-ink-200 truncate">{f.name}</p>
                <p className="text-xs text-ink-500 mt-0.5">{f.size}</p>
              </div>
              <TypeBadge type={f.type} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
