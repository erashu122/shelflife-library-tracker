import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiMessage } from '../services/api';

export default function Register() {
  const { register: createAccount } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(values) {
    try {
      await createAccount(values);
      toast.success('Account created');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(apiMessage(error, 'Registration failed'));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel rounded-lg p-6 sm:p-8">
      <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">Create account</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Build your private library</h2>

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
    </form>
  );
}
