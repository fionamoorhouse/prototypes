import { useState, useEffect } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { ChefHat } from 'lucide-react'

const phrases = [
  'Looking through your ingredients...',
  'Finding flavor combinations...',
  'Creating your recipe...',
  'Adding the finishing touches...',
]

export default function AIDinnerGenerating() {
  const { goTo, searchParams } = usePrototype()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const ingredients = searchParams.get('ingredients') || 'Chicken,Broccoli,Rice'

  useEffect(() => {
    if (phraseIndex < phrases.length - 1) {
      const timer = setTimeout(() => setPhraseIndex(i => i + 1), 1100)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => goTo('AIDinnerResult', { ingredients }), 900)
      return () => clearTimeout(timer)
    }
  }, [phraseIndex, goTo, ingredients])

  const ingredientList = ingredients.split(',')

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
        {/* Animated chef hat */}
        <div style={{
          width: 88, height: 88, borderRadius: 44,
          background: 'linear-gradient(135deg, #E8F5E0, #BBF7D0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 32,
          animation: 'cook-pulse 1.5s ease-in-out infinite',
        }}>
          <ChefHat size={40} color="#067A46" style={{ animation: 'wiggle 2s ease-in-out infinite' }} />
        </div>

        <h2 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 24, fontWeight: 700, color: '#242424',
          margin: '0 0 12px', textAlign: 'center',
        }}>
          Creating your recipe
        </h2>

        {/* Animated phrase */}
        <p style={{
          fontSize: 15, color: '#888', textAlign: 'center',
          margin: '0 0 32px', minHeight: 22,
          animation: 'fade-in 0.4s ease',
        }}
          key={phraseIndex}
        >
          {phrases[phraseIndex]}
        </p>

        {/* Ingredient chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {ingredientList.map((ing, i) => (
            <span
              key={ing}
              style={{
                padding: '6px 14px', borderRadius: 20,
                background: '#F0FDF4', border: '1px solid #BBF7D0',
                fontSize: 13, color: '#067A46', fontWeight: 500,
                animation: `fade-in 0.3s ease ${i * 0.1}s both`,
              }}
            >
              {ing.trim()}
            </span>
          ))}
        </div>

        {/* Dots animation */}
        <div style={{ display: 'flex', gap: 6, marginTop: 40 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: 8, height: 8, borderRadius: 4,
                background: '#067A46',
                animation: `dot-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ height: 34, flexShrink: 0 }} />

      <style>{`
        @keyframes cook-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dot-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
