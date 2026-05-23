import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import PageContainer from '../components/layout/PageContainer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
    } catch {
      // show success regardless
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <PageContainer>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
        <Card hover={false} className="w-full max-w-md">
          <h1 className="text-2xl font-display text-dark mb-2">
            Forgot Password
          </h1>

          {submitted ? (
            <div>
              <div className="p-4 rounded-lg bg-success/10 text-success text-sm mb-4">
                If an account exists with this email, a reset link has been
                sent. Please check your inbox.
              </div>
              <Link
                to="/login"
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Enter your email address and we will send you a link to reset
                your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  placeholder="you@example.com"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-4">
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Back to login
                </Link>
              </p>
            </>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
