import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  Check,
  HandHeart,
  Share2,
  Compass,
  ShoppingBag,
  Sparkles,
  BookOpen,
  User,
  CreditCard,
} from 'lucide-react'

const avatar = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`
const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

/* ── Data ── */
const organizer = { name: 'Sam J.', avatar: '1494790108377-be9c29b29330' }
const recipient = 'Maria'
const occasion = { label: 'New baby', emoji: '👶' }
const duration = '4 weeks'
const boxSize = '3 meals for 2 people'
const totalNeeded = 320
const amountFunded = 200
const contributorCount = 4
const contributorTarget = 6
const organizerMessage =
  'Maria just had her baby! Let\'s make sure she has delicious home-cooked meals while she adjusts to life with a newborn. 💛'

const contributorAvatars = [
  { name: 'Sam', avatar: '1494790108377-be9c29b29330' },
  { name: 'Alex', avatar: '1507003211169-0a1dd7228f2d' },
  { name: 'Jordan', avatar: '1534528741775-53994a69daeb' },
  { name: 'Chris', avatar: '1472099645785-5658abf4ff4e' },
]

const suggestedMeals = [
  { name: 'Thai Basil Chicken', photo: '1567620905732-2d1ec7ab7445' },
  { name: 'Crispy Salmon Rice Bowls', photo: '1563379926898-05f4575a45d8' },
  { name: 'Tuscan Shrimp Risotto', photo: '1551782450-a2132b4ba21d' },
  { name: 'Garlic Herb Butter Steak', photo: '1546069901-ba9599a7e63c' },
  { name: 'Veggie Pad Thai', photo: '1512058564366-18510be2db87' },
]

const presetAmounts = [25, 50, 75]

type Step = 'contribute' | 'confirmed'

export default function MealTrainContribute() {
  const { goTo } = usePrototype()
  const [step, setStep] = useState<Step>('contribute')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [selectedMeals, setSelectedMeals] = useState<string[]>([])
  const [personalNote, setPersonalNote] = useState('')

  const effectiveAmount = isCustom ? (parseInt(customAmount) || 0) : (selectedAmount ?? 0)
  const mealsEquivalent = effectiveAmount > 0 ? Math.max(1, Math.round(effectiveAmount / 20)) : 0
  const weeksEquivalent = effectiveAmount > 0 ? Math.max(1, Math.round(effectiveAmount / 80)) : 0
  const canSubmit = effectiveAmount > 0

  const toggleMeal = (name: string) => {
    setSelectedMeals(prev => {
      if (prev.includes(name)) return prev.filter(m => m !== name)
      if (prev.length >= 2) return prev
      return [...prev, name]
    })
  }

  /* ── Confirmed state ── */
  if (step === 'confirmed') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        {/* Confetti decoration */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {['💛', '💚', '🍽️', '✨', '🎉', '👶'].map((emoji, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${12 + i * 14}%`,
              top: `${6 + (i % 3) * 10}%`,
              fontSize: 24,
              opacity: 0.55,
              transform: `rotate(${i * 35 - 90}deg)`,
            }}>
              {emoji}
            </div>
          ))}
        </div>

        {/* Checkmark */}
        <div style={{
          width: 80, height: 80, borderRadius: 40,
          background: '#E8F5E0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20, position: 'relative', zIndex: 1,
        }}>
          <Check size={36} color="#067A46" strokeWidth={3} />
        </div>

        <h1 style={{
          fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700,
          color: '#242424', textAlign: 'center', margin: '0 0 10px',
          position: 'relative', zIndex: 1,
        }}>
          Thank you!
        </h1>

        <p style={{
          fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.5,
          margin: '0 0 8px', position: 'relative', zIndex: 1,
        }}>
          Your contribution of ${effectiveAmount} will help {recipient} enjoy {weeksEquivalent} {weeksEquivalent === 1 ? 'week' : 'weeks'} of meals
        </p>

        {personalNote && (
          <p style={{
            fontSize: 13, color: '#999', textAlign: 'center', lineHeight: 1.5,
            margin: '0 0 8px', fontStyle: 'italic', position: 'relative', zIndex: 1,
          }}>
            Your message will be delivered with the first box
          </p>
        )}

        <div style={{ height: 24 }} />

        <button
          onClick={() => goTo('Discover')}
          style={{
            width: '100%', maxWidth: 280, height: 52, borderRadius: 26,
            background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: 16, fontWeight: 700, position: 'relative', zIndex: 1,
          }}
        >
          Back to Discover
        </button>

        <button
          onClick={() => goTo('MealTrainInvite')}
          style={{
            marginTop: 14, background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, color: '#067A46', fontWeight: 600,
            position: 'relative', zIndex: 1,
          }}
        >
          Invite more friends to contribute
        </button>

        {/* Demo launcher link */}
        <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
      </div>
    )
  }

  /* ── Contribute state ── */
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      {/* Warm hero background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 40%, #FCD34D 100%)', borderRadius: '0 0 32px 32px' }} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ height: 54 }} />

        {/* Header */}
        <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
          <button onClick={() => goTo('Discover')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <ChevronLeft size={22} color="#242424" />
          </button>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Meal Train</span>
        </div>

        {/* ── Hero card ── */}
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{ borderRadius: 20, background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', padding: '22px 20px', position: 'relative' }}>
            {/* Occasion badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 14, background: '#FEF3C7', marginBottom: 14 }}>
              <span style={{ fontSize: 14 }}>{occasion.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#92400E' }}>{occasion.label}</span>
            </div>

            {/* Organizer avatar + headline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img src={avatar(organizer.avatar, 80)} alt={organizer.name} style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover', border: '2px solid #FDE68A' }} />
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 19, fontWeight: 700, color: '#242424', lineHeight: 1.3, flex: 1 }}>
                {organizer.name} started a Meal Train for {recipient}
              </div>
            </div>

            {/* Organizer message */}
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: '0 0 0', fontStyle: 'italic', paddingLeft: 14, borderLeft: '3px solid #FDE68A' }}>
              &ldquo;{organizerMessage}&rdquo;
            </p>
          </div>
        </div>

        {/* ── Details section ── */}
        <div style={{ margin: '16px 20px 0', borderRadius: 16, border: '1.5px solid #f0f0f0', padding: '18px' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>Details</h3>

          {[
            { emoji: '📅', label: 'Duration', value: `${duration} of home-cooked meals` },
            { emoji: '🍽️', label: 'Box size', value: boxSize },
            { emoji: '👥', label: 'Contributors', value: `${contributorCount} of ${contributorTarget}` },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase' }}>{item.label}</div>
                <div style={{ fontSize: 14, color: '#333', marginTop: 1 }}>{item.value}</div>
              </div>
            </div>
          ))}

          {/* Contributor avatars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ display: 'flex' }}>
              {contributorAvatars.map((c, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 14, overflow: 'hidden', border: '2px solid #fff', marginLeft: i > 0 ? -8 : 0, position: 'relative', zIndex: 5 - i }}>
                  <img src={avatar(c.avatar, 56)} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <span style={{ fontSize: 12, color: '#999' }}>{contributorAvatars.map(c => c.name).join(', ')}</span>
          </div>

          {/* Progress bar */}
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 6 }}>Amount funded</div>
          <div style={{ height: 8, borderRadius: 4, background: '#f0f0f0', overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #F59E0B, #FCD34D)', width: `${(amountFunded / totalNeeded) * 100}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#F59E0B', fontWeight: 700 }}>${amountFunded} raised</span>
            <span style={{ color: '#999' }}>${totalNeeded - amountFunded} still needed</span>
          </div>
        </div>

        {/* ── Contribution amount ── */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 10, letterSpacing: 0.3, textTransform: 'uppercase' }}>Choose your contribution</div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {presetAmounts.map(amount => {
              const isSelected = !isCustom && selectedAmount === amount
              return (
                <button
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setIsCustom(false) }}
                  style={{
                    flex: 1, height: 48, borderRadius: 14,
                    background: isSelected ? '#067A4612' : '#f9f9f9',
                    border: isSelected ? '2px solid #067A46' : '2px solid #f0f0f0',
                    cursor: 'pointer', fontSize: 16, fontWeight: 700,
                    color: isSelected ? '#067A46' : '#242424',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  ${amount}
                </button>
              )
            })}
            <button
              onClick={() => { setIsCustom(true); setSelectedAmount(null) }}
              style={{
                flex: 1, height: 48, borderRadius: 14,
                background: isCustom ? '#067A4612' : '#f9f9f9',
                border: isCustom ? '2px solid #067A46' : '2px solid #f0f0f0',
                cursor: 'pointer', fontSize: 13, fontWeight: 700,
                color: isCustom ? '#067A46' : '#666',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              Custom
            </button>
          </div>

          {/* Custom amount input */}
          {isCustom && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#242424' }}>$</span>
              <input
                type="number"
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  flex: 1, padding: '12px 14px', borderRadius: 12,
                  border: '1.5px solid #067A46', fontSize: 16, fontWeight: 600,
                  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                  color: '#242424',
                }}
                autoFocus
              />
            </div>
          )}

          {/* Meals equivalent */}
          {effectiveAmount > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '8px 14px', borderRadius: 10, background: '#E8F5E0',
            }}>
              <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600 }}>
                🍽️ Covers ~{mealsEquivalent} {mealsEquivalent === 1 ? 'meal' : 'meals'} for {recipient}
              </span>
            </div>
          )}
        </div>

        {/* ── Meal picks (optional) ── */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 4, letterSpacing: 0.3, textTransform: 'uppercase' }}>Suggest a meal for {recipient}</div>
          <div style={{ fontSize: 12, color: '#bbb', marginBottom: 12 }}>(optional — pick up to 2)</div>

          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {suggestedMeals.map((meal) => {
              const isSelected = selectedMeals.includes(meal.name)
              return (
                <div
                  key={meal.name}
                  onClick={() => toggleMeal(meal.name)}
                  style={{
                    flexShrink: 0, width: 130, borderRadius: 14, overflow: 'hidden',
                    border: isSelected ? '2px solid #067A46' : '2px solid #f0f0f0',
                    cursor: 'pointer', position: 'relative',
                    background: '#fff',
                  }}
                >
                  <div style={{ height: 100, overflow: 'hidden', position: 'relative' }}>
                    <img src={img(meal.photo, 260, 200)} alt={meal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {isSelected && (
                      <div style={{
                        position: 'absolute', top: 6, right: 6,
                        width: 22, height: 22, borderRadius: 11,
                        background: '#067A46', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={13} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#242424', lineHeight: 1.3 }}>{meal.name}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Personal note ── */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 6, letterSpacing: 0.3, textTransform: 'uppercase' }}>Add a message for {recipient}</div>
          <textarea
            value={personalNote}
            onChange={e => setPersonalNote(e.target.value)}
            placeholder="Congrats on the little one! Enjoy these meals."
            style={{
              width: '100%', minHeight: 72, borderRadius: 12,
              border: '1px solid #e8e8e8', padding: '12px 14px',
              fontSize: 14, outline: 'none', fontFamily: 'inherit',
              resize: 'none', boxSizing: 'border-box', color: '#333',
            }}
          />
        </div>

        {/* ── Payment section ── */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 10, letterSpacing: 0.3, textTransform: 'uppercase' }}>Payment</div>

          {/* Saved card */}
          <div style={{
            borderRadius: 14, border: '1.5px solid #e8e8e8', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
            background: '#f9f9f9',
          }}>
            <CreditCard size={20} color="#666" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>•••• •••• •••• 4242</div>
              <div style={{ fontSize: 11, color: '#999', marginTop: 1 }}>Visa · Exp 12/27</div>
            </div>
            <span style={{ fontSize: 12, color: '#067A46', fontWeight: 600 }}>Change</span>
          </div>

          {/* Apple Pay */}
          <button style={{
            width: '100%', height: 48, borderRadius: 12,
            background: '#000', color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path d="M15.24 12.77c-.03-2.83 2.31-4.19 2.42-4.26-1.32-1.93-3.37-2.19-4.1-2.22-1.74-.18-3.41 1.03-4.29 1.03-.89 0-2.26-1-3.72-.97-1.91.03-3.68 1.12-4.66 2.84-1.99 3.45-.51 8.56 1.43 11.36.95 1.37 2.08 2.91 3.56 2.85 1.43-.06 1.97-.92 3.7-.92 1.73 0 2.22.92 3.73.89 1.54-.03 2.52-1.4 3.46-2.78 1.09-1.59 1.54-3.13 1.57-3.21-.03-.01-3.01-1.16-3.04-4.59l-.06-.02z" fill="white"/>
              <path d="M12.53 4.41c.79-.96 1.32-2.29 1.17-3.62-1.14.05-2.51.76-3.33 1.71-.73.84-1.37 2.19-1.2 3.48 1.27.1 2.56-.64 3.36-1.57z" fill="white"/>
            </svg>
            Pay
          </button>
        </div>

        {/* Spacer for CTA */}
        <div style={{ height: 120 }} />

        {/* Demo launcher link */}
        <div style={{ padding: '8px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2 }}>
        <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', boxShadow: '0 -4px 24px rgba(0,0,0,0.06)', padding: '14px 20px 0' }}>
          {/* Handle bar */}
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd', margin: '0 auto 14px' }} />

          <button
            onClick={() => canSubmit && setStep('confirmed')}
            disabled={!canSubmit}
            style={{
              width: '100%', height: 52, borderRadius: 26,
              background: canSubmit ? '#067A46' : '#ccc',
              color: '#fff', border: 'none',
              cursor: canSubmit ? 'pointer' : 'default',
              fontSize: 16, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: canSubmit ? 1 : 0.6,
            }}
          >
            <HandHeart size={18} /> Contribute ${effectiveAmount || '—'}
          </button>
        </div>

        {/* Tab bar */}
        <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
          {[
            { Icon: Compass, label: 'Discover', screen: 'Discover' },
            { Icon: ShoppingBag, label: 'Store', screen: '' },
            { Icon: Sparkles, label: 'Assistant', screen: '' },
            { Icon: BookOpen, label: 'Cookbook', screen: '' },
            { Icon: User, label: 'Profile', screen: 'Profile' },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => tab.screen && goTo(tab.screen)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: tab.screen ? 'pointer' : 'default', color: '#aaa', padding: '4px 12px' }}
            >
              <tab.Icon size={20} />
              <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
            </button>
          ))}
        </div>
        <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
      </div>
    </div>
  )
}
