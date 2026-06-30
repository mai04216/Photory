import { useParams, Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { diagramComponents } from '../data/diagrams';
import { LessonCard } from '../components/LessonCard/LessonCard';
import { ProblemCard } from '../components/ProblemCard/ProblemCard';
import { DiagramBlock } from '../components/DiagramBlock/DiagramBlock';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { Icon } from '../components/Icon/Icon';
import type { Progress } from '../hooks/useProgress';

interface DayPageProps {
  progress: Progress;
  completeProblem: (key: string) => void;
  uncompleteProblem: (key: string) => void;
  getCompletedCountForDay: (day: number) => number;
}

export function DayPage({ progress, completeProblem, uncompleteProblem, getCompletedCountForDay }: DayPageProps) {
  const { dayId } = useParams<{ dayId: string }>();
  const dayNum = parseInt(dayId || '1', 10);
  const dayData = curriculum.find((d) => d.day === dayNum);

  if (!dayData) {
    return (
      <div className="card">
        <h2>Day {dayNum} は見つかりませんでした</h2>
        <Link to="/" className="btn btn-primary">ホームに戻る</Link>
      </div>
    );
  }

  const completed = getCompletedCountForDay(dayNum);
  const total = dayData.problems.length;
  const diagrams = diagramComponents[dayNum] || [];
  const prevDay = dayNum > 1 ? curriculum.find((d) => d.day === dayNum - 1) : null;
  const nextDay = dayNum < 20 ? curriculum.find((d) => d.day === dayNum + 1) : null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Link to="/" style={{ color: '#9B9B9B', textDecoration: 'none', fontSize: 13 }}>ホーム</Link>
        <span style={{ color: '#E8DED4' }}>/</span>
        <span style={{ color: '#9B9B9B', fontSize: 13 }}>Week {dayData.week}</span>
        <span style={{ color: '#E8DED4' }}>/</span>
        <span style={{ color: '#4A4A4A', fontSize: 13, fontWeight: 500 }}>Day {dayNum}</span>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, #FFF8F3 0%, #F5EDE4 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Icon name="book" size={24} />
          <h2 style={{ margin: 0, color: '#4A4A4A', fontSize: 20 }}>
            Day {dayNum}: {dayData.title}
          </h2>
        </div>
        <p style={{ color: '#9B9B9B', fontSize: 14, margin: '0 0 16px' }}>{dayData.description}</p>
        <ProgressBar current={completed} total={total} />
      </div>

      <div style={{ display: 'flex', gap: 12, margin: '16px 0' }}>
        <a href="#lessons" className="btn btn-secondary" style={{ fontSize: 13 }}>📖 解説</a>
        <a href="#diagrams" className="btn btn-secondary" style={{ fontSize: 13 }}>📊 図解</a>
        <a href="#practice" className="btn btn-secondary" style={{ fontSize: 13 }}>✏️ 問題</a>
        <a href="#summary" className="btn btn-secondary" style={{ fontSize: 13 }}>📝 まとめ</a>
      </div>

      <section id="lessons">
        <h3 style={{ color: '#4A4A4A', fontSize: 17, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>📖</span> 解説
        </h3>
        {dayData.lessons.map((lesson, i) => (
          <LessonCard key={i} title={lesson.title} points={lesson.points} comparisons={lesson.comparisons} />
        ))}
      </section>

      {diagrams.length > 0 && (
        <section id="diagrams">
          <h3 style={{ color: '#4A4A4A', fontSize: 17, marginBottom: 16, marginTop: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>📊</span> 図解
          </h3>
          {diagrams.map((DiagramComp, i) => (
            <DiagramBlock key={i} title="">
              <DiagramComp />
            </DiagramBlock>
          ))}
        </section>
      )}

      <section id="practice">
        <h3 style={{ color: '#4A4A4A', fontSize: 17, marginBottom: 16, marginTop: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>✏️</span> 練習問題（{completed}/{total} 完了）
        </h3>
        {dayData.problems.map((p) => {
          const key = `day${dayNum}-${p.id}`;
          return (
            <ProblemCard
              key={p.id}
              id={p.id}
              question={p.question}
              hints={p.hints}
              answer={p.answer}
              explanation={p.explanation}
              isCompleted={!!progress.completedProblems[key]}
              onComplete={() => completeProblem(key)}
              onUncomplete={() => uncompleteProblem(key)}
            />
          );
        })}
      </section>

      <section id="summary">
        <h3 style={{ color: '#4A4A4A', fontSize: 17, marginBottom: 16, marginTop: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>📝</span> まとめ（チートシート）
        </h3>
        <div className="card">
          {dayData.summary.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14, color: '#4A4A4A', lineHeight: 1.7 }}>
              <span style={{ color: '#7BAFB0', flexShrink: 0 }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12 }}>
        {prevDay ? (
          <Link to={`/day/${prevDay.day}`} className="btn btn-secondary">
            ← Day {prevDay.day}: {prevDay.title}
          </Link>
        ) : <div />}
        {nextDay ? (
          <Link to={`/day/${nextDay.day}`} className="btn btn-primary">
            Day {nextDay.day}: {nextDay.title} →
          </Link>
        ) : (
          <Link to="/" className="btn btn-primary">
            <Icon name="flower" size={16} /> 完了！ホームに戻る
          </Link>
        )}
      </div>
    </div>
  );
}
