import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  Sparkles,
  Send,
  ImageIcon,
  MessageCircle,
  X,
  Check,
} from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const DEFAULT_MESSAGE = "Hey! I've been cooking with HelloFresh and it's been amazing. I'm sending you a free box — no strings attached, just pick your meals and they'll deliver everything you need. 💚"

const AI_MESSAGE = "Hey! I just made the most incredible Tuscan Chicken Penne with HelloFresh — literally restaurant-level good and I barely had to think about it. Sending you a free box to try. No subscription, no catch — just pick some meals and they deliver everything. You'd seriously love it 🍝"

const PHOTOS = [
  '1546069901-ba9599a7e63c',
  '1467003909585-2f8a72700288',
  '1476718406336-bb5a9690ee2a',
  '1504674900247-0877df9cc836',
]

type Step = 'compose' | 'preview' | 'sent'

export default function GiftComposer() {
  const { goTo } = usePrototype()
  const [step, setStep] = useState<Step>('compose')
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const [isAI, setIsAI] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [showPhotos, setShowPhotos] = useState(false)
  const [recipientName, setRecipientName] = useState('')

  const handleAI = () => {
    if (isAI) { setMessage(DEFAULT_MESSAGE); setIsAI(false) }
    else { setMessage(AI_MESSAGE); setIsAI(true) }
  }

  if (step === 'sent') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Check size={40} color="#067A46" />
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#242424', textAlign: 'center', margin: '0 0 8px' }}>
          Gift sent!
        </h1>
        <p style={{ fontSize: 15, color: '#999', textAlign: 'center', margin: '0 0 6px' }}>
          {recipientName ? `${recipientName} will` : "Your friend will"} receive your personal message with a free HelloFresh box.
        </p>
        <p style={{ fontSize: 13, color: '#ccc', textAlign: 'center', margin: '0 0 32px' }}>
          You have 2 invitations remaining
        </p>
        <button onClick={() => goTo('Discover')} style={{ width: '100%', maxWidth: 260, height: 48, borderRadius: 24, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
          Back to Discover
        </button>
        <button onClick={() => goTo('Profile')} style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#999', textDecoration: 'underline' }}>
          Go to Profile
        </button>
      </div>
    )
  }

  if (step === 'preview') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0 }} />
        <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
          <button onClick={() => setStep('compose')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <ChevronLeft size={22} color="#242424" />
          </button>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Preview</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {/* Simulated message bubble */}
          <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>{recipientName ? `To: ${recipientName}` : 'To: your friend'}</div>
          <div style={{ borderRadius: 18, background: '#E8F5E0', padding: '16px', marginBottom: 12 }}>
            {/* Photo */}
            <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
              <img src={img(PHOTOS[selectedPhoto], 600, 400)} alt="Gift photo" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            </div>
            <p style={{ fontSize: 14, color: '#333', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{message}</p>
          </div>

          {/* Gift card preview */}
          <div style={{ borderRadius: 16, border: '2px solid #067A46', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#067A46', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>Free HelloFresh Box</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#242424' }}>Pick your meals & we'll deliver everything</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>No credit card · No subscription</div>
          </div>
        </div>

        {/* Send button */}
        <div style={{ padding: '12px 20px 44px' }}>
          <button
            onClick={() => setStep('sent')}
            style={{ width: '100%', height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Send size={18} /> Send gift
          </button>
        </div>
      </div>
    )
  }

  // Compose step
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <button onClick={() => goTo('Profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424', flex: 1 }}>Gift a free box</span>
        <span style={{ fontSize: 12, color: '#067A46', fontWeight: 600 }}>3 left</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Recipient */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 6, letterSpacing: 0.3, textTransform: 'uppercase' }}>Send to</div>
          <input
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
            placeholder="Friend's name or phone number"
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #e8e8e8', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
        </div>

        {/* Photo selection */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase' }}>Attach a photo</div>
            <button onClick={() => setShowPhotos(!showPhotos)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#067A46', fontWeight: 600 }}>
              {showPhotos ? 'Done' : 'Change'}
            </button>
          </div>
          {!showPhotos ? (
            <div style={{ width: '100%', height: 160, borderRadius: 14, overflow: 'hidden' }}>
              <img src={img(PHOTOS[selectedPhoto], 600, 320)} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {PHOTOS.map((photo, i) => (
                <button key={i} onClick={() => { setSelectedPhoto(i); setShowPhotos(false) }} style={{ borderRadius: 12, overflow: 'hidden', border: selectedPhoto === i ? '3px solid #067A46' : '3px solid transparent', padding: 0, cursor: 'pointer', background: 'none' }}>
                  <img src={img(photo, 300, 200)} alt="" style={{ width: '100%', height: 80, objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase' }}>Your message</div>
            <button
              onClick={handleAI}
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: isAI ? '#067A4615' : '#f5f5f5', border: 'none', borderRadius: 16, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: isAI ? '#067A46' : '#999' }}
            >
              <Sparkles size={12} /> {isAI ? 'Using AI' : 'AI assist'}
            </button>
          </div>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ width: '100%', minHeight: 120, borderRadius: 14, border: '1px solid #e8e8e8', padding: '12px 14px', fontSize: 14, color: '#242424', resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6, boxSizing: 'border-box' }}
          />
        </div>

        {/* Send via */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>Send via</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'iMessage', color: '#007AFF', Icon: MessageCircle },
              { label: 'WhatsApp', color: '#25D366', Icon: MessageCircle },
              { label: 'Link', color: '#666', Icon: Send },
            ].map((ch, i) => (
              <button key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 8px', borderRadius: 12, background: i === 0 ? `${ch.color}10` : '#f5f5f5', border: i === 0 ? `1.5px solid ${ch.color}` : '1.5px solid #f0f0f0', cursor: 'pointer' }}>
                <ch.Icon size={16} color={ch.color} />
                <span style={{ fontSize: 12, fontWeight: 600, color: i === 0 ? ch.color : '#666' }}>{ch.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 100 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 44px', background: 'linear-gradient(transparent, #fff 20%)' }}>
        <button
          onClick={() => setStep('preview')}
          style={{ width: '100%', height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}
        >
          Preview & send
        </button>
      </div>
    </div>
  )
}
