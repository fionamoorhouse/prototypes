import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  Share2,
  Heart,
  RotateCcw,
  Camera,
  Calendar,
  ChevronRight,
  X,
  Check,
  Instagram,
  MessageCircle,
  Send,
  Image,
  Sparkles,
  Compass,
  ShoppingBag,
  BookOpen,
  User,
} from 'lucide-react'

/* ── helpers ── */
const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`
const avatar = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`

/* ── memory data ── */
const memories = [
  {
    id: 'mem-1',
    type: 'anniversary' as const,
    title: 'A year ago today',
    subtitle: 'You cooked this for the first time',
    recipe: 'Thai Basil Chicken',
    date: 'Feb 12, 2025',
    photo: '1567620905732-2d1ec7ab7445',
    caption: 'First time making Thai food at home — turned out incredible!',
    prompt: 'Cook it again tonight?',
    rating: 5,
    timesCooked: 8,
  },
  {
    id: 'mem-2',
    type: 'milestone' as const,
    title: 'Your 50th meal!',
    subtitle: 'A milestone worth celebrating',
    recipe: 'Crispy Salmon Rice Bowls',
    date: 'Aug 14, 2025',
    photo: '1563379926898-05f4575a45d8',
    caption: 'Halfway to 100! This salmon was perfectly crispy.',
    prompt: 'Share this milestone?',
    rating: 4,
    timesCooked: 12,
  },
  {
    id: 'mem-3',
    type: 'seasonal' as const,
    title: 'Last winter\'s favorite',
    subtitle: 'Your most-cooked recipe of Winter 2025',
    recipe: 'Tuscan Shrimp Risotto',
    date: 'Dec 3, 2025',
    photo: '1551782450-a2132b4ba21d',
    caption: 'Sunday comfort food ritual. This risotto never gets old.',
    prompt: 'Bring it back this winter?',
    rating: 5,
    timesCooked: 15,
  },
]

const memoryColors = {
  anniversary: { gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)', accent: '#7C3AED', bg: '#F5F0FF', emoji: '🎂' },
  milestone: { gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)', accent: '#F59E0B', bg: '#FFFBEB', emoji: '🏆' },
  seasonal: { gradient: 'linear-gradient(135deg, #067A46, #10B981)', accent: '#067A46', bg: '#E8F5E0', emoji: '❄️' },
}

/* ── recent photos (privately saved cooking moments) ── */
const savedPhotos = [
  { id: 'p1', photo: '1567620905732-2d1ec7ab7445', recipe: 'Thai Basil Chicken', date: '2 days ago' },
  { id: 'p2', photo: '1563379926898-05f4575a45d8', recipe: 'Crispy Salmon Rice Bowls', date: '5 days ago' },
  { id: 'p3', photo: '1551782450-a2132b4ba21d', recipe: 'Tuscan Shrimp Risotto', date: '1 week ago' },
  { id: 'p4', photo: '1546069901-ba9599a7e63c', recipe: 'Garlic Herb Butter Steak', date: '2 weeks ago' },
  { id: 'p5', photo: '1512058564366-18510be2db87', recipe: 'Veggie Pad Thai', date: '3 weeks ago' },
]

