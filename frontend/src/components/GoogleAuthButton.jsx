import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiMessage } from '../services/api';

export default function GoogleAuthButton() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isConfigured = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  if (!isConfigured) {
    return (
      <button
        type="button"
        className="btn-secondary mt-8 w-full"
        onClick={() => toast.error('Set VITE_GOOGLE_CLIENT_ID in frontend/.env first')}
      >
        Continue with Google
      </button>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white p-2 dark:border-white/10">
      <GoogleLogin
        width="680"
        text="continue_with"
        shape="rectangular"
        theme="outline"
        onSuccess={async (credentialResponse) => {
          try {
            await googleLogin({ credential: credentialResponse.credential });
            toast.success('Signed in with Google');
            navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
          } catch (error) {
            toast.error(apiMessage(error, 'Google login failed'));
          }
        }}
        onError={() => toast.error('Google login failed')}
      />
    </div>
  );
}
