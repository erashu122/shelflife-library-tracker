import { LogIn, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from '../components/GoogleAuthButton';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('email');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(values) {
    const payload = {
      password: values.password,
      email: mode === 'email' ? values.email : '',
      phone: mode === 'phone' ? values.phone : '',
    };
    try {
      await login(payload);
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

      <GoogleAuthButton />

      <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
        <span className="h-px flex-1 bg-white/20" />
        Or login with
        <span className="h-px flex-1 bg-white/20" />
      </div>

      <div className="mt-8 grid gap-4">
        <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setMode('email')}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${mode === 'email' ? 'bg-teal-600 text-white' : 'text-gray-500 dark:text-gray-300'}`}
          >
            <Mail size={16} /> Email
          </button>
          <button
            type="button"
            onClick={() => setMode('phone')}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${mode === 'phone' ? 'bg-teal-600 text-white' : 'text-gray-500 dark:text-gray-300'}`}
          >
            <Phone size={16} /> Phone
          </button>
        </div>

        {mode === 'email' ? (
          <label className="text-sm font-medium">
            Email
            <input className="input mt-2" type="email" {...register('email', { required: mode === 'email' ? 'Email is required' : false })} />
            {errors.email && <span className="text-xs text-rose-500">{errors.email.message}</span>}
          </label>
        ) : (
          <label className="text-sm font-medium">
            Phone Number
            <input
              className="input mt-2"
              placeholder="9876543210"
              {...register('phone', {
                required: mode === 'phone' ? 'Phone is required' : false,
                pattern: { value: /^[+]?[0-9]{10,15}$/, message: 'Use 10 to 15 digits' },
              })}
            />
            {errors.phone && <span className="text-xs text-rose-500">{errors.phone.message}</span>}
          </label>
        )}
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
