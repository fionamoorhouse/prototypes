import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  X,
  Star,
  ChevronRight,
  Bell,
  Gift,
  Camera,
  Compass,
  UtensilsCrossed,
  Search,
  BookOpen,
  User,
  Sparkles,
  ShoppingBag,
} from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

/* ── Simulated meal data ── */
const upcomingMeals = [
  { name: 'Tuscan Chicken Penne', image: '1546069901-ba9599a7e63c', day: 'Mon', tag: '25 min' },
  { name: 'Teriyaki Salmon Bowls', image: '1467003909585-2f8a72700288', day: 'Wed', tag: '30 min' },
  { name: 'Crispy Pork Tacos', image: '1565299585323-38d6b0865b47', day: 'Fri', tag: '20 min' },
]

export default function PostCookNudge() {
  const { goTo } = usePrototype()
  const [showNudge, setShowNudge] = useState(true)
  const [rated, setRated] = useState(false)
  const [hoverStar, setHoverStar] = useState(0)
  const [selectedStar, setSelectedStar] = useState(0)

  const handleRate = (star: number) => {
    setSelectedStar(star)
    if (star >= 4) {
      // After a happy moment (4 or 5 star rating), show the gift nudge
      setTimeout(() => setRated(true), 600)
    }
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#FBF8F3', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#242424', margin: 0 }}>Good evening, Sam</h1>
        <div style={{ position: 'relative' }}>
          <Bell size={22} color="#242424" />
          <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: '#EF4444', border: '2px solid #FBF8F3' }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* ── Rating card (trigger for nudge) ── */}
        {!rated && (
          <div style={{ margin: '12px 20px 0', borderRadius: 16, background: '#fff', border: '1px solid #f0f0f0', padding: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                <img src={img('1546069901-ba9599a7e63c', 112, 112)} alt="Meal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>How was your Tuscan Chicken?</div>
                <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>Cooked tonight</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onMouseEnter={() => setHoverStar(s)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={() => handleRate(s)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                >
                  <Star
                    size={32}
                    color="#F59E0B"
                    fill={s <= (hoverStar || selectedStar) ? '#F59E0B' : 'none'}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            {selectedStar > 0 && selectedStar < 4 && (
              <div style={{ textAlign: 'center', marginTop: 10, fontSize: 13, color: '#999' }}>Thanks for the feedback!</div>
            )}
          </div>
        )}

        {/* ── Post-happy-moment gift nudge (Headspace-inspired warm prompt) ── */}
        {rated && showNudge && (
          <div
            style={{
              margin: '12px 20px 0',
              borderRadius: 20,
              background: 'linear-gradient(135deg, #E8F5E0 0%, #d4edda 50%, #c3e6cb 100%)',
              padding: '24px 20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Dismiss */}
            <button
              onClick={() => setShowNudge(false)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={14} color="#666" />
            </button>

            {/* Warm illustration area */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 80, height: 80, borderRadius: 40, background: '#067A46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gift size={36} color="#fff" />
                </div>
                {/* Sparkle decorations */}
                <div style={{ position: 'absolute', top: -4, right: -8, fontSize: 16 }}>✨</div>
                <div style={{ position: 'absolute', bottom: 0, left: -10, fontSize: 14 }}>💚</div>
              </div>
            </div>

            {/* Warm, emotional copy (Headspace-inspired) */}
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#242424', textAlign: 'center', margin: '0 0 8px', lineHeight: 1.3 }}>
              Share that home-cooked feeling
            </h2>
            <p style={{ fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 1.5, margin: '0 0 20px' }}>
              You loved tonight's meal. Help a friend eat better — gift them a free HelloFresh box.
            </p>

            {/* CTA buttons — Social prompt takes priority per umbrella PRD */}
            <button
              onClick={() => goTo('CookingMoment')}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 24,
                background: '#242424',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 10,
              }}
            >
              <Camera size={18} />
              Share a photo
            </button>
            <button
              onClick={() => goTo('GiftComposer')}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 24,
                background: 'transparent',
                color: '#067A46',
                border: '2px solid #067A46',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 10,
              }}
            >
              <Gift size={18} />
              Gift a free box
            </button>
            <button
              onClick={() => setShowNudge(false)}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#067A46', fontWeight: 600 }}
            >
              Maybe later
            </button>
          </div>
        )}

        {/* ── Your next box ── */}
        <div style={{ padding: '24px 20px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: 0 }}>Your next box</h2>
            <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600, cursor: 'pointer' }}>View menu</span>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {upcomingMeals.map((meal, i) => (
              <div key={i} style={{ flexShrink: 0, width: 150, borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
                <div style={{ height: 100, overflow: 'hidden' }}>
                  <img src={img(meal.image, 300, 200)} alt={meal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: '#067A46', fontWeight: 700, marginBottom: 4 }}>{meal.day}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3 }}>{meal.name}</div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{meal.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular this week */}
        <div style={{ padding: '20px 20px 8px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>Popular this week</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { name: 'Creamy Mushroom Risotto', image: '1476124369491-e7addf5db371', time: '35 min', rating: '4.8' },
              { name: 'Garlic Butter Shrimp', image: '1565557623262-b51c2513a641', time: '20 min', rating: '4.9' },
            ].map((meal, i) => (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
                <div style={{ height: 100, overflow: 'hidden' }}>
                  <img src={img(meal.image, 300, 200)} alt={meal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3 }}>{meal.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: '#999' }}>{meal.time}</span>
                    <span style={{ fontSize: 11, color: '#ddd' }}>·</span>
                    <Star size={10} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontSize: 11, color: '#888' }}>{meal.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Tab bar */}
      <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
        {[
          { Icon: Compass, label: 'Discover', screen: 'Discover' },
          { Icon: ShoppingBag, label: 'Store', screen: '' },
          { Icon: Sparkles, label: 'Assistant', screen: '' },
          { Icon: BookOpen, label: 'Cookbook', screen: '' },
          { Icon: User, label: 'Profile', screen: 'Profile' },
        ].map((tab) => (
          <button key={tab.label} onClick={() => tab.screen && goTo(tab.screen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: tab.screen ? 'pointer' : 'default', color: '#aaa', padding: '4px 12px' }}>
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
