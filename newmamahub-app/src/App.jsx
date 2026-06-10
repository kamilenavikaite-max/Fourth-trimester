import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import Onboarding from './components/Onboarding'
import DashboardLayout from './components/DashboardLayout'
import HomeTab from './components/HomeTab'
import JournalTab from './components/JournalTab'
import CircleTab from './components/CircleTab'
import InsightsTab from './components/InsightsTab'
import ProgramTab from './components/ProgramTab'
import PaywallScreen from './components/PaywallScreen'
import './App.css'

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

const SEED_POSTS = [
  { id: 1, author: 'Willow', text: 'Three weeks in and I finally slept for 4 hours straight. Tiny victory but I am celebrating it.', hearts: 14, hearted: false, time: '2h ago' },
  { id: 2, author: 'Sage', text: 'Does anyone else cry watching dog food commercials? Just me? Okay.', hearts: 32, hearted: false, time: '4h ago' },
  { id: 3, author: 'Fern', text: 'Reminder to drink a glass of water today. You are doing amazing.', hearts: 47, hearted: false, time: '6h ago' },
  { id: 4, author: 'Hazel', text: 'My baby smiled at me today for the first time. Everything feels worth it.', hearts: 61, hearted: false, time: '8h ago' },
  { id: 5, author: 'Clover', text: 'Struggling with breastfeeding. This is so much harder than I expected. Sending love to anyone else going through it.', hearts: 55, hearted: false, time: '10h ago' },
  { id: 6, author: 'Iris', text: 'Today I did the breathing exercise from the app and it actually helped calm my anxiety. Small wins.', hearts: 29, hearted: false, time: '12h ago' },
]

const SEED_JOURNAL = [
  { id: 1, text: 'Feeling a little overwhelmed today but also deeply grateful. My mom came to visit and it helped more than I expected.', mood: 'grateful', date: '2 days ago' },
  { id: 2, text: 'Sleep deprivation is real. I keep reminding myself this phase is temporary.', mood: 'tired', date: '4 days ago' },
]

