import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  X,
  Camera,
  RotateCcw,
  Send,
  Users,
  Globe,
  BookOpen,
  Image,
  ChevronDown,
  Check,
  Instagram,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

type Step = 'prompt' | 'camera' | 'preview' | 'destination' | 'done'
type Audience = 'friends' | 'community' | 'public' | 'private'

type PromptCategory = 'tonight' | 'seasonal' | 'events' | 'milestones'

const promptCategories: { key: PromptCategory; label: string; emoji: string }[] = [
  { key: 'tonight', label: "Tonight's Meal", emoji: '🍽️' },
  { key: 'seasonal', label: 'Seasonal', emoji: '🌸' },
  { key: 'events', label: 'Events', emoji: '🎉' },
  { key: 'milestones', label: 'Milestones', emoji: '🏆' },
]

const allPrompts: Record<PromptCategory, { text: string; emoji: string; sub: string }[]> = {
  tonight: [
    { text: 'How did tonight\'s meal turn out?', emoji: '🍽️', sub: 'Share a photo of your plate' },
    { text: 'Show us your table setting!', emoji: '🕯️', sub: 'Weekend vibes deserve a moment' },
    { text: 'Any tips for next time?', emoji: '💡', sub: 'Help others cook this recipe better' },
    { text: 'Show us the chaos!', emoji: '🔥', sub: 'The real kitchen, mid-cook' },
  ],
  seasonal: [
    { text: 'What\'s your winter comfort food?', emoji: '❄️', sub: 'Warm meals for cold nights' },
    { text: 'Spring ingredients are here!', emoji: '🌱', sub: 'Show your first spring recipe' },
    { text: 'Summer grilling vibes', emoji: '☀️', sub: 'Backyard cooking moments' },
    { text: 'Cozy autumn baking', emoji: '🍂', sub: 'Fall flavors hit different' },
  ],
  events: [
    { text: 'Valentine\'s dinner for two', emoji: '❤️', sub: 'Show your romantic meal' },
    { text: 'Game Day spread', emoji: '🏈', sub: 'Feed the crowd' },
    { text: 'Holiday feast prep', emoji: '🎄', sub: 'Behind the scenes of your feast' },
    { text: 'Birthday meal special', emoji: '🎂', sub: 'Birthday cooking deserves a moment' },
  ],
  milestones: [
    { text: 'You cooked 100 meals!', emoji: '💯', sub: 'Celebrate your century' },
    { text: '1 year with HelloFresh!', emoji: '🎉', sub: 'Show us how far you\'ve come' },
    { text: 'New cuisine unlocked!', emoji: '🌍', sub: 'Share your first try' },
    { text: 'Streak milestone!', emoji: '🔥', sub: 'Keep the fire going' },
  ],
}

// Default prompts (backward compatible)
const prompts = allPrompts.tonight

const audienceOptions: { key: Audience; Icon: typeof Users; label: string; sub: string }[] = [
  { key: 'friends', Icon: Users, label: 'Friends', sub: 'Only friends can see this' },
  { key: 'community', Icon: Users, label: 'Weeknight Warriors', sub: '2.4K members' },
  { key: 'public', Icon: Globe, label: 'Public', sub: 'Anyone on HelloFresh can see' },
  { key: 'private', Icon: BookOpen, label: 'Save to Cookbook', sub: 'Only you can see this' },
]

