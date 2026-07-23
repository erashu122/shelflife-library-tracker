import { BookPlus, Building2, Hash, Layers, UserRound } from 'lucide-react';

export default function BookCard({ book, onAdd, adding }) {
  return (
    <article className="premium-card lift-card animate-riseIn grid gap-4 rounded-lg p-4 sm:grid-cols-[104px_1fr]">
      <div className="relative z-10 aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 shadow-lg dark:bg-white/10">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover transition duration-500 hover:scale-110" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center px-3 text-center text-xs font-semibold text-gray-500">
            No Cover
          </div>
        )}
      </div>
      <div className="relative z-10 min-w-0">
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
          <span className="flex items-center gap-2 rounded-md bg-white/45 px-2 py-1 dark:bg-white/5"><Building2 size={14} /> {book.publisher || 'Publisher unavailable'}</span>
          <span className="flex items-center gap-2 rounded-md bg-white/45 px-2 py-1 dark:bg-white/5"><Hash size={14} /> {book.isbn || 'ISBN unavailable'}</span>
          <span className="flex items-center gap-2 rounded-md bg-white/45 px-2 py-1 dark:bg-white/5"><Layers size={14} /> {book.categories || 'Uncategorized'}</span>
          <span className="rounded-md bg-white/45 px-2 py-1 dark:bg-white/5">{book.pageCount ? `${book.pageCount} pages` : 'Page count unavailable'}</span>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {book.description || 'No description available from Google Books.'}
        </p>
      </div>
    </article>
  );
}
