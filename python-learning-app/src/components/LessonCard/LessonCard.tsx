import { CodeBlock } from '../CodeBlock/CodeBlock';

interface ComparisonProps {
  java: string;
  python: string;
  title?: string;
}

export function CodeComparison({ java, python, title }: ComparisonProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      {title && <h4 style={{ color: '#4A4A4A', marginBottom: 12, fontSize: 15 }}>{title}</h4>}
      <div className="code-comparison">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '12px 12px 0 0',
              backgroundColor: '#E87040',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Java
          </div>
          <CodeBlock code={java} language="java" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '12px 12px 0 0',
              backgroundColor: '#5B9BD5',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Python
          </div>
          <CodeBlock code={python} language="python" />
        </div>
      </div>
    </div>
  );
}

interface LessonCardProps {
  title: string;
  points: string[];
  comparisons: ComparisonProps[];
  children?: React.ReactNode;
}

export function LessonCard({ title, points, comparisons, children }: LessonCardProps) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>📖</span>
        <h3 style={{ margin: 0, color: '#4A4A4A', fontSize: 18 }}>{title}</h3>
      </div>

      {points.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          {points.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14, color: '#4A4A4A', lineHeight: 1.7 }}>
              <span style={{ color: '#E8927C', flexShrink: 0 }}>●</span>
              <span>{p}</span>
            </div>
          ))}
        </div>
      )}

      {comparisons.map((c, i) => (
        <CodeComparison key={i} {...c} />
      ))}

      {children}
    </div>
  );
}
