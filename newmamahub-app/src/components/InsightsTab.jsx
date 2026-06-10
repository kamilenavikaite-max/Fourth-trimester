const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const BADGES = [
  { id: 'first_mood', emoji: '🌱', title: 'First Steps', desc: 'Log your first mood', check: s => s.moodCount >= 1 },
  { id: 'streak_3', emoji: '🔥', title: 'On Fire', desc: '3-day check-in streak', check: s => s.streak >= 3 },
  { id: 'streak_7', emoji: '💫', title: 'Week Warrior', desc: '7-day streak', check: s => s.streak >= 7 },
  { id: 'streak_14', emoji: '🎯', title: 'Consistent', desc: '14-day streak', check: s => s.streak >= 14 },
  { id: 'streak_30', emoji: '🏆', title: 'Month Strong', desc: '30-day streak', check: s => s.streak >= 30 },
  { id: 'first_journal', emoji: '📓', title: 'Dear Diary', desc: 'Write your first journal entry', check: s => s.journalCount >= 1 },
  { id: 'journals_5', emoji: '📚', title: 'Story Keeper', desc: '5 journal entries', check: s => s.journalCount >= 5 },
  { id: 'first_exercise', emoji: '🌬️', title: 'First Breath', desc: 'Complete your first exercise', check: s => s.exerciseCount >= 1 },
  { id: 'exercises_10', emoji: '💪', title: '10 Strong', desc: '10 exercises done', check: s => s.exerciseCount >= 10 },
  { id: 'exercises_25', emoji: '🧘', title: 'Wellness Warrior', desc: '25 exercises done', check: s => s.exerciseCount >= 25 },
  { id: 'program_week1', emoji: '🌸', title: 'Week One Done', desc: 'Complete Week 1 of the program', check: s => s.programWeeks >= 1 },
  { id: 'program_complete', emoji: '🎓', title: 'Program Graduate', desc: 'Complete the 4-week program', check: s => s.programWeeks >= 4 },
]

function getMoodLabel(avg) {
  if (!avg) return '—'
  if (avg >= 4.5) return 'Thriving ✨'
  if (avg >= 3.5) return 'Good 🙂'
  if (avg >= 2.5) return 'Steady 😐'
  return 'Tender 💗'
}

export default function InsightsTab({ moodLog, streak, exercises, earnedBadges }) {
  // Build last-7-days data
  const today = new Date()
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    const key = d.toISOString().slice(0, 10)
    const entry = moodLog.find(m => m.date === key)
    return {
      day: DAYS[d.getDay()],
      score: entry ? entry.score : null,
      isToday: i === 6,
    }
  })

  const scores = moodLog.map(m => m.score).filter(Boolean)
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : null

  const activities = [
    { name: 'Breathing exercises', emoji: '🌬️', value: Math.min(exercises, 10), max: 10 },
    { name: 'Journal entries', emoji: '📓', value: Math.min(moodLog.length, 10), max: 10 },
    { name: 'Mood check-ins', emoji: '😊', value: Math.min(streak, 10), max: 10 },
  ]

  const maxBar = 5

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--pink-100) 0%, var(--cream) 100%)',
        padding: '52px 20px 20px',
      }}>
        <h1>Your Insights</h1>
        <p style={{ color: 'var(--text-light)', fontSize: 14, marginTop: 4 }}>
          A gentle reflection on your journey.
        </p>
      </div>

      {/* Summary numbers */}
      <div style={{ display: 'flex', gap: 10, margin: '0 16px' }}>
        {[
          { label: 'Days checked in', value: moodLog.length, emoji: '📅' },
          { label: 'Exercises done', value: exercises, emoji: '🌬️' },
          { label: 'Mood trend', value: getMoodLabel(avg), emoji: '📈', small: true },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: '#fff',
              borderRadius: 16,
              padding: '16px 10px',
              textAlign: 'center',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.emoji}</div>
            <div style={{
              fontSize: stat.small ? 13 : 24,
              fontWeight: stat.small ? 'normal' : 600,
              color: 'var(--pink-500)',
              marginBottom: 4,
              lineHeight: 1.2,
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-light)', lineHeight: 1.3 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="card">
        <h3 style={{ marginBottom: 20 }}>Mood this week</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
          {week.map((day, i) => (
            <div
              key={i}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}
            >
              <div
                style={{
                  width: '100%',
                  borderRadius: '6px 6px 0 0',
                  background: day.score
                    ? day.isToday
                      ? 'linear-gradient(180deg, var(--pink-400), var(--pink-500))'
                      : 'var(--pink-200)'
                    : 'var(--pink-50)',
                  height: day.score ? `${(day.score / maxBar) * 100}%` : '4px',
                  minHeight: 4,
                  transition: 'height 0.3s ease',
                  border: day.score ? 'none' : '1.5px dashed var(--pink-100)',
                }}
              />
              {day.score && (
                <div style={{ fontSize: 11, color: day.isToday ? 'var(--pink-500)' : 'var(--text-light)', fontWeight: day.isToday ? 600 : 'normal' }}>
                  {['😔','😟','😐','🙂','😊'][day.score - 1]}
                </div>
              )}
              <div style={{
                fontSize: 11,
                color: day.isToday ? 'var(--pink-500)' : 'var(--text-light)',
                fontWeight: day.isToday ? 600 : 'normal',
              }}>
                {day.day}
              </div>
            </div>
          ))}
        </div>
        {moodLog.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: 14, marginTop: 12 }}>
            Log your mood on the Home tab to see your week unfold. 🌸
          </p>
        )}
      </div>

      {/* Progress bars */}
      <div className="card">
        <h3 style={{ marginBottom: 16 }}>What's helping you most</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {activities.map(act => {
            const pct = act.max > 0 ? (act.value / act.max) * 100 : 0
            return (
              <div key={act.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, color: 'var(--text-dark)', display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span>{act.emoji}</span> {act.name}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-light)' }}>{act.value}/{act.max}</span>
                </div>
                <div style={{
                  height: 10,
                  background: 'var(--pink-50)',
                  borderRadius: 50,
                  overflow: 'hidden',
                  border: '1px solid var(--pink-100)',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg, var(--pink-300), var(--pink-400))',
                    borderRadius: 50,
                    transition: 'width 0.6s ease',
                    minWidth: pct > 0 ? 10 : 0,
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Milestones / Badges */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ marginBottom: 0 }}>Your Milestones</h3>
          <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{earnedBadges.length} / {BADGES.length}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {BADGES.map(badge => {
            const earned = earnedBadges.includes(badge.id)
            return (
              <div
                key={badge.id}
                style={{
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: 12,
                  background: earned ? 'var(--pink-50)' : 'rgba(255,255,255,0.6)',
                  border: earned ? '1px solid var(--pink-100)' : '1px solid var(--pink-50)',
                  opacity: earned ? 1 : 0.35,
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 6 }}>
                  {earned ? badge.emoji : '🔒'}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 2 }}>
                  {badge.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-light)', lineHeight: 1.3 }}>
                  {badge.desc}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Affirmation */}
      <div style={{
        margin: '10px 16px 0',
        background: 'linear-gradient(135deg, var(--pink-100), var(--pink-50))',
        borderRadius: 18,
        padding: '20px',
        textAlign: 'center',
        border: '1px solid var(--pink-100)',
      }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>💗</div>
        <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.7, fontStyle: 'italic' }}>
          "You are not just surviving — you are growing into the mother your baby already sees."
        </p>
      </div>

      <div style={{ height: 8 }} />
    </div>
  )
}
