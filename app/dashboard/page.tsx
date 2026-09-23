'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { createUser, getSession, setSession } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (typeof window !== 'undefined' && getSession()) {
    router.replace('/dashboard');
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = createUser({ name, email, password });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSession(result.user);
    router.push('/dashboard');
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <span className="brand-badge">RW</span>
          <h1>RWANDA UNIT RATE</h1>
        </div>

        <h2>Create account</h2>
        <p className="auth-subtitle">Register to access BOQ pricing across Rwanda.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <label>
            Confirm password
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" className="primary-btn auth-button">Create account</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link href="/login">Sign in</Link></p>
        </div>
      </div>
    </main>
  );
}