export default function CookingMemories() {
  const { goTo, searchParams } = usePrototype()
  const memoryIndex = parseInt(searchParams.get('idx') || '0', 10)
  const [currentIdx, setCurrentIdx] = useState(memoryIndex)
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [showShareSheet, setShowShareSheet] = useState(false)
  const [shared, setShared] = useState(false)
  const [view, setView] = useState<'featured' | 'gallery'>('featured')

  const memory = memories[currentIdx] || memories[0]
  const colors = memoryColors[memory.type]

  const handleShare = () => {
    setShared(true)
    setTimeout(() => {
      setShowShareSheet(false)
      setShared(false)
    }, 1500)
  }

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#f5f5f5', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ height: 54, flexShrink: 0, background: '#fff' }} />

      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44, background: '#fff' }}>
        <button onClick={() => goTo('Profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={16} color="#7C3AED" />
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Memories</span>
        </div>
        <button onClick={() => setView(view === 'featured' ? 'gallery' : 'featured')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          {view === 'featured' ? <Image size={20} color="#999" /> : <Sparkles size={20} color="#7C3AED" />}
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {view === 'featured' ? (
          <>
            {/* Today's memory (hero card) */}
            <div style={{ padding: '16px 20px 0' }}>
              {/* Memory type badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {colors.emoji}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.accent }}>{memory.title}</div>
                  <div style={{ fontSize: 11, color: '#999' }}>{memory.subtitle}</div>
                </div>
              </div>

              {/* Memory card */}
              <div style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                {/* Photo with gradient overlay */}
                <div style={{ position: 'relative', height: 280 }}>
                  <img src={img(memory.photo, 800, 600)} alt={memory.recipe} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.6))' }} />
                  {/* Date pill */}
                  <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                    <Calendar size={12} color="#fff" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{memory.date}</span>
                  </div>
                  {/* Like button */}
                  <button
                    onClick={() => toggleLike(memory.id)}
                    style={{ position: 'absolute', top: 14, right: 14, width: 36, height: 36, borderRadius: 18, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Heart size={18} color="#fff" fill={liked[memory.id] ? '#EF4444' : 'none'} />
                  </button>
                  {/* Recipe name overlay */}
                  <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{memory.recipe}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Cooked {memory.timesCooked} times since then</div>
                  </div>
                </div>

                {/* Caption & actions */}
                <div style={{ padding: '16px 18px' }}>
                  {/* Original caption */}
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.5, margin: '0 0 14px', fontStyle: 'italic' }}>
                    "{memory.caption}"
                  </p>

                  {/* Star rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                    <span style={{ fontSize: 12, color: '#999', fontWeight: 500 }}>Your rating:</span>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <div key={s} style={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill={s <= memory.rating ? '#F59E0B' : 'none'} stroke={s <= memory.rating ? '#F59E0B' : '#ddd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => goTo('CookingMoment')}
                      style={{
                        flex: 1, height: 44, borderRadius: 22,
                        background: colors.gradient,
                        color: '#fff', border: 'none', cursor: 'pointer',
                        fontSize: 14, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      }}
                    >
                      <RotateCcw size={16} /> Cook again
                    </button>
                    <button
                      onClick={() => setShowShareSheet(true)}
                      style={{
                        flex: 1, height: 44, borderRadius: 22,
                        background: '#f5f5f5',
                        color: '#242424', border: 'none', cursor: 'pointer',
                        fontSize: 14, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      }}
                    >
                      <Share2 size={16} /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Memory pagination dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '16px 0 8px' }}>
              {memories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  style={{
                    width: currentIdx === i ? 20 : 8, height: 8, borderRadius: 4,
                    background: currentIdx === i ? colors.accent : '#ddd',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>

            {/* More memories section */}
            <div style={{ padding: '8px 20px 0' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 12 }}>More Memories</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {memories.filter((_, i) => i !== currentIdx).map((mem, i) => {
                  const c = memoryColors[mem.type]
                  return (
                    <button
                      key={mem.id}
                      onClick={() => setCurrentIdx(memories.indexOf(mem))}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                        padding: '12px 14px', borderRadius: 16, background: '#fff',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                        <img src={img(mem.photo, 120, 120)} alt={mem.recipe} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                          <span style={{ fontSize: 14 }}>{c.emoji}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: c.accent }}>{mem.title}</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#242424', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mem.recipe}</div>
                        <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>{mem.date}</div>
                      </div>
                      <ChevronRight size={18} color="#ddd" />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Saved cooking moments (photo gallery teaser) */}
            <div style={{ padding: '24px 20px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase' }}>Your Cooking Photos</div>
                <button onClick={() => setView('gallery')} style={{ fontSize: 12, color: '#067A46', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
              </div>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
                {savedPhotos.map(p => (
                  <div key={p.id} style={{ flexShrink: 0, width: 100, height: 100, borderRadius: 12, overflow: 'hidden' }}>
                    <img src={img(p.photo, 200, 200)} alt={p.recipe} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* "Take a photo today" CTA */}
            <div style={{ padding: '20px 20px 0' }}>
              <button
                onClick={() => goTo('CookingMoment')}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px', borderRadius: 16,
                  background: 'linear-gradient(135deg, #E8F5E0 0%, #f0f9eb 100%)',
                  border: '1px solid rgba(6,122,70,0.1)', cursor: 'pointer',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 22, background: '#067A46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Camera size={20} color="#fff" />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>Capture today's meal</div>
                  <div style={{ fontSize: 13, color: '#067A46', marginTop: 2 }}>Build your cooking timeline</div>
                </div>
                <ChevronRight size={18} color="#067A46" />
              </button>
            </div>
          </>
        ) : (
          /* Gallery view — all saved cooking moment photos */
          <>
            <div style={{ padding: '16px 20px 8px' }}>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#242424', margin: '0 0 4px' }}>Your Cooking Timeline</h2>
              <p style={{ fontSize: 13, color: '#999', margin: 0 }}>{savedPhotos.length} photos saved from your cooking moments</p>
            </div>

            {/* Stats strip */}
            <div style={{ display: 'flex', gap: 8, padding: '8px 20px 16px' }}>
              {[
                { value: savedPhotos.length.toString(), label: 'Photos' },
                { value: memories.length.toString(), label: 'Memories' },
                { value: '8', label: 'Months' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, borderRadius: 12, background: '#fff', padding: '12px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#242424' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#999', fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 1 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Photo grid */}
            <div style={{ padding: '0 20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                {savedPhotos.map((p, i) => (
                  <div key={p.id} style={{ position: 'relative', paddingBottom: '100%', borderRadius: i === 0 ? '12px 4px 4px 4px' : i === 2 ? '4px 12px 4px 4px' : '4px', overflow: 'hidden' }}>
                    <img src={img(p.photo, 300, 300)} alt={p.recipe} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                {/* "Take more" placeholder */}
                <button
                  onClick={() => goTo('CookingMoment')}
                  style={{ position: 'relative', paddingBottom: '100%', borderRadius: 4, overflow: 'hidden', background: '#E8F5E0', border: '1.5px dashed #067A46', cursor: 'pointer' }}
                >
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Camera size={22} color="#067A46" />
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#067A46' }}>Add photo</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Monthly breakdown */}
            <div style={{ padding: '24px 20px 0' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 12 }}>Recent Months</div>
              {[
                { month: 'February 2026', count: 2, photos: [savedPhotos[0], savedPhotos[1]] },
                { month: 'January 2026', count: 3, photos: [savedPhotos[2], savedPhotos[3], savedPhotos[4]] },
              ].map((m, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>{m.month}</span>
                    <span style={{ fontSize: 12, color: '#999' }}>{m.count} photos</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {m.photos.map(p => (
                      <div key={p.id} style={{ width: 80, height: 80, borderRadius: 10, overflow: 'hidden' }}>
                        <img src={img(p.photo, 160, 160)} alt={p.recipe} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Demo links */}
        <div style={{ padding: '28px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Tab bar */}
      <BottomTabBar goTo={goTo} active="Profile" />
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />

      {/* ── Share sheet overlay ── */}
      {showShareSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
          <div onClick={() => setShowShareSheet(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '8px 20px 40px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd', margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 6px' }}>Share this memory</h3>
            <p style={{ fontSize: 13, color: '#999', margin: '0 0 16px' }}>Let friends see how your cooking has evolved</p>

            {/* Memory preview */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderRadius: 14, background: '#f9f9f9', marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <img src={img(memory.photo, 104, 104)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>{memory.recipe}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>{memory.title} · {memory.date}</div>
              </div>
            </div>

            {shared ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 56, height: 56, borderRadius: 28, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Check size={28} color="#067A46" />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#242424' }}>Shared!</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  { Icon: Instagram, label: 'Stories', color: '#E4405F' },
                  { Icon: MessageCircle, label: 'WhatsApp', color: '#25D366' },
                  { Icon: Send, label: 'iMessage', color: '#007AFF' },
                  { Icon: Image, label: 'Save', color: '#666' },
                ].map((ch, i) => (
                  <button key={i} onClick={handleShare} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: `${ch.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ch.Icon size={24} color={ch.color} />
                    </div>
                    <span style={{ fontSize: 11, color: '#666', fontWeight: 500 }}>{ch.label}</span>
                  </button>
                ))}
              </div>
            )}

            {!shared && (
              <button
                onClick={handleShare}
                style={{
                  marginTop: 16, width: '100%', height: 48, borderRadius: 24,
                  background: '#f5f5f5', border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 600, color: '#242424',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                Post to community feed
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Bottom Tab Bar ── */
function BottomTabBar({ goTo, active }: { goTo: (s: string, p?: Record<string, string>) => void; active: string }) {
  const tabs = [
    { Icon: Compass, label: 'Discover', screen: 'Discover' },
    { Icon: ShoppingBag, label: 'Store', screen: '' },
    { Icon: Sparkles, label: 'Assistant', screen: '' },
    { Icon: BookOpen, label: 'Cookbook', screen: '' },
    { Icon: User, label: 'Profile', screen: 'Profile' },
  ]
  return (
    <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
      {tabs.map((tab) => {
        const isActive = tab.label === active
        return (
          <button
            key={tab.label}
            onClick={() => tab.screen && goTo(tab.screen)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: tab.screen ? 'pointer' : 'default', color: isActive ? '#067A46' : '#aaa', padding: '4px 12px' }}
          >
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
