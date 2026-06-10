import { useState } from 'react'

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Check in daily',
    subtitle: 'Takes less than 60 seconds',
    desc: 'Open the app, tap how you are feeling, and get a fresh intention and CBT exercise chosen just for today. No login friction. No long forms.',
    color: '#d44872',
    bg: '#fdf0f4',
    icon: '😊',
    screen: 'mood',
    details: ['5-level mood scale', 'Fresh intention every day', 'New exercise every morning', 'Builds your streak automatically'],
  },
  {
    step: '02',
    title: 'Do your exercise',
    subtitle: '53 rotating exercises',
    desc: 'A new CBT, breathing, or grounding exercise appears each day. Follow along at your own pace — even if the baby is on your lap.',
    color: '#9b59b6',
    bg: '#f8f0fc',
    icon: '🌿',
    screen: 'exercise',
    details: ['CBT thought reframes', '4-7-8 breathing guides', 'Grounding techniques', 'Mindfulness moments'],
  },
  {
    step: '03',
    title: 'Write & connect',
    subtitle: 'Private journal + anonymous circle',
    desc: 'Write what you actually feel in your private journal, or share it anonymously with the Circle. Both are judgment-free zones.',
    color: '#e05c8a',
    bg: '#fdf0f6',
    icon: '📓',
    screen: 'journal',
    details: ['Mood-tagged journal entries', 'Anonymous Circle posts', 'No real names ever shown', 'Hearts-only reactions'],
  },
  {
    step: '04',
    title: 'See your progress',
    subtitle: 'Weekly mood insights',
    desc: 'Your weekly mood chart, streak count, and exercise tally prove what feels invisible — you are getting better. Day by day.',
    color: '#2a9d5c',
    bg: '#f0faf4',
    icon: '📈',
    screen: 'insights',
    details: ['Weekly mood trend chart', 'Streak counter', 'Exercises completed', 'Personal weekly summary'],
  },
]

const FAQS = [
  { q: 'Is Fourth Trimester a medical app?', a: 'No. Fourth Trimester is a wellness and mental health support app, not a medical device. It is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a mental health crisis, please contact a healthcare provider or the PSI Helpline at postpartum.net.' },
  { q: 'What is included in the free plan?', a: 'The free plan includes daily mood check-ins, daily intentions, and check-in streak tracking. You can use the app forever without paying anything.' },
  { q: 'What do I get with Premium?', a: 'Premium unlocks the full experience: private journal, anonymous Circle community, weekly insights and mood trends, 53 daily guided exercises (CBT, breathing, grounding), and 100+ daily intentions. Everything for $9.99/month.' },
  { q: 'Is the Circle community really anonymous?', a: 'Yes. Your Circle posts are shown under a random nature name (like "Willow" or "Fern"). No real names, no profile photos, no identifying information ever appears.' },
  { q: 'Can I cancel my Premium subscription?', a: 'Absolutely. You can cancel anytime, no questions asked. Your Premium access continues until the end of the billing period.' },
  { q: 'How are the exercises designed?', a: 'Our 53 exercises are clinically informed and cover breathing techniques, CBT (cognitive behavioral therapy) tools, grounding exercises, and mindfulness practices — specifically selected for postpartum wellbeing.' },
  { q: 'Is my data private?', a: 'Your journal entries and mood data are stored locally on your device. We take privacy seriously — your personal reflections are yours only.' },
]

const TESTIMONIALS = [
  { name: 'Sarah M.', weeks: '6 weeks postpartum', text: 'I was drowning in mom guilt and exhaustion. This app gave me 5 minutes of calm every single day. The exercises actually work.', emoji: '🌸', rating: 5 },
  { name: 'Jamie L.', weeks: '4 months postpartum', text: 'The Circle is the most non-judgmental community I have ever found. Everyone just gets it. No advice nobody asked for.', emoji: '🌿', rating: 5 },
  { name: 'Priya K.', weeks: '3 weeks postpartum', text: "My OB had no idea what to do with me crying in her office. This app gave me the tools she couldn't.", emoji: '✨', rating: 5 },
  { name: 'Megan R.', weeks: '2 months postpartum', text: 'I never journaled in my life. The prompts make it so easy. I look back at my entries now and can see how far I have come.', emoji: '💗', rating: 5 },
  { name: 'Ana T.', weeks: '5 months postpartum', text: 'My husband bought me Premium and I cried. In a good way. It was the first time anyone acknowledged I needed support too.', emoji: '🌺', rating: 5 },
  { name: 'Lauren B.', weeks: '7 weeks postpartum', text: "The mood tracking chart over 8 weeks showed me I actually was getting better — even when it didn't feel like it. Data saved me.", emoji: '📈', rating: 5 },
]

