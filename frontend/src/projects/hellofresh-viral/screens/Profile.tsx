import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Settings,
  Gift,
  QrCode,
  Heart,
  Trophy,
  Star,
  Compass,
  UtensilsCrossed,
  Search,
  BookOpen,
  User,
  Leaf,
  Dumbbell,
  Flame,
  Globe,
  Zap,
  ChefHat,
  Lock,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Users,
  Award,
} from 'lucide-react'

const avatarUrl = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`

/* ── Badge data ── */
const badges = [
  { name: 'Veggie Connoisseur', Icon: Leaf, color: '#067A46', bg: '#E8F5E0', tier: 'gold', earned: true },
  { name: 'Protein Machine', Icon: Dumbbell, color: '#DC2626', bg: '#FEE2E2', tier: 'silver', earned: true },
  { name: 'Garlic Lover', Icon: Flame, color: '#D97706', bg: '#FEF3C7', tier: 'bronze', earned: true },
  { name: 'World Traveler', Icon: Globe, color: '#3B82F6', bg: '#DBEAFE', tier: 'silver', earned: true },
  { name: 'Speed Demon', Icon: Zap, color: '#EAB308', bg: '#FEF9C3', tier: 'bronze', earned: true },
  { name: 'Meal Prep Master', Icon: ChefHat, color: '#0891B2', bg: '#CFFAFE', tier: null, earned: false },
]

const earnedBadges = badges.filter(b => b.earned)

export default function Profile() {
  const { goTo } = usePrototype()
  const [badgesExpanded, setBadgesExpanded] = useState(false)
  const [giftExpanded, setGiftExpanded] = useState(false)

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', background: '#f5f5f5', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ height: 54, flexShrink: 0, background: '#fff' }} />

      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44, background: '#fff' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#242424' }}>Profile</span>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings size={18} color="#242424" />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* ── User header (white card) ── */}
        <div style={{ background: '#fff', paddingBottom: 16 }}>
          <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <img
                src={avatarUrl('1494790108377-be9c29b29330', 200)}
                alt="Sam"
                style={{ width: 72, height: 72, borderRadius: 36, objectFit: 'cover', border: '3px solid #067A46' }}
              />
              <div style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: 14, background: '#E8F5E0', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={14} color="#067A46" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#242424' }}>Sam Johnson</div>
              <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>Member since Feb 2024</div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', margin: '16px 20px 0', overflow: 'hidden' }}>
            {[
              { value: '22', label: 'Order Streak' },
              { value: '96', label: 'Recipes Tried' },
              { value: 'Tastemaker', label: 'Rewards Tier' },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, padding: '10px 8px', textAlign: 'center', borderRight: i < 2 ? '1px solid #e8e8e8' : 'none' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#242424' }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: '#999', marginTop: 2, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card container with spacing */}
        <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* ══ Cooking Identity Card ══ */}
          <div style={{ borderRadius: 16, background: '#fff', overflow: 'hidden' }}>
            {/* Card header — tappable to expand/collapse */}
            <button
              onClick={() => setBadgesExpanded(!badgesExpanded)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #E8F5E0, #d4edda)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={20} color="#067A46" />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>Cooking Identity</div>
                <div style={{ fontSize: 12, color: '#067A46', marginTop: 1 }}>Veggie Connoisseur · {earnedBadges.length} badges</div>
              </div>
              {/* Mini badge stack (collapsed preview) */}
              <div style={{ display: 'flex', marginRight: 4 }}>
                {earnedBadges.slice(0, 3).map((b, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: 12, background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i > 0 ? -6 : 0, border: '2px solid #fff', zIndex: 3 - i }}>
                    <b.Icon size={12} color={b.color} />
                  </div>
                ))}
              </div>
              {badgesExpanded ? <ChevronUp size={18} color="#ccc" /> : <ChevronDown size={18} color="#ccc" />}
            </button>

            {/* Expanded badge content */}
            {badgesExpanded && (
              <div style={{ padding: '0 16px 14px' }}>
                {/* Primary persona highlight */}
                <div style={{ borderRadius: 12, background: 'linear-gradient(135deg, #E8F5E0, #f0f9eb)', border: '1px solid rgba(6,122,70,0.1)', padding: '12px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: '#067A46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Leaf size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>Veggie Connoisseur</div>
                    <div style={{ fontSize: 11, color: '#067A46' }}>Primary persona</div>
                  </div>
                  <div style={{ padding: '2px 7px', borderRadius: 5, background: '#F59E0B15', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Star size={10} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B' }}>Gold</span>
                  </div>
                </div>

                {/* Compact badge row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {badges.map((badge, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 10px 6px 6px',
                        borderRadius: 20,
                        background: badge.earned ? badge.bg : '#f5f5f5',
                        opacity: badge.earned ? 1 : 0.45,
                      }}
                    >
                      <div style={{ width: 24, height: 24, borderRadius: 12, background: badge.earned ? `${badge.color}20` : '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {badge.earned ? <badge.Icon size={13} color={badge.color} /> : <Lock size={11} color="#bbb" />}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: badge.earned ? '#333' : '#bbb' }}>{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ══ My Stats Card ══ */}
          <div
            style={{ borderRadius: 16, background: '#fff', padding: '14px 16px', cursor: 'pointer' }}
            onClick={() => goTo('ScorecardDetail', { type: 'streak' })}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trophy size={16} color="#F59E0B" />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>My Stats</span>
              </div>
              <ChevronRight size={18} color="#ccc" />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Streak mini */}
              <div style={{ flex: 1, borderRadius: 12, background: 'linear-gradient(135deg, #EF4444, #F97316)', padding: '12px 10px', color: '#fff', textAlign: 'center' }}>
                <Flame size={18} style={{ marginBottom: 4 }} />
                <div style={{ fontSize: 20, fontWeight: 800 }}>22</div>
                <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.85, marginTop: 1, textTransform: 'uppercase', letterSpacing: 0.3 }}>Streak</div>
              </div>
              {/* Meals mini */}
              <div style={{ flex: 1, borderRadius: 12, background: 'linear-gradient(135deg, #067A46, #10B981)', padding: '12px 10px', color: '#fff', textAlign: 'center' }}>
                <ChefHat size={18} style={{ marginBottom: 4 }} />
                <div style={{ fontSize: 20, fontWeight: 800 }}>96</div>
                <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.85, marginTop: 1, textTransform: 'uppercase', letterSpacing: 0.3 }}>Meals</div>
              </div>
              {/* Carbon mini */}
              <div style={{ flex: 1, borderRadius: 12, background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', padding: '12px 10px', color: '#fff', textAlign: 'center' }}>
                <Globe size={18} style={{ marginBottom: 4 }} />
                <div style={{ fontSize: 20, fontWeight: 800 }}>45kg</div>
                <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.85, marginTop: 1, textTransform: 'uppercase', letterSpacing: 0.3 }}>CO₂</div>
              </div>
            </div>
          </div>

          {/* ══ Cooking Memories Card (Slice 5) ══ */}
          <div
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #7C3AED15, #A855F720)',
              border: '1px solid rgba(124,58,174,0.15)',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'pointer',
            }}
            onClick={() => goTo('CookingMemories')}
          >
            <div style={{ width: 48, height: 48, borderRadius: 14, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
              <img
                src={`https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=120&h=120&fit=crop&auto=format&q=80`}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(124,58,174,0.2)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 14 }}>✨</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>Cooking Memories</span>
              </div>
              <div style={{ fontSize: 12, color: '#7C3AED', marginTop: 2 }}>A year ago you cooked Thai Basil Chicken</div>
            </div>
            <ChevronRight size={18} color="#7C3AED" />
          </div>

          {/* ══ Taste Profile Card ══ */}
          <div
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #E8F5E0 0%, #d4edda 100%)',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'pointer',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#242424' }}>Your Taste Profile</div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>Refine your recommendations</div>
              <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: '#242424', color: '#fff', fontSize: 12, fontWeight: 600 }}>
                Complete Profile
              </div>
            </div>
            <div style={{ position: 'relative', width: 52, height: 52 }}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="4" />
                <circle cx="26" cy="26" r="22" fill="none" stroke="#067A46" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${0.55 * 138.2} 138.2`} transform="rotate(-90 26 26)" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#067A46' }}>55%</div>
            </div>
          </div>

          {/* ══ Rewards Card ══ */}
          <div
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #6B21A8, #7C3AED)',
              padding: '18px',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Trophy size={16} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Rewards</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Points: 1,800</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, borderRadius: 12, background: 'rgba(255,255,255,0.15)', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Weekly Mission:</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Share a Meal</div>
              </div>
              <div style={{ flex: 1, borderRadius: 12, background: 'rgba(255,255,255,0.15)', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Featured Reward:</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Free Shipping</div>
              </div>
            </div>
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.9 }}>Explore Rewards →</span>
            </div>
          </div>

          {/* ══ Share the Love Card ══ */}
          <div style={{ borderRadius: 16, background: '#fff', overflow: 'hidden' }}>
            {/* Gift a free box — primary action with nested QR */}
            <div>
              <button
                onClick={() => setGiftExpanded(!giftExpanded)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gift size={20} color="#067A46" />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>Gift a free box</div>
                  <div style={{ fontSize: 12, color: '#067A46', fontWeight: 500, marginTop: 1 }}>3 invitations available</div>
                </div>
                {giftExpanded ? <ChevronUp size={18} color="#ccc" /> : <ChevronDown size={18} color="#ccc" />}
              </button>

              {/* Nested: share channels (visible when expanded) */}
              {giftExpanded && (
                <div style={{ padding: '0 16px 12px 72px' }}>
                  <button onClick={() => goTo('GiftComposer')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', background: 'none', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer' }}>
                    <MessageCircle size={16} color="#067A46" />
                    <span style={{ fontSize: 13, color: '#242424' }}>Send via message</span>
                    <ChevronRight size={14} color="#ddd" style={{ marginLeft: 'auto' }} />
                  </button>
                  <button onClick={() => goTo('QRCodeShare')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <QrCode size={16} color="#067A46" />
                    <span style={{ fontSize: 13, color: '#242424' }}>Share in person (QR code)</span>
                    <ChevronRight size={14} color="#ddd" style={{ marginLeft: 'auto' }} />
                  </button>
                </div>
              )}
            </div>

            <div style={{ height: 1, background: '#f5f5f5', margin: '0 16px' }} />

            {/* Meal Train — group gift */}
            <button onClick={() => goTo('MealTrainCreate')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={20} color="#F59E0B" />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>Start a Meal Train</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Rally friends for a group gift</div>
              </div>
              <ChevronRight size={18} color="#ccc" />
            </button>
          </div>

          {/* ══ Settings Card ══ */}
          <div style={{ borderRadius: 16, background: '#fff', overflow: 'hidden' }}>
            {[
              { Icon: User, label: 'Personal info' },
              { Icon: CreditCard, label: 'Payment methods' },
              { Icon: UtensilsCrossed, label: 'Plan settings' },
              { Icon: Users, label: 'Friends & connections' },
              { Icon: HelpCircle, label: 'Help center' },
              { Icon: MessageCircle, label: 'Contact us' },
            ].map((item, i, arr) => (
              <button key={i} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', background: 'none', border: 'none', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer' }}>
                <item.Icon size={18} color="#999" />
                <span style={{ flex: 1, textAlign: 'left', fontSize: 14, color: '#242424' }}>{item.label}</span>
                <ChevronRight size={16} color="#ddd" />
              </button>
            ))}
          </div>

        </div>

        {/* Demo links */}
        <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#ccc', fontWeight: 600, letterSpacing: 0.5 }}>DEMO SCREENS</span>
          <button onClick={() => goTo('Discover')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Discover Feed</button>
          <button onClick={() => goTo('ScorecardDetail')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Scorecard Detail</button>
          <button onClick={() => goTo('CookingMoment')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Cooking Moment Prompt</button>
          <span style={{ fontSize: 10, color: '#ddd', fontWeight: 600, marginTop: 6 }}>SLICE 2: GIFTING</span>
          <button onClick={() => goTo('PostCookNudge')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Post-Cook Nudge</button>
          <button onClick={() => goTo('GiftComposer')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Gift Composer</button>
          <button onClick={() => goTo('QRCodeShare')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>QR Code Share</button>
          <button onClick={() => goTo('MealTrainCreate')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Meal Train (Create)</button>
          <button onClick={() => goTo('MealTrainInvite')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Meal Train (Invite)</button>
          <button onClick={() => goTo('MealTrainClaim')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Meal Train (Recipient)</button>
          <span style={{ fontSize: 10, color: '#ddd', fontWeight: 600, marginTop: 6 }}>SLICE 3: CHALLENGES</span>
          <button onClick={() => goTo('TeamHome')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Team Home</button>
          <button onClick={() => goTo('ChallengeDetail', { id: 'cuisine-explorer' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Challenge Detail</button>
          <button onClick={() => goTo('ChallengeCreate')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Create Challenge</button>
          <button onClick={() => goTo('ChallengeBadge')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Challenge Badge</button>
          <span style={{ fontSize: 10, color: '#ddd', fontWeight: 600, marginTop: 6 }}>SLICE 4: MEAL TRAIN ↔ FEED</span>
          <button onClick={() => goTo('Discover')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Discover (Meal Train feed posts)</button>
          <button onClick={() => goTo('MealTrainContribute')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Meal Train (Contribute)</button>
          <span style={{ fontSize: 10, color: '#ddd', fontWeight: 600, marginTop: 6 }}>SLICE 5: MEMORIES & ADVANCED SOCIAL</span>
          <button onClick={() => goTo('CookingMemories')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Cooking Memories</button>
          <button onClick={() => goTo('ScorecardDetail', { type: 'year-review' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Year in Review</button>
          <button onClick={() => goTo('ScorecardDetail', { type: 'friends' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Friend Comparison</button>
          <button onClick={() => goTo('CommunityEvent', { id: 'chef-ama' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Guest Chef AMA</button>
          <button onClick={() => goTo('CommunityEvent', { id: 'cook-along' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Community Cook-Along</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Tab bar */}
      <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
        {[
          { Icon: Compass, label: 'Discover', screen: 'Discover' },
          { Icon: UtensilsCrossed, label: 'My Menu', screen: '' },
          { Icon: Search, label: 'Search', screen: '' },
          { Icon: BookOpen, label: 'Cookbook', screen: '' },
          { Icon: User, label: 'Profile', screen: 'Profile', active: true },
        ].map((tab) => (
          <button key={tab.label} onClick={() => tab.screen && goTo(tab.screen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: tab.screen ? 'pointer' : 'default', color: tab.active ? '#067A46' : '#aaa', padding: '4px 12px' }}>
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
