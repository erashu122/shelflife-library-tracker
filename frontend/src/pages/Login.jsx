import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(values) {
    try {
      await login(values);
      toast.success('Welcome back');
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (error) {
      toast.error(apiMessage(error, 'Login failed'));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel rounded-lg p-6 sm:p-8">
      <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">Sign in</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Continue your reading streak</h2>

      <div className="mt-8 grid gap-4">
        <label className="text-sm font-medium">
          Email
          <input className="input mt-2" type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <span className="text-xs text-rose-500">{errors.email.message}</span>}
        </label>
        <label className="text-sm font-medium">
          Password
          <input className="input mt-2" type="password" {...register('password', { required: 'Password is required' })} />
          {errors.password && <span className="text-xs text-rose-500">{errors.password.message}</span>}
        </label>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full">
        <LogIn size={18} /> Login
      </button>
      <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
        New to ShelfLife? <Link className="font-semibold text-teal-700 dark:text-teal-300" to="/register">Create account</Link>
      </p>
    </form>
  );
}
