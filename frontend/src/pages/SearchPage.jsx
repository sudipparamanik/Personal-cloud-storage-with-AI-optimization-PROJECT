import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Sparkles, Files, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { searchResults } from '../data/mockData';
import TypeBadge from '../components/TypeBadge';

const TYPES = ['All Types', 'PDF', 'DOCX', 'XLSX', 'PPTX'];
const DATES = ['Any Date', 'Today', 'This Week', 'This Month'];
const SIZES = ['Any Size', '< 1 MB', '1–5 MB', '> 5 MB'];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= count ? 'text-amber-400 fill-amber-400' : 'text-ink-700'}
        />
      ))}
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All Types');

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSearched(true); }, 700);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-100 flex items-center gap-2">
          <Sparkles size={22} className="text-accent-light" />
          AI Search
        </h1>
        <p className="text-ink-400 text-sm mt-1">Search your files using natural language</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            type="text"
            placeholder='Try "project proposal from last week" or "budget spreadsheet"…'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-800/60 border border-ink-700 text-ink-100 placeholder-ink-500 text-sm focus:outline-none focus:border-accent/60 transition-all"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white text-sm font-medium transition-all glow-sm shrink-0 flex items-center gap-2"
        >
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
          <span className="hidden sm:inline">Search</span>
          <Search size={16} className="sm:hidden" />
        </button>
      </div>

      {/* Filters */}
      {searched && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {[
            { opts: TYPES, val: typeFilter, set: setTypeFilter },
          ].map(({ opts, val, set }, i) => (
            <select
              key={i}
              value={val}
              onChange={(e) => set(e.target.value)}
              className="px-3 py-2 rounded-lg glass border border-ink-700 text-ink-300 text-sm focus:outline-none focus:border-accent/40 bg-ink-900"
            >
              {opts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}
          {[DATES, SIZES].map((opts, i) => (
            <select
              key={i}
              className="px-3 py-2 rounded-lg glass border border-ink-700 text-ink-300 text-sm focus:outline-none focus:border-accent/40 bg-ink-900"
            >
              {opts.map((o) => <option key={o}>{o}</option>)}
            </select>
          ))}
          <button className="px-3 py-2 rounded-lg glass border border-ink-700 text-ink-400 hover:text-ink-200 text-sm flex items-center gap-1.5 transition-colors">
            <Filter size={13} /> More filters
          </button>
        </div>
      )}

      {/* Results */}
      {searched && (
        <div className="glass rounded-2xl overflow-hidden animate-slide-up">
          <div className="px-5 py-4 border-b border-ink-800/40 flex items-center justify-between">
            <p className="text-sm text-ink-300">
              Found <span className="text-accent-light font-semibold">18 results</span> for "{query}"
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-800/40">
                  {['File Name', 'Type', 'Size', 'Uploaded On', 'Relevance', ''].map((h, i) => (
                    <th key={i} className="text-left px-5 py-3 text-xs font-medium text-ink-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searchResults.map((f) => (
                  <tr key={f.id} className="border-b border-ink-800/20 hover:bg-ink-800/20 transition-colors group">
                    <td className="px-5 py-3.5">
                      <Link to={`/files/${f.id}`} className="font-medium text-ink-200 hover:text-accent-light transition-colors">{f.name}</Link>
                    </td>
                    <td className="px-5 py-3.5"><TypeBadge type={f.type} /></td>
                    <td className="px-5 py-3.5 text-ink-400 font-mono text-xs">{f.size}</td>
                    <td className="px-5 py-3.5 text-ink-400 text-xs">{f.uploadedOn}</td>
                    <td className="px-5 py-3.5"><Stars count={f.relevance} /></td>
                    <td className="px-5 py-3.5">
                      <button className="opacity-0 group-hover:opacity-100 p-1.5 text-ink-500 hover:text-ink-100 hover:bg-ink-700 rounded-lg transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-ink-800/30">
            {searchResults.map((f) => (
              <Link key={f.id} to={`/files/${f.id}`} className="flex items-start gap-3 px-4 py-3.5 hover:bg-ink-800/20 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-ink-800 border border-ink-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Files size={15} className="text-ink-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-200 truncate">{f.name}</p>
                  <p className="text-xs text-ink-500 mt-0.5">{f.size} · {f.uploadedOn}</p>
                  <div className="mt-1"><Stars count={f.relevance} /></div>
                </div>
                <TypeBadge type={f.type} />
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-ink-800/40">
            <p className="text-xs text-ink-500 hidden sm:block">Page 1 of 4</p>
            <div className="flex items-center gap-1 mx-auto sm:mx-0">
              <button className="p-2 text-ink-500 hover:text-ink-100 hover:bg-ink-800 rounded-lg transition-colors"><ChevronLeft size={15} /></button>
              {[1, 2, 3, 4].map((p) => (
                <button
                  key={p}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === 1 ? 'bg-accent/20 text-accent-light' : 'text-ink-400 hover:text-ink-100 hover:bg-ink-800'}`}
                >
                  {p}
                </button>
              ))}
              <button className="p-2 text-ink-500 hover:text-ink-100 hover:bg-ink-800 rounded-lg transition-colors"><ChevronRight size={15} /></button>
            </div>
          </div>
        </div>
      )}

      {/* Empty / prompt state */}
      {!searched && (
        <div className="flex flex-col items-center gap-4 py-20 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Sparkles size={26} className="text-accent-light" />
          </div>
          <div>
            <p className="font-display font-semibold text-ink-200">Search your files with AI</p>
            <p className="text-ink-500 text-sm mt-1 max-w-sm">Type a description, topic, or phrase — our AI will find the most relevant files for you.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center max-w-md">
            {['project proposal', 'Q1 budget report', 'design assets', 'meeting notes May'].map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); }}
                className="px-3 py-1.5 rounded-lg glass border border-ink-700 text-xs text-ink-400 hover:text-accent-light hover:border-accent/30 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
