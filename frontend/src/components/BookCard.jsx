import { BookPlus, Building2, Hash, Layers, UserRound } from 'lucide-react';

export default function BookCard({ book, onAdd, adding }) {
  return (
    <article className="glass-panel grid gap-4 rounded-lg p-4 sm:grid-cols-[96px_1fr]">
      <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-white/10">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center px-3 text-center text-xs font-semibold text-gray-500">
            No Cover
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-lg font-bold text-gray-950 dark:text-white">{book.title}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <UserRound size={15} /> {book.author || 'Unknown author'}
            </p>
          </div>
          <button type="button" onClick={() => onAdd(book)} disabled={adding} className="btn-primary shrink-0">
            <BookPlus size={17} /> Add
          </button>
        </div>
        <div className="mt-4 grid gap-2 text-xs text-gray-500 dark:text-gray-400 sm:grid-cols-2">
          <span className="flex items-center gap-2"><Building2 size={14} /> {book.publisher || 'Publisher unavailable'}</span>
          <span className="flex items-center gap-2"><Hash size={14} /> {book.isbn || 'ISBN unavailable'}</span>
          <span className="flex items-center gap-2"><Layers size={14} /> {book.categories || 'Uncategorized'}</span>
          <span>{book.pageCount ? `${book.pageCount} pages` : 'Page count unavailable'}</span>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {book.description || 'No description available from Google Books.'}
        </p>
      </div>
    </article>
  );
}
