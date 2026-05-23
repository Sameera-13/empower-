import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/layout/PageContainer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/';

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <PageContainer>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display text-[#2D3436] mb-1">Welcome back</h1>
            <p className="text-sm text-[#2D3436]/50">Sign in to your Empower Stop account</p>
          </div>

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-[#EF5350]/10 border border-[#EF5350]/20 text-[#EF5350] text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
            <Input label="Password" type="password" value={form.password} onChange={set('password')} error={errors.password} placeholder="Your password" />
            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-xs text-[#2D3436]/40 hover:text-[#FF6B9D]">Forgot password?</Link>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#2D3436]/40 mt-8">
            New here?{' '}
            <Link to="/signup" className="text-[#6BCB77] hover:underline font-medium">Create an account</Link>
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
