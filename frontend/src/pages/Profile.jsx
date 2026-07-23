import { Save, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiMessage } from '../services/api';
import { profileService } from '../services/profileService';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { name: user?.name || '', currentPassword: '', newPassword: '' },
  });

  async function onSubmit(values) {
    const payload = {
      name: values.name,
      currentPassword: values.currentPassword || null,
      newPassword: values.newPassword || null,
    };

    try {
      const updated = await profileService.update(payload);
      updateUser(updated);
      reset({ name: updated.name, currentPassword: '', newPassword: '' });
      toast.success('Profile updated');
    } catch (error) {
      toast.error(apiMessage(error, 'Profile update failed'));
    }
  }

  async function deleteAccount() {
    if (!window.confirm('Delete your account and library permanently?')) {
      return;
    }
    try {
      await profileService.remove();
      logout();
      toast.success('Account deleted');
      navigate('/register', { replace: true });
    } catch (error) {
      toast.error(apiMessage(error, 'Account deletion failed'));
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">Profile</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-950 dark:text-white">Account settings</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="premium-card animate-riseIn rounded-lg p-6">
        <div className="relative z-10 grid gap-5">
          <label className="text-sm font-medium">
            Name
            <input className="input mt-2" {...register('name')} />
          </label>
          <label className="text-sm font-medium">
            Email
            <input className="input mt-2" value={user?.email || ''} disabled />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium">
              Current Password
              <input className="input mt-2" type="password" {...register('currentPassword')} />
            </label>
            <label className="text-sm font-medium">
              New Password
              <input className="input mt-2" type="password" {...register('newPassword')} />
            </label>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary relative z-10 mt-6">
          <Save size={17} /> Save profile
        </button>
      </form>

      <div className="premium-card animate-riseIn rounded-lg border-rose-300/60 p-6 dark:border-rose-400/20">
        <div className="relative z-10">
        <h2 className="text-lg font-bold text-gray-950 dark:text-white">Danger zone</h2>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Deleting your account removes your user profile and all personal library entries.
        </p>
        <button type="button" onClick={deleteAccount} className="btn-secondary mt-5 text-rose-600 dark:text-rose-300">
          <Trash2 size={17} /> Delete account
        </button>
        </div>
      </div>
    </section>
  );
}
