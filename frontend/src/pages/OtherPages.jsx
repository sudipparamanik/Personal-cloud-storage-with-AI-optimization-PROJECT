import { Trash2, RotateCcw, X } from 'lucide-react';

const trashItems = [
  { id: 1, name: 'Old Budget Draft.xlsx', size: '420 KB', deletedOn: 'May 25, 2024' },
  { id: 2, name: 'Meeting Notes v1.docx', size: '890 KB', deletedOn: 'May 22, 2024' },
  { id: 3, name: 'Untitled.pdf', size: '1.2 MB', deletedOn: 'May 20, 2024' },
];

export function TrashPage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink-100 flex items-center gap-2">
          <Trash2 size={22} className="text-ink-400" />
          Trash
        </h1>
        <button className="px-3 py-2 rounded-xl text-red-400 border border-red-500/20 bg-red-500/8 hover:bg-red-500/15 text-sm font-medium transition-colors">
          Empty Trash
        </button>
      </div>
      <p className="text-ink-500 text-sm">Files are permanently deleted after 30 days.</p>
      <div className="glass rounded-2xl overflow-hidden">
        <div className="divide-y divide-ink-800/30">
          {trashItems.map((f) => (
            <div key={f.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-800/20 transition-colors group">
              <Trash2 size={16} className="text-ink-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink-300 truncate">{f.name}</p>
                <p className="text-xs text-ink-500 mt-0.5">{f.size} · Deleted {f.deletedOn}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-ink-500 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors">
                  <RotateCcw size={14} />
                </button>
                <button className="p-1.5 text-ink-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-ink-100">Settings</h1>
      {[
        { section: 'Account', items: ['Profile', 'Email & Notifications', 'Security'] },
        { section: 'Storage', items: ['Storage Plan', 'Auto-cleanup', 'Duplicate Detection'] },
        { section: 'AI Features', items: ['Search Preferences', 'Auto-tagging', 'Language Model'] },
      ].map(({ section, items }) => (
        <div key={section} className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-ink-800/40">
            <h2 className="text-xs font-semibold text-ink-500 uppercase tracking-wider">{section}</h2>
          </div>
          <div className="divide-y divide-ink-800/20">
            {items.map((item) => (
              <button key={item} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-ink-800/20 transition-colors text-left">
                <span className="text-sm text-ink-200">{item}</span>
                <span className="text-ink-500 text-xs">›</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HelpPage() {
  const faqs = [
    { q: 'How does AI search work?', a: 'Our AI analyzes the content and metadata of your files to understand what they contain, enabling natural language queries.' },
    { q: 'How are duplicates detected?', a: 'We use file hashing and content similarity analysis to identify exact and near-duplicate files across your storage.' },
    { q: 'Is my data secure?', a: 'All files are encrypted at rest and in transit. We never share your data with third parties.' },
  ];
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-ink-100">Help & FAQ</h1>
      <div className="space-y-3">
        {faqs.map(({ q, a }) => (
          <div key={q} className="glass rounded-xl p-5">
            <p className="font-medium text-ink-100 text-sm mb-2">{q}</p>
            <p className="text-ink-400 text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-5 text-center">
        <p className="text-ink-300 text-sm mb-3">Still need help?</p>
        <button className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white text-sm font-medium transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}

export function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-8 w-full max-w-sm text-center space-y-4 animate-slide-up">
        <h1 className="font-display text-2xl font-bold text-ink-100">Create Account</h1>
        <p className="text-ink-400 text-sm">Sign up to get started with AI File Manager.</p>
        <a href="/login" className="block w-full py-3 rounded-xl bg-accent hover:bg-accent-dark text-white text-sm font-medium transition-colors">
          Back to Login
        </a>
      </div>
    </div>
  );
}
