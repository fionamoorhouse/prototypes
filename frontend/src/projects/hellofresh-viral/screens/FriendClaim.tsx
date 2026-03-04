import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, Check, PartyPopper } from 'lucide-react'
import { useState } from 'react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const avatarImg = (id: string, size = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

const MEALS = [
  { id: 1, name: 'Tuscan Chicken Penne', image: '1546069901-ba9599a7e63c', time: '25 min', tag: 'Popular', selected: true },
  { id: 2, name: 'Teriyaki Salmon Bowls', image: '1467003909585-2f8a72700288', time: '30 min', tag: 'Chef Pick', selected: true },
  { id: 3, name: 'Crispy Pork Tacos', image: '1565299585323-38d6b0865b47', time: '20 min', tag: 'Quick', selected: true },
  { id: 4, name: 'Creamy Mushroom Risotto', image: '1476124369491-e7addf5db371', time: '35 min', tag: 'Veggie', selected: false },
  { id: 5, name: 'Garlic Butter Shrimp', image: '1565557623262-b51c2513a641', time: '20 min', tag: 'Easy', selected: false },
  { id: 6, name: 'Korean Beef Bibimbap', image: '1504674900247-0877df9cc836', time: '30 min', tag: 'Spicy', selected: false },
]

const DATES = [
  { label: 'Tue, Feb 18', available: true },
  { label: 'Thu, Feb 20', available: true },
  { label: 'Sat, Feb 22', available: true },
  { label: 'Tue, Feb 25', available: true },
]

