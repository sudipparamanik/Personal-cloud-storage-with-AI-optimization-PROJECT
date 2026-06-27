import { Copy, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { duplicateFiles } from '../data/mockData';

export default function DuplicatesPage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-100 flex items-center gap-2">
          <Copy size={22} className="text-orange-400" />
          Duplicate Files
        </h1>
        <p className="text-ink-400 text-sm mt-1">128 duplicates found — reclaim 8.6 MB of storage</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'Duplicate Groups', value: '43', color: 'text-orange-400 bg-orange-400/10' },
          { label: 'Total Copies', value: '128', color: 'text-red-400 bg-red-400/10' },
          { label: 'Space Wasted', value: '8.6 MB', color: 'text-amber-400 bg-amber-400/10' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass rounded-xl p-4">
            <p className={`font-display text-2xl font-bold ${color.split(' ')[0]}`}>{value}</p>
            <p className="text-xs text-ink-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Warning banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/8 border border-amber-500/20">
        <AlertTriangle size={17} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-300">Review before deleting</p>
          <p className="text-xs text-ink-400 mt-0.5">AI keeps the most recently modified copy. Deletions cannot be undone unless you move them to Trash first.</p>
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-3">
        {duplicateFiles.map((group) => (
          <div key={group.id} className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-ink-800/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Copy size={16} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-200">{group.name}</p>
                  <p className="text-xs text-ink-500 mt-0.5">{group.copies} copies · {group.size} total · <span className="text-orange-400">{group.wasted} wasted</span></p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors">
                <Trash2 size={13} />
                <span className="hidden sm:inline">Remove Duplicates</span>
                <span className="sm:hidden">Remove</span>
              </button>
            </div>
            <div className="divide-y divide-ink-800/20">
              {Array.from({ length: group.copies }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  {i === 0 ? (
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" title="Original (kept)" />
                  ) : (
                    <Copy size={14} className="text-ink-600 shrink-0" />
                  )}
                  <p className="text-sm text-ink-300 flex-1 truncate">
                    {group.name.replace('.', i > 0 ? ` (copy ${i}).` : '.')}
                  </p>
                  <p className="text-xs text-ink-500 font-mono shrink-0">{group.size.replace(' total', '')}</p>
                  {i === 0 && <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20 shrink-0">Original</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 font-medium text-sm transition-colors flex items-center justify-center gap-2">
        <Trash2 size={16} />
        Remove All Duplicates (save 8.6 MB)
      </button>
    </div>
  );
}
