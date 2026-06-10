import { useState } from 'react'

export default function CircleTab({ posts, onHeart, onPost }) {
  const [draft, setDraft] = useState('')

  const handlePost = () => {
    if (!draft.trim()) return
    onPost(draft.trim())
    setDraft('')
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--pink-100) 0%, var(--cream) 100%)',
        padding: '52px 20px 20px',
      }}>
        <h1>The Circle</h1>
        <p style={{ color: 'var(--text-light)', fontSize: 14, marginTop: 4 }}>
          An anonymous space for mamas, by mamas.
        </p>
      </div>

      {/* Anonymity notice */}
      <div style={{
        margin: '0 16px 4px',
        background: 'var(--pink-50)',
        border: '1px solid var(--pink-100)',
        borderRadius: 12,
        padding: '10px 14px',
        fontSize: 13,
        color: 'var(--text-mid)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span>🌿</span>
        <span>You appear as a random nature name. No one knows who you are.</span>
      </div>

      {/* Posts feed */}
      {posts.map(post => (
        <div key={post.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 50,
                background: 'linear-gradient(135deg, var(--pink-200), var(--pink-300))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, color: '#fff', fontWeight: 600,
              }}>
                {post.author[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{post.author}</div>
                <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{post.time}</div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 15, color: 'var(--text-dark)', lineHeight: 1.65, marginBottom: 14 }}>
            {post.text}
          </p>
          <button
            onClick={() => onHeart(post.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: post.hearted ? 'var(--pink-50)' : 'transparent',
              border: `1.5px solid ${post.hearted ? 'var(--pink-300)' : 'var(--pink-100)'}`,
              borderRadius: 50,
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: 14,
              color: post.hearted ? 'var(--pink-500)' : 'var(--text-light)',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            <span>{post.hearted ? '❤️' : '🤍'}</span>
            <span>{post.hearts}</span>
          </button>
        </div>
      ))}

      <div style={{ height: 8 }} />

      {/* Compose box — positioned above navbar */}
      <div style={{
        position: 'fixed',
        bottom: 76,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        background: '#fff',
        borderTop: '1px solid var(--pink-100)',
        padding: '12px 16px',
        display: 'flex',
        gap: 10,
        alignItems: 'flex-end',
        zIndex: 90,
        boxShadow: '0 -2px 10px rgba(200,100,130,0.07)',
      }}>
        <textarea
          rows={2}
          placeholder="Share something with the circle…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          style={{ flex: 1, borderRadius: 14, fontSize: 14 }}
        />
        <button
          onClick={handlePost}
          disabled={!draft.trim()}
          style={{
            background: draft.trim()
              ? 'linear-gradient(135deg, var(--pink-400), var(--pink-500))'
              : 'var(--pink-100)',
            border: 'none',
            borderRadius: 14,
            width: 44,
            height: 44,
            cursor: draft.trim() ? 'pointer' : 'default',
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
        >
          🌸
        </button>
      </div>
    </div>
  )
}
