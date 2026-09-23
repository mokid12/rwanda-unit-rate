:root {
  --bg: #0d1321;
  --panel: #101b2b;
  --panel-light: #162537;
  --surface: #1a2d44;
  --text: #ecf3ff;
  --muted: #aac1e8;
  --primary: #4fc3f7;
  --primary-strong: #2d9bd6;
  --secondary: #d5ebff;
  --accent: #50c878;
  --danger: #ff6b6b;
  --border: rgba(255, 255, 255, 0.09);
  --shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: linear-gradient(180deg, #08111d 0%, #101c2d 100%);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select {
  font: inherit;
}

.page-shell,
.auth-shell,
.dashboard-shell,
.admin-shell {
  min-height: 100vh;
}

.topbar,
.hero,
.feature-grid,
.section-block,
.dashboard-topbar,
.admin-header,
.admin-grid,
.admin-card,
.table-card,
.auth-card {
  max-width: 1200px;
  margin: 0 auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 18px 18px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: #051317;
  font-weight: 700;
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.08em;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(24px, 5vw, 40px);
}

h2 {
  margin-bottom: 10px;
  font-size: clamp(26px, 5vw, 42px);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.primary-btn,
.secondary-btn,
.nav-item,
.tab,
.danger-btn {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.primary-btn {
  border: none;
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: #061722;
  font-weight: 700;
}

.secondary-btn,
.nav-item,
.tab {
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
}

.primary-btn:hover,
.secondary-btn:hover,
.nav-item:hover,
.tab:hover,
.danger-btn:hover {
  transform: translateY(-1px);
}

.hero {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  gap: 32px;
  padding: 30px 18px 20px;
  align-items: center;
}

.hero-copy {
  max-width: 620px;
}

.section-tag {
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  font-weight: 700;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}

.hero-card,
.feature-card,
.stat-card,
.rate-table-card,
.admin-card {
  background: rgba(17, 29, 42, 0.9);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.hero-card {
  padding: 20px;
}

.mini-table-header,
.table-topline,
.section-title-row,
.dashboard-topbar,
.admin-header,
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.status-pill {
  background: rgba(80, 200, 120, 0.12);
  border: 1px solid rgba(80, 200, 120, 0.28);
  color: var(--accent);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
}

.hero-card table,
.rate-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 14px;
}

.hero-card th,
.hero-card td,
.rate-table th,
.rate-table td {
  padding: 12px 10px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.feature-grid,
.info-grid,
.stats-grid,
.admin-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  padding: 20px 18px;
}

.feature-card,
.stat-card,
.info-grid > div {
  padding: 22px 18px;
}

.feature-card h3,
.info-grid strong {
  font-size: 18px;
  margin-bottom: 12px;
  display: block;
}

.section-block {
  padding: 12px 18px 30px;
}

.auth-shell {
  display: grid;
  place-items: center;
  padding: 40px 18px;
}

.auth-card {
  width: min(100%, 500px);
  background: rgba(17, 29, 42, 0.9);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 32px 28px;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.auth-subtitle,
.muted {
  color: var(--muted);
}

.auth-form,
.admin-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
}

.auth-form label,
.admin-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
}

input,
select,
button {
  border-radius: 10px;
}

input,
select {
  width: 100%;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  padding: 12px 14px;
}

.auth-button {
  width: 100%;
}

.auth-footer {
  margin-top: 18px;
  color: var(--muted);
}

.error-text {
  color: var(--danger);
  margin: 0;
}

.dashboard-shell {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 28px;
  padding: 22px 18px 34px;
}

.sidebar {
  background: rgba(16, 27, 40, 0.92);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  text-align: left;
  width: 100%;
}

.nav-item.active,
.tab.active {
  background: rgba(79, 195, 247, 0.12);
  border-color: rgba(79, 195, 247, 0.35);
  color: var(--primary);
}

.sidebar-user-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
}

.content-panel {
  min-width: 0;
}

.dashboard-topbar {
  padding: 8px 0 18px;
}

.toolbar label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 0 0 18px;
}

.stat-card {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stat-card span {
  color: var(--muted);
}

.stat-card strong {
  font-size: clamp(24px, 2.8vw, 32px);
}

.province-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 24px 0 18px;
}

.tab {
  min-width: 120px;
}

.rate-table-card {
  padding: 18px;
  margin-bottom: 20px;
}

.admin-shell {
  padding: 24px 18px 40px;
}

.admin-header {
  max-width: 1200px;
  margin: 0 auto 20px;
}

.admin-grid {
  max-width: 1200px;
  margin: 0 auto 20px;
  grid-template-columns: 1.2fr 0.8fr;
  padding: 0;
}

.admin-card {
  padding: 22px 18px;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.currency-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.currency-row {
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  gap: 10px;
}

.table-card {
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 18px;
}

.danger-btn {
  background: rgba(255, 107, 107, 0.12);
  border-color: rgba(255, 107, 107, 0.35);
  color: #ffd1d1;
}

@media (max-width: 980px) {
  .hero,
  .feature-grid,
  .info-grid,
  .stats-grid,
  .admin-grid,
  .dashboard-shell {
    grid-template-columns: 1fr;
  }

  .dashboard-shell {
    display: block;
  }

  .sidebar {
    margin-bottom: 22px;
  }
}

@media (max-width: 640px) {
  .topbar,
  .nav-actions,
  .dashboard-topbar,
  .admin-header,
  .header-actions,
  .mini-table-header,
  .table-topline {
    flex-direction: column;
    align-items: flex-start;
  }

  .two-col {
    grid-template-columns: 1fr;
  }
}
