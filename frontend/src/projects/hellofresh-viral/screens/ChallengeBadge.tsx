import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  Share2,
  Globe,
  Trophy,
  Star,
  Flame,
  Check,
  X,
  ChefHat,
  Dumbbell,
  Instagram,
  MessageCircle,
  Send,
  Image,
} from 'lucide-react'

/* ── helpers ── */
const avatar = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`

/* ── badge celebration data ── */
const badgeTypes: Record<string, {
  title: string
  icon: string
  badgeName: string
  tier: string
  tierColor: string
  gradient: string
  stat: string
  statLabel: string
  challengeName: string
  description: string
  topFinishers: { name: string; avatar: string; rank: number }[]
  pointsEarned: number
}> = {
  'world-traveler': {
    title: 'Challenge Complete!',
    icon: '🌍',
    badgeName: 'World Traveler',
    tier: 'Silver',
    tierColor: '#C0C0C0',
    gradient: 'linear-gradient(135deg, #067A46 0%, #0a9e5c 100%)',
    stat: '3/3',
    statLabel: 'Cuisines Explored',
    challengeName: 'Try 3 New Cuisines',
    description: 'You expanded your cooking horizons! You tried Thai, Moroccan, and Japanese cuisines this month.',
    topFinishers: [
      { name: 'Marcus T.', avatar: '1507003211169-0a1dd7228f2d', rank: 1 },
      { name: 'Priya S.', avatar: '1534528741775-53994a69daeb', rank: 2 },
      { name: 'Sam J. (You)', avatar: '1494790108377-be9c29b29330', rank: 3 },
    ],
    pointsEarned: 200,
  },
  'protein-machine': {
    title: 'Challenge Complete!',
    icon: '💪',
    badgeName: 'Protein Machine',
    tier: 'Bronze',
    tierColor: '#CD7F32',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
    stat: '5/5',
    statLabel: 'High-Protein Meals',
    challengeName: 'High Protein Week',
    description: 'Gains-friendly cooking achieved! 5 meals with 30g+ protein each.',
    topFinishers: [
      { name: 'Marcus T.', avatar: '1507003211169-0a1dd7228f2d', rank: 1 },
      { name: 'Sam J. (You)', avatar: '1494790108377-be9c29b29330', rank: 2 },
      { name: 'Alex K.', avatar: '1472099645785-5658abf4ff4e', rank: 3 },
    ],
    pointsEarned: 100,
  },
  'fiber-champion': {
    title: 'Challenge Complete!',
    icon: '🌾',
    badgeName: 'Fiber Champion',
    tier: 'Gold',
    tierColor: '#F59E0B',
    gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    stat: '32g',
    statLabel: 'Avg Daily Fiber',
    challengeName: '30g Fiber Daily',
    description: 'Your gut thanks you! You averaged 32g of daily fiber for 2 weeks straight.',
    topFinishers: [
      { name: 'Sam J. (You)', avatar: '1494790108377-be9c29b29330', rank: 1 },
      { name: 'Lisa K.', avatar: '1544005313-94ddf0286df2', rank: 2 },
      { name: 'Emma R.', avatar: '1438761681033-6461ffad8d80', rank: 3 },
    ],
    pointsEarned: 200,
  },
}

export default function ChallengeBadge() {
  const { goTo, searchParams } = usePrototype()
  const type = searchParams.get('type') || 'world-traveler'
  const badge = badgeTypes[type] || badgeTypes['world-traveler']
  const [showShareSheet, setShowShareSheet] = useState(false)
  const [shared, setShared] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const handleShare = () => {
    setShared(true)
    setTimeout(() => {
      setShowShareSheet(false)
      setShared(false)
    }, 1500)
  }

  // Celebration confetti dots (decorative)
  const confettiColors = ['#067A46', '#F59E0B', '#EF4444', '#3B82F6', '#A855F7', '#EC4899']

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Close button */}
      <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'flex-end', padding: '0 20px', height: 44, alignItems: 'center' }}>
        <button onClick={() => goTo('TeamHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <X size={22} color="#242424" />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Confetti burst (static decorative) */}
        <div style={{ position: 'relative', width: '100%', height: 0 }}>
          {confettiColors.map((c, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 8 + (i % 3) * 4,
                height: 8 + (i % 3) * 4,
                borderRadius: i % 2 === 0 ? '50%' : 2,
                background: c,
                top: 10 + (i * 17) % 50,
                left: `${15 + (i * 23) % 70}%`,
                opacity: 0.6,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>

        {/* Main celebration */}
        <div style={{ textAlign: 'center', padding: '10px 28px 0' }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🎉</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#242424', margin: '0 0 4px' }}>
            {badge.title}
          </h1>
          <p style={{ fontSize: 14, color: '#999', margin: '0 0 20px' }}>{badge.challengeName}</p>
        </div>

        {/* Badge card */}
        <div
          style={{
            margin: '0 28px',
            width: 'calc(100% - 56px)',
            maxWidth: 320,
            borderRadius: 24,
            background: badge.gradient,
            padding: '28px 24px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.06)' }} />

          {/* Badge icon */}
          <div style={{ fontSize: 48, marginBottom: 12 }}>{badge.icon}</div>

          {/* Badge name */}
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{badge.badgeName}</div>

          {/* Tier */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>
            <Star size={12} fill="#fff" />
            <span style={{ fontSize: 12, fontWeight: 700 }}>{badge.tier}</span>
          </div>

          {/* Stat */}
          <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{badge.stat}</div>
          <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85, marginTop: 4 }}>{badge.statLabel}</div>

          {/* Points */}
          <div style={{ marginTop: 16, padding: '8px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.15)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Trophy size={14} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>+{badge.pointsEarned} points earned</span>
          </div>

          {/* User watermark */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <img src={avatar('1494790108377-be9c29b29330', 80)} alt="You" style={{ width: 24, height: 24, borderRadius: 12, objectFit: 'cover', opacity: 0.9 }} />
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.85 }}>Sam Johnson</span>
            <span style={{ fontSize: 10, opacity: 0.5, marginLeft: 4 }}>hellofresh.com/sam-j</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: '20px 28px', textAlign: 'center', maxWidth: 320 }}>
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6, margin: 0 }}>{badge.description}</p>
        </div>

        {/* Share CTA */}
        <button
          onClick={() => setShowShareSheet(true)}
          style={{
            margin: '0 28px',
            width: 'calc(100% - 56px)',
            maxWidth: 320,
            height: 52,
            borderRadius: 26,
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
          <Share2 size={18} />
          Share your badge
        </button>

        {/* Post to feed option */}
        <button
          onClick={() => {}}
          style={{
            margin: '10px 28px 0',
            width: 'calc(100% - 56px)',
            maxWidth: 320,
            height: 44,
            borderRadius: 22,
            background: '#f5f5f5',
            color: '#242424',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Post to community feed
        </button>

        {/* Top finishers */}
        <div style={{ padding: '28px 28px 0', width: '100%', maxWidth: 320 + 56 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 12 }}>Top Finishers</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            {badge.topFinishers.map((f, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={avatar(f.avatar, 80)} alt={f.name} style={{ width: 48, height: 48, borderRadius: 24, objectFit: 'cover', border: `3px solid ${i === 0 ? '#F59E0B' : i === 1 ? '#C0C0C0' : '#CD7F32'}` }} />
                  <div style={{
                    position: 'absolute', bottom: -4, right: -4,
                    width: 20, height: 20, borderRadius: 10,
                    background: i === 0 ? '#F59E0B' : i === 1 ? '#C0C0C0' : '#CD7F32',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 800, border: '2px solid #fff',
                  }}>
                    {f.rank}
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#242424', marginTop: 6 }}>{f.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Other badges to explore */}
        <div style={{ padding: '28px 20px 0', width: '100%' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 12 }}>More Badges to Earn</div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {Object.entries(badgeTypes).filter(([k]) => k !== type).map(([key, b]) => (
              <div
                key={key}
                onClick={() => goTo('ChallengeBadge', { type: key })}
                style={{ flexShrink: 0, width: 120, borderRadius: 14, background: b.gradient, padding: '14px', cursor: 'pointer', color: '#fff', textAlign: 'center' }}
              >
                <div style={{ fontSize: 28, marginBottom: 4 }}>{b.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{b.badgeName}</div>
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{b.tier}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* ── Share sheet overlay ── */}
      {showShareSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
          <div onClick={() => setShowShareSheet(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '8px 20px 40px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd', margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 16px' }}>Share your badge</h3>

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
                  marginTop: 16,
                  width: '100%',
                  height: 48,
                  borderRadius: 24,
                  background: '#f5f5f5',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#242424',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
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
