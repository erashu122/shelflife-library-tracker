import { Star } from 'lucide-react';

export default function RatingStars({ value = 0, onChange, readOnly = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className="rounded-md p-1 text-amber-500 transition hover:bg-amber-500/10 disabled:cursor-default"
          aria-label={`${star} star rating`}
        >
          <Star size={18} fill={star <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
}
