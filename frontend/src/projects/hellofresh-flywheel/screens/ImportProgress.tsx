import { useState, useEffect } from 'react'
import { usePrototype } from '@/hooks/usePrototype'

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=80`

const importedRecipes = [
  { id: 1, title: 'Yuzu Kosho Chicken', image: img('1532550907401-a500c9a57435'), source: 'instagram' },
  { id: 2, title: 'Miso Glazed Salmon', image: img('1467003909585-2f8a72700288'), source: 'tiktok' },
  { id: 3, title: 'Crispy Air Fryer Tofu', image: img('1546069901-ba9599a7e63c'), source: 'tiktok' },
  { id: 4, title: 'One-Pan Lemon Pasta', image: img('1473093295043-cdd812d0e601'), source: 'instagram' },
  { id: 5, title: 'Thai Basil Stir Fry', image: img('1455619452474-d2be8b1e70cd'), source: 'instagram' },
  { id: 6, title: 'Shakshuka with Feta', image: img('1590412200988-a436970781fa'), source: 'instagram' },
  { id: 7, title: 'Chicken Tikka Masala', image: img('1565557623262-b51c2513a641'), source: 'tiktok' },
  { id: 8, title: 'Mediterranean Bowl', image: img('1540189549336-e6e99c3679fe'), source: 'instagram' },
  { id: 9, title: 'Korean BBQ Tacos', image: img('1551504734-5ee1c4a1479b'), source: 'instagram' },
  { id: 10, title: 'Mushroom Risotto', image: img('1476124369491-e7addf5db371'), source: 'tiktok' },
  { id: 11, title: 'Honey Garlic Shrimp', image: img('1559058789-672da06263d8'), source: 'instagram' },
  { id: 12, title: 'Grilled Caesar Salad', image: img('1499028344343-cd173ffc68a9'), source: 'instagram' },
  { id: 13, title: 'Spicy Ramen Soup', image: img('1569718212165-3a8278d5f624'), source: 'tiktok' },
  { id: 14, title: 'Avocado Toast Deluxe', image: img('1482049016688-2d3e1b311543'), source: 'instagram' },
]

export default function ImportProgress() {
  const { goTo } = usePrototype()
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (visibleCount < importedRecipes.length) {
      const timer = setTimeout(() => setVisibleCount(v => v + 1), 280)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setDone(true), 600)
      return () => clearTimeout(timer)
    }
  }, [visibleCount])

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => goTo('ImportComplete'), 800)
      return () => clearTimeout(timer)
    }
  }, [done, goTo])

  const progress = visibleCount / importedRecipes.length

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px', overflow: 'hidden' }}>
        {/* Header text */}
        <div style={{ textAlign: 'center', paddingTop: 32, paddingBottom: 24, flexShrink: 0 }}>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 24, fontWeight: 700, color: '#242424', margin: '0 0 8px' }}>
            {done ? 'All done!' : 'Importing your recipes...'}
          </h1>
          <p style={{ fontSize: 15, color: '#888', margin: 0 }}>
            {done ? `${importedRecipes.length} recipes added to your Cookbook` : `Found ${visibleCount} of ${importedRecipes.length} recipes`}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, borderRadius: 3, background: '#f0f0f0', marginBottom: 24, flexShrink: 0, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              borderRadius: 3,
              background: done ? '#067A46' : 'linear-gradient(90deg, #067A46, #0a9e5c)',
              width: `${progress * 100}%`,
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Recipe grid */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {importedRecipes.map((recipe, i) => {
              const visible = i < visibleCount
              return (
                <div
                  key={recipe.id}
                  style={{
                    borderRadius: 14,
                    overflow: 'hidden',
                    background: visible ? '#fff' : '#f5f5f5',
                    border: '1px solid #f0f0f0',
                    opacity: visible ? 1 : 0.3,
                    transform: visible ? 'scale(1)' : 'scale(0.92)',
                    transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                    />
                    {visible && (
                      <div style={{
                        position: 'absolute', bottom: 4, right: 4,
                        width: 20, height: 20, borderRadius: 10,
                        background: '#067A46',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: 'pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}>
                        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '6px 8px 8px' }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#242424', margin: 0, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {recipe.title}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <style>{`
          @keyframes pop-in {
            0% { transform: scale(0); }
            70% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>

      <div style={{ height: 34, flexShrink: 0 }} />
    </div>
  )
}
