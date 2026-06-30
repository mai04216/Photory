import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon/Icon';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { curriculum } from '../data/curriculum';
import type { Progress } from '../hooks/useProgress';

interface HomeProps {
  progress: Progress;
  totalCompleted: number;
  getCompletedCountForDay: (day: number) => number;
}

const totalProblems = curriculum.reduce((sum, d) => sum + d.problems.length, 0);
const weeks = [1, 2, 3, 4];
const weekTitles: Record<number, string> = {
  1: '基礎文法',
  2: '標準ライブラリ',
  3: '実務スキル',
  4: '実践演習',
};

export function Home({ progress, totalCompleted, getCompletedCountForDay }: HomeProps) {
  const nextDay = curriculum.find((d) => {
    const count = getCompletedCountForDay(d.day);
    return count < d.problems.length;
  });

  return (
    <div>
      <div className="card" style={{ background: 'linear-gradient(135deg, #FFF8F3 0%, #F5EDE4 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Icon name="coffee" size={32} />
          <div>
            <h2 style={{ margin: 0, color: '#4A4A4A', fontSize: 22 }}>
              おかえりなさい！
            </h2>
            <p style={{ margin: '4px 0 0', color: '#9B9B9B', fontSize: 14 }}>
              今日もPythonを少しずつ学びましょう
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 16 }}>
          <div className="stat-card">
            <div className="stat-value">{totalCompleted}<span className="stat-unit">/{totalProblems}問</span></div>
            <div className="stat-label">完了した問題</div>
            <div style={{ marginTop: 8 }}>
              <ProgressBar current={totalCompleted} total={totalProblems} showLabel={false} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#E8927C' }}>
              {progress.streakDays}<span className="stat-unit">日</span>
            </div>
            <div className="stat-label">🔥 連続学習</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#7BAFB0' }}>
              {curriculum.filter((d) => getCompletedCountForDay(d.day) >= d.problems.length && d.problems.length > 0).length}
              <span className="stat-unit">/20 Day</span>
            </div>
            <div className="stat-label">完了したDay</div>
          </div>
        </div>
      </div>

      {nextDay && (
        <Link to={`/day/${nextDay.day}`} className="card recommend-card" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Icon name="star" size={20} />
            <span style={{ fontSize: 13, color: '#E8927C', fontWeight: 700 }}>今日のおすすめ</span>
          </div>
          <h3 style={{ margin: '0 0 4px', color: '#4A4A4A', fontSize: 17 }}>
            Day {nextDay.day}: {nextDay.title}
          </h3>
          <p style={{ margin: 0, color: '#9B9B9B', fontSize: 13 }}>{nextDay.description}</p>
          <div style={{ marginTop: 12 }}>
            <ProgressBar
              current={getCompletedCountForDay(nextDay.day)}
              total={nextDay.problems.length}
            />
          </div>
        </Link>
      )}

      <h3 style={{ color: '#4A4A4A', fontSize: 17, marginTop: 32, marginBottom: 16 }}>
        カリキュラム
      </h3>

      {weeks.map((week) => {
        const days = curriculum.filter((d) => d.week === week);
        const weekCompleted = days.reduce((sum, d) => sum + getCompletedCountForDay(d.day), 0);
        const weekTotal = days.reduce((sum, d) => sum + d.problems.length, 0);
        const stars = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 5) : 0;

        return (
          <div key={week} className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ margin: 0, color: '#4A4A4A', fontSize: 15 }}>
                Week {week}: {weekTitles[week]}
              </h4>
              <span style={{ fontSize: 16, letterSpacing: 2 }}>
                {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
              </span>
            </div>
            <ProgressBar current={weekCompleted} total={weekTotal} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginTop: 14 }}>
              {days.map((d) => {
                const completed = getCompletedCountForDay(d.day);
                const total = d.problems.length;
                const allDone = completed >= total && total > 0;
                return (
                  <Link
                    key={d.day}
                    to={`/day/${d.day}`}
                    className="day-card"
                    style={{ borderColor: allDone ? '#7BAFB0' : undefined }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {allDone ? <Icon name="flower" size={16} /> : <Icon name="book" size={16} />}
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#4A4A4A' }}>
                        Day {d.day}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#9B9B9B', marginTop: 4 }}>{d.title}</div>
                    <div style={{ fontSize: 11, color: '#9B9B9B', marginTop: 6 }}>{completed}/{total}問</div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
