import { useState } from 'react'

// ── helpers ──────────────────────────────────────────────────────────────────

function getBabyAge(birthDate) {
  if (!birthDate) return null
  const birth = new Date(birthDate)
  const now = new Date()
  const diffMs = now - birth
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30.44)

  if (diffWeeks < 1) return { label: `${diffDays} day${diffDays !== 1 ? 's' : ''}`, weeks: 0, days: diffDays }
  if (diffMonths < 2) return { label: `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`, weeks: diffWeeks, days: diffDays }
  return { label: `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`, weeks: diffWeeks, days: diffDays }
}

function getCommunityCount(weeks) {
  if (weeks <= 1) return '1,247'
  if (weeks <= 2) return '2,103'
  if (weeks <= 4) return '3,891'
  if (weeks <= 6) return '2,654'
  if (weeks <= 8) return '2,187'
  if (weeks <= 12) return '1,943'
  if (weeks <= 20) return '1,512'
  if (weeks <= 32) return '987'
  return '654'
}

// ── step definitions ──────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'challenge',
    title: 'What\'s your biggest challenge right now?',
    subtitle: 'Pick everything that feels true.',
    multi: true,
    options: [
      { emoji: '😴', label: 'Sleep deprivation' },
      { emoji: '😰', label: 'Anxiety or worry' },
      { emoji: '😢', label: 'Feeling low or sad' },
      { emoji: '😤', label: 'Mom guilt' },
      { emoji: '🤝', label: 'Loneliness' },
      { emoji: '💔', label: 'Loss of identity' },
      { emoji: '🧠', label: 'Brain fog' },
      { emoji: '💬', label: 'Relationship strain' },
    ],
  },
  {
    id: 'sleep',
    title: 'How has your sleep been lately?',
    subtitle: 'Be honest — this is a judgment-free zone.',
    multi: false,
    options: [
      { emoji: '💀', label: 'What is sleep?' },
      { emoji: '😵', label: 'Very broken — up every hour' },
      { emoji: '😕', label: 'Getting some stretches but exhausted' },
      { emoji: '🙂', label: 'Manageable most nights' },
      { emoji: '✨', label: 'Actually decent right now' },
    ],
  },
  {
    id: 'support',
    title: 'What kind of support matters most to you?',
    subtitle: 'We\'ll personalise your experience around this.',
    multi: true,
    options: [
      { emoji: '🧘', label: 'Breathing & calming exercises' },
      { emoji: '📓', label: 'A private space to write' },
      { emoji: '🌿', label: 'Community of other moms' },
      { emoji: '📈', label: 'Tracking my mood over time' },
      { emoji: '💭', label: 'Daily intentions & affirmations' },
      { emoji: '🧠', label: 'CBT tools for anxious thoughts' },
    ],
  },
]

// ── sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ step, total }) {
  return (
    <div style={{ width: '100%', height: 4, background: '#ffe0e8', borderRadius: 10, overflow: 'hidden', marginBottom: 40 }}>
      <div style={{
        height: '100%',
        width: `${(step / total) * 100}%`,
        background: 'linear-gradient(90deg, #ff5c8a, #d44872)',
        borderRadius: 10,
        transition: 'width 0.4s ease',
      }} />
    </div>
  )
}

function ChoiceChip({ emoji, label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '13px 18px', borderRadius: 14,
        border: selected ? '2px solid #d44872' : '1.5px solid #ffe0e8',
        background: selected ? '#fdf0f4' : '#fff',
        cursor: 'pointer', fontFamily: 'inherit',
        fontSize: 15, color: selected ? '#d44872' : '#555',
        fontWeight: selected ? 700 : 500,
        transition: 'all 0.15s',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: selected ? '0 4px 14px rgba(212,83,126,0.15)' : 'none',
        textAlign: 'left',
      }}
    >
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <span>{label}</span>
    </button>
  )
}

