function Metric({ label, value, subvalue }) {
  return (
    <div className="metric-card elevated">
      <span>{label}</span>
      <strong>{value}</strong>
      {subvalue ? <small>{subvalue}</small> : null}
    </div>
  );
}

function RelicCard({ tone = 'blue', icon, title, subtitle, value, foot }) {
  return (
    <div className={`relic-card ${tone}`}>
      <div className="relic-title">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      <div className="relic-icon">{icon}</div>
      <div>
        <strong>{value}</strong>
        <div className="relic-meter" />
        <small>{foot}</small>
      </div>
    </div>
  );
}

export default function NetworkHall({ networkMetrics, orb, vision }) {
  const orbEntries = orb ? Object.values(orb) : [];
  const recentTransactions = vision?.recentTransactions || [];

  return (
    <section className="glass-panel hall-section">
      <div className="section-head">
        <div>
          <span className="chip chip-blue">⚡ Network</span>
          <h2>Monitoring Relics</h2>
        </div>
        <div className="mini-status">Live poll · 6s</div>
      </div>

      <div className="network-relic-grid">
        <RelicCard
          icon="🔮"
          title="Orb of Connectivity"
          subtitle="RPC Status"
          value={`${networkMetrics.latency} latency`}
          foot={`${networkMetrics.rpcHealth} health · all systems watched`}
        />
        <RelicCard
          tone="ember"
          icon="🗡️"
          title="Blade of Quests"
          subtitle="Contract Activity"
          value={`${recentTransactions.length || 3} pending txns`}
          foot={`Chain height ${networkMetrics.chainHeight}`}
        />
        <RelicCard
          tone="violet"
          icon="🪙"
          title="Sacred Coin of MEE"
          subtitle="Network TPS"
          value={`${networkMetrics.tps} tx/s`}
          foot={`${networkMetrics.gas} gas · ${networkMetrics.bridgeStatus}`}
        />
      </div>

      <div className="metric-grid four-col">
        <Metric label="RPC Health" value={networkMetrics.rpcHealth} subvalue="derived from /health" />
        <Metric label="Chain Height" value={networkMetrics.chainHeight} subvalue={orb?.chainEnergy?.detail} />
        <Metric label="Validators" value={networkMetrics.validators} subvalue={orb?.validatorForce?.detail} />
        <Metric label="Latency" value={networkMetrics.latency} subvalue="simulated pulse over live block" />
        <Metric label="TPS" value={networkMetrics.tps} subvalue="dashboard estimate" />
        <Metric label="Gas" value={networkMetrics.gas} subvalue="runtime cost pulse" />
        <Metric label="Bridge" value={networkMetrics.bridgeStatus} subvalue="cross-system readiness" />
        <Metric label="Explorer" value={networkMetrics.explorer} subvalue={`Chain ${networkMetrics.chainId}`} />
      </div>

      <div className="dual-grid">
        <div className="inner-panel">
          <h3>Magic Orb Signals</h3>
          <div className="stack-list">
            {orbEntries.map((entry) => (
              <div key={entry.label} className="list-row">
                <div>
                  <strong>{entry.status} {entry.label}</strong>
                  <small>{entry.detail}</small>
                </div>
                <span className="tiny-chip">synced</span>
              </div>
            ))}
          </div>
        </div>

        <div className="inner-panel">
          <h3>Realm Vision Feed</h3>
          <div className="stack-list">
            <div className="list-row">
              <div>
                <strong>Latest Block</strong>
                <small>{vision?.latestBlock || networkMetrics.chainHeight}</small>
              </div>
              <span className="tiny-chip gold">live</span>
            </div>
            <div className="list-row">
              <div>
                <strong>Guardians Online</strong>
                <small>{vision?.guardiansOnline || networkMetrics.validators}</small>
              </div>
              <span className="tiny-chip">watching</span>
            </div>
            {recentTransactions.length ? recentTransactions.map((tx) => (
              <div key={tx.txHash} className="list-row">
                <div>
                  <strong>{tx.amount}</strong>
                  <small>{tx.from} → {tx.to}</small>
                </div>
                <span className="tiny-chip">tx</span>
              </div>
            )) : <p className="empty-copy">ยังไม่มี transaction feed จริงจาก explorer — พร้อมต่อ endpoint เพิ่มได้ทันที</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
