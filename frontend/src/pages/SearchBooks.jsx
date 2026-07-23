import { Loader2, Search, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BookCard from '../components/BookCard';
import EmptyState from '../components/EmptyState';
import Skeleton from '../components/Skeleton';
import { useDebounce } from '../hooks/useDebounce';
import { apiMessage } from '../services/api';
import { bookService } from '../services/bookService';
import { libraryService } from '../services/libraryService';

export default function SearchBooks() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [results, setResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState(null);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setTotalItems(0);
      return;
    }

    setLoading(true);
    bookService.search(debouncedQuery, page)
      .then((data) => {
        setTotalItems(data.totalItems);
        setResults((current) => (page === 0 ? data.books : [...current, ...data.books]));
      })
      .catch((error) => toast.error(apiMessage(error, 'Book search failed')))
      .finally(() => setLoading(false));
  }, [debouncedQuery, page]);

  function handleQueryChange(value) {
    setQuery(value);
    setPage(0);
  }

  async function handleAdd(book) {
    setAddingId(book.googleBookId);
    try {
      await libraryService.add({ ...book, status: 'WANT_TO_READ', progress: 0 });
      toast.success('Book added to library');
    } catch (error) {
      toast.error(apiMessage(error, 'Could not add book'));
    } finally {
      setAddingId(null);
    }
  }

  return (
    <section className="space-y-6">
      <div className="premium-card animate-riseIn p-6">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
            <Sparkles size={16} /> Book Search
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Discover books from Google Books</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Search by title, author, ISBN or topic and add the best matches straight into your personal shelf.
          </p>
        </div>
      </div>

      <div className="premium-card flex items-center gap-3 rounded-lg p-3">
        <Search className="ml-2 text-gray-400" size={20} />
        <input
          className="w-full bg-transparent py-3 text-sm outline-none"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder="Search by title, author, ISBN, or topic"
        />
      </div>

      {!query && <EmptyState title="Start searching" message="Type a title or author to browse Google Books and save titles into your private library." />}

      <div className="grid gap-4">
        {results.map((book) => (
          <BookCard key={book.googleBookId} book={book} onAdd={handleAdd} adding={addingId === book.googleBookId} />
        ))}
      </div>

      {loading && <div className="grid gap-4">{Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-44" />)}</div>}

      {query && !loading && results.length === 0 && (
        <EmptyState title="No results found" message="Try another title, author, or ISBN." />
      )}

      {results.length < totalItems && results.length > 0 && (
        <button type="button" className="btn-secondary mx-auto flex" onClick={() => setPage((current) => current + 1)} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={17} /> : null} Load more
        </button>
      )}
    </section>
  );
}
