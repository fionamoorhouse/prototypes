import { usePrototype } from '@/hooks/usePrototype'
import { Gift, MessageCircle, Share2, Copy, ChevronRight, Home, UtensilsCrossed, Search, BookOpen, User, Check, Clock } from 'lucide-react'
import { useState } from 'react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const avatarImg = (id: string, size = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

/* ── Sharing activity data ── */
const sharingActivity = [
  { name: 'Tom M.', date: 'Jan 28', status: 'Claimed', avatar: '1507003211169-0a1dd7228f2d' },
  { name: 'Lisa K.', date: 'Feb 3', status: 'Pending', avatar: '1494790108377-be9c29b29330' },
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
      {/* ===== Status bar safe area ===== */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Hero illustration area */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 280,
            background: 'linear-gradient(180deg, #E8F5E0 0%, #f0f9eb 60%, #fff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Warm dinner scene illustration */}
          <div style={{ position: 'relative', width: 260, height: 220 }}>
            {/* Table / dinner scene using food photo */}
            <div
              style={{
                width: 220,
                height: 180,
                borderRadius: 24,
                overflow: 'hidden',
                margin: '0 auto',
                boxShadow: '0 8px 32px rgba(6,122,70,0.15)',
              }}
            >
              <img
                src={img('1556910103-1c02745aae4d', 440, 360)}
                alt="Friends sharing a meal"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Gift badge overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 10,
                width: 56,
                height: 56,
                borderRadius: 28,
                background: '#067A46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(6,122,70,0.3)',
              }}
            >
              <Gift size={26} color="#fff" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ padding: '8px 28px 0', textAlign: 'center' }}>
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
            }}
          >
            Help your friends stress less and eat better. Gift them a free box to bring everyone together.
          </p>
        </div>

        {/* Invitations indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '16px 20px 4px',
          }}
        >
          <Gift size={16} color="#067A46" />
          <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600 }}>
            You have 3 free boxes to give
          </span>
        </div>

        {/* Share buttons */}
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
            <MessageCircle size={18} />
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
            <Share2 size={18} />
            Share
          </button>
        </div>

        {/* Copy link */}
        <div style={{ padding: '0 28px 8px', textAlign: 'center' }}>
          <span style={{ fontSize: 11, color: '#999', fontWeight: 600, letterSpacing: 1 }}>
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
            <span style={{ fontSize: 14, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> COPY</>}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#f0f0f0', margin: '20px 20px 0' }} />

        {/* Sharing activity */}
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
                padding: '10px 0',
                borderBottom: i < sharingActivity.length - 1 ? '1px solid #f3f3f3' : 'none',
              }}
            >
              <img
                src={avatarImg(person.avatar, 80)}
                alt={person.name}
                style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#242424' }}>{person.name}</div>
                <div style={{ fontSize: 13, color: '#999' }}>Sent {person.date}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  borderRadius: 12,
                  background: person.status === 'Claimed' ? '#E8F5E0' : '#FFF8E1',
                  color: person.status === 'Claimed' ? '#067A46' : '#F59E0B',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {person.status === 'Claimed' ? <Check size={12} /> : <Clock size={12} />}
                {person.status}
              </div>
            </div>
          ))}
        </div>

        {/* Link to Rewards */}
        <button
          onClick={() => goTo('RewardsHub')}
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
          <span style={{ fontSize: 14, color: '#666' }}>See your rewards & loyalty status</span>
          <ChevronRight size={18} color="#999" />
        </button>

        {/* Demo navigation links */}
        <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#ccc', fontWeight: 600, letterSpacing: 0.5 }}>DEMO SCENARIOS</span>
          <button onClick={() => goTo('PostCookNudge')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Scenario 1: Post-cook nudge (altruistic)
          </button>
          <button onClick={() => goTo('RewardsHub')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Scenario 2: Rewards hub (self-interested)
          </button>
          <button onClick={() => goTo('PostSignupNudge')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Scenario 3: Post-signup nudge
          </button>
          <button onClick={() => goTo('FriendMessage')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Scenario 4: Friend's experience
          </button>
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* ===== Tab bar ===== */}
      <TabBar goTo={goTo} active="Share" />

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ── Tab Bar ── */
function TabBar({ goTo, active }: { goTo: (s: string, p?: Record<string, string>) => void; active: string }) {
  const tabs = [
    { Icon: Home, label: 'Home', screen: '' },
    { Icon: UtensilsCrossed, label: 'My Menu', screen: '' },
    { Icon: Gift, label: 'Share', screen: 'ShareHub' },
    { Icon: BookOpen, label: 'Cookbook', screen: '' },
    { Icon: User, label: 'Profile', screen: '' },
  ]
  return (
    <div
      style={{
        flexShrink: 0,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTop: '1px solid #f0f0f0',
        background: '#fff',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.label === active
        return (
          <button
            key={tab.label}
            onClick={() => tab.screen && goTo(tab.screen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              background: 'none',
              border: 'none',
              cursor: tab.screen ? 'pointer' : 'default',
              color: isActive ? '#067A46' : '#aaa',
              padding: '4px 12px',
            }}
          >
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