export default function FriendClaim() {
  const { goTo } = usePrototype()
  const [step, setStep] = useState(1)
  const [selectedMeals, setSelectedMeals] = useState<number[]>([1, 2, 3])
  const [selectedDate, setSelectedDate] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const toggleMeal = (id: number) => {
    if (selectedMeals.includes(id)) {
      if (selectedMeals.length > 1) {
        setSelectedMeals(selectedMeals.filter((m) => m !== id))
      }
    } else if (selectedMeals.length < 3) {
      setSelectedMeals([...selectedMeals, id])
    }
  }

  const handleConfirm = () => {
    setShowCelebration(true)
  }

  if (showCelebration) {
    return <Celebration goTo={goTo} />
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
          padding: '0 20px',
          gap: 12,
        }}
      >
        <button
          onClick={() => step > 1 ? setStep(step - 1) : goTo('FriendLanding')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}
        >
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#242424', flex: 1 }}>
          {step === 1 ? 'Choose 3 meals' : step === 2 ? 'Delivery details' : 'Confirm your free box'}
        </span>
        <span style={{ fontSize: 13, color: '#999' }}>{step} of 3</span>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 4, padding: '0 20px 12px' }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: s <= step ? '#067A46' : '#e8e8e8',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* ===== Step content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {step === 1 && (
          <div style={{ padding: '4px 20px 20px' }}>
            <p style={{ fontSize: 14, color: '#888', margin: '0 0 16px' }}>
              Pick your favorites. We'll deliver everything you need to cook them.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {MEALS.map((meal) => {
                const isSelected = selectedMeals.includes(meal.id)
                return (
                  <button
                    key={meal.id}
                    onClick={() => toggleMeal(meal.id)}
                    style={{
                      borderRadius: 14,
                      overflow: 'hidden',
                      background: '#fff',
                      border: isSelected ? '2px solid #067A46' : '2px solid #f0f0f0',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      position: 'relative',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          background: '#067A46',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                        }}
                      >
                        <Check size={14} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                    {/* Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        padding: '2px 8px',
                        borderRadius: 6,
                        background: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        zIndex: 2,
                      }}
                    >
                      {meal.tag}
                    </div>
                    <div style={{ height: 110, overflow: 'hidden' }}>
                      <img
                        src={img(meal.image, 300, 220)}
                        alt={meal.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isSelected ? 1 : 0.85 }}
                      />
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3 }}>{meal.name}</div>
                      <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{meal.time}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: '4px 20px 20px' }}>
            <p style={{ fontSize: 14, color: '#888', margin: '0 0 20px' }}>
              Where should we send your free box?
            </p>

            {/* Name */}
            <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>
              Your name
            </label>
            <input
              type="text"
              placeholder="First and last name"
              style={{
                width: '100%',
                height: 46,
                borderRadius: 12,
                border: '1.5px solid #e0e0e0',
                padding: '0 14px',
                fontSize: 15,
                color: '#242424',
                outline: 'none',
                marginBottom: 18,
                boxSizing: 'border-box',
              }}
            />

            {/* Address */}
            <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>
              Delivery address
            </label>
            <input
              type="text"
              placeholder="Start typing your address..."
              style={{
                width: '100%',
                height: 46,
                borderRadius: 12,
                border: '1.5px solid #e0e0e0',
                padding: '0 14px',
                fontSize: 15,
                color: '#242424',
                outline: 'none',
                marginBottom: 18,
                boxSizing: 'border-box',
              }}
            />

            {/* Delivery date */}
            <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 10 }}>
              Preferred delivery date
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DATES.map((date, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(i)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 12,
                    border: selectedDate === i ? '2px solid #067A46' : '2px solid #e8e8e8',
                    background: selectedDate === i ? '#E8F5E0' : '#fff',
                    color: selectedDate === i ? '#067A46' : '#555',
                    fontSize: 14,
                    fontWeight: selectedDate === i ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {date.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ padding: '4px 20px 20px' }}>
            {/* Summary card */}
            <div
              style={{
                borderRadius: 16,
                background: '#f9f9f9',
                border: '1px solid #f0f0f0',
                padding: '16px',
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: '#242424', marginBottom: 12 }}>Your meals</div>
              {selectedMeals.map((id) => {
                const meal = MEALS.find((m) => m.id === id)!
                return (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <img
                      src={img(meal.image, 80, 80)}
                      alt={meal.name}
                      style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{meal.name}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>{meal.time}</div>
                    </div>
                  </div>
                )
              })}

              <div style={{ height: 1, background: '#e8e8e8', margin: '12px 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Check size={14} color="#067A46" />
                <span style={{ fontSize: 13, color: '#555' }}>Delivering {DATES[selectedDate].label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={14} color="#067A46" />
                <span style={{ fontSize: 13, color: '#555' }}>3 meals for 2 people</span>
              </div>

              <div style={{ height: 1, background: '#e8e8e8', margin: '12px 0' }} />

              {/* Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#242424' }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#067A46' }}>Free</span>
              </div>

              {/* From Sarah */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '10px 12px', borderRadius: 10, background: '#E8F5E0' }}>
                <img
                  src={avatarImg('1438761681033-6461ffad8d80', 40)}
                  alt="Sarah"
                  style={{ width: 24, height: 24, borderRadius: 12, objectFit: 'cover' }}
                />
                <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600 }}>Sent by Sarah J.</span>
              </div>
            </div>

            {/* Account creation */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#242424', marginBottom: 12 }}>
                Create your account
              </div>
              <input
                type="email"
                placeholder="Email address"
                style={{
                  width: '100%',
                  height: 46,
                  borderRadius: 12,
                  border: '1.5px solid #e0e0e0',
                  padding: '0 14px',
                  fontSize: 15,
                  color: '#242424',
                  outline: 'none',
                  marginBottom: 10,
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="password"
                placeholder="Choose a password"
                style={{
                  width: '100%',
                  height: 46,
                  borderRadius: 12,
                  border: '1.5px solid #e0e0e0',
                  padding: '0 14px',
                  fontSize: 15,
                  color: '#242424',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* No commitment copy */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 12,
                background: '#FFF8E1',
                border: '1px solid #FEF3C7',
                marginBottom: 20,
                fontSize: 13,
                color: '#92400E',
                lineHeight: 1.5,
              }}
            >
              This is a one-time gift. No payment needed, no subscription. If you love it, you can subscribe later.
            </div>
          </div>
        )}
      </div>

      {/* ===== Bottom action bar ===== */}
      <div style={{ padding: '12px 20px', flexShrink: 0, borderTop: '1px solid #f0f0f0' }}>
        {step === 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#666' }}>
              <strong style={{ color: '#067A46' }}>{selectedMeals.length}</strong> of 3 selected
            </span>
            <button
              onClick={() => selectedMeals.length === 3 && setStep(2)}
              style={{
                height: 46,
                padding: '0 32px',
                borderRadius: 23,
                background: selectedMeals.length === 3 ? '#067A46' : '#ccc',
                color: '#fff',
                border: 'none',
                cursor: selectedMeals.length === 3 ? 'pointer' : 'default',
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <button
            onClick={() => setStep(3)}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 26,
              background: '#067A46',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            onClick={handleConfirm}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 26,
              background: '#067A46',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(6,122,70,0.3)',
            }}
          >
            Confirm my free box
          </button>
        )}
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ── Celebration screen ── */
function Celebration({ goTo }: { goTo: (s: string) => void }) {
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        {/* Celebration icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            background: '#E8F5E0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <PartyPopper size={38} color="#067A46" />
        </div>

        <h1
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 28,
            fontWeight: 700,
            color: '#242424',
            margin: '0 0 12px',
            textAlign: 'center',
          }}
        >
          Your free box is on its way!
        </h1>

        <p style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.6, margin: '0 0 8px' }}>
          Arriving Tuesday, Feb 18
        </p>

        <p style={{ fontSize: 14, color: '#067A46', fontWeight: 600, textAlign: 'center', margin: '0 0 36px' }}>
          Sarah will be so happy 💚
        </p>

        <button
          style={{
            width: '100%',
            height: 52,
            borderRadius: 26,
            background: '#067A46',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Download the HelloFresh app
        </button>

        {/* Demo links */}
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#ccc', fontWeight: 600, letterSpacing: 0.5 }}>DEMO</span>
          <button onClick={() => goTo('ShareHub')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Back to Share Hub (referrer's view)
          </button>
          <button onClick={() => goTo('FriendMessage')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Replay friend's experience
          </button>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Back to Demo Launcher
          </button>
        </div>
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
