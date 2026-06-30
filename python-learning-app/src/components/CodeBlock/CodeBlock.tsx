import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'python' }: CodeBlockProps) {
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', fontSize: 14 }}>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '16px 20px',
          borderRadius: 12,
          fontFamily: "'Fira Code', 'Source Code Pro', monospace",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
