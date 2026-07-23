import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="glass-panel max-w-lg rounded-lg p-8 text-center">
        <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">404</p>
        <h1 className="mt-2 text-4xl font-bold text-gray-950 dark:text-white">Page not found</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          The page you are looking for does not exist or has moved.
        </p>
        <Link to="/dashboard" className="btn-primary mt-8">
          <ArrowLeft size={17} /> Back to dashboard
        </Link>
      </section>
    </main>
  );
}
