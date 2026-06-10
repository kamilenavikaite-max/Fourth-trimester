import { useState } from 'react'

const MOOD_TAGS = [
  { id: 'grateful', emoji: '🙏', label: 'Grateful' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'hopeful', emoji: '🌤️', label: 'Hopeful' },
  { id: 'overwhelmed', emoji: '🌊', label: 'Overwhelmed' },
  { id: 'loved', emoji: '💕', label: 'Loved' },
  { id: 'lonely', emoji: '🌙', label: 'Lonely' },
  { id: 'proud', emoji: '⭐', label: 'Proud' },
]

const TAG_COLORS = {
  grateful: '#e8f5e9',
  anxious: '#fff3e0',
  tired: '#ede7f6',
  hopeful: '#e1f5fe',
  overwhelmed: '#e3f2fd',
  loved: '#fce4ec',
  lonely: '#f3e5f5',
  proud: '#fffde7',
}

export default function JournalTab({ journals, onAdd }) {
  const [text, setText] = useState('')
  const [selectedMood, setSelectedMood] = useState(null)
  const [expanded, setExpanded] = useState(null)

  const handleSubmit = () => {
    if (!text.trim()) return
    onAdd({
      id: Date.now(),
      text: text.trim(),
      mood: selectedMood,
      date: 'just now',
    })
    setText('')
    setSelectedMood(null)
  }

  const moodTag = MOOD_TAGS.find(m => m.id === selectedMood)

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--pink-100) 0%, var(--cream) 100%)',
        padding: '52px 20px 20px',
      }}>
        <h1>My Journal</h1>
        <p style={{ color: 'var(--text-light)', fontSize: 14, marginTop: 4 }}>
          A private space, just for you.
        </p>
      </div>

      {/* Write area */}
      <div className="card">
        <textarea
          rows={5}
          placeholder="How are you feeling today? There's no right or wrong answer here..."
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        {/* Mood tags */}
        <p style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
          How would you label this moment?
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {MOOD_TAGS.map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedMood(prev => prev === tag.id ? null : tag.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 50,
                border: `1.5px solid ${selectedMood === tag.id ? 'var(--pink-400)' : 'var(--pink-100)'}`,
                background: selectedMood === tag.id ? 'var(--pink-100)' : '#fff',
                fontSize: 13,
                color: 'var(--text-dark)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <span>{tag.emoji}</span>
              <span>{tag.label}</span>
            </button>
          ))}
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!text.trim()}
          style={{ opacity: text.trim() ? 1 : 0.5 }}
        >
          Save entry
        </button>
      </div>

      {/* Past entries */}
      <div style={{ padding: '4px 16px 8px' }}>
        <h3 style={{ color: 'var(--text-mid)', fontWeight: 'normal', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          Past entries
        </h3>
      </div>

      {journals.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-light)', padding: '32px 24px', fontSize: 15 }}>
          Your journal entries will appear here. 🌸
        </div>
      )}

      {journals.map(entry => {
        const tag = MOOD_TAGS.find(m => m.id === entry.mood)
        const isOpen = expanded === entry.id
        const preview = entry.text.length > 100 ? entry.text.slice(0, 100) + '…' : entry.text

        return (
          <div
            key={entry.id}
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => setExpanded(isOpen ? null : entry.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {tag && (
                  <span style={{
                    background: TAG_COLORS[entry.mood] || 'var(--pink-50)',
                    padding: '3px 10px',
                    borderRadius: 50,
                    fontSize: 12,
                    color: 'var(--text-mid)',
                  }}>
                    {tag.emoji} {tag.label}
                  </span>
                )}
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-light)', flexShrink: 0, marginLeft: 8 }}>
                {entry.date}
              </span>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-dark)', lineHeight: 1.6 }}>
              {isOpen ? entry.text : preview}
            </p>
            {entry.text.length > 100 && (
              <span style={{ fontSize: 12, color: 'var(--pink-400)', marginTop: 6, display: 'block' }}>
                {isOpen ? 'Show less' : 'Read more'}
              </span>
            )}
          </div>
        )
      })}

      <div style={{ height: 8 }} />
    </div>
  )
}
