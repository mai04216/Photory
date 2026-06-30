interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
}

export function ProgressBar({ current, total, showLabel = true }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: '#9B9B9B' }}>
          <span>{current}/{total} 完了</span>
          <span>{pct}%</span>
        </div>
      )}
      <div
        style={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#E8DED4',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 5,
            background: 'linear-gradient(90deg, #E8927C, #7BAFB0)',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}
