import { usePrototype } from '@/hooks/usePrototype'
import { Check, Star, Truck, Clock, ChefHat } from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const avatarImg = (id: string, size = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

export default function FriendLanding() {
  const { goTo } = usePrototype()

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
      {/* ===== Status bar safe area ===== */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Hero image with gradient */}
        <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
          <img
            src={img('1556910103-1c02745aae4d', 800, 520)}
            alt="Delicious HelloFresh meal"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            }}
          />
          {/* Referrer attribution on hero */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <img
              src={avatarImg('1438761681033-6461ffad8d80', 60)}
              alt="Sarah"
              style={{ width: 36, height: 36, borderRadius: 18, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.6)' }}
            />
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>From</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Sarah J.</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ padding: '24px 24px 0' }}>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 28,
              fontWeight: 700,
              color: '#242424',
              margin: '0 0 10px',
              lineHeight: 1.2,
            }}
          >
            A free HelloFresh box, from Sarah
          </h1>
          <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, margin: '0 0 24px' }}>
            Pick your favorite meals and we'll deliver everything you need to cook them. No subscription, no commitment.
          </p>

          {/* What you get */}
          <div
            style={{
              borderRadius: 16,
              background: '#f9f9f9',
              border: '1px solid #f0f0f0',
              padding: '18px 20px',
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: '#242424', marginBottom: 14 }}>
              Your free box includes:
            </div>
            {[
              { Icon: ChefHat, text: '3 recipes for 2 people', color: '#067A46' },
              { Icon: Truck, text: 'Free delivery to your door', color: '#067A46' },
              { Icon: Clock, text: 'Ready in 20–35 minutes', color: '#067A46' },
              { Icon: Check, text: 'Pre-portioned fresh ingredients', color: '#067A46' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 3 ? 12 : 0 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: '#E8F5E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <item.Icon size={16} color={item.color} />
                </div>
                <span style={{ fontSize: 14, color: '#444' }}>{item.text}</span>
              </div>
            ))}

            {/* No payment callout */}
            <div
              style={{
                marginTop: 16,
                padding: '10px 14px',
                borderRadius: 10,
                background: '#E8F5E0',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Check size={16} color="#067A46" />
              <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600 }}>
                No payment required. No auto-renewal.
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => goTo('FriendClaim')}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 28,
              background: '#067A46',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 17,
              fontWeight: 700,
              marginBottom: 16,
              boxShadow: '0 4px 16px rgba(6,122,70,0.3)',
            }}
          >
            Claim your free box
          </button>

          {/* Social proof */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} color="#F59E0B" fill={s <= 4 ? '#F59E0B' : 'none'} />
              ))}
              <span style={{ fontSize: 13, color: '#888', marginLeft: 4 }}>4.6</span>
            </div>
            <span style={{ fontSize: 12, color: '#aaa' }}>Loved by 10M+ households worldwide</span>
          </div>

          {/* HelloFresh logo area */}
          <div style={{ textAlign: 'center', padding: '20px 0 16px', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: '#067A46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>H</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#242424' }}>HelloFresh</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <span style={{ fontSize: 11, color: '#bbb' }}>Privacy</span>
              <span style={{ fontSize: 11, color: '#bbb' }}>Terms</span>
            </div>
          </div>

          <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
          </div>
        </div>
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
