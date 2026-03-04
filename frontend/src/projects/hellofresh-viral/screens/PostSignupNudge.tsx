import { usePrototype } from '@/hooks/usePrototype'
import { Check, MessageCircle, Share2, PartyPopper, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function PostSignupNudge() {
  const { goTo } = usePrototype()
  const [showNudge, setShowNudge] = useState(false)

  // Show nudge after a brief delay to let the confirmation land
  useEffect(() => {
    const timer = setTimeout(() => setShowNudge(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Status bar safe area */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Main content: signup confirmation */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        <div style={{ padding: '40px 28px', textAlign: 'center' }}>
          {/* Celebration icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: '#E8F5E0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <PartyPopper size={34} color="#067A46" />
          </div>

          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 26,
              fontWeight: 700,
              color: '#242424',
              margin: '0 0 12px',
              lineHeight: 1.2,
            }}
          >
            You're all set, Sarah!
          </h1>

          <p style={{ fontSize: 15, color: '#666', margin: '0 0 28px', lineHeight: 1.6 }}>
            Your first HelloFresh box is on its way. Get ready for easy, delicious home cooking.
          </p>

          {/* Order summary card */}
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: '#f9f9f9',
              border: '1px solid #f0f0f0',
              textAlign: 'left',
            }}
          >
            <div style={{ height: 140, overflow: 'hidden' }}>
              <img
                src={img('1556910103-1c02745aae4d', 800, 280)}
                alt="Your meals"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#242424', marginBottom: 8 }}>
                Your first box
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Check size={14} color="#067A46" />
                <span style={{ fontSize: 13, color: '#555' }}>3 recipes for 2 people</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Check size={14} color="#067A46" />
                <span style={{ fontSize: 13, color: '#555' }}>Delivering Tuesday, Feb 18</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Check size={14} color="#067A46" />
                <span style={{ fontSize: 13, color: '#555' }}>Everything you need included</span>
              </div>
            </div>
          </div>

          {/* View my meals CTA */}
          <button
            style={{
              width: '100%',
              height: 50,
              borderRadius: 25,
              background: '#067A46',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
              marginTop: 20,
            }}
          >
            View my meals
          </button>

          <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
          </div>
        </div>
      </div>

      {/* Home indicator safe area */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />

      {/* Bottom sheet nudge — appears after delay */}
      {showNudge && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.4)',
              zIndex: 100,
            }}
          />

          {/* Bottom sheet */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: '#fff',
              borderRadius: '24px 24px 0 0',
              padding: '12px 24px 48px',
              zIndex: 101,
              boxShadow: '0 -8px 30px rgba(0,0,0,0.12)',
            }}
          >
            {/* Handle bar */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd', margin: '0 auto 20px' }} />

            {/* Close button */}
            <button
              onClick={() => setShowNudge(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 20,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: '#aaa',
              }}
            >
              <X size={20} />
            </button>

            {/* Illustration placeholder */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                background: 'linear-gradient(135deg, #E8F5E0 0%, #C6EAB5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <img
                src={img('1556910103-1c02745aae4d', 160, 160)}
                alt="Friends"
                style={{ width: 60, height: 60, borderRadius: 30, objectFit: 'cover' }}
              />
            </div>

            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 22,
                fontWeight: 700,
                color: '#242424',
                textAlign: 'center',
                margin: '0 0 10px',
              }}
            >
              Know someone who'd love this too?
            </h2>

            <p
              style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
                lineHeight: 1.6,
                margin: '0 0 24px',
              }}
            >
              You just signed up for something great. Gift a friend a free box — they can try HelloFresh without any commitment.
            </p>

            {/* Share button — goes to ShareHub */}
            <button
              onClick={() => {
                setShowNudge(false)
                goTo('ShareHub')
              }}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 24,
                background: '#067A46',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              <Share2 size={18} />
              Share with a friend
            </button>

            {/* Maybe later */}
            <button
              onClick={() => setShowNudge(false)}
              style={{
                display: 'block',
                margin: '16px auto 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#999',
                fontSize: 14,
                textDecoration: 'underline',
              }}
            >
              Maybe later
            </button>
          </div>
        </>
      )}
    </div>
  )
}
