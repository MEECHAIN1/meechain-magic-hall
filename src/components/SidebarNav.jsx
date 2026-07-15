export default function SidebarNav({ halls, activeHall, setActiveHall }) {
  return (
    <aside className="sidebar glass-panel">
      <div className="brand-lockup">
        <div className="brand-icon">🪄</div>
        <div>
          <p className="eyebrow">MeeChain Magic Hall</p>
          <h2>Command Center</h2>
        </div>
      </div>

      <nav className="nav-stack">
        {halls.map((hall) => (
          <button
            key={hall.id}
            onClick={() => setActiveHall(hall.id)}
            className={hall.id === activeHall ? 'nav-btn active' : 'nav-btn'}
          >
            {hall.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Style anchor</p>
        <strong>Grid + glow + ritual cards</strong>
      </div>
    </aside>
  );
}
