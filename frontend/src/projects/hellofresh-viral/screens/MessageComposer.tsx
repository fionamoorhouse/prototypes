import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, Sparkles, ImageIcon, Send } from 'lucide-react'
import { useState } from 'react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const avatarImg = (id: string, size = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

const DEFAULT_MESSAGE =
  "Hey! I've been cooking with HelloFresh and honestly it's been amazing. Thought you'd love it — I'm sending you a free box so you can try it. No strings attached, just pick your meals and they'll deliver everything you need. 💚"

const AI_MESSAGE =
  "Hey! I just made the most incredible Tuscan chicken with HelloFresh — like, restaurant-level good and I barely had to think about it. I'm sending you a free box to try. No subscription, no catch, just pick some meals and they deliver everything. You'd seriously love it 🍝"

const FOOD_PHOTOS = [
  '1546069901-ba9599a7e63c', // Tuscan chicken
  '1467003909585-2f8a72700288', // Beautiful plating
  '1476718406336-bb5a9690ee2a', // Fresh ingredients
  '1504674900247-0877df9cc836', // Pasta dish
]

export default function MessageComposer() {
  const { goTo, searchParams } = usePrototype()
  const channel = searchParams.get('channel') || 'imessage'
  const channelLabel = channel === 'whatsapp' ? 'WhatsApp' : channel === 'messenger' ? 'Messenger' : 'iMessage'

  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const [isEditing, setIsEditing] = useState(false)
  const [isAI, setIsAI] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [showPhotoSheet, setShowPhotoSheet] = useState(false)

  const handleAI = () => {
    if (isAI) {
      setMessage(DEFAULT_MESSAGE)
      setIsAI(false)
    } else {
      setMessage(AI_MESSAGE)
      setIsAI(true)
    }
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
          onClick={() => goTo('ShareHub')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}
        >
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#242424', flex: 1 }}>
          Send to a friend
        </span>
        <div
          style={{
            padding: '4px 10px',
            borderRadius: 10,
            background: channel === 'whatsapp' ? '#25D366' : channel === 'messenger' ? '#0084FF' : '#34C759',
            color: '#fff',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {channelLabel}
        </div>
      </div>

      <div style={{ height: 1, background: '#f3f3f3', flexShrink: 0 }} />

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        <div style={{ padding: '20px 20px 12px' }}>
          <p style={{ fontSize: 14, color: '#888', margin: '0 0 16px', lineHeight: 1.5 }}>
            Preview how your message will look. Edit to make it yours.
          </p>

          {/* Message preview card */}
          <div
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              border: '1px solid #e8e8e8',
            }}
          >
            {/* Food photo */}
            <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
              <img
                src={img(FOOD_PHOTOS[selectedPhoto], 800, 400)}
                alt="Meal photo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Change photo button */}
              <button
                onClick={() => setShowPhotoSheet(true)}
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 20,
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <ImageIcon size={14} />
                Change photo
              </button>
            </div>

            {/* Message text */}
            <div style={{ padding: '16px 18px' }}>
              {isEditing ? (
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  style={{
                    width: '100%',
                    minHeight: 100,
                    border: '1.5px solid #067A46',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#333',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
              ) : (
                <p
                  onClick={() => setIsEditing(true)}
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#333',
                    margin: 0,
                    cursor: 'pointer',
                    padding: 12,
                    borderRadius: 12,
                    border: '1.5px dashed #ddd',
                    background: '#fafafa',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {message}
                </p>
              )}
              <div style={{ fontSize: 11, color: '#bbb', marginTop: 8, textAlign: 'center' }}>
                Tap to edit your message
              </div>
            </div>

            {/* Sender info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0 18px 14px',
              }}
            >
              <img
                src={avatarImg('1438761681033-6461ffad8d80', 60)}
                alt="You"
                style={{ width: 24, height: 24, borderRadius: 12, objectFit: 'cover' }}
              />
              <span style={{ fontSize: 13, color: '#888' }}>Sarah J.</span>
              <span style={{ fontSize: 12, color: '#ccc' }}>•</span>
              <span style={{ fontSize: 12, color: '#aaa' }}>hellofresh.com/x/share-sarah-j</span>
            </div>
          </div>
        </div>

        {/* AI assist + controls */}
        <div style={{ padding: '4px 20px 16px', display: 'flex', gap: 10 }}>
          <button
            onClick={handleAI}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '10px 14px',
              borderRadius: 14,
              background: isAI ? '#EDE9FE' : '#f5f5f5',
              border: isAI ? '1.5px solid #8B5CF6' : '1.5px solid #e8e8e8',
              color: isAI ? '#7C3AED' : '#666',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <Sparkles size={16} />
            {isAI ? 'Use original' : 'Make it personal with AI'}
          </button>
        </div>

        {isAI && (
          <div style={{ padding: '0 20px 12px' }}>
            <button
              onClick={() => {
                setMessage("I've been doing HelloFresh for a few weeks now and honestly? Dinner is the best part of my day. Sending you a free box — no subscription, no strings. Just good food. You'll thank me later 😄")
                setIsAI(true)
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#7C3AED',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'underline',
              }}
            >
              Try another version
            </button>
          </div>
        )}

        {/* How it works note */}
        <div style={{ padding: '0 20px 20px' }}>
          <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
            Your message will open in {channelLabel}. You can make final edits there too.
          </p>
        </div>

        <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
      </div>

      {/* ===== Send button ===== */}
      <div style={{ padding: '12px 20px', flexShrink: 0, borderTop: '1px solid #f0f0f0' }}>
        <button
          onClick={() => goTo('FriendMessage')}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 26,
            background: '#067A46',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <Send size={18} />
          Send via {channelLabel}
        </button>
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />

      {/* ===== Photo picker bottom sheet ===== */}
      {showPhotoSheet && (
        <>
          <div
            onClick={() => setShowPhotoSheet(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.4)',
              zIndex: 100,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: '#fff',
              borderRadius: '24px 24px 0 0',
              padding: '12px 20px 40px',
              zIndex: 101,
              boxShadow: '0 -8px 30px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>
              Choose a photo
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {FOOD_PHOTOS.map((id, i) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedPhoto(i)
                    setShowPhotoSheet(false)
                  }}
                  style={{
                    borderRadius: 14,
                    overflow: 'hidden',
                    border: selectedPhoto === i ? '3px solid #067A46' : '3px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                    aspectRatio: '4/3',
                  }}
                >
                  <img
                    src={img(id, 400, 300)}
                    alt="Food option"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