function HowItWorks() {
  const [active, setActive] = useState(0)

  const step = HOW_IT_WORKS[active]

  const handleStepClick = (i) => {
    setActive(i)
  }

  // Mini phone screens for each step
  const MiniScreen = ({ s }) => (
    <div style={{ padding: '14px 12px', background: '#fffaf9', height: '100%', overflow: 'hidden' }}>
      {s === 'mood' && <>
        <div style={{ fontSize: 11, color: '#b08090', marginBottom: 6 }}>How are you feeling?</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          {['😞','😕','😐','🙂','😊'].map((e, i) => (
            <div key={i} style={{ width: 34, height: 34, borderRadius: '50%', background: i === 3 ? '#d4537e' : '#ffe0e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, border: i === 3 ? '2px solid #d4537e' : '2px solid transparent' }}>{e}</div>
          ))}
        </div>
        <div style={{ background: '#fbeaf0', borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 9, color: '#d4537e', fontWeight: 700, marginBottom: 3 }}>Today's intention ✨</div>
          <div style={{ fontSize: 10, color: '#3d2030', lineHeight: 1.5 }}>I allow myself to rest without guilt today.</div>
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ fontSize: 16 }}>🔥</div>
          <div style={{ fontSize: 10, color: '#d4537e', fontWeight: 700 }}>12 day streak</div>
        </div>
      </>}
      {s === 'exercise' && <>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#3d2030', marginBottom: 10 }}>🌿 Today's Exercise</div>
        <div style={{ background: '#f3e8fc', borderRadius: 10, padding: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: '#9b59b6', fontWeight: 700, marginBottom: 4 }}>4-7-8 Breathing</div>
          <div style={{ fontSize: 9, color: '#5d3a6e', lineHeight: 1.6 }}>Inhale through your nose for 4 counts. Hold for 7 counts. Exhale slowly for 8 counts. Repeat 3 times.</div>
        </div>
        {[
          { label: 'Inhale', dur: '4s', color: '#c39bd3' },
          { label: 'Hold', dur: '7s', color: '#9b59b6' },
          { label: 'Exhale', dur: '8s', color: '#7d3c98' },
        ].map((b, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: 8, padding: '6px 10px', marginBottom: 6, border: '1px solid #e8d5f5' }}>
            <span style={{ fontSize: 9, color: '#5d3a6e', fontWeight: 600 }}>{b.label}</span>
            <span style={{ fontSize: 9, color: b.color, fontWeight: 700 }}>{b.dur}</span>
          </div>
        ))}
        <div style={{ marginTop: 8, background: '#9b59b6', borderRadius: 8, padding: '7px', textAlign: 'center' }}>
          <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>▶ Start exercise</span>
        </div>
      </>}
      {s === 'journal' && <>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#3d2030', marginBottom: 10 }}>📓 My Journal</div>
        {[
          { mood: 'grateful', text: 'She smiled at me today. Everything feels worth it.', date: 'Today' },
          { mood: 'tired', text: 'Sleep deprivation is real. This is temporary.', date: 'Yesterday' },
        ].map((j, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '8px 10px', marginBottom: 8, border: '1px solid #ffe0e8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 8, background: '#fbeaf0', color: '#d4537e', borderRadius: 10, padding: '1px 7px', fontWeight: 700 }}>{j.mood}</span>
              <span style={{ fontSize: 8, color: '#b08090' }}>{j.date}</span>
            </div>
            <div style={{ fontSize: 9, color: '#7a4f5e', lineHeight: 1.5 }}>{j.text}</div>
          </div>
        ))}
        <div style={{ background: '#fbeaf0', borderRadius: 10, padding: 8, border: '1px dashed #ffb3c6', textAlign: 'center' }}>
          <span style={{ fontSize: 9, color: '#d4537e' }}>+ Write today's entry</span>
        </div>
      </>}
      {s === 'insights' && <>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#3d2030', marginBottom: 10 }}>✨ My Insights</div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, border: '1px solid #ffe0e8' }}>
          <div style={{ fontSize: 9, color: '#b08090', marginBottom: 8 }}>This week</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 44 }}>
            {[3,4,2,4,5,4,3].map((v, i) => (
              <div key={i} style={{ flex: 1, height: `${v * 18}%`, background: i === 4 ? '#2a9d5c' : '#a8e6c1', borderRadius: 3, minHeight: 5 }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 7, color: '#b08090' }}>{d}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div style={{ background: '#fbeaf0', borderRadius: 8, padding: 7, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#d4537e' }}>12</div>
            <div style={{ fontSize: 7, color: '#7a4f5e' }}>day streak 🔥</div>
          </div>
          <div style={{ background: '#f0faf4', borderRadius: 8, padding: 7, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#2a9d5c' }}>8</div>
            <div style={{ fontSize: 7, color: '#7a4f5e' }}>exercises ✓</div>
          </div>
        </div>
      </>}
    </div>
  )

  return (
    <section style={{ padding: '100px 40px', background: '#fff' }} id="how-it-works">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#d4537e', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>How it works</div>
          <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-1px', color: '#1a1a2e', marginBottom: 14 }}>Four steps. Five minutes a day.</h2>
          <p style={{ color: '#888', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>No complicated setup. No daily reminders you have to dismiss. Just open, check in, and close.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left: step list */}
          <div>
            {HOW_IT_WORKS.map((s, i) => (
              <div
                key={i}
                onClick={() => handleStepClick(i)}
                style={{
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  padding: '20px 22px', borderRadius: 18, marginBottom: 10,
                  cursor: 'pointer', transition: 'all 0.25s',
                  background: active === i ? s.bg : 'transparent',
                  border: active === i ? `1.5px solid ${s.color}22` : '1.5px solid transparent',
                  transform: active === i ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                {/* Step icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: active === i ? s.color : '#f0f0f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, transition: 'all 0.25s',
                  boxShadow: active === i ? `0 6px 20px ${s.color}40` : 'none',
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: active === i ? s.color : '#ccc', letterSpacing: '1px' }}>STEP {s.step}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1a1a2e', marginBottom: 3 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: active === i ? s.color : '#aaa', fontWeight: 600, marginBottom: active === i ? 10 : 0 }}>{s.subtitle}</div>
                  {active === i && (
                    <>
                      <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65, marginBottom: 12 }}>{s.desc}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {s.details.map((d, j) => (
                          <span key={j} style={{ fontSize: 11, background: `${s.color}15`, color: s.color, borderRadius: 50, padding: '3px 11px', fontWeight: 600 }}>{d}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: animated phone */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: 240, height: 460, borderRadius: 40,
              background: '#1a1a2e', border: '8px solid #2d2d3d',
              boxShadow: `0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px ${step.color}30`,
              overflow: 'hidden', transition: 'box-shadow 0.4s',
            }}>
              {/* Status bar */}
              <div style={{ height: 28, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', fontSize: 10, color: '#fff', flexShrink: 0 }}>
                <span>9:41</span>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span style={{ fontSize: 8 }}>●●●●</span>
                  <span>WiFi</span>
                  <span>🔋</span>
                </div>
              </div>
              {/* Nav */}
              <div style={{ padding: '10px 14px 8px', background: '#fff', borderBottom: '1px solid #f5e0e6', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🌸</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#3d2030' }}>Fourth Trimester</span>
              </div>
              {/* Screen content */}
              <div style={{ flex: 1, overflow: 'hidden', height: 'calc(100% - 72px)', transition: 'opacity 0.2s' }}>
                <MiniScreen s={step.screen} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneMockup({ screen }) {
  return (
    <div style={{
      width: 220, height: 420, borderRadius: 36,
      background: '#1a1a2e', border: '8px solid #2d2d3d',
      boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)',
      overflow: 'hidden', position: 'relative', flexShrink: 0,
    }}>
      {/* Status bar */}
      <div style={{ height: 28, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', fontSize: 10, color: '#fff' }}>
        <span>9:41</span>
        <div style={{ width: 60, height: 10, background: '#333', borderRadius: 10 }} />
        <span>●●●</span>
      </div>
      {screen === 'mood' && (
        <div style={{ padding: '16px 14px', background: '#fffaf9', height: '100%' }}>
          <div style={{ fontSize: 11, color: '#b08090', marginBottom: 4 }}>Good morning, Emma 🌸</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3d2030', marginBottom: 14 }}>How are you feeling today?</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            {['😞','😕','😐','🙂','😊'].map((e, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: i === 3 ? '#d4537e' : '#ffe0e8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, border: i === 3 ? '2px solid #d4537e' : '2px solid transparent',
              }}>{e}</div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 10, marginBottom: 10, border: '1px solid #ffe0e8' }}>
            <div style={{ fontSize: 10, color: '#b08090', marginBottom: 4 }}>Today's intention</div>
            <div style={{ fontSize: 11, color: '#3d2030', lineHeight: 1.5 }}>I allow myself to rest without guilt today.</div>
          </div>
          <div style={{ background: '#fbeaf0', borderRadius: 12, padding: 10, border: '1px solid #ffb3c6' }}>
            <div style={{ fontSize: 10, color: '#d4537e', fontWeight: 700, marginBottom: 4 }}>🌿 Daily Exercise</div>
            <div style={{ fontSize: 11, color: '#3d2030', lineHeight: 1.5 }}>4-7-8 Breathing: Inhale 4s, hold 7s, exhale 8s. Repeat 3 times.</div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ fontSize: 18 }}>🔥</div>
            <div style={{ fontSize: 11, color: '#d4537e', fontWeight: 700 }}>12 day streak</div>
          </div>
        </div>
      )}
      {screen === 'journal' && (
        <div style={{ padding: '16px 14px', background: '#fffaf9', height: '100%' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3d2030', marginBottom: 12 }}>My Journal 📓</div>
          {[
            { mood: 'grateful', text: 'She smiled at me today. A real smile. Everything feels worth it.', date: 'Today' },
            { mood: 'tired', text: 'Sleep deprivation is real. Reminding myself this is temporary.', date: 'Yesterday' },
            { mood: 'anxious', text: 'Hard morning. Did the breathing exercise and it actually helped.', date: '2 days ago' },
          ].map((j, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '8px 10px', marginBottom: 8, border: '1px solid #ffe0e8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 9, background: '#fbeaf0', color: '#d4537e', borderRadius: 10, padding: '1px 7px', fontWeight: 700 }}>{j.mood}</span>
                <span style={{ fontSize: 9, color: '#b08090' }}>{j.date}</span>
              </div>
              <div style={{ fontSize: 10, color: '#7a4f5e', lineHeight: 1.5 }}>{j.text}</div>
            </div>
          ))}
        </div>
      )}
      {screen === 'circle' && (
        <div style={{ padding: '16px 14px', background: '#fffaf9', height: '100%' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3d2030', marginBottom: 12 }}>Circle 🌿</div>
          {[
            { name: 'Willow', text: '4 hours sleep straight. Tiny win but I am celebrating.', hearts: 14, time: '2h ago' },
            { name: 'Hazel', text: 'Baby smiled for the first time. Everything feels worth it.', hearts: 61, time: '6h ago' },
            { name: 'Fern', text: 'Reminder to drink water today. You are doing amazing.', hearts: 47, time: '8h ago' },
          ].map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '8px 10px', marginBottom: 8, border: '1px solid #ffe0e8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#d4537e' }}>{p.name}</span>
                <span style={{ fontSize: 9, color: '#b08090' }}>{p.time}</span>
              </div>
              <div style={{ fontSize: 10, color: '#7a4f5e', lineHeight: 1.5, marginBottom: 6 }}>{p.text}</div>
              <div style={{ fontSize: 9, color: '#b08090' }}>💗 {p.hearts}</div>
            </div>
          ))}
        </div>
      )}
      {screen === 'insights' && (
        <div style={{ padding: '16px 14px', background: '#fffaf9', height: '100%' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3d2030', marginBottom: 12 }}>My Insights ✨</div>
          <div style={{ background: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, border: '1px solid #ffe0e8' }}>
            <div style={{ fontSize: 10, color: '#b08090', marginBottom: 8 }}>Mood this week</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
              {[3,4,2,4,5,4,3].map((v, i) => (
                <div key={i} style={{
                  flex: 1, height: `${v * 18}%`,
                  background: i === 4 ? '#d4537e' : '#ffd0de',
                  borderRadius: 4, minHeight: 6,
                  transition: 'height 0.3s',
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              {['M','T','W','T','F','S','S'].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 8, color: '#b08090' }}>{d}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: '#fbeaf0', borderRadius: 10, padding: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#d4537e' }}>12</div>
              <div style={{ fontSize: 9, color: '#7a4f5e' }}>day streak</div>
            </div>
            <div style={{ background: '#f0faf4', borderRadius: 10, padding: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#2a9d5c' }}>8</div>
              <div style={{ fontSize: 9, color: '#7a4f5e' }}>exercises done</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StarRating({ n }) {
  return <span style={{ color: '#f5a623', fontSize: 14 }}>{'★'.repeat(n)}</span>
}

export default function LandingPage({ onGetStarted, onLogin }) {
  const [openFaq, setOpenFaq] = useState(null)
  const [navScrolled, setNavScrolled] = useState(false)

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#1a1a2e', background: '#fff', minHeight: '100vh' }}>

      {/* ── STICKY NAV ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 40px', height: 68,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'sticky', top: 0, zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontSize: 24 }}>🌸</span>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#1a1a2e', letterSpacing: '-0.3px' }}>Fourth Trimester</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Features', 'How it works', 'Pricing', 'FAQ'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} style={{
              fontSize: 14, fontWeight: 500, color: '#555',
              textDecoration: 'none', transition: 'color 0.15s',
            }} onMouseEnter={e => e.target.style.color='#d4537e'}
               onMouseLeave={e => e.target.style.color='#555'}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={onLogin} style={{
            background: 'none', border: 'none', color: '#555',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>Log in</button>
          <button onClick={onLogin} style={{
            background: 'linear-gradient(135deg, #ff5c8a, #d44872)',
            color: '#fff', border: 'none', borderRadius: 50,
            padding: '10px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(212,83,126,0.35)',
            letterSpacing: '0.2px',
          }}>Dashboard →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(145deg, #1a1a2e 0%, #2d1a26 50%, #3d2030 100%)',
        padding: '100px 40px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,83,126,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,92,138,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(212,83,126,0.15)', border: '1px solid rgba(212,83,126,0.3)',
              borderRadius: 50, padding: '6px 16px', marginBottom: 28,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5c8a', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 13, color: '#ffb3c6', fontWeight: 600 }}>Built for US moms in their first year postpartum</span>
            </div>
            <h1 style={{
              fontSize: 'clamp(38px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.1,
              marginBottom: 24, color: '#fff', letterSpacing: '-1.5px',
            }}>
              The mental health<br />app{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ff85a1, #d44872)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>new moms</span><br />actually deserve.
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40, maxWidth: 460 }}>
              Mood tracking, guided CBT exercises, anonymous community, and weekly insights — designed for 5 minutes a day when you have zero energy left.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
              <button onClick={onGetStarted} style={{
                background: 'linear-gradient(135deg, #ff5c8a, #d44872)',
                color: '#fff', border: 'none', borderRadius: 50,
                padding: '16px 36px', fontSize: 17, fontWeight: 800, cursor: 'pointer',
                fontFamily: 'inherit', boxShadow: '0 6px 24px rgba(212,83,126,0.5)',
                letterSpacing: '-0.2px',
              }}>Start for free →</button>
              <button style={{
                background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: 50, padding: '16px 32px', fontSize: 17, cursor: 'pointer',
                fontFamily: 'inherit', color: 'rgba(255,255,255,0.8)',
              }}>See how it works</button>
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ display: 'flex' }}>
                {['🌸','🌿','💗','✨','🌺'].map((e, i) => (
                  <div key={i} style={{
                    width: 32, height: 32, borderRadius: '50%', background: '#2d1a26',
                    border: '2px solid #3d2030', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, marginLeft: i === 0 ? 0 : -8,
                  }}>{e}</div>
                ))}
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>★★★★★ <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, fontSize: 13 }}>from 2,400+ moms</span></div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Free to start · No credit card required</div>
              </div>
            </div>
          </div>
          {/* Phone mockup cluster */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, position: 'relative' }}>
            <div style={{ transform: 'rotate(-6deg) translateY(20px)' }}>
              <PhoneMockup screen="mood" />
            </div>
            <div style={{ transform: 'rotate(4deg) translateY(-10px)' }}>
              <PhoneMockup screen="insights" />
            </div>
          </div>
        </div>
      </section>

      {/* ── AS SEEN ON ── */}
      <section style={{ background: '#f8f9fa', borderBottom: '1px solid #eee', padding: '28px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 20 }}>As featured in</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              { name: 'TODAY', style: { fontSize: 20, fontWeight: 900, color: '#bbb', letterSpacing: '-1px' } },
              { name: 'FORBES', style: { fontSize: 18, fontWeight: 900, color: '#bbb', letterSpacing: '2px' } },
              { name: 'BabyCenter', style: { fontSize: 17, fontWeight: 700, color: '#bbb' } },
              { name: 'Motherly', style: { fontSize: 17, fontWeight: 700, fontStyle: 'italic', color: '#bbb' } },
              { name: 'Parents', style: { fontSize: 18, fontWeight: 800, color: '#bbb' } },
              { name: 'TechCrunch', style: { fontSize: 16, fontWeight: 800, color: '#bbb' } },
            ].map((p, i) => (
              <div key={i} style={p.style}>{p.name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#fff', padding: '64px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { num: '1 in 5', label: 'new moms experience postpartum depression', color: '#d4537e' },
            { num: '46%', label: 'received zero information from their doctor', color: '#e05c8a' },
            { num: '52%', label: 'got little or no support after birth', color: '#d44872' },
            { num: '$9.99', label: 'per month — less than one therapy co-pay', color: '#ff5c8a' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 44, fontWeight: 900, color: s.color, letterSpacing: '-1.5px', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 8, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: '#f8f9fa', padding: '80px 40px' }} id="features">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d4537e', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>Real moms, real results</div>
            <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-1px', color: '#1a1a2e' }}>You are not alone in this.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 20, padding: '28px 24px',
                border: '1px solid #eee', boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.04)' }}
              >
                <StarRating n={t.rating} />
                <p style={{ fontSize: 15, color: '#444', lineHeight: 1.7, margin: '14px 0 20px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fbeaf0, #ffe0e8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}>{t.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#aaa' }}>{t.weeks}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE SECTION 1: Mood tracking ── */}
      <section style={{ padding: '100px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup screen="mood" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d4537e', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Daily check-in</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1px', color: '#1a1a2e', marginBottom: 20, lineHeight: 1.15 }}>One tap.<br />5 seconds.<br />Every day.</h2>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.75, marginBottom: 32 }}>
              Track your mood without it feeling like homework. Then get a fresh CBT exercise and a gentle daily intention — all tailored for where you are postpartum.
            </p>
            {[
              '😊 5-scale mood check-in with streak tracking',
              '🌿 53 rotating clinically-informed exercises',
              '💭 100+ daily intentions that actually resonate',
              '🔥 Streak counter to keep you coming back',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 14, color: '#1a1a2e', lineHeight: 1.6 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE SECTION 2: Journal ── */}
      <section style={{ padding: '100px 40px', background: '#fdf7f9' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d4537e', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Private journal</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1px', color: '#1a1a2e', marginBottom: 20, lineHeight: 1.15 }}>Write freely.<br />Zero judgment.<br />All yours.</h2>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.75, marginBottom: 32 }}>
              Your journal entries are stored only on your device. We never see them. Guided prompts help when you don't know where to start — because "how are you feeling" is too hard at 3am.
            </p>
            {[
              '📓 Mood-tagged entries so you can see patterns',
              '💡 Journal prompts when words don\'t come',
              '🔒 Private — stored on your device only',
              '📅 Browse your history and see how far you\'ve come',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 14, color: '#1a1a2e', lineHeight: 1.6 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup screen="journal" />
          </div>
        </div>
      </section>

      {/* ── FEATURE SECTION 3: Circle ── */}
      <section style={{ padding: '100px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup screen="circle" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d4537e', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Anonymous circle</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1px', color: '#1a1a2e', marginBottom: 20, lineHeight: 1.15 }}>Real moms.<br />No real names.<br />All understanding.</h2>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.75, marginBottom: 32 }}>
              Your posts appear under a random nature name — Willow, Fern, Hazel. Share anything without being recognised. No unsolicited advice. No judgment. Just moms who get it.
            </p>
            {[
              '🌿 Full anonymity — random nature name on every post',
              '💗 Hearts-only reactions — no room for negativity',
              '🤝 Connect with moms at the exact same stage',
              '🚫 No photos, no real names, no identifying info',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 14, color: '#1a1a2e', lineHeight: 1.6 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE SECTION 4: Insights ── */}
      <section style={{ padding: '100px 40px', background: '#fdf7f9' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d4537e', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Weekly insights</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1px', color: '#1a1a2e', marginBottom: 20, lineHeight: 1.15 }}>See yourself<br />actually getting<br />better.</h2>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.75, marginBottom: 32 }}>
              When every day feels the same, data shows you the truth. Your mood chart, streaks, and exercise counts prove what your brain can't see — you are making progress.
            </p>
            {[
              '📈 Weekly mood trend chart with daily breakdowns',
              '🔥 Streak tracking to build consistent habits',
              '🏆 Exercise completion count',
              '🌟 Personalized weekly summary',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 14, color: '#1a1a2e', lineHeight: 1.6 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup screen="insights" />
          </div>
        </div>
      </section>

      {/* ── OLD WAY VS NEW WAY ── */}
      <section style={{ background: '#1a1a2e', padding: '80px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>The way it was vs the way it should be</h2>
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '32px 28px' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#ff5c8a', marginBottom: 24 }}>❌ Before Fourth Trimester</div>
            {[
              'Googling symptoms at 3am in a panic',
              'Facebook mom groups full of unsolicited advice',
              'Waiting 6 weeks for a postpartum checkup',
              'Feeling like you\'re the only one struggling',
              'No way to track if you\'re actually getting better',
              'Exercises buried in PDFs from your OB',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.5 }}>
                <span style={{ marginTop: 2 }}>✗</span><span>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(212,83,126,0.08)', border: '1px solid rgba(212,83,126,0.25)', borderRadius: 20, padding: '32px 28px' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#ff85a1', marginBottom: 24 }}>✓ With Fourth Trimester</div>
            {[
              'Daily check-in that takes less than a minute',
              'Anonymous community with zero judgment',
              'Daily guided exercises for postpartum wellness',
              'See you\'re not alone — right here, right now',
              'Weekly insights chart showing real progress',
              'Everything in one calm, beautiful place',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.5 }}>
                <span style={{ color: '#d4537e', marginTop: 2 }}>✓</span><span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '100px 40px', background: '#fff' }} id="pricing">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#d4537e', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Pricing</div>
          <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-1px', color: '#1a1a2e', marginBottom: 12 }}>Simple, honest pricing.</h2>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 56 }}>Less than a coffee a week. Cancel any time.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ borderRadius: 24, padding: '40px 32px', border: '1.5px solid #eee', textAlign: 'left' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>Free</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#1a1a2e', letterSpacing: '-2px', margin: '16px 0 4px' }}>$0</div>
              <div style={{ fontSize: 13, color: '#aaa', marginBottom: 28 }}>Forever free</div>
              {['Daily mood check-in', 'Daily intentions', 'Check-in streak'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ color: '#d4537e', fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#555' }}>{f}</span>
                </div>
              ))}
              <button onClick={onGetStarted} style={{
                width: '100%', marginTop: 28, padding: '14px',
                borderRadius: 50, border: '1.5px solid #ddd',
                background: '#fff', color: '#1a1a2e', fontSize: 15,
                fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'border-color 0.15s',
              }}>Get started free</button>
            </div>
            <div style={{ borderRadius: 24, padding: '40px 32px', border: '2px solid #d4537e', textAlign: 'left', background: 'linear-gradient(160deg, #fff6f8, #fff)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#d4537e', color: '#fff', borderRadius: 50, padding: '5px 20px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>Most popular</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>Premium</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, margin: '16px 0 4px' }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: '#d4537e', letterSpacing: '-2px', lineHeight: 1 }}>$9.99</span>
                <span style={{ fontSize: 14, color: '#aaa', marginBottom: 8 }}>/month</span>
              </div>
              <div style={{ fontSize: 13, color: '#aaa', marginBottom: 28 }}>Cancel any time</div>
              {['Everything in Free', 'Private journal', 'Anonymous circle', 'Weekly insights', '53 daily exercises', '100+ daily intentions'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ color: '#d4537e', fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#555' }}>{f}</span>
                </div>
              ))}
              <button onClick={onGetStarted} style={{
                width: '100%', marginTop: 28, padding: '14px',
                borderRadius: 50, border: 'none',
                background: 'linear-gradient(135deg, #ff5c8a, #d44872)',
                color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(212,83,126,0.35)',
              }}>Start free, upgrade anytime</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '100px 40px', background: '#f8f4f6' }} id="faq">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d4537e', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>FAQ</div>
            <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-1px', color: '#1a1a2e' }}>Common questions</h2>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, marginBottom: 12, overflow: 'hidden',
              border: '1px solid #eee', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', paddingRight: 16 }}>{faq.q}</span>
                <span style={{
                  fontSize: 20, color: '#d4537e', flexShrink: 0,
                  transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'transform 0.2s',
                }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 22px', fontSize: 15, color: '#666', lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ background: 'linear-gradient(135deg, #d44872 0%, #ff5c8a 100%)', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>You kept a human alive today.</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 36, lineHeight: 1.6 }}>That deserves support. Start free in 60 seconds.</p>
          <button onClick={onGetStarted} style={{
            background: '#fff', color: '#d44872', border: 'none',
            borderRadius: 50, padding: '18px 44px', fontSize: 18, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
          }}>Start for free →</button>
          <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>No credit card · Cancel any time</div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#111', color: 'rgba(255,255,255,0.5)', padding: '64px 40px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>🌸</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Fourth Trimester</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
                Your daily mental health companion for the first year after birth. Built by women, for women.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {['𝕏', 'in', 'f', '📸'].map((s, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
                    transition: 'background 0.15s',
                  }}>{s}</div>
                ))}
              </div>
            </div>
            {/* Product */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.5px', marginBottom: 16 }}>Product</div>
              {['Features', 'How it works', 'Pricing', 'Dashboard'].map(l => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color='#fff'}
                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.5)'}>{l}</a>
                </div>
              ))}
            </div>
            {/* Resources */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.5px', marginBottom: 16 }}>Resources</div>
              {['Blog', 'Postpartum support', 'PSI Helpline', 'Privacy Policy', 'Terms of Service'].map(l => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color='#fff'}
                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.5)'}>{l}</a>
                </div>
              ))}
            </div>
            {/* Get the app */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.5px', marginBottom: 16 }}>Get the app</div>
              <button onClick={onGetStarted} style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', marginBottom: 10, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 20 }}>🍎</span> App Store
              </button>
              <button onClick={onGetStarted} style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 20 }}>🤖</span> Google Play
              </button>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontSize: 13 }}>© 2026 Fourth Trimester · Not a medical device. If you are in crisis, contact the PSI Helpline at postpartum.net.</div>
            <div style={{ fontSize: 13 }}>Made with 🌸 for new moms in the US</div>
          </div>
        </div>
      </footer>

    </div>
  )
}
