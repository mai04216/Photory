import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { curriculum } from '../../data/curriculum';

interface LayoutProps {
  children: React.ReactNode;
  totalCompleted: number;
  getCompletedCountForDay: (day: number) => number;
}

const totalProblems = curriculum.reduce((sum, d) => sum + d.problems.length, 0);

export function Layout({ children, totalCompleted, getCompletedCountForDay }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-layout">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="hamburger"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="coffee" size={28} />
            <h1 style={{ margin: 0, fontSize: 20, color: '#4A4A4A', fontWeight: 700 }}>
              Photory<span style={{ color: '#E8927C' }}> Python</span>
            </h1>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="header-progress">
            <span style={{ fontSize: 13, color: '#9B9B9B', whiteSpace: 'nowrap' }}>
              {totalCompleted}/{totalProblems}問
            </span>
            <div style={{ width: 120 }}>
              <ProgressBar current={totalCompleted} total={totalProblems} showLabel={false} />
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          <nav className="sidebar-inner">
            <Link
              to="/"
              className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon name="home" size={18} />
              <span>ホーム</span>
            </Link>

            {[1, 2, 3, 4].map((week) => (
              <div key={week} style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#9B9B9B', padding: '4px 12px', textTransform: 'uppercase' }}>
                  Week {week}
                </div>
                {curriculum
                  .filter((d) => d.week === week)
                  .map((d) => {
                    const completed = getCompletedCountForDay(d.day);
                    const total = d.problems.length;
                    const allDone = completed >= total && total > 0;
                    return (
                      <Link
                        key={d.day}
                        to={`/day/${d.day}`}
                        className={`sidebar-link ${location.pathname === `/day/${d.day}` ? 'active' : ''}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {allDone ? <Icon name="flower" size={16} /> : <Icon name="book" size={16} />}
                        <span>Day {d.day}: {d.title}</span>
                        {allDone && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#7BAFB0' }}>✓</span>}
                      </Link>
                    );
                  })}
              </div>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>

      <footer className="footer">
        <p>Photory Python Learning App &copy; 2026</p>
      </footer>
    </div>
  );
}
