const NAV_ITEMS = [
  { id: 'home', emoji: '🏠', label: 'Home', paid: false },
  { id: 'program', emoji: '📅', label: 'Program', paid: false },
  { id: 'journal', emoji: '📓', label: 'Journal', paid: true },
  { id: 'circle', emoji: '🌿', label: 'Circle', paid: true },
  { id: 'insights', emoji: '✨', label: 'Insights', paid: true },
]

export default function DashboardLayout({ tab, onTabChange, user, isPremium, onShowPaywall, children }) {
  const weekNum = user?.birthDate
    ? Math.max(1, Math.floor((new Date() - new Date(user.birthDate)) / (1000 * 60 * 60 * 24 * 7)))
    : null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fffaf9' }}>

      {/* SIDEBAR — desktop only */}
      <aside style={{
        width: 240, background: '#fff', borderRight: '1px solid #ffe0e8',
        display: 'flex', flexDirection: 'column', padding: '28px 0',
        position: 'fixed', top: 0, left: 0, height: '100vh',
        zIndex: 50,
      }} className="sidebar">

        {/* Logo */}
        <div style={{ padding: '0 24px 28px', borderBottom: '1px solid #ffe0e8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🌸</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#d4537e' }}>Fourth Trimester</span>
          </div>
        </div>

        {/* User info */}
        {user && (
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #ffe0e8' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: '#fbeaf0', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 20, marginBottom: 10,
            }}>👶</div>
            <div style={{ fontWeight: 600, color: '#3d2030', fontSize: 15 }}>{user.name}</div>
            {weekNum && (
              <div style={{ fontSize: 12, color: '#b08090', marginTop: 2 }}>
                Week {weekNum} postpartum
              </div>
            )}
          </div>
        )}

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {NAV_ITEMS.map(item => {
            const isActive = tab === item.id
            const isLocked = item.paid && !isPremium
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isLocked) { onShowPaywall() } else { onTabChange(item.id) }
                }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px', borderRadius: 12, border: 'none',
                  background: isActive ? '#fbeaf0' : 'transparent',
                  color: isActive ? '#d4537e' : '#7a4f5e',
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: 15,
                  fontWeight: isActive ? 600 : 400,
                  marginBottom: 4, textAlign: 'left',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ fontSize: 18 }}>{item.emoji}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {isLocked && (
                  <span style={{
                    fontSize: 10, background: '#d4537e', color: '#fff',
                    borderRadius: 6, padding: '2px 6px', fontWeight: 600,
                  }}>PRO</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Upgrade banner (free users) */}
        {!isPremium && (
          <div style={{
            margin: '0 12px 16px', background: 'linear-gradient(135deg, #fff0f4, #ffe0e8)',
            borderRadius: 16, padding: '16px',
            border: '1px solid #ffb3c6',
          }}>
            <div style={{ fontSize: 18, marginBottom: 6 }}>✨</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#d4537e', marginBottom: 4 }}>Unlock Premium</div>
            <div style={{ fontSize: 12, color: '#b08090', marginBottom: 12, lineHeight: 1.4 }}>Journal, Circle, Insights + all exercises</div>
            <button onClick={onShowPaywall} style={{
              width: '100%', padding: '9px', borderRadius: 50,
              background: 'linear-gradient(135deg, #ff5c8a, #d44872)',
              color: '#fff', border: 'none', fontSize: 12,
              fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>$9.99 / month</button>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh' }} className="dashboard-main">

        {/* Top bar */}
        <div style={{
          background: '#fff', borderBottom: '1px solid #ffe0e8',
          padding: '16px 32px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#3d2030', margin: 0 }}>
              {NAV_ITEMS.find(n => n.id === tab)?.emoji} {NAV_ITEMS.find(n => n.id === tab)?.label}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isPremium && (
              <span style={{
                background: '#fbeaf0', color: '#d4537e',
                borderRadius: 50, padding: '4px 14px', fontSize: 12, fontWeight: 600,
              }}>Premium ✓</span>
            )}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#fbeaf0', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 16,
            }}>🌸</div>
          </div>
        </div>

        {/* Tab content */}
        <div style={{ padding: '0', maxWidth: 720, margin: '0 auto' }}>
          {children}
        </div>
      </main>

      {/* BOTTOM NAV — mobile only */}
      <nav className="mobile-nav">
        {NAV_ITEMS.map(item => {
          const isActive = tab === item.id
          const isLocked = item.paid && !isPremium
          return (
            <button
              key={item.id}
              onClick={() => isLocked ? onShowPaywall() : onTabChange(item.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 3, padding: '8px 0', border: 'none', background: 'none',
                cursor: 'pointer', fontFamily: 'inherit', position: 'relative',
              }}
            >
              <span style={{ fontSize: 22, transition: 'transform 0.15s', transform: isActive ? 'scale(1.2)' : 'scale(1)' }}>{item.emoji}</span>
              <span style={{ fontSize: 10, color: isActive ? '#d4537e' : '#b08090', fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
              {isLocked && (
                <span style={{
                  position: 'absolute', top: 2, right: 4,
                  fontSize: 8, background: '#d4537e', color: '#fff',
                  borderRadius: 4, padding: '1px 4px', fontWeight: 600,
                }}>PRO</span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
