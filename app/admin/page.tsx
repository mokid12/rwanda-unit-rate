'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { getSession, logout, User } from '@/lib/auth';
import { convertAmount, currencyOptions, defaultRates, formatCurrency, getStoredRates, provinceNames } from '@/lib/data';

const provinceOrder = provinceNames;

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [currency, setCurrency] = useState('RWF');
  const [rates, setRates] = useState(defaultRates);
  const [selectedProvince, setSelectedProvince] = useState('Kigali City');

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace('/login');
      return;
    }

    setUser(session);
    setRates(getStoredRates());

    const savedCurrency = window.localStorage.getItem('rwunitrate_currency') || 'RWF';
    setCurrency(savedCurrency);
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('rwunitrate_currency', currency);
    }
  }, [currency]);

  const provinceRows = useMemo(() => {
    return provinceOrder.map((province) => ({
      province,
      rows: rates.filter((entry) => entry.province === province),
    }));
  }, [rates]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-block sidebar-brand">
          <span className="brand-badge">RW</span>
          <div>
            <p className="eyebrow">Official site</p>
            <h2>RWANDA UNIT RATE</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button type="button" className="nav-item active">Dashboard</button>
          <button type="button" className="nav-item">Province view</button>
          <button type="button" className="nav-item">District search</button>
          <button type="button" className="nav-item">Export report</button>
        </nav>

        <div className="sidebar-user-box">
          <p>{user.name}</p>
          <small>{user.role === 'admin' ? 'Admin account' : 'User account'}</small>
        </div>

        <button type="button" className="secondary-btn logout-btn" onClick={handleLogout}>Logout</button>
        {user.role === 'admin' ? <Link href="/admin" className="nav-item admin-link">Admin panel</Link> : null}
      </aside>

      <section className="content-panel">
        <header className="dashboard-topbar">
          <div>
            <p className="eyebrow">BOQ pricing tracker</p>
            <h1>Live unit rate dashboard</h1>
          </div>

          <div className="toolbar">
            <label>
              Currency
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {currencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Active provinces</span>
            <strong>5</strong>
          </div>
          <div className="stat-card">
            <span>Districts</span>
            <strong>27</strong>
          </div>
          <div className="stat-card">
            <span>Material items</span>
            <strong>{rates.length}</strong>
          </div>
          <div className="stat-card">
            <span>Display currency</span>
            <strong>{currency}</strong>
          </div>
        </div>

        <div className="province-tabs">
          {provinceOrder.map((province) => (
            <button
              key={province}
              type="button"
              className={selectedProvince === province ? 'tab active' : 'tab'}
              onClick={() => setSelectedProvince(province)}
            >
              {province}
            </button>
          ))}
        </div>

        {provinceRows
          .filter((item) => item.province === selectedProvince)
          .map(({ province, rows }) => (
            <div key={province} className="rate-table-card">
              <div className="table-topline">
                <h2>{province}</h2>
                <span>{rows.length} unit rate entries</span>
              </div>

              <table className="rate-table">
                <thead>
                  <tr>
                    <th>District</th>
                    <th>Item</th>
                    <th>Unit</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.district}</td>
                      <td>{entry.item}</td>
                      <td>{entry.unit}</td>
                      <td>{formatCurrency(convertAmount(entry.amount, currency), currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </section>
    </main>
  );
}
