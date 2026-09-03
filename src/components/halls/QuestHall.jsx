const questArt = ['👹', '🧩', '💎', '🏰', '🐉', '📜'];
const rewardFor = (quest, index) => quest.reward || ['300 XP', '0.2 ETH', '750 XP', '1000 XP + 1 NFT'][index % 4];

export default function QuestHall({ quests, onQuestConfirm }) {
  const list = quests?.quests || [];

  return (
    <section className="glass-panel hall-section">
      <div className="section-head">
        <div>
          <span className="chip chip-gold">🎮 Quest</span>
          <h2>Ritual Quest Board</h2>
        </div>
        <div className="mini-status">{quests?.completedCount || 0}/{quests?.totalCount || list.length} complete</div>
      </div>

      <div className="quest-grid">
        {list.map((quest, index) => (
          <div key={quest.id} className={quest.completed ? 'quest-card complete' : 'quest-card'}>
            <div>
              <div className="quest-top">
                <strong>{questArt[index % questArt.length]} {quest.label}</strong>
                <span className={quest.completed ? 'tiny-chip gold' : 'tiny-chip'}>{quest.completed ? 'Completed' : quest.mode}</span>
              </div>
              <p>{quest.desc}</p>
            </div>
            <div className="quest-top">
              <span className="tiny-chip gold">🏆 {rewardFor(quest, index)}</span>
              <button
                className={quest.completed || quest.mode !== 'manual' ? 'ghost-btn' : 'primary-btn'}
                disabled={quest.completed || quest.mode !== 'manual'}
                onClick={() => onQuestConfirm(quest.id)}
              >
                {quest.completed ? 'สำเร็จแล้ว' : quest.mode === 'manual' ? 'Join Quest' : 'Auto-complete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
