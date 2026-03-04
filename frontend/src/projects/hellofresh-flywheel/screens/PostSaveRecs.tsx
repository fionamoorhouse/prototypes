import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { BookmarkPlus, Check, ChevronRight, Clock, X } from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const suggestions = [
  {
    id: 1,
    title: 'Crispy Sesame Tofu Bowl',
    image: img('1546069901-ba9599a7e63c'),
    cookTime: '25 min',
    reason: 'Similar flavors to your saved recipe',
  },
  {
    id: 2,
    title: 'Garlic Butter Salmon',
    image: img('1467003909585-2f8a72700288'),
    cookTime: '20 min',
    reason: 'Popular with people who saved this',
  },
  {
    id: 3,
    title: 'Spicy Peanut Noodles',
    image: img('1569718212165-3a8278d5f624'),
    cookTime: '15 min',
    reason: 'Quick & pairs well',
  },
]

export default function PostSaveRecs() {
  const { goTo } = usePrototype()
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set())
  const [dismissed, setDismissed] = useState(false)

  const save = (id: number) => {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  if (dismissed) {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Check size={28} color="#067A46" />
          </div>
          <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontWeight: 700, color: '#242424', margin: '0 0 8px', textAlign: 'center' }}>
            {savedIds.size > 0 ? `${savedIds.size} more recipe${savedIds.size > 1 ? 's' : ''} saved!` : 'Recipe saved!'}
          </h2>
          <p style={{ fontSize: 15, color: '#888', textAlign: 'center', margin: '0 0 32px' }}>
            Your cookbook keeps getting better
          </p>
          <button
            onClick={() => goTo('CookbookHome')}
            style={{
              width: '100%', height: 48, borderRadius: 24,
              background: '#067A46', color: '#fff',
              fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            Back to Cookbook
            <ChevronRight size={16} />
          </button>
        </div>
        <div style={{ height: 34, flexShrink: 0 }} />
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ width: 24 }} />
        <span style={{ fontSize: 16, fontWeight: 600, color: '#242424' }}>Recipe Saved</span>
        <button onClick={() => setDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <X size={22} color="#888" />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px' }}>
        {/* Success confirmation */}
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28,
            background: '#E8F5E0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            animation: 'bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>
            <Check size={24} color="#067A46" />
          </div>
          <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 20, fontWeight: 700, color: '#242424', margin: '0 0 4px' }}>
            Added to your Cookbook!
          </h2>
          <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
            Your collection is growing
          </p>
        </div>

        {/* Recommendations */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 4px' }}>
            You might also like
          </h3>
          <p style={{ fontSize: 13, color: '#999', margin: '0 0 16px' }}>
            Based on what you just saved
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {suggestions.map(rec => {
              const isSaved = savedIds.has(rec.id)
              return (
                <div
                  key={rec.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: 12,
                    background: '#fff',
                    border: '1px solid #f0f0f0',
                    borderRadius: 16,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  <img
                    src={rec.image}
                    alt={rec.title}
                    style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', margin: '0 0 3px', lineHeight: 1.3 }}>
                      {rec.title}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                      <Clock size={11} color="#999" />
                      <span style={{ fontSize: 12, color: '#999' }}>{rec.cookTime}</span>
                    </div>
                    <span style={{ fontSize: 11, color: '#888', fontStyle: 'italic' }}>{rec.reason}</span>
                  </div>
                  <button
                    onClick={() => save(rec.id)}
                    style={{
                      width: 40, height: 40, borderRadius: 20,
                      background: isSaved ? '#E8F5E0' : '#fff',
                      border: isSaved ? '1.5px solid #067A46' : '1.5px solid #ddd',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isSaved ? <Check size={16} color="#067A46" /> : <BookmarkPlus size={16} color="#666" />}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Done button */}
        <button
          onClick={() => setDismissed(true)}
          style={{
            width: '100%', height: 48, borderRadius: 24,
            background: '#067A46', color: '#fff',
            fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer',
            marginTop: 16, marginBottom: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          Done
          <ChevronRight size={16} />
        </button>
      </div>

      <div style={{ height: 34, flexShrink: 0 }} />

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
