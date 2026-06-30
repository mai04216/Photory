interface DiagramBlockProps {
  title: string;
  children: React.ReactNode;
}

export function DiagramBlock({ title, children }: DiagramBlockProps) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h4 style={{ color: '#4A4A4A', marginBottom: 16, fontSize: 15 }}>{title}</h4>
      <div style={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