export default function CookingMoment() {
  const { goTo } = usePrototype()
  const [step, setStep] = useState<Step>('prompt')
  const [promptCategory, setPromptCategory] = useState<PromptCategory>('tonight')
  const [promptIdx, setPromptIdx] = useState(0)
  const [caption, setCaption] = useState('')
  const [audience, setAudience] = useState<Audience>('friends')
  const [showAudiencePicker, setShowAudiencePicker] = useState(false)
  const [showBrowser, setShowBrowser] = useState(false)

  const categoryPrompts = allPrompts[promptCategory]
  const prompt = categoryPrompts[promptIdx] || categoryPrompts[0]

  if (step === 'prompt') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0 }} />

        {/* Header */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44 }}>
          <button onClick={() => goTo('Discover')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <X size={22} color="#242424" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={16} color="#067A46" />
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: '#242424' }}>Cooking Moment</span>
          </div>
          <button onClick={() => setShowBrowser(!showBrowser)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <ChevronDown size={22} color={showBrowser ? '#067A46' : '#999'} style={{ transform: showBrowser ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        </div>

        {/* Prompt category browser (collapsible) */}
        {showBrowser && (
          <div style={{ flexShrink: 0, borderBottom: '1px solid #f0f0f0' }}>
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 6, padding: '8px 20px', overflowX: 'auto' }} className="no-scrollbar">
              {promptCategories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => { setPromptCategory(cat.key); setPromptIdx(0) }}
                  style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
                    padding: '6px 14px', borderRadius: 20,
                    background: promptCategory === cat.key ? '#067A46' : '#f5f5f5',
                    color: promptCategory === cat.key ? '#fff' : '#666',
                    border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{cat.emoji}</span> {cat.label}
                </button>
              ))}
            </div>
            {/* Prompt list for selected category */}
            <div style={{ padding: '8px 20px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {categoryPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setPromptIdx(i); setShowBrowser(false) }}
                  style={{
                    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 12,
                    background: promptIdx === i && promptCategory === promptCategory ? '#E8F5E015' : '#f9f9f9',
                    border: promptIdx === i ? '1.5px solid #067A4630' : '1.5px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#242424' }}>{p.text}</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 1 }}>{p.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
          {/* Prompt card */}
          <div style={{ fontSize: 64, marginBottom: 20 }}>{prompt.emoji}</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700, color: '#242424', textAlign: 'center', margin: '0 0 10px', lineHeight: 1.3 }}>
            {prompt.text}
          </h1>
          <p style={{ fontSize: 15, color: '#999', textAlign: 'center', margin: 0 }}>{prompt.sub}</p>

          {/* Category indicator */}
          <button
            onClick={() => setShowBrowser(true)}
            style={{
              marginTop: 14, display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 10px', borderRadius: 12, background: '#f5f5f5',
              border: 'none', cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 12 }}>{promptCategories.find(c => c.key === promptCategory)?.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#999' }}>{promptCategories.find(c => c.key === promptCategory)?.label}</span>
            <span style={{ fontSize: 11, color: '#ccc' }}>·</span>
            <span style={{ fontSize: 11, color: '#999' }}>{promptIdx + 1}/{categoryPrompts.length}</span>
          </button>

          {/* Recipe tag */}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 12, background: '#f5f5f5' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, overflow: 'hidden' }}>
              <img src={img('1567620905732-2d1ec7ab7445', 80, 80)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#242424' }}>Thai Basil Chicken</div>
              <div style={{ fontSize: 11, color: '#999' }}>from tonight's Sous Chef session</div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setStep('camera')}
            style={{
              marginTop: 32,
              width: '100%',
              maxWidth: 300,
              height: 56,
              borderRadius: 28,
              background: '#067A46',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Camera size={20} />
            Take a photo
          </button>

          <button
            onClick={() => goTo('Discover')}
            style={{ marginTop: 14, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#999', textDecoration: 'underline' }}
          >
            Maybe later
          </button>
        </div>
      </div>
    )
  }

  if (step === 'camera') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Camera viewfinder (simulated) */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <img src={img('1567620905732-2d1ec7ab7445', 800, 1000)} alt="Viewfinder" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9)' }} />

          {/* Top bar */}
          <div style={{ position: 'absolute', top: 54, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setStep('prompt')} style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(0,0,0,0.4)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} color="#fff" />
            </button>
            <div style={{ padding: '5px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 12, fontWeight: 600 }}>
              {prompt.emoji} {prompt.text}
            </div>
            <div style={{ width: 36 }} />
          </div>
        </div>

        {/* Bottom controls */}
        <div style={{ flexShrink: 0, background: '#111', padding: '20px 0 50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          {/* Gallery */}
          <button style={{ width: 44, height: 44, borderRadius: 10, border: '2px solid rgba(255,255,255,0.3)', background: 'none', cursor: 'pointer', overflow: 'hidden' }}>
            <img src={img('1551782450-a2132b4ba21d', 88, 88)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </button>

          {/* Shutter */}
          <button
            onClick={() => setStep('preview')}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: '#fff',
              border: '4px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 28, background: '#fff' }} />
          </button>

          {/* Flip camera */}
          <button style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RotateCcw size={20} color="#fff" />
          </button>
        </div>
      </div>
    )
  }

  if (step === 'preview' || step === 'destination') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0 }} />

        {/* Header */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44 }}>
          <button onClick={() => setStep('camera')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <X size={22} color="#242424" />
          </button>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: '#242424' }}>Share your moment</span>
          <div style={{ width: 22 }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
          {/* Photo preview */}
          <div style={{ margin: '12px 20px 0', borderRadius: 18, overflow: 'hidden', position: 'relative' }}>
            <img src={img('1567620905732-2d1ec7ab7445', 800, 600)} alt="Your photo" style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }} />
            {/* Retake button */}
            <button
              onClick={() => setStep('camera')}
              style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 20, background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 12, fontWeight: 600 }}
            >
              <RotateCcw size={12} /> Retake
            </button>
          </div>

          {/* Caption */}
          <div style={{ padding: '16px 20px 0' }}>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption..."
              style={{
                width: '100%',
                border: '1px solid #f0f0f0',
                borderRadius: 14,
                padding: '12px 14px',
                fontSize: 14,
                color: '#242424',
                resize: 'none',
                height: 80,
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Recipe tag */}
          <div style={{ padding: '12px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, background: '#f5f5f5' }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, overflow: 'hidden' }}>
                <img src={img('1567620905732-2d1ec7ab7445', 56, 56)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#666', flex: 1 }}>Tagged: Thai Basil Chicken</span>
              <X size={14} color="#999" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Audience selector */}
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>Share with</div>
            <button
              onClick={() => setShowAudiencePicker(!showAudiencePicker)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 12,
                background: '#f9f9f9',
                border: '1px solid #f0f0f0',
                cursor: 'pointer',
              }}
            >
              {(() => {
                const opt = audienceOptions.find(a => a.key === audience)!
                return (
                  <>
                    <opt.Icon size={18} color={audience === 'private' ? '#999' : '#067A46'} />
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{opt.label}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>{opt.sub}</div>
                    </div>
                    <ChevronDown size={16} color="#999" />
                  </>
                )
              })()}
            </button>

            {/* Audience picker dropdown */}
            {showAudiencePicker && (
              <div style={{ marginTop: 4, borderRadius: 12, border: '1px solid #f0f0f0', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                {audienceOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setAudience(opt.key); setShowAudiencePicker(false) }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 14px',
                      background: audience === opt.key ? '#E8F5E020' : 'none',
                      border: 'none',
                      borderBottom: '1px solid #f5f5f5',
                      cursor: 'pointer',
                    }}
                  >
                    <opt.Icon size={18} color={opt.key === 'private' ? '#999' : '#067A46'} />
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{opt.label}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>{opt.sub}</div>
                    </div>
                    {audience === opt.key && <Check size={16} color="#067A46" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Also share externally */}
          {audience !== 'private' && (
            <div style={{ padding: '16px 20px 0' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>Also share to</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { Icon: Instagram, label: 'Stories', color: '#E4405F' },
                  { Icon: MessageCircle, label: 'WhatsApp', color: '#25D366' },
                  { Icon: Send, label: 'iMessage', color: '#007AFF' },
                ].map((ch, i) => (
                  <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 20, background: '#f5f5f5', border: 'none', cursor: 'pointer' }}>
                    <ch.Icon size={16} color={ch.color} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#666' }}>{ch.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ height: 100 }} />
        </div>

        {/* Bottom CTA */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 44px', background: 'linear-gradient(transparent, #fff 20%)' }}>
          <button
            onClick={() => setStep('done')}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 26,
              background: audience === 'private' ? '#242424' : '#067A46',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {audience === 'private' ? (
              <><Image size={18} /> Save to Cookbook</>
            ) : (
              <><Send size={18} /> Share</>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Done state
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
      <div style={{ width: 80, height: 80, borderRadius: 40, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <Check size={40} color="#067A46" />
      </div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#242424', textAlign: 'center', margin: '0 0 8px' }}>
        {audience === 'private' ? 'Saved to your cookbook!' : 'Shared!'}
      </h1>
      <p style={{ fontSize: 15, color: '#999', textAlign: 'center', margin: 0 }}>
        {audience === 'private'
          ? "Your photo is saved with Thai Basil Chicken in your cookbook."
          : "Your cooking moment is live. Check the feed for reactions!"}
      </p>
      <button
        onClick={() => goTo('Discover')}
        style={{
          marginTop: 32,
          width: '100%',
          maxWidth: 260,
          height: 48,
          borderRadius: 24,
          background: '#067A46',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        Back to Discover
      </button>
      <button
        onClick={() => { setStep('prompt'); setCaption('') }}
        style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#999', textDecoration: 'underline' }}
      >
        Take another photo
      </button>
    </div>
  )
}
