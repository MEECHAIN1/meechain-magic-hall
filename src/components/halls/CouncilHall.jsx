const proposals = [
  { id: 'P-001', title: 'Open Guardian Program', status: 'Voting' },
  { id: 'P-002', title: 'Magic Hall public beta', status: 'Discussion' },
  { id: 'P-003', title: 'MeeBot knowledge expansion', status: 'Draft' }
];

export default function CouncilHall() {
  return (
    <section className="glass-panel hall-section">
      <div className="section-head">
        <div>
          <span className="chip chip-purple">🏛 Council</span>
          <h2>DAO Chamber</h2>
        </div>
      </div>

      <div className="stack-list">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="list-row">
            <div>
              <strong>{proposal.title}</strong>
              <small>{proposal.id}</small>
            </div>
            <span className="tiny-chip gold">{proposal.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
