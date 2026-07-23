import { Phone, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiMessage } from '../services/api';
import GoogleAuthButton from '../components/GoogleAuthButton';

export default function Register() {
  const { register: createAccount } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(values) {
    const payload = {
      ...values,
      phone: values.phone?.trim() || '',
    };
    try {
      await createAccount(payload);
      toast.success('Account created');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(apiMessage(error, 'Registration failed'));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="premium-card animate-riseIn rounded-lg p-6 sm:p-8">
      <div className="relative z-10">
      <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">Create account</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Build your private library</h2>

      <GoogleAuthButton />

      <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
        <span className="h-px flex-1 bg-white/20" />
        Or create with email
        <span className="h-px flex-1 bg-white/20" />
      </div>

      <div className="mt-8 grid gap-4">
        <label className="text-sm font-medium">
          Name
          <input className="input mt-2" {...register('name', { required: 'Name is required' })} />
          {errors.name && <span className="text-xs text-rose-500">{errors.name.message}</span>}
        </label>
        <label className="text-sm font-medium">
          Email
          <input className="input mt-2" type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <span className="text-xs text-rose-500">{errors.email.message}</span>}
        </label>
        <label className="text-sm font-medium">
          Phone Number
          <div className="relative mt-2">
            <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
            <input
              className="input pl-11"
              placeholder="Optional, e.g. 9876543210"
              {...register('phone', {
                pattern: {
                  value: /^[+]?[0-9]{10,15}$|^$/,
                  message: 'Use 10 to 15 digits',
                },
              })}
            />
          </div>
          {errors.phone && <span className="text-xs text-rose-500">{errors.phone.message}</span>}
        </label>
        <label className="text-sm font-medium">
          Password
          <input
            className="input mt-2"
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Use at least 8 characters' } })}
          />
          {errors.password && <span className="text-xs text-rose-500">{errors.password.message}</span>}
        </label>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full">
        <UserPlus size={18} /> Register
      </button>
      <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account? <Link className="font-semibold text-teal-700 dark:text-teal-300" to="/login">Login</Link>
      </p>
      </div>
    </form>
  );
}
