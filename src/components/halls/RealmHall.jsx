function StatCard({ label, value, hint }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}

export default function RealmHall({ magicAddress, setMagicAddress, hall, achievements, questLog, onNavigate, onAskMeeBot }) {
  const adventurer = hall?.realmVision?.adventurers?.[0];
  const badgeCollection = hall?.badgeCollection || achievements || [];
  const timeline = hall?.questLog?.timeline || questLog?.timeline || [];

  return (
    <section className="glass-panel hall-section">
      <div className="section-head">
        <div>
          <span className="chip chip-green">🏛 Realm</span>
          <h2>Adventurer Profile</h2>
        </div>
        <button className="ghost-btn" onClick={onAskMeeBot}>ขอคำแนะนำ ritual ถัดไป</button>
      </div>

      <div className="address-bar">
        <label>Magic Key / Address</label>
        <div className="address-row">
          <input value={magicAddress} onChange={(e) => setMagicAddress(e.target.value)} placeholder="กรอก address หรือชื่อผู้ผจญภัย" />
          <button className="primary-btn" onClick={() => onNavigate('quest')}>ไป Daily Quest</button>
        </div>
      </div>

      <div className="metric-grid four-col">
        <StatCard label="Relics Held" value={adventurer?.relicsHeld ?? 0} hint="จาก Magic Hall endpoint" />
        <StatCard label="Badges" value={badgeCollection.length} hint="collection ที่ปลดล็อกแล้ว" />
        <StatCard label="Rituals Confirmed" value={questLog?.totalRitualsConfirmed ?? 0} hint="พิธีเติบโตที่ยืนยันแล้ว" />
        <StatCard label="Blessings Sent" value={questLog?.totalBlessingsSent ?? 0} hint="พรที่ส่งต่อแล้ว" />
      </div>

      <div className="dual-grid">
        <div className="inner-panel">
          <h3>Badge Vault</h3>
          <div className="badge-grid">
            {badgeCollection.length ? badgeCollection.map((badge) => (
              <div key={badge.id} className="badge-card">
                <div className="badge-icon">✦</div>
                <strong>{badge.label}</strong>
                <small>{badge.trigger}</small>
              </div>
            )) : <p className="empty-copy">ยังไม่มี badge — ลองเริ่มจาก Create Relic หรือ Activate Key</p>}
          </div>
        </div>

        <div className="inner-panel">
          <h3>Recent Activity</h3>
          <div className="timeline-list">
            {timeline.length ? timeline.slice(0, 6).map((item, index) => (
              <div key={`${item.type}-${index}`} className="timeline-item">
                <strong>{item.type}</strong>
                <span>{item.status}</span>
                <small>{new Date(item.timestamp).toLocaleString('th-TH')}</small>
              </div>
            )) : <p className="empty-copy">ยังไม่มี event log สำหรับ address นี้</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
