export function ListIndexDiagram() {
  const items = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
  const boxW = 100, boxH = 50, gap = 6, startX = 20, startY = 40;
  const totalW = items.length * (boxW + gap) + startX * 2;

  return (
    <svg width={totalW} height={120} viewBox={`0 0 ${totalW} 120`} style={{ maxWidth: '100%' }}>
      <text x={totalW / 2} y={20} textAnchor="middle" fontSize={14} fill="#4A4A4A" fontFamily="sans-serif" fontWeight={500}>
        リスト（list）のインデックス
      </text>
      {items.map((item, i) => {
        const x = startX + i * (boxW + gap);
        return (
          <g key={i}>
            <rect x={x} y={startY} width={boxW} height={boxH} rx={8} fill="#FFF8F3" stroke="#E8927C" strokeWidth={2} />
            <text x={x + boxW / 2} y={startY + boxH / 2 + 5} textAnchor="middle" fontSize={13} fill="#4A4A4A" fontFamily="sans-serif">
              "{item}"
            </text>
            <text x={x + boxW / 2} y={startY + boxH + 18} textAnchor="middle" fontSize={12} fill="#5B9BD5" fontFamily="sans-serif" fontWeight={700}>
              [{i}]
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DictStructureDiagram() {
  const entries = [
    { key: '"name"', value: '"田中"' },
    { key: '"age"', value: '30' },
    { key: '"city"', value: '"東京"' },
  ];
  const startY = 40;
  const rowH = 44;
  const keyW = 100, valW = 100, arrowW = 60;
  const startX = 40;
  const totalW = startX * 2 + keyW + arrowW + valW;
  const totalH = startY + entries.length * rowH + 20;

  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} style={{ maxWidth: '100%' }}>
      <text x={totalW / 2} y={20} textAnchor="middle" fontSize={14} fill="#4A4A4A" fontFamily="sans-serif" fontWeight={500}>
        辞書（dict）のキー → 値
      </text>
      {entries.map((e, i) => {
        const y = startY + i * rowH;
        return (
          <g key={i}>
            <rect x={startX} y={y} width={keyW} height={32} rx={8} fill="#E8927C" fillOpacity={0.15} stroke="#E8927C" strokeWidth={2} />
            <text x={startX + keyW / 2} y={y + 20} textAnchor="middle" fontSize={13} fill="#4A4A4A" fontFamily="sans-serif">{e.key}</text>
            <line x1={startX + keyW + 8} y1={y + 16} x2={startX + keyW + arrowW - 8} y2={y + 16} stroke="#7BAFB0" strokeWidth={2} strokeLinecap="round" markerEnd="url(#arrowhead)" />
            <rect x={startX + keyW + arrowW} y={y} width={valW} height={32} rx={8} fill="#7BAFB0" fillOpacity={0.15} stroke="#7BAFB0" strokeWidth={2} />
            <text x={startX + keyW + arrowW + valW / 2} y={y + 20} textAnchor="middle" fontSize={13} fill="#4A4A4A" fontFamily="sans-serif">{e.value}</text>
          </g>
        );
      })}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#7BAFB0" />
        </marker>
      </defs>
    </svg>
  );
}

export function LoopFlowchartDiagram() {
  return (
    <svg width={480} height={280} viewBox="0 0 480 280" style={{ maxWidth: '100%' }}>
      <text x={240} y={20} textAnchor="middle" fontSize={14} fill="#4A4A4A" fontFamily="sans-serif" fontWeight={500}>
        for / while ループのフロー
      </text>

      {/* for loop */}
      <text x={120} y={50} textAnchor="middle" fontSize={13} fill="#5B9BD5" fontFamily="sans-serif" fontWeight={700}>for ループ</text>
      <rect x={50} y={60} width={140} height={32} rx={8} fill="#5B9BD5" fillOpacity={0.15} stroke="#5B9BD5" strokeWidth={2} />
      <text x={120} y={80} textAnchor="middle" fontSize={12} fill="#4A4A4A" fontFamily="sans-serif">イテラブルから取得</text>
      <line x1={120} y1={92} x2={120} y2={110} stroke="#5B9BD5" strokeWidth={2} markerEnd="url(#arrowBlue)" />

      <polygon points="60,130 120,110 180,130 120,150" fill="#FFF8F3" stroke="#5B9BD5" strokeWidth={2} />
      <text x={120} y={134} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">要素あり？</text>

      <line x1={120} y1={150} x2={120} y2={175} stroke="#5B9BD5" strokeWidth={2} markerEnd="url(#arrowBlue)" />
      <text x={130} y={165} fontSize={10} fill="#7BAFB0" fontFamily="sans-serif">Yes</text>

      <rect x={60} y={175} width={120} height={32} rx={8} fill="#E8927C" fillOpacity={0.15} stroke="#E8927C" strokeWidth={2} />
      <text x={120} y={195} textAnchor="middle" fontSize={12} fill="#4A4A4A" fontFamily="sans-serif">処理を実行</text>

      <line x1={60} y1={191} x2={30} y2={191} stroke="#5B9BD5" strokeWidth={2} />
      <line x1={30} y1={130} x2={30} y2={191} stroke="#5B9BD5" strokeWidth={2} />
      <line x1={30} y1={130} x2={60} y2={130} stroke="#5B9BD5" strokeWidth={2} markerEnd="url(#arrowBlue)" />

      <line x1={180} y1={130} x2={210} y2={130} stroke="#E8927C" strokeWidth={2} />
      <text x={190} y={124} fontSize={10} fill="#E8927C" fontFamily="sans-serif">No</text>
      <rect x={210} y={114} width={50} height={32} rx={16} fill="#7BAFB0" fillOpacity={0.2} stroke="#7BAFB0" strokeWidth={2} />
      <text x={235} y={134} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">終了</text>

      {/* while loop */}
      <text x={380} y={50} textAnchor="middle" fontSize={13} fill="#E8927C" fontFamily="sans-serif" fontWeight={700}>while ループ</text>
      <polygon points={`320,100 380,80 440,100 380,120`} fill="#FFF8F3" stroke="#E8927C" strokeWidth={2} />
      <text x={380} y={104} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">条件式?</text>

      <line x1={380} y1={120} x2={380} y2={148} stroke="#E8927C" strokeWidth={2} markerEnd="url(#arrowOrange)" />
      <text x={390} y={138} fontSize={10} fill="#7BAFB0" fontFamily="sans-serif">True</text>

      <rect x={320} y={148} width={120} height={32} rx={8} fill="#E8927C" fillOpacity={0.15} stroke="#E8927C" strokeWidth={2} />
      <text x={380} y={168} textAnchor="middle" fontSize={12} fill="#4A4A4A" fontFamily="sans-serif">処理を実行</text>

      <line x1={320} y1={164} x2={290} y2={164} stroke="#E8927C" strokeWidth={2} />
      <line x1={290} y1={100} x2={290} y2={164} stroke="#E8927C" strokeWidth={2} />
      <line x1={290} y1={100} x2={320} y2={100} stroke="#E8927C" strokeWidth={2} markerEnd="url(#arrowOrange)" />

      <line x1={440} y1={100} x2={460} y2={100} stroke="#9B9B9B" strokeWidth={2} />
      <text x={445} y={94} fontSize={10} fill="#E8927C" fontFamily="sans-serif">False</text>
      <rect x={452} y={84} width={50} height={32} rx={16} fill="#7BAFB0" fillOpacity={0.2} stroke="#7BAFB0" strokeWidth={2} />
      <text x={477} y={104} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">終了</text>

      <defs>
        <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#5B9BD5" />
        </marker>
        <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#E8927C" />
        </marker>
      </defs>
    </svg>
  );
}

export function InheritanceDiagram() {
  return (
    <svg width={360} height={220} viewBox="0 0 360 220" style={{ maxWidth: '100%' }}>
      <text x={180} y={20} textAnchor="middle" fontSize={14} fill="#4A4A4A" fontFamily="sans-serif" fontWeight={500}>
        クラスの継承関係
      </text>

      <rect x={110} y={36} width={140} height={56} rx={10} fill="#E8927C" fillOpacity={0.12} stroke="#E8927C" strokeWidth={2} />
      <text x={180} y={58} textAnchor="middle" fontSize={13} fill="#E8927C" fontFamily="sans-serif" fontWeight={700}>Animal（親クラス）</text>
      <text x={180} y={78} textAnchor="middle" fontSize={11} fill="#9B9B9B" fontFamily="sans-serif">name, speak()</text>

      <line x1={140} y1={92} x2={100} y2={130} stroke="#7BAFB0" strokeWidth={2} markerEnd="url(#arrowGreen)" />
      <line x1={220} y1={92} x2={260} y2={130} stroke="#7BAFB0" strokeWidth={2} markerEnd="url(#arrowGreen)" />

      <rect x={20} y={130} width={140} height={56} rx={10} fill="#5B9BD5" fillOpacity={0.12} stroke="#5B9BD5" strokeWidth={2} />
      <text x={90} y={152} textAnchor="middle" fontSize={13} fill="#5B9BD5" fontFamily="sans-serif" fontWeight={700}>Dog（子クラス）</text>
      <text x={90} y={172} textAnchor="middle" fontSize={11} fill="#9B9B9B" fontFamily="sans-serif">speak() → "ワン!"</text>

      <rect x={200} y={130} width={140} height={56} rx={10} fill="#5B9BD5" fillOpacity={0.12} stroke="#5B9BD5" strokeWidth={2} />
      <text x={270} y={152} textAnchor="middle" fontSize={13} fill="#5B9BD5" fontFamily="sans-serif" fontWeight={700}>Cat（子クラス）</text>
      <text x={270} y={172} textAnchor="middle" fontSize={11} fill="#9B9B9B" fontFamily="sans-serif">speak() → "ニャー!"</text>

      <text x={180} y={210} textAnchor="middle" fontSize={11} fill="#9B9B9B" fontFamily="sans-serif">
        ※ Pythonでは class Dog(Animal): で継承
      </text>

      <defs>
        <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#7BAFB0" />
        </marker>
      </defs>
    </svg>
  );
}

export function JsonTreeDiagram() {
  return (
    <svg width={400} height={260} viewBox="0 0 400 260" style={{ maxWidth: '100%' }}>
      <text x={200} y={20} textAnchor="middle" fontSize={14} fill="#4A4A4A" fontFamily="sans-serif" fontWeight={500}>
        JSON構造のツリー
      </text>

      <rect x={140} y={36} width={120} height={32} rx={10} fill="#E8927C" fillOpacity={0.15} stroke="#E8927C" strokeWidth={2} />
      <text x={200} y={56} textAnchor="middle" fontSize={12} fill="#4A4A4A" fontFamily="sans-serif">{'{ ルート }'}</text>

      <line x1={160} y1={68} x2={80} y2={100} stroke="#E8DED4" strokeWidth={2} />
      <line x1={200} y1={68} x2={200} y2={100} stroke="#E8DED4" strokeWidth={2} />
      <line x1={240} y1={68} x2={320} y2={100} stroke="#E8DED4" strokeWidth={2} />

      <rect x={20} y={100} width={120} height={28} rx={8} fill="#5B9BD5" fillOpacity={0.12} stroke="#5B9BD5" strokeWidth={2} />
      <text x={80} y={118} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">"name": "田中"</text>

      <rect x={150} y={100} width={100} height={28} rx={8} fill="#5B9BD5" fillOpacity={0.12} stroke="#5B9BD5" strokeWidth={2} />
      <text x={200} y={118} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">"age": 30</text>

      <rect x={260} y={100} width={120} height={28} rx={8} fill="#E8927C" fillOpacity={0.12} stroke="#E8927C" strokeWidth={2} />
      <text x={320} y={118} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">"skills": [...]</text>

      <line x1={290} y1={128} x2={260} y2={160} stroke="#E8DED4" strokeWidth={2} />
      <line x1={320} y1={128} x2={320} y2={160} stroke="#E8DED4" strokeWidth={2} />
      <line x1={350} y1={128} x2={380} y2={160} stroke="#E8DED4" strokeWidth={2} />

      <rect x={210} y={160} width={100} height={26} rx={8} fill="#7BAFB0" fillOpacity={0.12} stroke="#7BAFB0" strokeWidth={2} />
      <text x={260} y={177} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">"Python"</text>

      <rect x={270} y={160} width={100} height={26} rx={8} fill="#7BAFB0" fillOpacity={0.12} stroke="#7BAFB0" strokeWidth={2} />
      <text x={320} y={177} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">"Java"</text>

      <rect x={340} y={160} width={80} height={26} rx={8} fill="#7BAFB0" fillOpacity={0.12} stroke="#7BAFB0" strokeWidth={2} />
      <text x={380} y={177} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">"SQL"</text>

      <text x={200} y={220} textAnchor="middle" fontSize={11} fill="#9B9B9B" fontFamily="sans-serif">
        dict（辞書）とlist（リスト）のネスト構造
      </text>
    </svg>
  );
}

export function ApiFlowDiagram() {
  return (
    <svg width={500} height={180} viewBox="0 0 500 180" style={{ maxWidth: '100%' }}>
      <text x={250} y={20} textAnchor="middle" fontSize={14} fill="#4A4A4A" fontFamily="sans-serif" fontWeight={500}>
        API通信フロー（GET リクエスト）
      </text>

      <rect x={20} y={50} width={120} height={60} rx={12} fill="#5B9BD5" fillOpacity={0.15} stroke="#5B9BD5" strokeWidth={2} />
      <text x={80} y={75} textAnchor="middle" fontSize={12} fill="#5B9BD5" fontFamily="sans-serif" fontWeight={700}>クライアント</text>
      <text x={80} y={95} textAnchor="middle" fontSize={11} fill="#9B9B9B" fontFamily="sans-serif">Python script</text>

      <line x1={140} y1={70} x2={210} y2={70} stroke="#E8927C" strokeWidth={2} markerEnd="url(#arrowReq)" />
      <text x={175} y={63} textAnchor="middle" fontSize={10} fill="#E8927C" fontFamily="sans-serif">GET request</text>

      <line x1={210} y1={95} x2={140} y2={95} stroke="#7BAFB0" strokeWidth={2} markerEnd="url(#arrowRes)" />
      <text x={175} y={112} textAnchor="middle" fontSize={10} fill="#7BAFB0" fontFamily="sans-serif">JSON response</text>

      <rect x={210} y={50} width={100} height={60} rx={12} fill="#F2C078" fillOpacity={0.2} stroke="#F2C078" strokeWidth={2} />
      <text x={260} y={75} textAnchor="middle" fontSize={12} fill="#F2C078" fontFamily="sans-serif" fontWeight={700}>HTTP</text>
      <text x={260} y={95} textAnchor="middle" fontSize={11} fill="#9B9B9B" fontFamily="sans-serif">requests</text>

      <line x1={310} y1={70} x2={360} y2={70} stroke="#E8927C" strokeWidth={2} markerEnd="url(#arrowReq)" />
      <line x1={360} y1={95} x2={310} y2={95} stroke="#7BAFB0" strokeWidth={2} markerEnd="url(#arrowRes)" />

      <rect x={360} y={50} width={120} height={60} rx={12} fill="#E8927C" fillOpacity={0.15} stroke="#E8927C" strokeWidth={2} />
      <text x={420} y={75} textAnchor="middle" fontSize={12} fill="#E8927C" fontFamily="sans-serif" fontWeight={700}>サーバー</text>
      <text x={420} y={95} textAnchor="middle" fontSize={11} fill="#9B9B9B" fontFamily="sans-serif">REST API</text>

      <text x={250} y={150} textAnchor="middle" fontSize={11} fill="#4A4A4A" fontFamily="sans-serif">
        requests.get(url) → response.json() でデータ取得
      </text>

      <defs>
        <marker id="arrowReq" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#E8927C" />
        </marker>
        <marker id="arrowRes" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#7BAFB0" />
        </marker>
      </defs>
    </svg>
  );
}

export function DataPipelineDiagram() {
  const steps = [
    { label: '入力データ', sub: 'CSV / JSON', color: '#5B9BD5' },
    { label: '読み込み', sub: 'open / json', color: '#E8927C' },
    { label: 'フィルタ', sub: 'if / 内包表記', color: '#F2C078' },
    { label: '変換', sub: 'map / dict', color: '#E8927C' },
    { label: '出力', sub: 'JSON / print', color: '#7BAFB0' },
  ];
  const boxW = 90, boxH = 56, gap = 12, startX = 10, startY = 40;
  const totalW = steps.length * (boxW + gap) + startX * 2 + 20;

  return (
    <svg width={totalW} height={130} viewBox={`0 0 ${totalW} 130`} style={{ maxWidth: '100%' }}>
      <text x={totalW / 2} y={22} textAnchor="middle" fontSize={14} fill="#4A4A4A" fontFamily="sans-serif" fontWeight={500}>
        データ加工パイプライン
      </text>
      {steps.map((s, i) => {
        const x = startX + i * (boxW + gap + 20);
        return (
          <g key={i}>
            <rect x={x} y={startY} width={boxW} height={boxH} rx={10} fill={s.color} fillOpacity={0.12} stroke={s.color} strokeWidth={2} />
            <text x={x + boxW / 2} y={startY + 22} textAnchor="middle" fontSize={12} fill="#4A4A4A" fontFamily="sans-serif" fontWeight={500}>{s.label}</text>
            <text x={x + boxW / 2} y={startY + 40} textAnchor="middle" fontSize={10} fill="#9B9B9B" fontFamily="sans-serif">{s.sub}</text>
            {i < steps.length - 1 && (
              <line x1={x + boxW + 4} y1={startY + boxH / 2} x2={x + boxW + gap + 16} y2={startY + boxH / 2} stroke="#E8DED4" strokeWidth={2} markerEnd="url(#arrowPipe)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowPipe" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#E8DED4" />
        </marker>
      </defs>
    </svg>
  );
}

export const diagramComponents: Record<number, React.FC[]> = {
  2: [ListIndexDiagram, DictStructureDiagram],
  3: [LoopFlowchartDiagram],
  5: [InheritanceDiagram],
  8: [JsonTreeDiagram],
  11: [ApiFlowDiagram],
  13: [DataPipelineDiagram],
};
