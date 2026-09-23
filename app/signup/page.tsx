'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { getSession, loginUser, setSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const session = getSession();
    if (session) {
      router.replace(session.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [router]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user = loginUser(email, password);

    if (!user) {
      setError('Invalid email or password.');
      return;
    }

    setSession(user);
    router.push(user.role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <span className="brand-badge">RW</span>
          <h1>RWANDA UNIT RATE</h1>
        </div>

        <h2>Sign in</h2>
        <p className="auth-subtitle">Access your BOQ pricing dashboard.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" className="primary-btn auth-button">Login</button>
        </form>

        <div className="auth-footer">
          <p>Need an account? <Link href="/signup">Create account</Link></p>
          <p className="muted">Admin default: admin@rwandaunitrate.rw / admin123</p>
        </div>
      </div>
    </main>
  );
}
