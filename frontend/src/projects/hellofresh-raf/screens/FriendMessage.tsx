import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, Phone, Video } from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const avatarImg = (id: string, size = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

export default function FriendMessage() {
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
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* ===== Status bar safe area (dark) ===== */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* ===== iMessage-style header ===== */}
      <div
        style={{
          height: 56,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          background: '#1C1C1E',
          gap: 10,
        }}
      >
        <ChevronLeft size={22} color="#0A84FF" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={avatarImg('1438761681033-6461ffad8d80', 60)}
            alt="Sarah"
            style={{ width: 34, height: 34, borderRadius: 17, objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Sarah J.</div>
            <div style={{ fontSize: 11, color: '#8E8E93' }}>iMessage</div>
          </div>
        </div>
        <Phone size={20} color="#0A84FF" style={{ marginRight: 8 }} />
        <Video size={20} color="#0A84FF" />
      </div>

      {/* ===== Chat area ===== */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
          background: '#000',
          padding: '20px 12px',
        }}
      >
        {/* Previous message context */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
          <div
            style={{
              maxWidth: '80%',
              borderRadius: '18px 18px 18px 4px',
              background: '#2C2C2E',
              padding: '10px 14px',
              color: '#fff',
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            Hey! How was dinner last night? 😊
          </div>
        </div>

        {/* Reply bubble from Sarah */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <div
            style={{
              maxWidth: '80%',
              borderRadius: '18px 18px 4px 18px',
              background: '#0A84FF',
              padding: '10px 14px',
              color: '#fff',
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            So good!! I've been cooking with HelloFresh and it's been amazing. Actually — I'm sending you a free box to try. No strings attached, just pick your meals and they deliver everything you need. 💚
          </div>
        </div>

        {/* Rich link preview card — this is the referral */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <div
            onClick={() => goTo('FriendLanding')}
            style={{
              maxWidth: '80%',
              borderRadius: 16,
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#1C1C1E',
              border: '1px solid #2C2C2E',
            }}
          >
            {/* Food photo */}
            <div style={{ height: 140, overflow: 'hidden' }}>
              <img
                src={img('1546069901-ba9599a7e63c', 600, 280)}
                alt="HelloFresh meal"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Link info */}
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                Sarah sent you a free HelloFresh box
              </div>
              <div style={{ fontSize: 12, color: '#8E8E93', lineHeight: 1.4 }}>
                Pick your meals and we'll deliver everything you need. No commitment.
              </div>
              <div style={{ fontSize: 11, color: '#636366', marginTop: 6 }}>
                hellofresh.com
              </div>
            </div>
          </div>
        </div>

        {/* Reaction from friend */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
          <div
            style={{
              maxWidth: '80%',
              borderRadius: '18px 18px 18px 4px',
              background: '#2C2C2E',
              padding: '10px 14px',
              color: '#fff',
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            Omg that's so nice!! 😍 Let me check it out
          </div>
        </div>
      </div>

      {/* ===== iMessage input bar ===== */}
      <div
        style={{
          flexShrink: 0,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#1C1C1E',
          borderTop: '1px solid #2C2C2E',
        }}
      >
        <div
          style={{
            flex: 1,
            height: 36,
            borderRadius: 18,
            background: '#2C2C2E',
            border: '1px solid #3A3A3C',
            padding: '0 14px',
            display: 'flex',
            alignItems: 'center',
            color: '#636366',
            fontSize: 15,
          }}
        >
          iMessage
        </div>
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#1C1C1E' }} />

      {/* Demo link overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <button
          onClick={() => goTo('FriendLanding')}
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '6px 14px',
            cursor: 'pointer',
          }}
        >
          → Tap link preview to continue
        </button>
      </div>
    </div>
  )
}