// ── main component ────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7 // name, date, info, founder, q1, q2, q3

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [answers, setAnswers] = useState({ challenge: [], sleep: '', support: [] })

  const age = getBabyAge(birthDate)

  const canNext = () => {
    if (step === 0) return name.trim().length > 0
    if (step === 1) return birthDate !== ''
    if (step === 2) return true // info slide
    if (step === 3) return true // founder story
    if (step === 4) return answers.challenge.length > 0
    if (step === 5) return answers.sleep !== ''
    if (step === 6) return answers.support.length > 0
    return true
  }

  const next = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1)
    } else {
      onComplete({ name, birthDate, answers })
    }
  }

  const back = () => setStep(s => s - 1)

  const toggleMulti = (field, val) => {
    setAnswers(a => ({
      ...a,
      [field]: a[field].includes(val)
        ? a[field].filter(v => v !== val)
        : [...a[field], val],
    }))
  }

  const setSingle = (field, val) => setAnswers(a => ({ ...a, [field]: val }))

  const firstName = name.trim().split(' ')[0]

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: '#fffaf9', fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Top bar */}
      <div style={{ padding: '24px 32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>🌸</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#3d2030' }}>Fourth Trimester</span>
        </div>
        <span style={{ fontSize: 13, color: '#b08090' }}>Step {Math.min(step + 1, TOTAL_STEPS)} of {TOTAL_STEPS}</span>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '16px 32px 0' }}>
        <ProgressBar step={step + 1} total={TOTAL_STEPS} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: '0 32px', maxWidth: 520, width: '100%', margin: '0 auto', justifyContent: 'center',
      }}>

        {/* ── STEP 0: Name ── */}
        {step === 0 && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div style={{ fontSize: 52, textAlign: 'center', marginBottom: 24 }}>👋</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: 10, textAlign: 'center' }}>
              Hi mama, what's your name?
            </h1>
            <p style={{ color: '#b08090', fontSize: 16, textAlign: 'center', marginBottom: 36, lineHeight: 1.6 }}>
              We'll use this to make your experience feel a little more personal.
            </p>
            <input
              type="text"
              placeholder="Your first name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && canNext() && next()}
              autoFocus
              style={{
                width: '100%', padding: '16px 20px', fontSize: 18,
                border: '2px solid #ffe0e8', borderRadius: 14,
                fontFamily: 'inherit', outline: 'none', color: '#1a1a2e',
                background: '#fff', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#d44872'}
              onBlur={e => e.target.style.borderColor = '#ffe0e8'}
            />
          </div>
        )}

        {/* ── STEP 1: Baby's birthday ── */}
        {step === 1 && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div style={{ fontSize: 52, textAlign: 'center', marginBottom: 24 }}>👶</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: 10, textAlign: 'center' }}>
              {firstName ? `Hey ${firstName}! ` : ''}When was your baby born?
            </h1>
            <p style={{ color: '#b08090', fontSize: 16, textAlign: 'center', marginBottom: 36, lineHeight: 1.6 }}>
              We'll connect you with moms at the exact same stage as you.
            </p>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
              style={{
                width: '100%', padding: '16px 20px', fontSize: 16,
                border: '2px solid #ffe0e8', borderRadius: 14,
                fontFamily: 'inherit', outline: 'none', color: '#1a1a2e',
                background: '#fff', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = '#d44872'}
              onBlur={e => e.target.style.borderColor = '#ffe0e8'}
            />
          </div>
        )}

        {/* ── STEP 2: Info / celebration slide ── */}
        {step === 2 && age && (
          <div style={{ animation: 'fadeUp 0.3s ease', textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: 34, fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: 16, lineHeight: 1.2 }}>
              Wow! Your baby is{' '}
              <span style={{ color: '#d44872' }}>{age.label} old.</span>
            </h1>
            <div style={{
              background: 'linear-gradient(135deg, #fdf0f4, #fff6f8)',
              border: '1.5px solid #ffd0de', borderRadius: 20,
              padding: '28px 24px', marginBottom: 28,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🌸</div>
              <p style={{ fontSize: 17, color: '#555', lineHeight: 1.7, marginBottom: 0 }}>
                There are{' '}
                <strong style={{ color: '#d44872' }}>{getCommunityCount(age.weeks)} moms</strong>
                {' '}in our Circle who have a {age.label} old baby right now.
                <br /><br />
                You are <strong>not</strong> going through this alone.
              </p>
            </div>
            <p style={{ fontSize: 14, color: '#b08090', lineHeight: 1.6 }}>
              The fourth trimester is one of the hardest chapters nobody warned us about. Let's get you some support.
            </p>
          </div>
        )}

        {/* ── STEP 3: Founder story ── */}
        {step === 3 && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28,
              background: 'linear-gradient(135deg, #fdf0f4, #fff6f8)',
              border: '1.5px solid #ffd0de', borderRadius: 20, padding: '20px 22px',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #ff85a1, #d44872)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 30, boxShadow: '0 4px 16px rgba(212,83,126,0.3)',
              }}>🌸</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#d44872', marginBottom: 2 }}>A note from the founder</div>
                <div style={{ fontSize: 13, color: '#b08090' }}>Mom of one · Built this from her bedroom at 3am</div>
              </div>
            </div>

            <p style={{ fontSize: 17, color: '#3d2030', lineHeight: 1.8, marginBottom: 18 }}>
              "I built Fourth Trimester because{' '}
              <strong>nobody warned me how hard the first year would actually be.</strong>
            </p>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.8, marginBottom: 18 }}>
              I had the baby blues that turned into postpartum anxiety. I cried in my OB's office and she handed me a leaflet. I felt completely alone in a house full of people who loved me.
            </p>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.8, marginBottom: 24 }}>
              I know what it feels like to smile for the photos while falling apart inside. To feel guilty for not enjoying every moment. To lie awake wondering if you're doing everything wrong.
            </p>
            <div style={{
              background: 'linear-gradient(135deg, #fdf0f4, #fff6f8)',
              border: '1.5px solid #ffd0de', borderRadius: 16,
              padding: '18px 20px',
            }}>
              <p style={{ fontSize: 16, color: '#d44872', fontWeight: 700, lineHeight: 1.7, margin: 0 }}>
                💗 I built this for you. I know exactly what you're going through — and I promise you, it gets better. You're not broken. You're just in the fourth trimester."
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 4–6: Choice questions ── */}
        {step >= 4 && step <= 6 && (() => {
          const q = QUESTIONS[step - 4]
          const val = answers[q.id]
          return (
            <div style={{ animation: 'fadeUp 0.3s ease' }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: 8, lineHeight: 1.25 }}>
                {q.title}
              </h1>
              <p style={{ color: '#b08090', fontSize: 15, marginBottom: 28, lineHeight: 1.5 }}>
                {q.subtitle}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {q.options.map(opt => {
                  const selected = q.multi ? val.includes(opt.label) : val === opt.label
                  return (
                    <ChoiceChip
                      key={opt.label}
                      emoji={opt.emoji}
                      label={opt.label}
                      selected={selected}
                      onClick={() => q.multi
                        ? toggleMulti(q.id, opt.label)
                        : setSingle(q.id, opt.label)
                      }
                    />
                  )
                })}
              </div>
            </div>
          )
        })()}

      </div>

      {/* Bottom actions */}
      <div style={{ padding: '24px 32px 40px', maxWidth: 520, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <button
          onClick={next}
          disabled={!canNext()}
          style={{
            width: '100%', padding: '17px',
            background: canNext()
              ? 'linear-gradient(135deg, #ff5c8a, #d44872)'
              : '#f5c6d5',
            color: '#fff', border: 'none', borderRadius: 50,
            fontSize: 17, fontWeight: 800, cursor: canNext() ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            boxShadow: canNext() ? '0 6px 20px rgba(212,83,126,0.35)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {step === TOTAL_STEPS - 1 ? '✨ Enter my dashboard' : 'Continue →'}
        </button>

        {step > 0 && (
          <button onClick={back} style={{
            width: '100%', marginTop: 12, padding: '14px',
            background: 'none', border: 'none', color: '#b08090',
            fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
          }}>← Back</button>
        )}

        <p style={{ textAlign: 'center', fontSize: 12, color: '#d4b8c0', marginTop: 20 }}>
          🔒 Your data stays private and never leaves your device.
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
