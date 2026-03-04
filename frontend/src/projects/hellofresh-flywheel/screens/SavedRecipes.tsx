import { usePrototype } from '@/hooks/usePrototype'
import {
  ChevronLeft,
  Clock,
  Plus,
  Heart,
  Lock,
  Link,
  Camera,
  ClipboardPaste,
  Pencil,
  X,
  Instagram,
  Music,
  BookOpen,
  MoreHorizontal,
} from 'lucide-react'
import { useState } from 'react'

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
  curry: '1585937421612-70a008356fbe',
}

interface SavedRecipe {
  id: string
  title: string
  image: string
  cookTime: string
  source: 'instagram' | 'tiktok' | 'hellofresh'
}

const recentlySaved: SavedRecipe[] = [
  { id: '10', title: 'Garlic Butter Shrimp', image: img(FOOD.shrimp, 400, 400), cookTime: '20 min', source: 'instagram' },
  { id: '2', title: 'Miso Glazed Salmon Bowl', image: img(FOOD.salmon, 400, 400), cookTime: '25 min', source: 'instagram' },
  { id: '6', title: 'Shakshuka with Feta', image: img(FOOD.shakshuka, 400, 400), cookTime: '40 min', source: 'tiktok' },
  { id: '9', title: 'One-Pan Lemon Pasta', image: img(FOOD.pasta, 400, 400), cookTime: '30 min', source: 'tiktok' },
  { id: '1', title: 'Yuzu Kosho Chicken', image: img(FOOD.chicken, 400, 400), cookTime: '35 min', source: 'instagram' },
]

interface AllRecipe {
  id: string
  title: string
  subtitle?: string
  image: string
  meta: string
  source: 'instagram' | 'tiktok' | 'hellofresh'
}

const allRecipes: AllRecipe[] = [
  { id: '9', title: 'Pasta Bolognese', subtitle: 'with garlic bread', image: img(FOOD.pasta, 400, 300), meta: '30 min · 621 kcal · 21g protein', source: 'instagram' },
  { id: '15', title: 'Beef and Hand-cut Rosemary Chips...', subtitle: 'with garlicky asparagus', image: img(FOOD.steak, 400, 300), meta: '30 min · 621 kcal · 21g protein', source: 'hellofresh' },
  { id: '2', title: 'Caesar Salad with Salmon', image: img(FOOD.salmon, 400, 300), meta: '25 min · 480 kcal · 32g protein', source: 'tiktok' },
  { id: '13', title: 'Carrot Wraps', image: img(FOOD.veggies, 400, 300), meta: '20 min · 350 kcal · 12g protein', source: 'tiktok' },
  { id: '5', title: 'Thai Basil Stir Fry', image: img(FOOD.stirfry, 400, 300), meta: '25 min · 520 kcal · 28g protein', source: 'hellofresh' },
  { id: '7', title: 'Butter Chicken Tikka', image: img(FOOD.tikka, 400, 300), meta: '45 min · 680 kcal · 35g protein', source: 'hellofresh' },
]

interface Collection {
  id: string
  name: string
  emoji: string
  image?: string
  count: number
}

const collections: Collection[] = [
  { id: 'want-to-cook', name: 'Want to cook', emoji: '👨‍🍳', count: 5 },
  { id: 'hosting', name: 'Hosting', emoji: '🎉', image: img(FOOD.risotto, 300, 300), count: 3 },
  { id: 'sunday-dinner', name: 'Sunday dinner', emoji: '🍷', image: img(FOOD.steak, 300, 300), count: 1 },
  { id: 'holiday-cookout', name: 'Holiday cookout', emoji: '☀️', count: 0 },
]

