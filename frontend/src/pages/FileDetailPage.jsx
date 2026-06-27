import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Download, Trash2, MoreHorizontal, FileText, Plus, Copy } from 'lucide-react';
import { recentFiles } from '../data/mockData';
import TypeBadge from '../components/TypeBadge';

const tabs = ['Details', 'Activity', 'Duplicate Files (2)'];

export default function FileDetailPage() {
  const { id } = useParams();
  const file = recentFiles.find((f) => f.id === Number(id)) || recentFiles[0];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/files" className="flex items-center gap-1 text-ink-400 hover:text-ink-100 transition-colors">
          <ChevronLeft size={16} />
          My Files
        </Link>
        <span className="text-ink-600">/</span>
        <span className="text-ink-200 font-medium truncate max-w-xs">{file.name}</span>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h1 className="font-display text-xl font-semibold text-ink-100 truncate">{file.name}</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-ink-700 text-ink-300 hover:text-ink-100 hover:border-ink-600 text-sm transition-all">
            <Download size={15} />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button className="p-2 text-ink-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
          <button className="p-2 text-ink-500 hover:text-ink-100 hover:bg-ink-800 rounded-lg transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] bg-ink-900 flex flex-col items-center justify-center gap-3 border-b border-ink-800/40">
              <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center">
                <FileText size={28} className="text-ink-400" />
              </div>
              <p className="text-ink-500 text-sm">Preview not available</p>
            </div>
            <div className="p-4">
              <p className="font-medium text-ink-200 text-sm truncate">{file.name}</p>
              <p className="text-xs text-ink-500 mt-1">
                <TypeBadge type={file.type} /> · {file.size}
              </p>
              <p className="text-xs text-ink-500 mt-1">Uploaded on {file.uploadedOn}</p>
              <button className="w-full mt-4 py-2 rounded-xl border border-ink-700 text-sm text-ink-300 hover:text-ink-100 hover:border-ink-600 transition-all">
                Preview File
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-3">
          <div className="glass rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-ink-800/60 overflow-x-auto scrollbar-thin">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    i === 0
                      ? 'text-accent-light border-accent'
                      : 'text-ink-400 border-transparent hover:text-ink-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-5 space-y-5">
              {/* File Information */}
              <div>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">File Information</h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'File Name', value: file.name },
                    { label: 'File Type', value: file.type },
                    { label: 'File Size', value: file.size },
                    { label: 'Uploaded By', value: 'User' },
                    { label: 'Uploaded On', value: `${file.uploadedOn} • 10:30 AM` },
                    { label: 'Location', value: `/My Files/${file.name}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className="text-xs text-ink-500 sm:w-32 shrink-0">{label}</span>
                      <span className="text-sm text-ink-200 font-mono truncate">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['proposal', 'project', '2024'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-ink-800 border border-ink-700 text-xs text-ink-300">
                      {tag}
                    </span>
                  ))}
                  <button className="px-3 py-1 rounded-lg border border-dashed border-ink-700 text-xs text-ink-500 hover:text-ink-300 hover:border-ink-600 transition-colors flex items-center gap-1">
                    <Plus size={11} /> Add
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Description</h3>
                <p className="text-sm text-ink-500 italic">No description added.</p>
                <button className="mt-2 px-3 py-1.5 rounded-lg border border-ink-700 text-xs text-ink-400 hover:text-ink-200 hover:border-ink-600 transition-all">
                  Add Description
                </button>
              </div>

              {/* Duplicates alert */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-orange-500/8 border border-orange-500/20">
                <Copy size={16} className="text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-300">2 duplicate files found</p>
                  <p className="text-xs text-ink-400 mt-0.5">Click "Duplicate Files" tab to review and remove duplicates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
