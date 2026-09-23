import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-badge">RW</span>
          <div>
            <p className="eyebrow">Official BOQ pricing</p>
            <h1>RWANDA UNIT RATE</h1>
          </div>
        </div>

        <nav className="nav-actions">
          <Link href="/login">Login</Link>
          <Link href="/signup" className="primary-btn">Create Account</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="section-tag">Built for Rwanda construction and procurement</p>
          <h2>Unit rates across all provinces and districts.</h2>
          <p>
            Track BOQ material prices in Kigali, Northern, Southern, Western, and Eastern
            provinces with district-level insights and instant currency conversion.
          </p>
          <div className="cta-row">
            <Link href="/signup" className="primary-btn">Get Started</Link>
            <Link href="/dashboard" className="secondary-btn">View Rates</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="mini-table-header">
            <span>Current market snapshot</span>
            <span className="status-pill">Live</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Province</th>
                <th>Districts</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kigali</td>
                <td>3</td>
                <td>RWF 12,000</td>
              </tr>
              <tr>
                <td>North</td>
                <td>5</td>
                <td>RWF 12,600</td>
              </tr>
              <tr>
                <td>South</td>
                <td>5</td>
                <td>RWF 11,800</td>
              </tr>
              <tr>
                <td>West</td>
                <td>7</td>
                <td>RWF 12,100</td>
              </tr>
              <tr>
                <td>East</td>
                <td>7</td>
                <td>RWF 12,200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>Account Required</h3>
          <p>Every user must create an account before accessing the full BOQ rate website.</p>
        </div>
        <div className="feature-card">
          <h3>Admin Tools</h3>
          <p>Admin users can add, edit, and remove rate entries and manage currencies.</p>
        </div>
        <div className="feature-card">
          <h3>Currency Conversion</h3>
          <p>Switch between RWF, USD, EUR, GBP, KES, UGX, TZS, and BIF instantly.</p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-title-row">
          <h3>Why this platform works</h3>
        </div>
        <div className="info-grid">
          <div>
            <strong>District-based search</strong>
            <p>Find the right item in a specific district without digging across multiple files.</p>
          </div>
          <div>
            <strong>Province overview</strong>
            <p>Compare rates across Kigali, North, South, West, and East in one dashboard.</p>
          </div>
          <div>
            <strong>Transparent updates</strong>
            <p>Currency and pricing changes are controlled centrally for audit-friendly pricing.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
