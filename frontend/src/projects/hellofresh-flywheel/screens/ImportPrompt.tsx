import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, ChevronRight, Instagram, Music } from 'lucide-react'

export default function ImportPrompt() {
  const { goTo } = usePrototype()

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <button onClick={() => goTo('CookbookHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} color="#242424" />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px' }}>
        {/* Illustration area */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40, paddingBottom: 32 }}>
          <div style={{ position: 'relative', width: 200, height: 160 }}>
            {/* Stacked recipe cards illustration */}
            {[2, 1, 0].map(i => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 20 + i * 12,
                  top: i * 8,
                  width: 140,
                  height: 100,
                  borderRadius: 16,
                  background: i === 0 ? '#fff' : i === 1 ? '#f5f5f5' : '#eee',
                  boxShadow: i === 0 ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
                  border: '1px solid #e8e8e8',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {i === 0 && (
                  <>
                    <div style={{ height: 56, background: `url(https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300&h=120&fit=crop) center/cover` }} />
                    <div style={{ padding: '8px 10px' }}>
                      <div style={{ width: 80, height: 8, borderRadius: 4, background: '#e0e0e0' }} />
                      <div style={{ width: 50, height: 6, borderRadius: 3, background: '#f0f0f0', marginTop: 6 }} />
                    </div>
                  </>
                )}
              </div>
            ))}
            {/* Count badge */}
            <div style={{
              position: 'absolute', right: 10, bottom: 20,
              width: 44, height: 44, borderRadius: 22,
              background: '#067A46', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700,
              boxShadow: '0 4px 12px rgba(6,122,70,0.3)',
            }}>
              14+
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 700, color: '#242424', margin: '0 0 10px', textAlign: 'center', lineHeight: 1.2 }}>
          Teach your Cookbook what you love
        </h1>
        <p style={{ fontSize: 16, color: '#666', textAlign: 'center', margin: '0 0 32px', lineHeight: 1.5 }}>
          The more recipes you import, the better your daily dinner picks get. We'll learn your flavor preferences and suggest what to cook.
        </p>

        {/* App connection cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            background: '#fff', border: '1px solid #f0f0f0', borderRadius: 14,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Instagram size={22} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#242424', margin: 0 }}>Instagram</p>
              <p style={{ fontSize: 13, color: '#888', margin: '2px 0 0' }}>~9 saved recipes found</p>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: 10, border: '2px solid #067A46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: '#067A46' }} />
            </div>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            background: '#fff', border: '1px solid #f0f0f0', borderRadius: 14,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Music size={22} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#242424', margin: 0 }}>TikTok</p>
              <p style={{ fontSize: 13, color: '#888', margin: '2px 0 0' }}>~5 saved recipes found</p>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: 10, border: '2px solid #067A46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: '#067A46' }} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* CTA */}
        <button
          onClick={() => goTo('ImportProgress')}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            background: '#067A46', color: '#fff',
            fontSize: 17, fontWeight: 700,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 8,
          }}
        >
          Import All Recipes
          <ChevronRight size={18} />
        </button>

        <button
          onClick={() => goTo('CookbookHome')}
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: '#888', fontWeight: 500, padding: '12px 0', textAlign: 'center' }}
        >
          Maybe later
        </button>
      </div>

      <div style={{ height: 34, flexShrink: 0 }} />
    </div>
  )
}
