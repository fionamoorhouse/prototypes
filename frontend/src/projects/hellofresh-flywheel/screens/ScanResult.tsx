import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, Clock, Users, BarChart3, Check, BookmarkPlus, Camera } from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function ScanResult() {
  const { goTo } = usePrototype()
  const [saved, setSaved] = useState(false)

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <button onClick={() => goTo('PhotoScan')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} color="#242424" />
        </button>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#242424' }}>Scanned Recipe</span>
        <button onClick={() => goTo('PhotoScan')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
          <Camera size={20} color="#242424" />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {/* Recipe image */}
        <img
          src={img('1476124369491-e7addf5db371')}
          alt="Scanned recipe"
          style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
        />

        <div style={{ padding: '20px 20px 0' }}>
          {/* AI badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#7C3AED',
              background: '#EDE9FE', borderRadius: 99,
              padding: '3px 10px', letterSpacing: '0.02em',
            }}>
              AI SCANNED
            </span>
            <span style={{ fontSize: 12, color: '#999' }}>From photo</span>
          </div>

          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 24, fontWeight: 700, color: '#242424', margin: '0 0 12px', lineHeight: 1.2 }}>
            Nonna's Mushroom Risotto
          </h1>

          {/* Meta */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Clock size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>45 min</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Users size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>4 servings</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <BarChart3 size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>Medium</span>
            </div>
          </div>

          {/* Ingredients */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Ingredients</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {[
              '2 cups arborio rice',
              '8 oz mixed mushrooms, sliced',
              '1 small onion, diced',
              '4 cups chicken broth, warm',
              '½ cup dry white wine',
              '¾ cup parmesan, grated',
              '3 tbsp butter',
              '2 tbsp olive oil',
              'Fresh thyme & parsley',
              'Salt and pepper to taste',
            ].map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: '#067A46', marginTop: 6, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#444', lineHeight: 1.4 }}>{ing}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Steps</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              'Sauté mushrooms in olive oil until golden, about 5-7 minutes. Set aside.',
              'In the same pan, cook onion in butter until soft. Add rice, stir to coat.',
              'Pour in wine, stir until absorbed. Add broth one ladle at a time, stirring frequently.',
              'When rice is creamy and al dente (~18 min), fold in mushrooms, parmesan, and fresh herbs.',
              'Season with salt and pepper. Serve immediately.',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 12,
                  background: '#E8F5E0', color: '#067A46',
                  fontSize: 12, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.5, margin: 0 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '12px 20px 0', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
        <button
          onClick={() => {
            if (!saved) {
              setSaved(true)
              setTimeout(() => goTo('PostSaveRecs'), 1200)
            }
          }}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            background: saved ? '#E8F5E0' : '#067A46',
            color: saved ? '#067A46' : '#fff',
            fontSize: 16, fontWeight: 700,
            border: saved ? '2px solid #067A46' : 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.3s ease',
          }}
        >
          {saved ? <><Check size={18} /> Saved to Cookbook!</> : <><BookmarkPlus size={18} /> Add to Cookbook</>}
        </button>
      </div>

      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
