import { useState } from 'react'

const PROGRAM = [
  // Week 1: Foundation
  { day: 1, week: 1, title: 'Welcome, Mama', theme: 'Arrival', exercise: '4-7-8 Breathing', reflection: 'What does your body need most right now?', intention: 'Today I simply show up.' },
  { day: 2, week: 1, title: 'Your Body Did That', theme: 'Gratitude', exercise: 'Self-Compassion Pause', reflection: 'Name three things your body has done for you this week', intention: 'My body is powerful and healing.' },
  { day: 3, week: 1, title: 'Rest Is Not Lazy', theme: 'Rest', exercise: 'Belly Breathing', reflection: 'What would it feel like to fully rest today?', intention: 'Rest is productive. I allow it.' },
  { day: 4, week: 1, title: 'One Thing at a Time', theme: 'Simplicity', exercise: 'Box Breathing', reflection: 'What is the one most important thing today?', intention: 'I do less and feel more.' },
  { day: 5, week: 1, title: 'You Are Not Alone', theme: 'Connection', exercise: 'Loving-Kindness', reflection: 'Who has shown up for you this week?', intention: 'I am held by people who love me.' },
  { day: 6, week: 1, title: 'The Hard Moments Count', theme: 'Courage', exercise: 'Anchor Breathing', reflection: 'Describe one hard moment you got through this week', intention: 'Every hard moment I survive makes me stronger.' },
  { day: 7, week: 1, title: 'Week One Complete', theme: 'Celebration', exercise: 'Gratitude Scan', reflection: 'What surprised you most about yourself this week?', intention: 'I showed up for seven days. That is a victory.' },

  // Week 2: Body & Emotions
  { day: 8, week: 2, title: 'Your Feelings Are Valid', theme: 'Validation', exercise: 'Tension Breath', reflection: 'What emotion have you been avoiding?', intention: 'All my feelings belong here.' },
  { day: 9, week: 2, title: 'Moving Through It', theme: 'Movement', exercise: 'Shoulder Release', reflection: 'Where does your body hold the most tension?', intention: 'I release what I no longer need to carry.' },
  { day: 10, week: 2, title: 'Sleep and Survival', theme: 'Rest', exercise: 'Evening Wind-Down', reflection: 'How has lack of sleep affected you emotionally?', intention: 'I am surviving on less than I deserve. That is enough.' },
  { day: 11, week: 2, title: 'The Identity Shift', theme: 'Self', exercise: 'Values Anchor', reflection: 'Who are you becoming, beyond being a mother?', intention: 'I contain multitudes. I am still me.' },
  { day: 12, week: 2, title: 'Anger Is Allowed', theme: 'Emotions', exercise: 'Jaw and Face Release', reflection: 'What has made you angry lately? Write without judgment.', intention: 'My anger is information, not failure.' },
  { day: 13, week: 2, title: 'Asking for Help', theme: 'Support', exercise: 'Cognitive Reframe', reflection: 'What is one thing you could ask for help with this week?', intention: 'Asking for help is strength.' },
  { day: 14, week: 2, title: 'Halfway There', theme: 'Reflection', exercise: 'Body Scan', reflection: 'How are you different from when you started this program?', intention: 'I have come further than I know.' },

  // Week 3: Resilience
  { day: 15, week: 3, title: 'Rewriting the Story', theme: 'Narrative', exercise: 'Three Good Things', reflection: 'What is one story you tell yourself that isn\'t serving you?', intention: 'I choose a kinder story.' },
  { day: 16, week: 3, title: 'The Village Myth', theme: 'Community', exercise: 'Mindful Tea or Water', reflection: 'What kind of support do you actually need right now?', intention: 'I deserve a real village, not just the idea of one.' },
  { day: 17, week: 3, title: 'Comparison Is a Thief', theme: 'Authenticity', exercise: 'Thought Defusion', reflection: 'What comparison has been stealing your peace?', intention: 'My journey is mine alone.' },
  { day: 18, week: 3, title: 'Boundaries Are Love', theme: 'Boundaries', exercise: 'Worry Time', reflection: 'What boundary would protect your energy most right now?', intention: 'Saying no to one thing is saying yes to myself.' },
  { day: 19, week: 3, title: 'The Tender Days', theme: 'Gentleness', exercise: 'Compassion for Hard Moments', reflection: 'Write about a day that felt too hard. Then write what you needed.', intention: 'The tender days don\'t define me.' },
  { day: 20, week: 3, title: 'Your Strength Inventory', theme: 'Strength', exercise: 'Progressive Muscle Relaxation', reflection: 'List 5 things that prove you are stronger than you think.', intention: 'I am more resilient than I realize.' },
  { day: 21, week: 3, title: 'Three Weeks Strong', theme: 'Celebration', exercise: 'Sound Bath', reflection: 'What habit from this program has helped you most?', intention: 'I have built something real in three weeks.' },

  // Week 4: Thriving
  { day: 22, week: 4, title: 'What Thriving Looks Like', theme: 'Vision', exercise: 'Safe Place Visualisation', reflection: 'Describe what a good day looks like for you, in detail.', intention: 'I give myself permission to thrive.' },
  { day: 23, week: 4, title: 'Joy Is Not Gone', theme: 'Joy', exercise: 'Joy Memories', reflection: 'What brought you unexpected joy recently?', intention: 'Joy finds me in small places.' },
  { day: 24, week: 4, title: 'Your Baby Sees You', theme: 'Bond', exercise: 'Mindful Feeding', reflection: 'What do you want your baby to know about you someday?', intention: 'My love is visible even when I feel invisible.' },
  { day: 25, week: 4, title: 'Healing Is Not Linear', theme: 'Healing', exercise: 'Hip Opener', reflection: 'Describe your healing journey without judgment — just observation.', intention: 'I heal in waves, and that is perfectly normal.' },
  { day: 26, week: 4, title: 'Writing to Future You', theme: 'Legacy', exercise: 'Kind Letter to Yourself', reflection: 'Write a letter to yourself one year from now.', intention: 'Future me is proud of who I am today.' },
  { day: 27, week: 4, title: 'The Support Circle', theme: 'Gratitude', exercise: 'Loving-Kindness', reflection: 'Who are the people you want to keep close? Tell them.', intention: 'I nurture the relationships that nurture me.' },
  { day: 28, week: 4, title: 'You Did It', theme: 'Completion', exercise: 'Smile Meditation', reflection: 'What do you know now that you didn\'t know 28 days ago?', intention: 'I completed something for myself. I will do it again.' },
]

