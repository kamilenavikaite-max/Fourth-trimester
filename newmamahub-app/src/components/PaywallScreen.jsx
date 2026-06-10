// Replace STRIPE_PAYMENT_LINK with your real Stripe Payment Link URL
// You'll get this from stripe.com → Payment Links → Create
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_cNieV54Yp6B63rHgJ18N200'

import { useEffect } from 'react'

const FEATURES = [
  { emoji: '📓', title: 'Daily Journal', desc: 'Write and track your thoughts every day' },
  { emoji: '🌿', title: 'Circle community', desc: 'Anonymous peer support from moms like you' },
  { emoji: '✨', title: 'Weekly Insights', desc: 'See your mood trends and what helps most' },
  { emoji: '🔄', title: 'New content daily', desc: '53 exercises and 100+ daily intentions' },
]

export default function PaywallScreen({ onClose }) {
  const handleSubscribe = () => {
    // Append success callback so the app knows payment is done
    const successUrl = encodeURIComponent(window.location.origin + '?payment=success')
    window.location.href = `${STRIPE_PAYMENT_LINK}?success_url=${successUrl}`
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(61,32,48,0.55)',
      display: 'flex', alignItems: 'flex-end',
      padding: 0,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        padding: '32px 24px 40px',
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌸</div>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Unlock Fourth Trimester</h2>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.5 }}>
            Join thousands of moms getting daily support through their fourth trimester.
          </p>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: '#fbeaf0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>{f.emoji}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#3d2030' }}>{f.title}</div>
                <div style={{ fontSize: 13, color: '#999', marginTop: 1 }}>{f.desc}</div>
              </div>
              <div style={{ marginLeft: 'auto', color: '#d4537e', fontSize: 18 }}>✓</div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{
          background: '#fbeaf0', borderRadius: 16, padding: '16px 20px',
          textAlign: 'center', marginBottom: 16,
        }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#d4537e' }}>$9.99</span>
          <span style={{ fontSize: 15, color: '#993556' }}> / month</span>
          <p style={{ fontSize: 12, color: '#b06080', marginTop: 4 }}>
            Cancel any time · No commitment
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleSubscribe}
          style={{
            width: '100%', padding: '16px', borderRadius: 16,
            background: 'linear-gradient(135deg, #d4537e, #993556)',
            color: '#fff', border: 'none', fontSize: 16,
            fontWeight: 600, cursor: 'pointer', marginBottom: 12,
          }}
        >
          Start my subscription →
        </button>

        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '12px', borderRadius: 16,
            background: 'transparent', border: 'none',
            color: '#aaa', fontSize: 14, cursor: 'pointer',
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
