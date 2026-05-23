import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/layout/PageContainer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { label: 'Weak', color: 'bg-[#EF5350]', width: '33%' };
  if (score <= 2) return { label: 'Medium', color: 'bg-[#FFD93D]', width: '66%' };
  return { label: 'Strong', color: 'bg-[#6BCB77]', width: '100%' };
}

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/';
  const strength = form.password ? getPasswordStrength(form.password) : null;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'At least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords don\'t match';
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
      await register(form.name, form.email, form.password, form.confirmPassword);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
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
            <h1 className="text-2xl font-display text-[#2D3436] mb-1">Create your account</h1>
            <p className="text-sm text-[#2D3436]/50">Join thousands of women on Empower Stop</p>
          </div>

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-[#EF5350]/10 border border-[#EF5350]/20 text-[#EF5350] text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" type="text" value={form.name} onChange={set('name')} error={errors.name} placeholder="Your name" />
            <Input label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
            <div>
              <Input label="Password" type="password" value={form.password} onChange={set('password')} error={errors.password} placeholder="Min. 8 characters" />
              {strength && (
                <div className="mt-2">
                  <div className="h-1 bg-[#F0E6F6] rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} rounded-full transition-all duration-300`} style={{ width: strength.width }} />
                  </div>
                  <p className={`text-xs mt-1 ${strength.label === 'Weak' ? 'text-[#EF5350]' : strength.label === 'Medium' ? 'text-[#FFD93D]' : 'text-[#6BCB77]'}`}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>
            <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={set('confirmPassword')} error={errors.confirmPassword} placeholder="Re-enter password" />
            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#2D3436]/40 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF6B9D] hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
