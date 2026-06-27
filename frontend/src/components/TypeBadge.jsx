import { typeColors } from '../data/mockData';

export default function TypeBadge({ type }) {
  const cls = typeColors[type] || 'text-ink-300 bg-ink-700/50 border-ink-600/30';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-medium border ${cls}`}>
      {type}
    </span>
  );
}
