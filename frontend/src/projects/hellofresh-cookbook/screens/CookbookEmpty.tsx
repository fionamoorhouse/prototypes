import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  Search,
  BookmarkPlus,
  Instagram,
  Music,
  Home,
  CalendarDays,
  BookOpen,
  User,
  ChevronLeft,
  MoreHorizontal,
  FolderPlus,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Image helper & data                                                */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const FOOD = {
  chicken: '1532550907401-a500c9a57435',
  salmon: '1467003909585-2f8a72700288',
  veggies: '1546069901-ba9599a7e63c',
  pasta: '1473093295043-cdd812d0e601',
  stirfry: '1455619452474-d2be8b1e70cd',
}

const recentRecipes = [
  { id: 1, title: 'Yuzu Kosho Chicken', source: 'instagram' as const, image: img(FOOD.chicken) },
  { id: 2, title: 'Miso Glazed Salmon', source: 'instagram' as const, image: img(FOOD.salmon) },
  { id: 3, title: 'Crispy Air Fryer Tofu', source: 'tiktok' as const, image: img(FOOD.veggies) },
  { id: 4, title: 'One-Pan Lemon Pasta', source: 'instagram' as const, image: img(FOOD.pasta) },
  { id: 5, title: 'Thai Basil Stir Fry', source: 'tiktok' as const, image: img(FOOD.stirfry) },
]

const suggestedChips = ['Favorites', 'Quick Dinners', 'To Try', 'Healthy', 'Comfort Food']

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CookbookEmpty() {
  const { goTo } = usePrototype()
  const [selectedChip, setSelectedChip] = useState<string | null>(null)

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ChevronLeft size={22} color="#242424" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 20,
                fontWeight: 700,
                color: '#242424',
              }}
            >
              Cookbook
            </span>
            <span
              style={{
                background: '#067A46',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 99,
                letterSpacing: '0.05em',
                textTransform: 'uppercase' as const,
              }}
            >
              Beta
            </span>
          </div>
        </div>
        <MoreHorizontal size={22} color="#242424" />
      </div>

      {/* ===== Divider ===== */}
      <div style={{ height: 1, background: '#f3f3f3', margin: '0 20px', flexShrink: 0 }} />

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* --- Recently Saved --- */}
        <div style={{ paddingTop: 20, paddingBottom: 8 }}>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 17,
              fontWeight: 700,
              color: '#242424',
              padding: '0 20px',
              marginBottom: 14,
            }}
          >
            Recently Saved
          </h2>

          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: 12,
              padding: '0 20px',
              overflowX: 'auto',
              overflowY: 'hidden',
              paddingBottom: 4,
            }}
          >
            {recentRecipes.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  flexShrink: 0,
                  width: 160,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #f0f0f0',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: '100%', height: 112, objectFit: 'cover', display: 'block' }}
                  />
                  <button
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(4px)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    <BookmarkPlus size={14} color="#242424" />
                  </button>
                </div>
                <div style={{ padding: '10px 12px 12px' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3, margin: 0 }}>
                    {recipe.title}
                  </p>
                  <div style={{ marginTop: 6 }}>
                    <SourceBadge source={recipe.source} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Empty Collections --- */}
        <div style={{ padding: '8px 20px 20px' }}>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 17,
              fontWeight: 700,
              color: '#242424',
              margin: '0 0 8px',
            }}
          >
            Your Collections
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '36px 0',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <FolderPlus size={28} color="#bbb" />
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#555', margin: '0 0 4px' }}>
              No collections yet
            </p>
            <p style={{ fontSize: 13, color: '#aaa', margin: '0 0 20px', maxWidth: 240 }}>
              Organize your saved recipes into collections. Start with a suggestion:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {suggestedChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setSelectedChip(chip === selectedChip ? null : chip)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 99,
                    fontSize: 14,
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: selectedChip === chip ? '#067A46' : 'rgba(6,122,70,0.08)',
                    color: selectedChip === chip ? '#fff' : '#067A46',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => goTo('Cookbook')}
            style={{
              marginTop: 8,
              fontSize: 12,
              color: '#bbb',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            ← View populated state
          </button>
        </div>
      </div>

      {/* ===== Tab bar ===== */}
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
        {[
          { Icon: Home, label: 'Home', active: false },
          { Icon: CalendarDays, label: 'Menu', active: false },
          { Icon: Search, label: 'Search', active: false },
          { Icon: BookOpen, label: 'Cookbook', active: true },
          { Icon: User, label: 'Profile', active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: tab.active ? '#067A46' : '#aaa',
              padding: '4px 12px',
            }}
          >
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SourceBadge({ source }: { source: 'instagram' | 'tiktok' }) {
  const Icon = source === 'instagram' ? Instagram : Music
  const label = source === 'instagram' ? 'Instagram' : 'TikTok'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        color: '#666',
        background: '#f5f5f5',
        borderRadius: 99,
        padding: '3px 8px',
      }}
    >
      <Icon size={12} />
      {label}
    </span>
  )
}
