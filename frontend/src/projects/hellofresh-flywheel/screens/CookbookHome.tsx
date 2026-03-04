import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  Search,
  BookOpen,
  User,
  CalendarDays,
  ChefHat,
  ChevronRight,
  Clock,
  Compass,
  ShoppingCart,
  Sparkles,
  Plus,
  RotateCw,
  Flame,
  UtensilsCrossed,
  Link,
  Camera,
  ClipboardPaste,
  Pencil,
  X,
} from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const FOOD = {
  chicken: '1532550907401-a500c9a57435',
  salmon: '1467003909585-2f8a72700288',
  veggies: '1546069901-ba9599a7e63c',
  pasta: '1473093295043-cdd812d0e601',
  stirfry: '1455619452474-d2be8b1e70cd',
  steak: '1504674900247-0877df9cc836',
  bowl: '1540189549336-e6e99c3679fe',
  ramen: '1569718212165-3a8278d5f624',
  tacos: '1551504734-5ee1c4a1479b',
  shakshuka: '1590412200988-a436970781fa',
  tikka: '1565557623262-b51c2513a641',
  risotto: '1476124369491-e7addf5db371',
  shrimp: '1559058789-672da06263d8',
}

interface Suggestion {
  id: number
  title: string
  image: string
  cookTime: string
  difficulty: string
  aiReason: string
  aiTheme: string
}

const suggestions: Suggestion[] = [
  {
    id: 5,
    title: 'Thai Basil Stir Fry',
    image: img(FOOD.stirfry, 800, 600),
    cookTime: '25 min',
    difficulty: 'Easy',
    aiReason: "You've saved 4 Southeast Asian recipes — let's lean into those bold flavors tonight.",
    aiTheme: 'Southeast Asian night',
  },
  {
    id: 1,
    title: 'Yuzu Kosho Chicken Thighs',
    image: img(FOOD.chicken, 800, 600),
    cookTime: '35 min',
    difficulty: 'Medium',
    aiReason: 'You saved this 3 weeks ago and haven\'t tried it yet. Tonight\'s the night.',
    aiTheme: 'From your backlog',
  },
  {
    id: 4,
    title: 'One-Pan Lemon Pasta',
    image: img(FOOD.pasta, 800, 600),
    cookTime: '30 min',
    difficulty: 'Easy',
    aiReason: "It's Wednesday — you usually go for something quick. This one's a crowd-pleaser.",
    aiTheme: 'Midweek easy win',
  },
  {
    id: 6,
    title: 'Shakshuka with Feta',
    image: img(FOOD.shakshuka, 800, 600),
    cookTime: '40 min',
    difficulty: 'Easy',
    aiReason: 'Harissa, cumin, and smoked paprika — your collection is full of warm spices. Time to use them.',
    aiTheme: 'Spice things up',
  },
  {
    id: 14,
    title: 'Spicy Ramen Noodle Soup',
    image: img(FOOD.ramen, 800, 600),
    cookTime: '35 min',
    difficulty: 'Medium',
    aiReason: 'Something warm and comforting. Perfect for a cozy night in.',
    aiTheme: 'Comfort food',
  },
]

