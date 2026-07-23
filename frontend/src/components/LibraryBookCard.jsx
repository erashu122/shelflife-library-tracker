import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import RatingStars from './RatingStars';
import { READING_STATUSES, statusLabel } from '../utils/constants';

export default function LibraryBookCard({ item, onUpdate, onDelete }) {
  const [draft, setDraft] = useState({
    status: item.status,
    progress: item.progress,
    rating: item.rating || 0,
    review: item.review || '',
  });

  return (
    <article className="glass-panel grid gap-5 rounded-lg p-4 lg:grid-cols-[86px_1fr]">
      <img
        src={item.book.coverImage || 'https://placehold.co/180x270?text=ShelfLife'}
        alt={item.book.title}
        className="aspect-[2/3] w-24 rounded-lg object-cover"
        loading="lazy"
      />
      <div className="min-w-0">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-950 dark:text-white">{item.book.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.book.author || 'Unknown author'}</p>
          </div>
          <span className="w-fit rounded-lg bg-teal-500/12 px-3 py-1 text-xs font-semibold text-teal-700 dark:text-teal-300">
            {statusLabel(item.status)}
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Status
            <select
              className="input mt-2"
              value={draft.status}
              onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}
            >
              {READING_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Progress {draft.progress}%
            <input
              type="range"
              min="0"
              max="100"
              value={draft.progress}
              onChange={(event) => setDraft((current) => ({ ...current, progress: Number(event.target.value) }))}
              className="mt-4 w-full accent-teal-600"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
          <RatingStars value={draft.rating} onChange={(rating) => setDraft((current) => ({ ...current, rating }))} />
          <input
            className="input"
            value={draft.review}
            placeholder="Write a short review"
            onChange={(event) => setDraft((current) => ({ ...current, review: event.target.value }))}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="btn-primary" onClick={() => onUpdate(item.id, draft)}>
            <Save size={16} /> Save
          </button>
          <button type="button" className="btn-secondary text-rose-600 dark:text-rose-300" onClick={() => onDelete(item.id)}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </article>
  );
}
