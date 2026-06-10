const tabs = [
  { id: 'home', icon: '🏠', label: 'Home', paid: false },
  { id: 'journal', icon: '📓', label: 'Journal', paid: true },
  { id: 'circle', icon: '🌿', label: 'Circle', paid: true },
  { id: 'insights', icon: '✨', label: 'Insights', paid: true },
]

export default function NavBar({ current, onChange, isPremium }) {
  return (
    <nav className="navbar">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`nav-item${current === t.id ? ' active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className="nav-icon">{t.icon}</span>
          <span className="nav-label">{t.label}</span>
          {t.paid && !isPremium && (
            <span style={{
              position: 'absolute', top: 4, right: 8,
              fontSize: 9, background: '#d4537e',
              color: '#fff', borderRadius: 6,
              padding: '1px 5px', fontWeight: 600,
            }}>PRO</span>
          )}
        </button>
      ))}
    </nav>
  )
}
