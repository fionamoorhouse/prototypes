import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronRight,
  MapPin,
  Heart,
  MessageCircle,
  Check,
} from 'lucide-react'

const avatarImg = (id: string, size = 100) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

const contributors = [
  { name: 'Sam', avatar: '1494790108377-be9c29b29330', note: 'We love you so much! Take it easy and let us handle dinner. 💕' },
  { name: 'Alex', avatar: '1507003211169-0a1dd7228f2d', note: 'Congrats on the little one! Enjoy these meals — you deserve it.' },
  { name: 'Jordan', avatar: '1534528741775-53994a69daeb', note: '' },
  { name: 'Chris', avatar: '1500648767791-00dcc994a43e', note: 'So happy for you two! Sending all the good food vibes 🍝' },
  { name: 'Pat', avatar: '1438761681033-6461ffad8d80', note: '' },
  { name: 'Riley', avatar: '1472099645785-5658abf4ff4e', note: 'Can\'t wait to meet the baby! Eat well in the meantime.' },
]

export default function MealTrainClaim() {
  const { goTo } = usePrototype()
  const [step, setStep] = useState<'hero' | 'details' | 'claimed'>('hero')
  const [showNotes, setShowNotes] = useState(false)

  if (step === 'claimed') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        {/* Confetti-like decoration */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {['🎉', '💚', '🍽️', '✨', '🎊', '💛'].map((emoji, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${15 + i * 14}%`,
              top: `${8 + (i % 3) * 10}%`,
              fontSize: 24,
              opacity: 0.6,
              transform: `rotate(${i * 30 - 90}deg)`,
            }}>
              {emoji}
            </div>
          ))}
        </div>

        <div style={{ width: 80, height: 80, borderRadius: 40, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative', zIndex: 1 }}>
          <Heart size={36} color="#067A46" fill="#067A46" />
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700, color: '#242424', textAlign: 'center', margin: '0 0 8px', position: 'relative', zIndex: 1 }}>
          Your meals are on the way!
        </h1>
        <p style={{ fontSize: 15, color: '#999', textAlign: 'center', lineHeight: 1.5, margin: '0 0 8px', position: 'relative', zIndex: 1 }}>
          4 weeks of home-cooked goodness from your friends. Your first box arrives next Tuesday.
        </p>
        <p style={{ fontSize: 13, color: '#ccc', textAlign: 'center', margin: '0 0 32px', position: 'relative', zIndex: 1 }}>
          You can pick your meals each week
        </p>
        <button
          onClick={() => goTo('Profile')}
          style={{ width: '100%', maxWidth: 280, height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, position: 'relative', zIndex: 1 }}
        >
          Send a thank you
        </button>
        <button
          onClick={() => goTo('Discover')}
          style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#999', textDecoration: 'underline', position: 'relative', zIndex: 1 }}
        >
          Explore HelloFresh
        </button>
        <div style={{ marginTop: 20, position: 'relative', zIndex: 1 }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      {/* Warm hero background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280, background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 40%, #FCD34D 100%)', borderRadius: '0 0 32px 32px' }} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ height: 54 }} />

        {/* Hero section */}
        <div style={{ padding: '24px 28px 0', textAlign: 'center' }}>
          {/* Contributor avatars in a cluster */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            {contributors.slice(0, 5).map((c, i) => (
              <div
                key={i}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  overflow: 'hidden',
                  border: '3px solid #FDE68A',
                  marginLeft: i > 0 ? -12 : 0,
                  position: 'relative',
                  zIndex: 5 - i,
                }}
              >
                <img src={avatarImg(c.avatar)} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            {contributors.length > 5 && (
              <div style={{
                width: 44, height: 44, borderRadius: 22, background: '#92400E', marginLeft: -12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '3px solid #FDE68A', fontSize: 13, fontWeight: 700, color: '#fff',
              }}>
                +{contributors.length - 5}
              </div>
            )}
          </div>

          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700, color: '#242424', margin: '0 0 8px', lineHeight: 1.2 }}>
            Your friends are sending you home-cooked meals
          </h1>
          <p style={{ fontSize: 14, color: '#92400E', margin: '0 0 4px' }}>
            🎉 Congratulations on the new baby!
          </p>
        </div>

        {/* Group message */}
        <div style={{ margin: '24px 20px 0', borderRadius: 18, background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <MessageCircle size={16} color="#067A46" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#067A46' }}>Group message</span>
          </div>
          <p style={{ fontSize: 14, color: '#333', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
            "We know the first few weeks with a newborn are beautiful chaos. Let us take dinner off your plate — literally! We love you, Maria. Enjoy every cuddle and let HelloFresh handle the cooking. 💛"
          </p>
          <div style={{ marginTop: 10, fontSize: 12, color: '#999' }}>— Sam, Alex, Jordan, Chris, Pat & Riley</div>
        </div>

        {/* Personal notes */}
        {!showNotes && contributors.some(c => c.note) && (
          <button
            onClick={() => setShowNotes(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '12px auto 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#067A46' }}
          >
            <Heart size={14} /> Read personal notes ({contributors.filter(c => c.note).length})
          </button>
        )}

        {showNotes && (
          <div style={{ padding: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contributors.filter(c => c.note).map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '12px', borderRadius: 14, background: '#f9f9f9' }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={avatarImg(c.avatar)} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#242424', marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: '#555', lineHeight: 1.4 }}>{c.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* What you're getting */}
        <div style={{ margin: '20px 20px 0', borderRadius: 16, border: '1.5px solid #f0f0f0', padding: '18px' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>What you're getting</h3>
          {[
            { emoji: '📦', text: '4 weeks of HelloFresh boxes' },
            { emoji: '🍽️', text: '3 meals per week, for 2 people' },
            { emoji: '🥕', text: 'Fresh ingredients & easy recipes' },
            { emoji: '🚚', text: 'Delivered to your door' },
            { emoji: '✨', text: 'You choose your meals each week' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 4 ? 10 : 0 }}>
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
              <span style={{ fontSize: 14, color: '#333' }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Delivery address */}
        {step === 'details' && (
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>Delivery address</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px', borderRadius: 14, border: '1.5px solid #e8e8e8' }}>
              <MapPin size={18} color="#999" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>123 Oak Street, Apt 4B</div>
                <div style={{ fontSize: 12, color: '#999' }}>San Francisco, CA 94102</div>
              </div>
              <span style={{ fontSize: 12, color: '#067A46', fontWeight: 600 }}>Edit</span>
            </div>
            <div style={{ marginTop: 10, borderRadius: 12, background: '#E8F5E0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={14} color="#067A46" />
              <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600 }}>First delivery: next Tuesday</span>
            </div>
          </div>
        )}

        {/* Important callout */}
        <div style={{ margin: '16px 20px 0', borderRadius: 14, background: '#E8F5E0', padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#067A46', marginBottom: 2 }}>Completely free</div>
          <div style={{ fontSize: 12, color: '#067A46' }}>No credit card · No subscription · Gift ends automatically</div>
        </div>

        <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>

        <div style={{ height: 100 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 44px', background: 'linear-gradient(transparent, #fff 20%)', zIndex: 2 }}>
        {step === 'hero' ? (
          <button
            onClick={() => setStep('details')}
            style={{ width: '100%', height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            Claim your meals <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => setStep('claimed')}
            style={{ width: '100%', height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Check size={18} /> Confirm & claim
          </button>
        )}
      </div>
    </div>
  )
}