export default function CookbookHome() {
  const { goTo } = usePrototype()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [showAddDrawer, setShowAddDrawer] = useState(false)

  const recipe = suggestions[currentIndex]

  const showNext = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrentIndex(i => (i + 1) % suggestions.length)
      setAnimating(false)
    }, 300)
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 20, fontWeight: 700, color: '#242424' }}>
            Cookbook
          </span>
          <span style={{ background: '#067A46', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
            Beta
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setShowAddDrawer(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
            <Plus size={22} color="#242424" strokeWidth={2.5} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
            <Search size={20} color="#242424" />
          </button>
        </div>
      </div>

      <div style={{ height: 1, background: '#f3f3f3', margin: '0 20px', flexShrink: 0 }} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>

        {/* ===== THE DAILY PICK — hero of the screen ===== */}
        <div style={{ padding: '20px 20px 0' }}>
          {/* Headline */}
          <h1 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 26,
            fontWeight: 700,
            color: '#242424',
            margin: '0 0 4px',
            lineHeight: 1.15,
          }}>
            What's for dinner tonight?
          </h1>

          {/* AI theme pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <Sparkles size={13} color="#D97706" />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#D97706' }}>{recipe.aiTheme}</span>
          </div>

          {/* Recipe card */}
          <div
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
              opacity: animating ? 0 : 1,
              transform: animating ? 'scale(0.96) translateY(8px)' : 'scale(1) translateY(0)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.75) 100%)',
              }}
            />

            {/* Bottom content over image */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 20px' }}>
              <p style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 24,
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 6px',
                lineHeight: 1.15,
              }}>
                {recipe.title}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} color="rgba(255,255,255,0.75)" />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{recipe.cookTime}</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{recipe.difficulty}</span>
              </div>
            </div>
          </div>

          {/* AI reasoning — the "why" */}
          <div style={{
            margin: '16px 0 0',
            padding: '14px 16px',
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 16,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}>
            <Flame size={16} color="#D97706" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 14, color: '#92400E', margin: 0, lineHeight: 1.45, fontWeight: 500 }}>
              {recipe.aiReason}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button
              onClick={() => goTo('RecipeDetail', { id: String(recipe.id), from: 'spotlight' })}
              style={{
                flex: 1,
                height: 52,
                borderRadius: 26,
                background: '#067A46',
                color: '#fff',
                fontSize: 16,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              Let's Make This
              <ChevronRight size={18} />
            </button>
            <button
              onClick={showNext}
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                border: '1.5px solid #ddd',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              title="Not tonight — show me another"
            >
              <RotateCw size={18} color="#888" />
            </button>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
            {suggestions.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentIndex ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === currentIndex ? '#067A46' : '#ddd',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* ===== SECONDARY ACTIONS — compact, below the fold ===== */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ height: 1, background: '#f0f0f0', marginBottom: 20 }} />

          {/* AI Dinner Creator — single compact row */}
          <button
            onClick={() => goTo('AIDinnerInput')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: 16,
              cursor: 'pointer',
              marginBottom: 10,
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#067A46', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ChefHat size={18} color="#fff" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', margin: 0 }}>Have ingredients? Get a custom recipe</p>
              <p style={{ fontSize: 12, color: '#666', margin: '2px 0 0' }}>Tell us what's in your fridge</p>
            </div>
            <ChevronRight size={16} color="#999" />
          </button>

          {/* Grocery list — compact row */}
          <button
            onClick={() => goTo('GrocerySelect')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              background: '#fff',
              border: '1px solid #f0f0f0',
              borderRadius: 16,
              cursor: 'pointer',
              marginBottom: 10,
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShoppingCart size={18} color="#555" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', margin: 0 }}>Plan meals for the week</p>
              <p style={{ fontSize: 12, color: '#666', margin: '2px 0 0' }}>Pick recipes, get a grocery list</p>
            </div>
            <ChevronRight size={16} color="#999" />
          </button>

          {/* Your recipes — just a link, not a grid */}
          <button
            onClick={() => goTo('SavedRecipes')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              background: '#fff',
              border: '1px solid #f0f0f0',
              borderRadius: 16,
              cursor: 'pointer',
              marginBottom: 10,
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <UtensilsCrossed size={18} color="#555" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', margin: 0 }}>Your saved recipes</p>
              <p style={{ fontSize: 12, color: '#666', margin: '2px 0 0' }}>14 recipes · 9 you haven't made yet</p>
            </div>
            <ChevronRight size={16} color="#999" />
          </button>
        </div>

        {/* Smart collection nudge */}
        <div style={{ padding: '8px 20px 24px' }}>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 14,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <Sparkles size={16} color="#64748B" />
            <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              <strong style={{ color: '#475569' }}>The more you save, the smarter picks get.</strong>{' '}
              <button onClick={() => goTo('ImportPrompt')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#067A46', fontWeight: 600, fontSize: 13, padding: 0 }}>
                Import from social media →
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <TabBar goTo={goTo} active="Cookbook" />
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />

      <AddRecipeDrawer open={showAddDrawer} onClose={() => setShowAddDrawer(false)} goTo={goTo} />
    </div>
  )
}

function AddRecipeDrawer({ open, onClose, goTo }: { open: boolean; onClose: () => void; goTo: (screen: string, params?: Record<string, string>) => void }) {
  const options = [
    { Icon: Link, label: 'Save a recipe link', action: () => { onClose() } },
    { Icon: Camera, label: 'Save recipe from image', action: () => { onClose(); goTo('PhotoScan') } },
    { Icon: ClipboardPaste, label: 'Paste recipe text', action: () => { onClose() } },
    { Icon: Pencil, label: 'Create recipe from scratch', action: () => { onClose() } },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
          zIndex: 100,
        }}
      />
      {/* Drawer */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        background: '#FBF8F3',
        borderRadius: '20px 20px 0 0',
        padding: '12px 20px 40px',
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 101,
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#D0D0D0', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 16px', textAlign: 'center' }}>Add recipe</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map(opt => (
            <button
              key={opt.label}
              onClick={opt.action}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 18px',
                background: '#fff',
                border: '1px solid #f0ebe3',
                borderRadius: 14,
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <opt.Icon size={20} color="#555" />
              <span style={{ fontSize: 15, fontWeight: 500, color: '#242424' }}>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

function TabBar({ goTo, active }: { goTo: (screen: string, params?: Record<string, string>) => void; active: string }) {
  return (
    <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
      {[
        { Icon: Compass, label: 'Discover', screen: '' },
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
