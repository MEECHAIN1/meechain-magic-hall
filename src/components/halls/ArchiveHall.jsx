const docs = [
  ['API Docs', 'Generate JSDoc จาก server.js และ src/js'],
  ['Deployment Guide', 'Vercel + Netlify proxy config ถูกใส่มาให้แล้ว'],
  ['Runbook', 'Guardian actions, fallback plan, maintenance ritual'],
  ['Monitoring Guide', 'Magic Orb, /health, /api/magic/orb, /api/magic/realm-vision'],
  ['Architecture', 'Magic layer ครอบ core API เดิมด้วยภาษาประสบการณ์'],
  ['Contribution Guide', 'แยก halls เป็น component พร้อม maintain ต่อได้']
];

export default function ArchiveHall() {
  return (
    <section className="glass-panel hall-section">
      <div className="section-head">
        <div>
          <span className="chip chip-violet">📜 Archive</span>
          <h2>Docs & Runbooks</h2>
        </div>
      </div>

      <div className="archive-grid">
        {docs.map(([title, desc]) => (
          <div key={title} className="archive-card">
            <strong>{title}</strong>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
