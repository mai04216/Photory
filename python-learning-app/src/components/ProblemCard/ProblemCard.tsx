import { useState } from 'react';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import { Icon } from '../Icon/Icon';

interface ProblemCardProps {
  id: string;
  question: string;
  hints: string[];
  answer: string;
  explanation: string;
  isCompleted: boolean;
  onComplete: () => void;
  onUncomplete: () => void;
}

export function ProblemCard({
  id,
  question,
  hints,
  answer,
  explanation,
  isCompleted,
  onComplete,
  onUncomplete,
}: ProblemCardProps) {
  const [userCode, setUserCode] = useState('');
  const [shownHints, setShownHints] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="card" style={{ borderLeft: isCompleted ? '4px solid #7BAFB0' : '4px solid #E8DED4' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Icon name={isCompleted ? 'check' : 'pencil'} size={20} />
        <span style={{ fontSize: 13, color: '#9B9B9B' }}>問題 {id.split('-')[1]?.replace('q', '')}</span>
        {isCompleted && <span style={{ fontSize: 12, color: '#7BAFB0', fontWeight: 500 }}>完了</span>}
      </div>

      <p style={{ color: '#4A4A4A', fontSize: 15, lineHeight: 1.8, marginBottom: 16, whiteSpace: 'pre-wrap' }}>{question}</p>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="ここにPythonコードを書いてみましょう..."
        style={{
          width: '100%',
          minHeight: 120,
          padding: 16,
          borderRadius: 12,
          border: '2px solid #E8DED4',
          fontFamily: "'Fira Code', 'Source Code Pro', monospace",
          fontSize: 14,
          lineHeight: 1.6,
          backgroundColor: '#FAFAFA',
          color: '#4A4A4A',
          resize: 'vertical',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#E8927C')}
        onBlur={(e) => (e.target.style.borderColor = '#E8DED4')}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
        {hints.length > 0 && shownHints < hints.length && (
          <button className="btn btn-hint" onClick={() => setShownHints((s) => s + 1)}>
            <Icon name="lightbulb" size={16} />
            ヒントを見る ({shownHints}/{hints.length})
          </button>
        )}
        <button className="btn btn-secondary" onClick={() => setShowAnswer((s) => !s)}>
          {showAnswer ? '答えを隠す' : '答えを見る'}
        </button>
        {!isCompleted ? (
          <button className="btn btn-primary" onClick={onComplete}>
            <Icon name="check" size={16} />
            完了にする
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={onUncomplete}>
            未完了に戻す
          </button>
        )}
      </div>

      {shownHints > 0 && (
        <div style={{ marginTop: 16 }}>
          {hints.slice(0, shownHints).map((h, i) => (
            <div
              key={i}
              style={{
                padding: '10px 16px',
                marginBottom: 8,
                borderRadius: 8,
                backgroundColor: '#FFF5E6',
                border: '1px solid #F2C078',
                fontSize: 14,
                color: '#4A4A4A',
              }}
            >
              <span style={{ color: '#F2C078', marginRight: 8 }}>💡</span>
              {h}
            </div>
          ))}
        </div>
      )}

      {showAnswer && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, color: '#7BAFB0', fontWeight: 700, marginBottom: 8 }}>模範解答</div>
          <CodeBlock code={answer} />
          <div
            style={{
              marginTop: 12,
              padding: '12px 16px',
              borderRadius: 8,
              backgroundColor: '#F0FAF0',
              border: '1px solid #7BAFB0',
              fontSize: 14,
              color: '#4A4A4A',
              lineHeight: 1.7,
            }}
          >
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
}
