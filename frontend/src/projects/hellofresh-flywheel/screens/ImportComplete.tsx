import { useState, useEffect } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { BookOpen, ChevronRight, Sparkles } from 'lucide-react'

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=80`

const recipes = [
  img('1532550907401-a500c9a57435'), img('1467003909585-2f8a72700288'),
  img('1546069901-ba9599a7e63c'), img('1473093295043-cdd812d0e601'),
  img('1455619452474-d2be8b1e70cd'), img('1590412200988-a436970781fa'),
  img('1565557623262-b51c2513a641'), img('1540189549336-e6e99c3679fe'),
  img('1551504734-5ee1c4a1479b'), img('1476124369491-e7addf5db371'),
  img('1559058789-672da06263d8'), img('1499028344343-cd173ffc68a9'),
  img('1569718212165-3a8278d5f624'), img('1482049016688-2d3e1b311543'),
]

const CONFETTI_COLORS = ['#067A46', '#0aa05e', '#E8F5E0', '#f5a623', '#E74C3C', '#3897f0', '#833AB4', '#FD1D1D']
const CONFETTI = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 5 + Math.random() * 5,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  duration: 2 + Math.random() * 2,
  delay: Math.random() * 1,
  isRect: Math.random() > 0.5,
}))

export default function ImportComplete() {
  const { goTo } = usePrototype()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
        <div style={{ paddingTop: 40, marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 36,
            background: '#E8F5E0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}>
            <Sparkles size={32} color="#067A46" />
          </div>
        </div>

        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 28, fontWeight: 700, color: '#242424', margin: '0 0 8px', textAlign: 'center' }}>
          14 recipes imported!
        </h1>
        <p style={{ fontSize: 16, color: '#666', textAlign: 'center', margin: '0 0 32px', lineHeight: 1.5 }}>
          Your Cookbook now knows your taste. We'll suggest what to cook tonight based on what you love.
        </p>

        {/* Recipe mosaic */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
          width: '100%',
          maxWidth: 320,
          marginBottom: 32,
        }}>
          {recipes.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                width: '100%',
                aspectRatio: '1',
                objectFit: 'cover',
                borderRadius: i === 0 ? '16px 6px 6px 6px'
                  : i === 3 ? '6px 16px 6px 6px'
                  : i === 12 ? '6px 6px 6px 16px'
                  : i === 13 ? '6px 6px 16px 6px'
                  : '6px',
                display: 'block',
              }}
            />
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <button
          onClick={() => goTo('CookbookHome')}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            background: '#067A46', color: '#fff',
            fontSize: 17, fontWeight: 700,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 12,
          }}
        >
          <Sparkles size={18} />
          See Tonight's Pick
          <ChevronRight size={18} />
        </button>

        <button
          onClick={() => goTo('CookbookHome')}
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: '#067A46', fontWeight: 600, padding: '10px 0' }}
        >
          Go to Cookbook
        </button>
      </div>

      <div style={{ height: 34, flexShrink: 0 }} />

      {/* Confetti */}
      {showConfetti && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none', overflow: 'hidden' }}>
          {CONFETTI.map(p => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: -20,
                width: p.size,
                height: p.size * (p.isRect ? 2.5 : 1),
                borderRadius: p.isRect ? 2 : p.size / 2,
                background: p.color,
                animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
                opacity: 0,
              }}
            />
          ))}
          <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(900px) rotate(720deg); opacity: 0; }
            }
            @keyframes bounce-in {
              0% { transform: scale(0); opacity: 0; }
              60% { transform: scale(1.15); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
