const tracks = [
  ['Interactive Tutorials', 'เรียน flow จาก activate key → relic → ritual'],
  ['Developer Path', 'เข้าใจ endpoint หลักของ magic layer แบบเร็ว'],
  ['Validator Path', 'monitor, guardian actions, fallback thinking'],
  ['Sandbox', 'พื้นที่ทดลอง UI/UX และ mock chain scenarios'],
  ['Achievements', 'ทำกิจกรรมแล้วปลด badge เพื่อ retention']
];

export default function AcademyHall() {
  return (
    <section className="glass-panel hall-section">
      <div className="section-head">
        <div>
          <span className="chip chip-cyan">🌟 Academy</span>
          <h2>Learning Paths</h2>
        </div>
      </div>

      <div className="archive-grid">
        {tracks.map(([title, desc]) => (
          <div key={title} className="archive-card">
            <strong>{title}</strong>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