const EXERCISE_EMOJI = {
  '4-7-8 Breathing': '🌬️',
  'Self-Compassion Pause': '🌸',
  'Belly Breathing': '🫁',
  'Box Breathing': '🟦',
  'Loving-Kindness': '💗',
  'Anchor Breathing': '⚓',
  'Gratitude Scan': '✨',
  'Tension Breath': '🌊',
  'Shoulder Release': '🤸',
  'Evening Wind-Down': '🌙',
  'Values Anchor': '🧭',
  'Jaw and Face Release': '😮',
  'Body Scan': '🧘',
  'Three Good Things': '🌟',
  'Mindful Tea or Water': '🍵',
  'Thought Defusion': '🧠',
  'Worry Time': '📋',
  'Cognitive Reframe': '🔄',
  'Progressive Muscle Relaxation': '💪',
  'Sound Bath': '🔔',
  'Safe Place Visualisation': '🏡',
  'Joy Memories': '📸',
  'Mindful Feeding': '🍼',
  'Hip Opener': '🦋',
  'Kind Letter to Yourself': '✉️',
  'Smile Meditation': '😊',
}

export default function ProgramTab({ programProgress, onDayComplete }) {
  const [activeWeek, setActiveWeek] = useState(1)
  const [selectedDay, setSelectedDay] = useState(null)

  const completedDays = programProgress.completedDays || []

  const weekDays = PROGRAM.filter(d => d.week === activeWeek)

  const weekProgress = (w) => {
    const days = PROGRAM.filter(d => d.week === w)
    const completed = completedDays.filter(day => {
      const d = PROGRAM.find(p => p.day === day)
      return d && d.week === w
    })
    return completed.length
  }

  const isWeekUnlocked = (w) => {
    if (w === 1) return true
    const prevWeekComplete = weekProgress(w - 1) >= 5
    return prevWeekComplete
  }

  const WEEK_NAMES = ['', 'Foundation', 'Body & Emotions', 'Resilience', 'Thriving']
  const WEEK_SUBTITLES = ['', 'Building your foundation for healing', 'Reconnecting with yourself', 'Growing stronger each day', 'Stepping into your power']

  const getTodaysSuggestedDay = () => {
    const firstUncompletedInWeek = weekDays.find(d => !completedDays.includes(d.day))
    return firstUncompletedInWeek
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--pink-100) 0%, var(--cream) 100%)',
        padding: '52px 20px 20px',
      }}>
        <h1>📅 4-Week Program</h1>
        <p style={{ color: 'var(--text-light)', fontSize: 14, marginTop: 4 }}>
          Your daily guide through the fourth trimester
        </p>
      </div>

      {/* Week selector */}
      <div style={{ display: 'flex', gap: 8, padding: '16px 16px', overflow: 'auto' }}>
        {[1, 2, 3, 4].map(w => {
          const unlocked = isWeekUnlocked(w)
          const isActive = w === activeWeek
          return (
            <button
              key={w}
              onClick={() => unlocked && setActiveWeek(w)}
              style={{
                padding: '10px 16px',
                borderRadius: 50,
                border: 'none',
                background: isActive ? 'var(--pink-400)' : unlocked ? '#fff' : 'var(--pink-50)',
                color: isActive ? '#fff' : 'var(--text-dark)',
                fontWeight: isActive ? 600 : 'normal',
                cursor: unlocked ? 'pointer' : 'default',
                opacity: unlocked ? 1 : 0.5,
                whiteSpace: 'nowrap',
                fontSize: 14,
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                boxShadow: isActive ? '0 4px 14px rgba(212, 72, 114, 0.3)' : 'none',
              }}
            >
              {!unlocked && <span style={{ marginRight: 6 }}>🔒</span>}
              Week {w}
            </button>
          )
        })}
      </div>

      {/* Week title card */}
      <div className="card">
        <h2 style={{ marginBottom: 4 }}>Week {activeWeek}: {WEEK_NAMES[activeWeek]}</h2>
        <p style={{ color: 'var(--text-light)', fontSize: 13, marginBottom: 12 }}>
          {WEEK_SUBTITLES[activeWeek]}
        </p>
        <div style={{
          height: 8,
          background: 'var(--pink-50)',
          borderRadius: 50,
          overflow: 'hidden',
          border: '1px solid var(--pink-100)',
          marginBottom: 6,
        }}>
          <div style={{
            height: '100%',
            width: `${(weekProgress(activeWeek) / 7) * 100}%`,
            background: 'linear-gradient(90deg, var(--pink-300), var(--pink-400))',
            borderRadius: 50,
            transition: 'width 0.6s ease',
          }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-light)' }}>
          {weekProgress(activeWeek)} / 7 days complete
        </div>
      </div>

      {/* Day list */}
      <div style={{ margin: '0 16px 20px' }}>
        {weekDays.map(day => {
          const isCompleted = completedDays.includes(day.day)
          const isSuggestedToday = getTodaysSuggestedDay()?.day === day.day
          return (
            <button
              key={day.day}
              onClick={() => !isCompleted && setSelectedDay(day)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                marginBottom: 10,
                borderRadius: 14,
                border: isCompleted ? '2px solid var(--pink-300)' : isSuggestedToday ? '2px solid var(--pink-400)' : '1.5px solid var(--pink-100)',
                background: isCompleted ? 'var(--pink-50)' : '#fff',
                cursor: isCompleted ? 'default' : 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                flexShrink: 0,
                background: isCompleted ? 'var(--pink-400)' : isSuggestedToday ? 'var(--pink-300)' : 'var(--pink-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 600,
                color: isCompleted ? '#fff' : 'var(--text-dark)',
              }}>
                {isCompleted ? '✓' : day.day}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-dark)', marginBottom: 2 }}>
                  {day.title}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{
                    fontSize: 11,
                    background: 'var(--pink-100)',
                    color: 'var(--pink-500)',
                    padding: '2px 8px',
                    borderRadius: 50,
                  }}>
                    {day.theme}
                  </span>
                </div>
              </div>
              {isSuggestedToday && !isCompleted && (
                <div style={{ fontSize: 13, color: 'var(--pink-500)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Start today →
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Day modal */}
      {selectedDay && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(61,32,48,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: 24,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 24,
            padding: 32,
            width: '100%',
            maxWidth: 420,
            boxShadow: '0 8px 40px rgba(61,32,48,0.2)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            {/* Day number and title */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: 28,
                color: 'var(--pink-500)',
                fontWeight: 600,
                marginBottom: 4,
              }}>
                Day {selectedDay.day}
              </div>
              <h2 style={{ marginBottom: 8 }}>{selectedDay.title}</h2>
              <span style={{
                display: 'inline-block',
                fontSize: 12,
                background: 'var(--pink-100)',
                color: 'var(--pink-500)',
                padding: '4px 12px',
                borderRadius: 50,
              }}>
                {selectedDay.theme}
              </span>
            </div>

            {/* Exercise */}
            <div style={{
              background: 'var(--pink-50)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              border: '1px solid var(--pink-100)',
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Today's exercise
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 24 }}>
                  {EXERCISE_EMOJI[selectedDay.exercise] || '🌸'}
                </span>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-dark)' }}>
                  {selectedDay.exercise}
                </div>
              </div>
            </div>

            {/* Reflection */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              border: '1.5px solid var(--pink-100)',
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Reflection prompt
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-dark)', fontStyle: 'italic', lineHeight: 1.6 }}>
                {selectedDay.reflection}
              </div>
            </div>

            {/* Intention */}
            <div style={{
              padding: 12,
              marginBottom: 20,
              background: 'var(--pink-50)',
              borderRadius: 12,
              borderLeft: '4px solid var(--pink-400)',
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 6 }}>
                Your intention for today
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-dark)', fontStyle: 'italic' }}>
                {selectedDay.intention}
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={() => {
                onDayComplete(selectedDay.week)
                setSelectedDay(null)
              }}
              className="btn-primary"
              style={{ marginBottom: 8 }}
            >
              Mark Complete ✓
            </button>
            <button
              onClick={() => setSelectedDay(null)}
              className="btn-ghost"
              style={{ width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div style={{ height: 8 }} />
    </div>
  )
}
