import { useState } from 'react';

const fallbackMap: Record<string, string> = {
  home: '🏠',
  book: '📖',
  pencil: '✏️',
  check: '✅',
  lightbulb: '💡',
  lock: '🔒',
  code: '💻',
  network: '🌐',
  file: '📄',
  gear: '⚙️',
  flower: '🌸',
  coffee: '☕',
  star: '⭐',
  'arrow-right': '→',
  clock: '🕐',
};

interface IconProps {
  name: string;
  fallback?: string;
  size?: number;
  className?: string;
}

export function Icon({ name, fallback, size = 24, className }: IconProps) {
  const [error, setError] = useState(false);
  const fb = fallback || fallbackMap[name] || '•';

  if (error) {
    return (
      <span
        className={className}
        style={{ fontSize: size * 0.8, lineHeight: `${size}px`, display: 'inline-block', width: size, height: size, textAlign: 'center' }}
        role="img"
        aria-label={name}
      >
        {fb}
      </span>
    );
  }

  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}icons/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      onError={() => setError(true)}
    />
  );
}
