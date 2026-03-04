import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  Search,
  BookOpen,
  User,
  CalendarDays,
  Compass,
  BookmarkPlus,
  Check,
  Clock,
  ChevronRight,
  Bell,
} from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const FOOD = {
  chicken: '1532550907401-a500c9a57435',
  salmon: '1467003909585-2f8a72700288',
  pasta: '1473093295043-cdd812d0e601',
  stirfry: '1455619452474-d2be8b1e70cd',
  steak: '1504674900247-0877df9cc836',
  bowl: '1540189549336-e6e99c3679fe',
  salad: '1512621776951-a57141f2eefd',
  ramen: '1569718212165-3a8278d5f624',
  tacos: '1551504734-5ee1c4a1479b',
  curry: '1585937421612-70a008356fbe',
  pancakes: '1567620905732-2d1ec7ab7445',
  avocado: '1482049016688-2d3e1b311543',
}

const menuItems = [
  { id: 1, title: 'Firecracker Meatballs', subtitle: 'with Jasmine Rice & Quick Pickled Veggies', image: img(FOOD.bowl, 800, 500), time: '30 min', cals: '680 cal' },
  { id: 2, title: 'Crispy Parmesan Chicken', subtitle: 'with Garlic Butter Pasta & Roasted Broccoli', image: img(FOOD.chicken, 800, 500), time: '35 min', cals: '750 cal' },
]

const cookbookRecs = [
  { id: 1, title: 'Sesame Ginger Salmon', image: img(FOOD.salmon), time: '25 min', reason: 'Based on your saved recipes' },
  { id: 2, title: 'Weeknight Pad Thai', image: img(FOOD.stirfry), time: '30 min', reason: 'Popular with your taste' },
  { id: 3, title: 'Mediterranean Quinoa Bowl', image: img(FOOD.salad), time: '20 min', reason: 'Quick & healthy' },
]

export default function HomeFeed() {
  const { goTo } = usePrototype()
  const [savedRecs, setSavedRecs] = useState<Set<number>>(new Set())

  const saveRec = (id: number) => {
    setSavedRecs(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontWeight: 700, color: '#242424' }}>
          Home
        </span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
          <Bell size={22} color="#242424" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>

        {/* This week's menu */}
        <div style={{ padding: '16px 20px 8px' }}>
          <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>
            This Week's Menu
          </h2>
          <div
            className="no-scrollbar"
            style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4 }}
          >
            {menuItems.map(item => (
              <div key={item.id} style={{
                flexShrink: 0, width: 280, borderRadius: 16,
                overflow: 'hidden', background: '#fff',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
              }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '12px 14px 14px' }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#242424', margin: '0 0 2px' }}>{item.title}</p>
                  <p style={{ fontSize: 12, color: '#888', margin: '0 0 8px', lineHeight: 1.3 }}>{item.subtitle}</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} color="#999" />
                      <span style={{ fontSize: 12, color: '#999' }}>{item.time}</span>
                    </div>
                    <span style={{ fontSize: 12, color: '#999' }}>{item.cals}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cookbook Recommendations — the integration point */}
        <div style={{ padding: '20px 20px 8px' }}>
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: 16,
            padding: '16px 16px 12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={16} color="#067A46" />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>Recommended for Your Cookbook</span>
              </div>
              <button
                onClick={() => goTo('CookbookHome')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
              >
                <ChevronRight size={18} color="#067A46" />
              </button>
            </div>

            <div
              className="no-scrollbar"
              style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}
            >
              {cookbookRecs.map(rec => {
                const isSaved = savedRecs.has(rec.id)
                return (
                  <div
                    key={rec.id}
                    onClick={() => goTo('RecipeDetail', { id: String(rec.id) })}
                    style={{
                      flexShrink: 0, width: 150,
                      borderRadius: 14, overflow: 'hidden',
                      background: '#fff',
                      border: '1px solid #e8e8e8',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img src={rec.image} alt={rec.title} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
                      <button
                        onClick={e => { e.stopPropagation(); saveRec(rec.id) }}
                        style={{
                          position: 'absolute', top: 6, right: 6,
                          width: 28, height: 28, borderRadius: 14,
                          background: isSaved ? '#067A46' : 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(4px)',
                          border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isSaved ? <Check size={13} color="#fff" /> : <BookmarkPlus size={13} color="#242424" />}
                      </button>
                    </div>
                    <div style={{ padding: '8px 10px 10px' }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#242424', margin: '0 0 3px', lineHeight: 1.3 }}>{rec.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={10} color="#999" />
                        <span style={{ fontSize: 11, color: '#999' }}>{rec.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <p style={{ fontSize: 11, color: '#888', margin: '10px 0 0', fontStyle: 'italic' }}>
              Based on your saved recipes and cooking preferences
            </p>
          </div>
        </div>

        {/* Spacer for more "feed" content below */}
        <div style={{ padding: '16px 20px' }}>
          <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>
            Explore
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { title: 'Hall of Fame', image: img(FOOD.steak), subtitle: 'Top-rated meals' },
              { title: 'Quick & Easy', image: img(FOOD.pancakes), subtitle: 'Under 20 minutes' },
            ].map(card => (
              <div key={card.title} style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', height: 120 }}>
                <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.65))' }} />
                <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>{card.title}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* Tab bar */}
      <TabBar goTo={goTo} active="Home" />
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

function TabBar({ goTo, active }: { goTo: (screen: string, params?: Record<string, string>) => void; active: string }) {
  return (
    <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
      {[
        { Icon: Compass, label: 'Home', screen: 'HomeFeed' },
        { Icon: CalendarDays, label: 'Menu', screen: '' },
        { Icon: Search, label: 'Search', screen: '' },
        { Icon: BookOpen, label: 'Cookbook', screen: 'CookbookHome' },
        { Icon: User, label: 'Profile', screen: '' },
      ].map(tab => (
        <button
          key={tab.label}
          onClick={() => tab.screen && goTo(tab.screen)}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            background: 'none', border: 'none',
            cursor: tab.screen ? 'pointer' : 'default',
            color: tab.label === active ? '#067A46' : '#aaa',
            padding: '4px 12px',
          }}
        >
          <tab.Icon size={20} />
          <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