export default function SavedRecipes() {
  const { goTo } = usePrototype()
  const [showAddDrawer, setShowAddDrawer] = useState(false)

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header — green bar matching HelloFresh brand */}
      <div style={{
        height: 48, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        background: '#067A46',
      }}>
        <button onClick={() => goTo('CookbookHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={22} color="#fff" />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>
            Cookbook
          </span>
          <span style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 99, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
            Beta
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button onClick={() => setShowAddDrawer(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
            <Plus size={22} color="#fff" strokeWidth={2.5} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
            <MoreHorizontal size={20} color="#fff" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>

        {/* Recently saved — horizontal scroll */}
        <div style={{ padding: '20px 0 0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 14px', padding: '0 20px' }}>
            Recently saved
          </h2>
          <div style={{
            display: 'flex', gap: 14, overflowX: 'auto',
            padding: '0 20px 4px',
            scrollSnapType: 'x mandatory',
            msOverflowStyle: 'none', scrollbarWidth: 'none',
          }}>
            {recentlySaved.map(recipe => (
              <button
                key={recipe.id}
                onClick={() => goTo('RecipeDetail', { id: recipe.id })}
                style={{
                  flexShrink: 0, width: 150,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 0, textAlign: 'left',
                  scrollSnapAlign: 'start',
                }}
              >
                <div style={{ position: 'relative', marginBottom: 8 }}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 16, display: 'block' }}
                  />
                  <SourceIcon source={recipe.source} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', margin: '0 0 2px', lineHeight: 1.3 }}>
                  {recipe.title}
                </p>
                <SourcePill source={recipe.source} />
              </button>
            ))}
          </div>
        </div>

        {/* Add a recipe button */}
        <div style={{ padding: '20px 20px 0' }}>
          <button
            onClick={() => setShowAddDrawer(true)}
            style={{
              width: '100%', height: 48,
              borderRadius: 24,
              border: '1.5px solid #e0e0e0',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 15, fontWeight: 600, color: '#242424',
            }}
          >
            <Plus size={18} color="#242424" strokeWidth={2.5} />
            Add a recipe
          </button>
        </div>

        {/* Cooked / Favourited pills */}
        <div style={{ display: 'flex', gap: 12, padding: '18px 20px 0' }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 16px',
            background: '#F8F8F8', borderRadius: 14,
          }}>
            <span style={{ fontSize: 28 }}>🍲</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', margin: 0 }}>Cooked</p>
              <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0' }}>5 recipes</p>
            </div>
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 16px',
            background: '#F8F8F8', borderRadius: 14,
          }}>
            <Heart size={24} color="#E11D48" fill="#E11D48" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', margin: 0 }}>Favourited</p>
              <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0' }}>3 recipes</p>
            </div>
          </div>
        </div>

        {/* All recipes — vertical list */}
        <div style={{ padding: '22px 20px 0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>
            All recipes ({allRecipes.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {allRecipes.map((recipe, i) => (
              <button
                key={recipe.id}
                onClick={() => goTo('RecipeDetail', { id: recipe.id })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 0',
                  borderTop: i === 0 ? 'none' : '1px solid #f2f2f2',
                  background: 'none', border: i === 0 ? 'none' : undefined,
                  borderBottom: 'none', borderLeft: 'none', borderRight: 'none',
                  cursor: 'pointer', width: '100%', textAlign: 'left',
                }}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#242424', margin: '0 0 2px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {recipe.title}
                  </p>
                  {recipe.subtitle && (
                    <p style={{ fontSize: 13, color: '#888', margin: '0 0 4px' }}>{recipe.subtitle}</p>
                  )}
                  <SourcePill source={recipe.source} />
                  {recipe.meta && (
                    <p style={{ fontSize: 11, color: '#aaa', margin: '4px 0 0' }}>{recipe.meta}</p>
                  )}
                </div>
                <MoreHorizontal size={18} color="#ccc" style={{ flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>

        {/* My collections */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#242424', margin: 0 }}>
              My collections ({collections.length})
            </h2>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
              <Plus size={14} color="#242424" strokeWidth={2.5} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>New</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {collections.map(col => (
              <div
                key={col.id}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#F8F8F8',
                  border: '1px solid #f0f0f0',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  height: 100,
                  background: col.image ? `url(${col.image}) center/cover` : '#EDEDED',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {!col.image && (
                    <span style={{ fontSize: 36 }}>{col.emoji}</span>
                  )}
                </div>
                <div style={{ padding: '10px 12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#242424', margin: 0 }}>{col.name}</p>
                    <p style={{ fontSize: 11, color: '#999', margin: '2px 0 0' }}>{col.count} {col.count === 1 ? 'recipe' : 'recipes'}</p>
                  </div>
                  <Lock size={13} color="#ccc" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>

      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />

      <AddRecipeDrawer open={showAddDrawer} onClose={() => setShowAddDrawer(false)} goTo={goTo} />
    </div>
  )
}

function SourceIcon({ source }: { source: string }) {
  const iconMap: Record<string, { Icon: typeof Instagram; bg: string }> = {
    instagram: { Icon: Instagram, bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' },
    tiktok: { Icon: Music, bg: '#000' },
    hellofresh: { Icon: BookOpen, bg: '#067A46' },
  }
  const entry = iconMap[source] || iconMap.hellofresh

  return (
    <div style={{
      position: 'absolute', top: 10, left: 10,
      width: 28, height: 28, borderRadius: 8,
      background: entry.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
    }}>
      <entry.Icon size={14} color="#fff" />
    </div>
  )
}

function SourcePill({ source }: { source: string }) {
  const config: Record<string, { Icon: typeof Instagram; label: string }> = {
    instagram: { Icon: Instagram, label: 'Instagram' },
    tiktok: { Icon: Music, label: 'TikTok' },
    hellofresh: { Icon: BookOpen, label: 'HelloFresh' },
  }
  const entry = config[source] || config.hellofresh

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, color: '#666',
      background: '#f3f3f3', borderRadius: 99,
      padding: '3px 8px', fontWeight: 500,
    }}>
      <entry.Icon size={11} />
      {entry.label}
    </span>
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
