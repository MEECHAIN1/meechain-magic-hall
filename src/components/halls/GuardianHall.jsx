export default function GuardianHall({ guardianState, networkMetrics }) {
  return (
    <section className="glass-panel hall-section">
      <div className="section-head">
        <div>
          <span className="chip chip-red">🛡 Guardian</span>
          <h2>Ops Center</h2>
        </div>
        <div className="mini-status">Latency {networkMetrics.latency}</div>
      </div>

      <div className="dual-grid guardian-layout">
        <div className="inner-panel">
          <h3>Incidents</h3>
          <div className="stack-list">
            {guardianState.incidents.map((incident) => (
              <div key={incident.id} className="list-row alert-row">
                <div>
                  <strong>{incident.type}</strong>
                  <small>{incident.time}</small>
                </div>
                <span className="severity-tag">{incident.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="inner-panel">
          <h3>Alerts</h3>
          <div className="stack-list">
            {guardianState.alerts.map((alert) => (
              <div key={alert.id} className={`list-row ${alert.level}`}>
                <div>
                  <strong>{alert.message}</strong>
                  <small>Level: {alert.level}</small>
                </div>
                <span className="tiny-chip">signal</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="action-strip">
        <button className="primary-btn">🔄 Restart Service</button>
        <button className="ghost-btn">🌐 Switch RPC</button>
        <button className="ghost-btn">🛠 Maintenance Mode</button>
      </div>
    </section>
  );
}
