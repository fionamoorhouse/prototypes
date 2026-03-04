import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  Gift,
  MessageCircle,
  Share2,
  Copy,
  ChevronLeft,
  Check,
  Clock,
  ChevronRight,
} from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const avatarImg = (id: string, size = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

const sharingActivity = [
  { name: 'Tom M.', date: 'Jan 28', status: 'Claimed' as const, avatar: '1507003211169-0a1dd7228f2d' },
  { name: 'Lisa K.', date: 'Feb 3', status: 'Pending' as const, avatar: '1494790108377-be9c29b29330' },
]

export default function ShareHub() {
  const { goTo } = usePrototype()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

      {/* Header: Back button only */}
      <div
        style={{
          position: 'absolute',
          top: 54,
          left: 0,
          right: 0,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => goTo('Profile')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            margin: -4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronLeft size={24} color="#242424" strokeWidth={2} />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Hero section — light green gradient */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: 44,
            background: 'linear-gradient(180deg, #E8F5E0 0%, #f0f9eb 60%, #fff 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Food photo card */}
          <div
            style={{
              position: 'relative',
              width: 220,
              height: 180,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(6,122,70,0.15)',
            }}
          >
            <img
              src={img('1556910103-1c02745aae4d', 440, 360)}
              alt="Friends sharing a meal"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Gift badge overlay — bottom-right */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                width: 48,
                height: 48,
                borderRadius: 24,
                background: '#067A46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(6,122,70,0.3)',
              }}
            >
              <Gift size={22} color="#fff" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ padding: '20px 28px 0', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 26,
              fontWeight: 700,
              color: '#242424',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Share that Home-Cooked Feeling
          </h1>
          <p
            style={{
              fontSize: 15,
              color: '#666',
              margin: '10px 0 0',
              lineHeight: 1.5,
              maxWidth: 320,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Help your friends stress less and eat better. Gift them a free box to bring everyone together.
          </p>
        </div>

        {/* Invitation count */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '16px 20px 4px',
          }}
        >
          <Gift size={16} color="#067A46" strokeWidth={2} />
          <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600 }}>
            You have 3 free boxes to give
          </span>
        </div>

        {/* Share buttons — two green pills */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            padding: '16px 28px',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => goTo('MessageComposer', { channel: 'imessage' })}
            style={{
              flex: 1,
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
            <MessageCircle size={18} strokeWidth={2} />
            Text
          </button>
          <button
            onClick={() => goTo('MessageComposer', { channel: 'whatsapp' })}
            style={{
              flex: 1,
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
            <Share2 size={18} strokeWidth={2} />
            Share
          </button>
        </div>

        {/* Copy link section */}
        <div style={{ padding: '0 28px 8px', textAlign: 'center' }}>
          <span
            style={{
              fontSize: 11,
              color: '#999',
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            OR COPY YOUR LINK
          </span>
          <div
            style={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8f8f8',
              borderRadius: 12,
              padding: '12px 16px',
              border: '1px solid #e8e8e8',
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: '#666',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              hellofresh.com/x/share-sarah-j
            </span>
            <button
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#067A46',
                fontWeight: 700,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                flexShrink: 0,
                padding: '0 0 0 12px',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={2.5} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} strokeWidth={2} />
                  COPY
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#f0f0f0', margin: '20px 20px 0' }} />

        {/* People you've shared with */}
        <div style={{ padding: '20px 20px 8px' }}>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 17,
              fontWeight: 700,
              color: '#242424',
              margin: '0 0 14px',
            }}
          >
            People you've shared with
          </h2>
          {sharingActivity.map((person, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: i < sharingActivity.length - 1 ? '1px solid #f3f3f3' : 'none',
              }}
            >
              <img
                src={avatarImg(person.avatar, 80)}
                alt={person.name}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#242424' }}>
                  {person.name}
                </div>
                <div style={{ fontSize: 13, color: '#999' }}>{person.date}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  borderRadius: 12,
                  background:
                    person.status === 'Claimed' ? '#E8F5E0' : '#FFF8E1',
                  color: person.status === 'Claimed' ? '#067A46' : '#F59E0B',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {person.status === 'Claimed' ? (
                  <Check size={12} strokeWidth={2.5} />
                ) : (
                  <Clock size={12} strokeWidth={2} />
                )}
                {person.status}
              </div>
            </div>
          ))}
        </div>

        {/* Link to rewards */}
        <button
          onClick={() => goTo('Profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'calc(100% - 40px)',
            margin: '12px 20px',
            padding: '14px 16px',
            background: '#f8f8f8',
            borderRadius: 14,
            border: '1px solid #f0f0f0',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 14, color: '#666' }}>
            See your rewards & loyalty status
          </span>
          <ChevronRight size={18} color="#999" strokeWidth={2} />
        </button>

        <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* Home indicator safe area */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
