import { usePrototype } from '@/hooks/usePrototype'
import { X, Home, UtensilsCrossed, Gift, BookOpen, User, Star, ChevronRight, Bell } from 'lucide-react'
import { useState } from 'react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

/* ── Simulated home feed data ── */
const upcomingMeals = [
  { name: 'Tuscan Chicken Penne', image: '1546069901-ba9599a7e63c', day: 'Mon', tag: '25 min' },
  { name: 'Teriyaki Salmon Bowls', image: '1467003909585-2f8a72700288', day: 'Wed', tag: '30 min' },
  { name: 'Crispy Pork Tacos', image: '1565299585323-38d6b0865b47', day: 'Fri', tag: '20 min' },
]

export default function PostCookNudge() {
  const { goTo } = usePrototype()
  const [showNudge, setShowNudge] = useState(true)

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
        background: '#FBF8F3',
        overflow: 'hidden',
      }}
    >
      {/* ===== Status bar safe area ===== */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* ===== Header ===== */}
      <div
        style={{
          height: 44,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}
      >
        <h1
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 22,
            fontWeight: 700,
            color: '#242424',
            margin: 0,
          }}
        >
          Good evening, Sarah
        </h1>
        <Bell size={22} color="#242424" />
      </div>

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Post-cook nudge card */}
        {showNudge && (
          <div
            style={{
              margin: '12px 20px 0',
              borderRadius: 16,
              background: '#E8F5E0',
              padding: '14px 16px',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              position: 'relative',
              border: '1px solid rgba(6,122,70,0.12)',
            }}
          >
            {/* Food thumbnail from first box */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src={img('1546069901-ba9599a7e63c', 128, 128)}
                alt="Meal you cooked"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#242424', marginBottom: 4 }}>
                Love what you made?
              </div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.4, marginBottom: 10 }}>
                Share that feeling — gift a friend a free HelloFresh box
              </div>
              <button
                onClick={() => goTo('MessageComposer', { channel: 'imessage' })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#067A46',
                  fontSize: 14,
                  fontWeight: 700,
                  padding: 0,
                }}
              >
                Send a free box
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Dismiss X */}
            <button
              onClick={() => setShowNudge(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
                color: '#999',
              }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Your next box section */}
        <div style={{ padding: '24px 20px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 18,
                fontWeight: 700,
                color: '#242424',
                margin: 0,
              }}
            >
              Your next box
            </h2>
            <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600, cursor: 'pointer' }}>View menu</span>
          </div>

          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {upcomingMeals.map((meal, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: 150,
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                }}
              >
                <div style={{ height: 100, overflow: 'hidden' }}>
                  <img
                    src={img(meal.image, 300, 200)}
                    alt={meal.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: '#067A46', fontWeight: 700, marginBottom: 4 }}>
                    {meal.day}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3 }}>
                    {meal.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{meal.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rate your last meal card */}
        <div style={{ padding: '20px 20px 0' }}>
          <div
            style={{
              borderRadius: 14,
              background: '#fff',
              border: '1px solid #f0f0f0',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#FFF8E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Star size={22} color="#F59E0B" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#242424' }}>Rate your meals</div>
              <div style={{ fontSize: 13, color: '#888' }}>Tell us what you thought</div>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>
        </div>

        {/* Quick order section */}
        <div style={{ padding: '20px 20px 8px' }}>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#242424',
              margin: '0 0 14px',
            }}
          >
            Popular this week
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { name: 'Creamy Mushroom Risotto', image: '1476124369491-e7addf5db371', time: '35 min', rating: '4.8' },
              { name: 'Garlic Butter Shrimp', image: '1565557623262-b51c2513a641', time: '20 min', rating: '4.9' },
            ].map((meal, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                }}
              >
                <div style={{ height: 100, overflow: 'hidden' }}>
                  <img src={img(meal.image, 300, 200)} alt={meal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3 }}>{meal.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: '#999' }}>{meal.time}</span>
                    <span style={{ fontSize: 11, color: '#ddd' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Star size={10} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: 11, color: '#888' }}>{meal.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo nav */}
        <div style={{ padding: '28px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#ccc', fontWeight: 600, letterSpacing: 0.5 }}>DEMO</span>
          <button onClick={() => goTo('ShareHub')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Go to Share Hub
          </button>
          <button onClick={() => goTo('MessageComposer', { channel: 'whatsapp' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Go directly to Message Composer
          </button>
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* ===== Tab bar ===== */}
      <TabBar goTo={goTo} active="Home" />

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

function TabBar({ goTo, active }: { goTo: (s: string, p?: Record<string, string>) => void; active: string }) {
  const tabs = [
    { Icon: Home, label: 'Home', screen: 'PostCookNudge' },
    { Icon: UtensilsCrossed, label: 'My Menu', screen: '' },
    { Icon: Gift, label: 'Share', screen: 'ShareHub' },
    { Icon: BookOpen, label: 'Cookbook', screen: '' },
    { Icon: User, label: 'Profile', screen: '' },
  ]
  return (
    <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
      {tabs.map((tab) => {
        const isActive = tab.label === active
        return (
          <button key={tab.label} onClick={() => tab.screen && goTo(tab.screen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: tab.screen ? 'pointer' : 'default', color: isActive ? '#067A46' : '#aaa', padding: '4px 12px' }}>
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
