import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, Clock, Users, BarChart3, BookmarkPlus, Check, Share2, Sparkles } from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function AIDinnerResult() {
  const { goTo, searchParams } = usePrototype()
  const [saved, setSaved] = useState(false)
  const ingredients = (searchParams.get('ingredients') || 'Chicken,Broccoli,Rice').split(',').map(s => s.trim())

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <button onClick={() => goTo('AIDinnerInput')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} color="#242424" />
        </button>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#242424' }}>AI Recipe</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
          <Share2 size={20} color="#242424" />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {/* Recipe hero */}
        <div style={{ position: 'relative' }}>
          <img
            src={img('1512058564366-18510be2db19')}
            alt="Generated recipe"
            style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', top: 14, left: 14,
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
            borderRadius: 20, padding: '5px 12px',
          }}>
            <Sparkles size={13} color="#7C3AED" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED' }}>AI Created</span>
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 24, fontWeight: 700, color: '#242424', margin: '0 0 12px', lineHeight: 1.2 }}>
            Teriyaki {ingredients.includes('Chicken') ? 'Chicken' : ingredients[0]} &amp; {ingredients.includes('Broccoli') ? 'Broccoli' : ingredients[1] || 'Veggie'} Rice Bowl
          </h1>

          {/* Meta */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Clock size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>25 min</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Users size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>4 servings</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <BarChart3 size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>Easy</span>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: 14, color: '#666', margin: '0 0 20px', lineHeight: 1.5 }}>
            A quick and flavorful bowl using what you already have. Sweet teriyaki glaze ties everything together.
          </p>

          {/* Your ingredients used */}
          <div style={{
            background: '#F0FDF4', borderRadius: 14, padding: '14px 16px',
            border: '1px solid #BBF7D0', marginBottom: 24,
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#067A46', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Your ingredients used
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {ingredients.map(ing => (
                <span key={ing} style={{
                  padding: '4px 10px', borderRadius: 12,
                  background: '#fff', border: '1px solid #BBF7D0',
                  fontSize: 12, color: '#067A46', fontWeight: 500,
                }}>
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Ingredients</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {[
              ...ingredients.map(i => `${i} (from your fridge)`),
              '3 tbsp soy sauce',
              '2 tbsp honey or brown sugar',
              '1 tbsp rice vinegar',
              '1 tsp sesame oil',
              '1 clove garlic, minced',
              'Sesame seeds for garnish',
              'Green onions, sliced',
            ].map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: 3,
                  background: i < ingredients.length ? '#067A46' : '#ccc',
                  marginTop: 6, flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 14, color: '#444', lineHeight: 1.4,
                  fontWeight: i < ingredients.length ? 600 : 400,
                }}>
                  {ing}
                </span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Steps</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              'Cook rice according to package directions. Set aside.',
              'Mix soy sauce, honey, rice vinegar, sesame oil, and garlic in a small bowl.',
              'Cut chicken into bite-sized pieces. Cook in a hot pan with oil until golden, about 6-7 minutes.',
              'Add broccoli florets, cook 3-4 minutes until tender-crisp.',
              'Pour teriyaki sauce over chicken and broccoli. Toss to coat. Cook 1-2 minutes until glazed.',
              'Serve over rice. Garnish with sesame seeds and green onions.',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 12,
                  background: '#EDE9FE', color: '#7C3AED',
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
              setTimeout(() => goTo('PostSaveRecs', { from: 'ai' }), 1200)
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
          {saved ? <><Check size={18} /> Saved to Cookbook!</> : <><BookmarkPlus size={18} /> Save to Cookbook</>}
        </button>
      </div>

      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
