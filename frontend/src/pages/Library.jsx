import { RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import EmptyState from '../components/EmptyState';
import LibraryBookCard from '../components/LibraryBookCard';
import Skeleton from '../components/Skeleton';
import { apiMessage } from '../services/api';
import { libraryService } from '../services/libraryService';
import { READING_STATUSES, SORT_OPTIONS } from '../utils/constants';

export default function Library() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('recent');
  const [loading, setLoading] = useState(true);

  const loadLibrary = useCallback(() => {
    setLoading(true);
    libraryService.list({ status: status || undefined, sort })
      .then(setBooks)
      .catch((error) => toast.error(apiMessage(error, 'Could not load library')))
      .finally(() => setLoading(false));
  }, [sort, status]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  async function handleUpdate(id, payload) {
    try {
      await libraryService.update(id, payload);
      toast.success('Library book updated');
      loadLibrary();
    } catch (error) {
      toast.error(apiMessage(error, 'Update failed'));
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this book from your library?')) {
      return;
    }
    try {
      await libraryService.remove(id);
      toast.success('Book removed');
      loadLibrary();
    } catch (error) {
      toast.error(apiMessage(error, 'Delete failed'));
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">Library</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-950 dark:text-white">Your personal shelf</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select className="input min-w-44" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            {READING_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <select className="input min-w-48" value={sort} onChange={(event) => setSort(event.target.value)}>
            {SORT_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <button type="button" className="btn-secondary" onClick={loadLibrary}><RefreshCw size={17} /> Refresh</button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-64" />)}</div>
      ) : books.length === 0 ? (
        <EmptyState title="Your shelf is empty" message="Use search to add books, then update progress, ratings, and reviews here." />
      ) : (
        <div className="grid gap-4">
          {books.map((item) => (
            <LibraryBookCard key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
