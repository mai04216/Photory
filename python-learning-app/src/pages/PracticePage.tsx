import { useParams, Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { ProblemCard } from '../components/ProblemCard/ProblemCard';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { Icon } from '../components/Icon/Icon';
import type { Progress } from '../hooks/useProgress';

interface PracticePageProps {
  progress: Progress;
  completeProblem: (key: string) => void;
  uncompleteProblem: (key: string) => void;
  getCompletedCountForDay: (day: number) => number;
}

export function PracticePage({ progress, completeProblem, uncompleteProblem, getCompletedCountForDay }: PracticePageProps) {
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

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Link to="/" style={{ color: '#9B9B9B', textDecoration: 'none', fontSize: 13 }}>ホーム</Link>
        <span style={{ color: '#E8DED4' }}>/</span>
        <Link to={`/day/${dayNum}`} style={{ color: '#9B9B9B', textDecoration: 'none', fontSize: 13 }}>Day {dayNum}</Link>
        <span style={{ color: '#E8DED4' }}>/</span>
        <span style={{ color: '#4A4A4A', fontSize: 13, fontWeight: 500 }}>練習問題</span>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Icon name="pencil" size={24} />
          <h2 style={{ margin: 0, color: '#4A4A4A', fontSize: 20 }}>
            Day {dayNum}: {dayData.title} - 練習問題
          </h2>
        </div>
        <ProgressBar current={completed} total={total} />
      </div>

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

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Link to={`/day/${dayNum}`} className="btn btn-primary">
          Day {dayNum} の解説に戻る
        </Link>
      </div>
    </div>
  );
}
