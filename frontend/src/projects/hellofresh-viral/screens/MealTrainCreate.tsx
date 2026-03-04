import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  Heart,
  Baby,
  Stethoscope,
  Home,
  Truck,
  Gift,
  Minus,
  Plus,
  ChevronRight,
} from 'lucide-react'

const occasions = [
  { label: 'New baby', emoji: '👶', Icon: Baby },
  { label: 'Recovery', emoji: '🏥', Icon: Stethoscope },
  { label: 'Big move', emoji: '📦', Icon: Truck },
  { label: 'Just because', emoji: '💚', Icon: Gift },
]

export default function MealTrainCreate() {
  const { goTo } = usePrototype()
  const [recipientName, setRecipientName] = useState('')
  const [occasion, setOccasion] = useState('')
  const [weeks, setWeeks] = useState(4)
  const [boxSize, setBoxSize] = useState('3 meals · 2 people')
  const [mealMode, setMealMode] = useState<'recipient' | 'curate'>('recipient')
  const [personalMsg, setPersonalMsg] = useState('')

  const weeklyPrice = boxSize.includes('4 people') ? 89.99 : 59.99
  const totalPrice = (weeklyPrice * weeks).toFixed(2)

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <button onClick={() => goTo('Profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Start a Meal Train</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Warm intro */}
        <div style={{ padding: '16px 20px 0', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
            <Heart size={28} color="#F59E0B" />
          </div>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5, margin: 0 }}>
            Rally friends to send home-cooked meals to someone who needs it most.
          </p>
        </div>

        {/* Recipient */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 6, letterSpacing: 0.3, textTransform: 'uppercase' }}>Who is this for?</div>
          <input
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
            placeholder="Recipient's name"
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #e8e8e8', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
        </div>

        {/* Occasion */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>What's the occasion?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {occasions.map(o => (
              <button
                key={o.label}
                onClick={() => setOccasion(o.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 20,
                  background: occasion === o.label ? '#067A4615' : '#f5f5f5',
                  border: occasion === o.label ? '1.5px solid #067A46' : '1.5px solid transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  color: occasion === o.label ? '#067A46' : '#666',
                }}
              >
                <span>{o.emoji}</span> {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>How many weeks?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
            <button
              onClick={() => setWeeks(Math.max(1, weeks - 1))}
              style={{ width: 40, height: 40, borderRadius: 20, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Minus size={18} color="#666" />
            </button>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#242424' }}>{weeks}</div>
              <div style={{ fontSize: 12, color: '#999' }}>weeks</div>
            </div>
            <button
              onClick={() => setWeeks(Math.min(8, weeks + 1))}
              style={{ width: 40, height: 40, borderRadius: 20, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Plus size={18} color="#666" />
            </button>
          </div>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 4 }}>{weeks} box {weeks === 1 ? 'delivery' : 'deliveries'}</div>
        </div>

        {/* Box size */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>Box size</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['3 meals · 2 people', '3 meals · 4 people', '4 meals · 4 people'].map(size => (
              <button
                key={size}
                onClick={() => setBoxSize(size)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: boxSize === size ? '#067A4608' : '#f9f9f9',
                  border: boxSize === size ? '1.5px solid #067A46' : '1.5px solid #f0f0f0',
                  cursor: 'pointer',
                }}
              >
                <span style={{ flex: 1, textAlign: 'left', fontSize: 14, fontWeight: 600, color: boxSize === size ? '#067A46' : '#242424' }}>{size}</span>
                {boxSize === size && <div style={{ width: 20, height: 20, borderRadius: 10, background: '#067A46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 8, height: 8, borderRadius: 4, background: '#fff' }} /></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Meal selection mode */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>Who picks the meals?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { key: 'recipient' as const, label: `${recipientName || 'Recipient'} chooses` },
              { key: 'curate' as const, label: 'Curate a care package' },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setMealMode(m.key)}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 12,
                  background: mealMode === m.key ? '#067A4610' : '#f5f5f5',
                  border: mealMode === m.key ? '1.5px solid #067A46' : '1.5px solid transparent',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                  color: mealMode === m.key ? '#067A46' : '#666',
                  textAlign: 'center',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Personal message */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 6, letterSpacing: 0.3, textTransform: 'uppercase' }}>Group message</div>
          <textarea
            value={personalMsg}
            onChange={e => setPersonalMsg(e.target.value)}
            placeholder="Add a warm message from everyone..."
            style={{ width: '100%', minHeight: 80, borderRadius: 12, border: '1px solid #e8e8e8', padding: '12px 14px', fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Cost summary */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#666' }}>{weeks} weeks × ${weeklyPrice}/week</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#242424' }}>${totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#999' }}>Split between contributors</span>
              <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600 }}>Invite next →</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>

        <div style={{ height: 100 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 44px', background: 'linear-gradient(transparent, #fff 20%)' }}>
        <button
          onClick={() => goTo('MealTrainInvite')}
          style={{ width: '100%', height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          Invite contributors <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
