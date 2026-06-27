import { useState, useRef } from 'react';
import { X, Upload, FileUp, CheckCircle } from 'lucide-react';

export default function UploadModal({ onClose }) {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateUpload(file.name);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) simulateUpload(file.name);
  };

  const simulateUpload = (name) => {
    setFileName(name);
    setTimeout(() => setUploaded(true), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass rounded-2xl w-full max-w-md p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-ink-100">Upload File</h2>
          <button onClick={onClose} className="p-1.5 text-ink-400 hover:text-ink-100 hover:bg-ink-800/60 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        {!uploaded ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200 ${
              dragging
                ? 'border-accent bg-accent/10'
                : 'border-ink-700 hover:border-accent/50 hover:bg-ink-800/30'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center">
              <FileUp size={24} className="text-accent-light" />
            </div>
            <div className="text-center">
              <p className="text-ink-100 font-medium text-sm">Drop files here or click to browse</p>
              <p className="text-ink-400 text-xs mt-1">PDF, DOCX, XLSX, PNG and more</p>
            </div>
            <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle size={48} className="text-emerald-400" />
            <p className="text-ink-100 font-medium">{fileName} uploaded!</p>
            <p className="text-ink-400 text-sm">File is being processed by AI…</p>
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-ink-700 text-ink-300 hover:text-ink-100 hover:border-ink-600 text-sm font-medium transition-colors">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white text-sm font-medium transition-colors glow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