export default function App() {
  // Always start on landing page — 'landing' | 'onboarding' | 'dashboard'
  const [screen, setScreen] = useState('landing')
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('ft_user') || 'null'))
  const [tab, setTab] = useState('home')
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem('ft_premium') === 'true')
  const [showPaywall, setShowPaywall] = useState(false)
  const [notifEnabled, setNotifEnabled] = useState(() => localStorage.getItem('ft_notif') === 'true')
  const [earnedBadges, setEarnedBadges] = useState(() => JSON.parse(localStorage.getItem('ft_badges') || '[]'))
  const [badgeToast, setBadgeToast] = useState(null)
  const [programProgress, setProgramProgress] = useState(() => JSON.parse(localStorage.getItem('ft_program') || '{"completedDays":[]}'))

  // Check for Stripe payment success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') {
      localStorage.setItem('ft_premium', 'true')
      setIsPremium(true)
      window.history.replaceState({}, '', window.location.pathname)
      if (window.fbq) window.fbq('track', 'Purchase', { value: 9.99, currency: 'USD' })
    }
  }, [])

  // Register service worker for notifications
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  // Shared state
  const [moodLog, setMoodLog] = useState(() => JSON.parse(localStorage.getItem('ft_mood_log') || '[]'))
  const [journals, setJournals] = useState(SEED_JOURNAL)
  const [posts, setPosts] = useState(SEED_POSTS)
  const [exercises, setExercises] = useState(() => parseInt(localStorage.getItem('ft_exercises') || '0'))
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('ft_streak') || '0'))
  const [todayMood, setTodayMood] = useState(() => localStorage.getItem('ft_today_mood') || null)

  const handleTabChange = (newTab) => {
    setTab(newTab)
  }

  const enableNotifications = async () => {
    if (typeof Notification === 'undefined') return
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      setNotifEnabled(true)
      localStorage.setItem('ft_notif', 'true')
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready
        registration.controller?.postMessage({ type: 'SCHEDULE_DAILY' })
      }
    }
  }

  const checkBadges = (stats) => {
    const newBadges = []
    BADGES.forEach((badge) => {
      if (!earnedBadges.includes(badge.id) && badge.check(stats)) {
        newBadges.push(badge.id)
      }
    })

    if (newBadges.length > 0) {
      const updated = [...earnedBadges, ...newBadges]
      setEarnedBadges(updated)
      localStorage.setItem('ft_badges', JSON.stringify(updated))

      const firstNewBadge = BADGES.find(b => b.id === newBadges[0])
      if (firstNewBadge) {
        setBadgeToast(firstNewBadge)
        setTimeout(() => setBadgeToast(null), 3000)
      }
    }
  }

  // "Start for free" — new user goes through onboarding
  const handleGetStarted = () => {
    if (localStorage.getItem('ft_user')) {
      // Already has an account — skip onboarding, go straight to dashboard
      setScreen('dashboard')
    } else {
      setScreen('onboarding')
    }
  }

  // "Log in" — returning user goes straight to dashboard
  const handleLogin = () => {
    if (localStorage.getItem('ft_user')) {
      setScreen('dashboard')
    } else {
      // No account yet, treat as new user
      setScreen('onboarding')
    }
  }

  const handleOnboarding = (data) => {
    localStorage.setItem('ft_user', JSON.stringify(data))
    setUser(data)
    setScreen('dashboard')
  }

  const logMood = (score) => {
    const today = new Date().toISOString().slice(0, 10)
    const exists = moodLog.find(m => m.date === today)
    let newLog
    if (exists) {
      newLog = moodLog.map(m => m.date === today ? { ...m, score } : m)
    } else {
      newLog = [...moodLog, { date: today, score }]
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('ft_streak', newStreak)
    }
    setMoodLog(newLog)
    setTodayMood(score)
    localStorage.setItem('ft_mood_log', JSON.stringify(newLog))
    localStorage.setItem('ft_today_mood', score)

    checkBadges({
      moodCount: newLog.length,
      streak: exists ? streak : streak + 1,
      journalCount: journals.length,
      exerciseCount: exercises,
      programWeeks: Math.floor([...Array(4)].filter((_, i) => (programProgress.completedDays || []).filter(d => d > i*7 && d <= (i+1)*7).length >= 5).length),
    })
  }

  const logExercise = () => {
    const n = exercises + 1
    setExercises(n)
    localStorage.setItem('ft_exercises', n)

    checkBadges({
      moodCount: moodLog.length,
      streak,
      journalCount: journals.length,
      exerciseCount: n,
      programWeeks: Math.floor([...Array(4)].filter((_, i) => (programProgress.completedDays || []).filter(d => d > i*7 && d <= (i+1)*7).length >= 5).length),
    })
  }

  const addJournal = (entry) => {
    const updated = [entry, ...journals]
    setJournals(updated)

    checkBadges({
      moodCount: moodLog.length,
      streak,
      journalCount: updated.length,
      exerciseCount: exercises,
      programWeeks: Math.floor([...Array(4)].filter((_, i) => (programProgress.completedDays || []).filter(d => d > i*7 && d <= (i+1)*7).length >= 5).length),
    })
  }

  const handleProgramDayComplete = (week) => {
    const today = new Date().toISOString().slice(0, 10)
    const dayNum = moodLog.length + 1
    const completed = new Set(programProgress.completedDays || [])
    if (!completed.has(dayNum)) {
      completed.add(dayNum)
      const updated = { completedDays: Array.from(completed) }
      setProgramProgress(updated)
      localStorage.setItem('ft_program', JSON.stringify(updated))

      checkBadges({
        moodCount: moodLog.length,
        streak,
        journalCount: journals.length,
        exerciseCount: exercises,
        programWeeks: Math.floor([...Array(4)].filter((_, i) => completed.size > 0 && Array.from(completed).filter(d => d > i*7 && d <= (i+1)*7).length >= 5).length),
      })
    }
  }

  const heartPost = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, hearts: p.hearted ? p.hearts - 1 : p.hearts + 1, hearted: !p.hearted }
        : p
    ))
  }

  const addPost = (text) => {
    const names = ['Maple','Cedar','Birch','Jasmine','Luna','River','Brook','Dawn','Meadow','Coral','Sky','Vale']
    setPosts(prev => [{
      id: Date.now(),
      author: names[Math.floor(Math.random() * names.length)],
      text,
      hearts: 0,
      hearted: false,
      time: 'just now'
    }, ...prev])
  }

  if (screen === 'landing') return (
    <>
      <LandingPage onGetStarted={handleGetStarted} onLogin={handleLogin} />
    </>
  )

  if (screen === 'onboarding') return (
    <Onboarding onComplete={handleOnboarding} />
  )

  return (
    <>
      <DashboardLayout
        tab={tab}
        onTabChange={handleTabChange}
        user={user}
        isPremium={isPremium}
        onShowPaywall={() => setShowPaywall(true)}
      >
        <div className="screen" style={{ paddingBottom: 0 }}>
          {tab === 'home' && (
            <HomeTab
              user={user}
              todayMood={todayMood}
              streak={streak}
              onLogMood={logMood}
              onLogExercise={logExercise}
              notifEnabled={notifEnabled}
              onEnableNotifications={enableNotifications}
            />
          )}
          {tab === 'journal' && (
            <JournalTab journals={journals} onAdd={addJournal} />
          )}
          {tab === 'circle' && (
            <CircleTab posts={posts} onHeart={heartPost} onPost={addPost} />
          )}
          {tab === 'insights' && (
            <InsightsTab
              moodLog={moodLog}
              streak={streak}
              exercises={exercises}
              earnedBadges={earnedBadges}
            />
          )}
          {tab === 'program' && (
            <ProgramTab
              programProgress={programProgress}
              onDayComplete={handleProgramDayComplete}
            />
          )}
        </div>
      </DashboardLayout>
      {badgeToast && (
        <div style={{
          position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
          background: '#3d2030', color: '#fff', borderRadius: 16,
          padding: '14px 22px', zIndex: 500,
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 8px 32px rgba(61,32,48,0.3)',
          minWidth: 260, maxWidth: 340,
        }}>
          <span style={{ fontSize: 32 }}>{badgeToast.emoji}</span>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 2 }}>New badge earned! 🎉</div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{badgeToast.title}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{badgeToast.desc}</div>
          </div>
        </div>
      )}
      {showPaywall && (
        <PaywallScreen onClose={() => setShowPaywall(false)} />
      )}
    </>
  )
}
