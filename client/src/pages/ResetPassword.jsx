import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import PageContainer from '../components/layout/PageContainer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8)
      errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match';
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
      await api.post('/auth/reset-password', {
        token,
        password: form.password,
      });
      navigate('/login', { state: { message: 'Password reset successful. Please sign in.' } });
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          'Reset failed. The link may have expired.'
      );
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  if (!token) {
    return (
      <PageContainer>
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
          <Card hover={false} className="w-full max-w-md text-center">
            <h1 className="text-2xl font-display text-dark mb-3">
              Invalid Reset Link
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              This password reset link is invalid or has expired.
            </p>
            <Link to="/forgot-password">
              <Button>Request New Link</Button>
            </Link>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
        <Card hover={false} className="w-full max-w-md">
          <h1 className="text-2xl font-display text-dark mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your new password below.
          </p>

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-danger/10 text-danger text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
              placeholder="Min. 8 characters"
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
              error={errors.confirmPassword}
              placeholder="Re-enter new password"
            />
            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}
