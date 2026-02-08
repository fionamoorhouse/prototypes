import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  Search,
  Plus,
  BookmarkPlus,
  Instagram,
  Music,
  Home,
  CalendarDays,
  BookOpen,
  User,
  X,
  Check,
  ChevronLeft,
  MoreHorizontal,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Image helper                                                       */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const thumb = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=80`

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FOOD = {
  chicken: '1532550907401-a500c9a57435',
  salmon: '1467003909585-2f8a72700288',
  veggies: '1546069901-ba9599a7e63c',
  pasta: '1473093295043-cdd812d0e601',
  stirfry: '1455619452474-d2be8b1e70cd',
  pizza: '1565299624946-b28f40a0ae38',
  salad: '1512621776951-a57141f2eefd',
  pancakes: '1567620905732-2d1ec7ab7445',
  steak: '1504674900247-0877df9cc836',
  sandwich: '1476224203421-9ac39bcb3327',
  bowl: '1540189549336-e6e99c3679fe',
  grilled: '1499028344343-cd173ffc68a9',
  avocado: '1482049016688-2d3e1b311543',
  brunch: '1490645935967-10de6ba17061',
}

const recentRecipes = [
  { id: 1, title: 'Yuzu Kosho Chicken', source: 'instagram' as const, image: img(FOOD.chicken) },
  { id: 2, title: 'Miso Glazed Salmon', source: 'instagram' as const, image: img(FOOD.salmon) },
  { id: 3, title: 'Crispy Air Fryer Tofu', source: 'tiktok' as const, image: img(FOOD.veggies) },
  { id: 4, title: 'One-Pan Lemon Pasta', source: 'instagram' as const, image: img(FOOD.pasta) },
  { id: 5, title: 'Thai Basil Stir Fry', source: 'tiktok' as const, image: img(FOOD.stirfry) },
]

const collections = [
  { id: 1, name: 'Air Fryer Gems', count: 8, images: [FOOD.veggies, FOOD.chicken, FOOD.salmon, FOOD.pizza] },
  { id: 2, name: 'Quick Weeknight', count: 12, images: [FOOD.pasta, FOOD.stirfry, FOOD.steak, FOOD.sandwich] },
  { id: 3, name: 'Date Night', count: 5, images: [FOOD.steak, FOOD.salmon, FOOD.pizza, FOOD.pancakes] },
  { id: 4, name: 'Meal Prep', count: 15, images: [FOOD.salad, FOOD.bowl, FOOD.avocado, FOOD.grilled] },
]

const sheetFolders = [
  { id: 1, name: 'Air Fryer Gems', count: 8 },
  { id: 2, name: 'Quick Weeknight', count: 12 },
  { id: 3, name: 'Date Night', count: 5 },
  { id: 4, name: 'Meal Prep', count: 15 },
  { id: 5, name: 'Summer BBQ', count: 3 },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Cookbook() {
  const { goTo } = usePrototype()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [checkedFolders, setCheckedFolders] = useState<Set<number>>(new Set([1]))
  const [sheetSearch, setSheetSearch] = useState('')

  const toggleFolder = (id: number) => {
    setCheckedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredFolders = sheetFolders.filter((f) =>
    f.name.toLowerCase().includes(sheetSearch.toLowerCase()),
  )

  const openSheet = () => setSheetOpen(true)
  const closeSheet = () => {
    setSheetOpen(false)
    setSheetSearch('')
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
                {/* Card image */}
                <div style={{ position: 'relative' }}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{
                      width: '100%',
                      height: 112,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <button
                    onClick={openSheet}
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

                {/* Card info */}
                <div style={{ padding: '10px 12px 12px' }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#242424',
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
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

        {/* --- Your Collections --- */}
        <div style={{ padding: '8px 20px 20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 17,
                fontWeight: 700,
                color: '#242424',
                margin: 0,
              }}
            >
              Your Collections
            </h2>
            <button
              onClick={openSheet}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                color: '#067A46',
                fontSize: 14,
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Plus size={16} />
              New
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            {collections.map((col) => (
              <div
                key={col.id}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                }}
              >
                {/* 2×2 collage */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                  }}
                >
                  {col.images.map((id, i) => (
                    <img
                      key={i}
                      src={thumb(id)}
                      alt=""
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  ))}
                </div>
                <div style={{ padding: '10px 12px 12px' }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#242424',
                      margin: 0,
                    }}
                  >
                    {col.name}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: '#888',
                      margin: '2px 0 0',
                    }}
                  >
                    {col.count} Recipes
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo link */}
          <button
            onClick={() => goTo('CookbookEmpty')}
            style={{
              marginTop: 20,
              fontSize: 12,
              color: '#bbb',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            View empty state →
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

      {/* ===== Bottom sheet overlay ===== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          pointerEvents: sheetOpen ? 'auto' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          onClick={closeSheet}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            opacity: sheetOpen ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Sheet */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fff',
            borderRadius: '24px 24px 0 0',
            boxShadow: '0 -8px 30px rgba(0,0,0,0.12)',
            transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
            maxHeight: '72%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Handle */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px 0 8px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: '#ddd',
              }}
            />
          </div>

          {/* Sheet header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px 16px',
              flexShrink: 0,
            }}
          >
            <h3
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 18,
                fontWeight: 700,
                color: '#242424',
                margin: 0,
              }}
            >
              Save to Collection
            </h3>
            <button
              onClick={closeSheet}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                background: '#f3f3f3',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} color="#666" />
            </button>
          </div>

          {/* Create new */}
          <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
            <button
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#067A46',
                fontWeight: 600,
                fontSize: 14,
                padding: '12px 14px',
                borderRadius: 14,
                border: '2px dashed rgba(6,122,70,0.25)',
                background: 'rgba(6,122,70,0.03)',
                cursor: 'pointer',
              }}
            >
              <Plus size={16} />
              Create New Collection
            </button>
          </div>

          {/* Search */}
          <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                color="#aaa"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <input
                type="text"
                placeholder="Search collections…"
                value={sheetSearch}
                onChange={(e) => setSheetSearch(e.target.value)}
                style={{
                  width: '100%',
                  height: 40,
                  paddingLeft: 36,
                  paddingRight: 12,
                  borderRadius: 12,
                  border: '1px solid #e8e8e8',
                  background: '#fafafa',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Folder list */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 12px',
              minHeight: 0,
            }}
          >
            {filteredFolders.map((folder) => {
              const checked = checkedFolders.has(folder.id)
              return (
                <button
                  key={folder.id}
                  onClick={() => toggleFolder(folder.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 8px',
                    borderRadius: 12,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: checked ? 'none' : '2px solid #ccc',
                      background: checked ? '#067A46' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {checked && <Check size={14} color="#fff" strokeWidth={3} />}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: '#242424',
                        margin: 0,
                      }}
                    >
                      {folder.name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: '#999',
                        margin: '1px 0 0',
                      }}
                    >
                      {folder.count} recipes
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Done button */}
          <div style={{ padding: '12px 20px 20px', flexShrink: 0 }}>
            <button
              onClick={closeSheet}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 14,
                background: '#067A46',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
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
