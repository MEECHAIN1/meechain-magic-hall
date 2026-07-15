export default function QuestHall({ quests, onQuestConfirm }) {
  const list = quests?.quests || [];

  return (
    <section className="glass-panel hall-section">
      <div className="section-head">
        <div>
          <span className="chip chip-gold">🎮 Quest</span>
          <h2>Daily Quest Board</h2>
        </div>
        <div className="mini-status">{quests?.completedCount || 0}/{quests?.totalCount || list.length} complete</div>
      </div>

      <div className="quest-grid">
        {list.map((quest) => (
          <div key={quest.id} className={quest.completed ? 'quest-card complete' : 'quest-card'}>
            <div className="quest-top">
              <strong>{quest.label}</strong>
              <span className="tiny-chip">{quest.mode}</span>
            </div>
            <p>{quest.desc}</p>
            <button
              className={quest.completed || quest.mode !== 'manual' ? 'ghost-btn' : 'primary-btn'}
              disabled={quest.completed || quest.mode !== 'manual'}
              onClick={() => onQuestConfirm(quest.id)}
            >
              {quest.completed ? 'สำเร็จแล้ว' : quest.mode === 'manual' ? 'ยืนยันภารกิจ' : 'Auto-complete'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
