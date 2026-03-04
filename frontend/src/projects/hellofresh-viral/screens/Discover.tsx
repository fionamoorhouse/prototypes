import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  Search,
  Bell,
  Heart,
  MessageCircle,
  Share2,
  Compass,
  BookOpen,
  User,
  UtensilsCrossed,
  Sparkles,
  ShoppingBag,
  ChevronRight,
  Users,
  Camera,
  Flame,
  TrendingUp,
  Gift,
  HandHeart,
  PartyPopper,
  Truck,
  Plus,
  Image,
  Lightbulb,
  X,
} from 'lucide-react'

// Alias for tab bar to avoid conflict with Sparkles used in feed
const Sparkles2 = Sparkles

/* ── helpers ── */
const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`
const avatar = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`

/* ── feed data ── */
const forYouPosts = [
  {
    id: 1,
    author: 'Emma R.',
    authorAvatar: '1494790108377-be9c29b29330',
    badge: 'Veggie Connoisseur',
    badgeColor: '#067A46',
    time: '2h ago',
    audience: 'Public',
    type: 'photo',
    photo: '1567620905732-2d1ec7ab7445',
    caption: 'First time trying the Thai Basil Chicken — the sauce was incredible! Added extra chili flakes 🌶️',
    recipe: 'Thai Basil Chicken',
    likes: 24,
    comments: 6,
  },
  {
    id: 2,
    author: 'Marcus T.',
    authorAvatar: '1507003211169-0a1dd7228f2d',
    badge: 'Protein Machine',
    badgeColor: '#DC2626',
    time: '4h ago',
    audience: 'Public',
    type: 'achievement',
    achievementTitle: '50 Meals Cooked!',
    achievementIcon: '🎉',
    achievementStat: '50',
    achievementColor: '#F59E0B',
    caption: 'Half a century of home-cooked meals. Who knew I had it in me?',
    likes: 47,
    comments: 12,
  },
  {
    id: 3,
    author: 'Sarah L.',
    authorAvatar: '1438761681033-6461ffad8d80',
    badge: 'Garlic Lover',
    badgeColor: '#D97706',
    time: '5h ago',
    audience: 'Public',
    type: 'photo',
    photo: '1551782450-a2132b4ba21d',
    caption: 'Sunday meal prep done! 4 meals ready for the week. The Tuscan Shrimp Risotto is my new go-to.',
    recipe: 'Tuscan Shrimp Risotto',
    likes: 31,
    comments: 8,
  },
  {
    id: 4,
    author: 'Alex K.',
    authorAvatar: '1472099645785-5658abf4ff4e',
    badge: 'Speed Demon',
    badgeColor: '#EAB308',
    time: '6h ago',
    audience: 'Public',
    type: 'tip',
    recipe: 'Crispy Salmon Rice Bowls',
    caption: 'Pro tip: pat the salmon skin REALLY dry with paper towels before searing. Game changer for crispiness.',
    likes: 56,
    comments: 14,
  },
]

const friendsPosts = [
  {
    id: 10,
    author: 'Tom M.',
    authorAvatar: '1500648767791-00dcc994a43e',
    badge: 'World Traveler',
    badgeColor: '#3B82F6',
    time: '1h ago',
    audience: 'Friends',
    type: 'photo',
    photo: '1563379926898-05f4575a45d8',
    caption: 'Date night in! The Garlic Herb Butter Steak was a hit 🥩',
    recipe: 'Garlic Herb Butter Steak',
    likes: 8,
    comments: 3,
  },
  {
    id: 11,
    author: 'Lisa K.',
    authorAvatar: '1544005313-94ddf0286df2',
    badge: 'Comfort Queen',
    badgeColor: '#92400E',
    time: '3h ago',
    audience: 'Friends',
    type: 'achievement',
    achievementTitle: '12-Week Streak!',
    achievementIcon: '🔥',
    achievementStat: '12',
    achievementColor: '#EF4444',
    caption: "Can't believe I've cooked every week for 3 months straight!",
    likes: 15,
    comments: 7,
  },
]

/* ── Meal Train feed items ── */
const mealTrainFeedItems = {
  started: {
    id: 'mt-started',
    organizer: 'Sam J.',
    organizerAvatar: '1494790108377-be9c29b29330',
    recipient: 'Maria',
    occasion: 'New baby',
    occasionEmoji: '👶',
    time: '2h ago',
    contributors: [
      { name: 'Sam', avatar: '1494790108377-be9c29b29330' },
      { name: 'Alex', avatar: '1507003211169-0a1dd7228f2d' },
      { name: 'Jordan', avatar: '1534528741775-53994a69daeb' },
    ],
    totalContributors: 6,
    weeksCount: 4,
    message: 'Maria just had her baby! Let\'s make sure she has delicious home-cooked meals while she adjusts to life with a newborn. 💛',
  },
  funded: {
    id: 'mt-funded',
    organizer: 'Lisa K.',
    organizerAvatar: '1544005313-94ddf0286df2',
    recipient: 'Carlos R.',
    occasion: 'Recovery',
    occasionEmoji: '💚',
    time: '5h ago',
    contributors: [
      { name: 'Lisa', avatar: '1544005313-94ddf0286df2' },
      { name: 'Tom', avatar: '1500648767791-00dcc994a43e' },
      { name: 'Priya', avatar: '1534528741775-53994a69daeb' },
      { name: 'Emma', avatar: '1438761681033-6461ffad8d80' },
    ],
    totalContributors: 8,
    weeksCount: 3,
  },
  claimed: {
    id: 'mt-claimed',
    recipient: 'Maria',
    recipientAvatar: '1534528741775-53994a69daeb',
    time: '1h ago',
    contributorNames: ['Sam', 'Alex', 'Jordan', 'Chris', 'Pat', 'Riley'],
    thankYou: 'I can\'t believe how amazing you all are. These meals are going to make the first weeks so much easier. Love you all! 😭💕',
  },
  contributed: {
    id: 'mt-contributed',
    author: 'Tom M.',
    authorAvatar: '1500648767791-00dcc994a43e',
    badge: 'World Traveler',
    badgeColor: '#3B82F6',
    time: '45min ago',
    recipient: 'Maria',
    occasion: 'New baby',
    occasionEmoji: '👶',
    amount: '$50',
    personalNote: 'Congrats on the little one! Enjoy these meals — you deserve it.',
  },
}

const communities = [
  { name: 'Weeknight Warriors', members: '2.4K', color: '#067A46', emoji: '⚡' },
  { name: 'High Protein Cooks', members: '1.8K', color: '#DC2626', emoji: '💪' },
  { name: 'Veggie Families', members: '950', color: '#16A34A', emoji: '🥦' },
  { name: 'Meal Prep Nation', members: '3.1K', color: '#7C3AED', emoji: '📦' },
]

/* ── tab type ── */
type FeedTab = 'forYou' | 'friends' | 'communities'

export default function Discover() {
  const { goTo } = usePrototype()
  const [activeTab, setActiveTab] = useState<FeedTab>('forYou')
  const [showComposer, setShowComposer] = useState(false)

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44 }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 28, fontWeight: 700, color: '#242424', margin: 0 }}>
          {activeTab === 'forYou' ? 'For you' : activeTab === 'friends' ? 'Friends' : 'Communities'}
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 36, height: 36, borderRadius: 18, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={18} color="#242424" />
          </button>
          <button style={{ width: 36, height: 36, borderRadius: 18, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Bell size={18} color="#242424" />
            <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: '#EF4444', border: '2px solid #fff' }} />
          </button>
        </div>
      </div>

      {/* Feed tabs */}
      <div style={{ flexShrink: 0, display: 'flex', gap: 0, padding: '8px 20px 0', borderBottom: '1px solid #f0f0f0' }}>
        {([
          { key: 'forYou' as FeedTab, label: 'For You' },
          { key: 'friends' as FeedTab, label: 'Friends' },
          { key: 'communities' as FeedTab, label: 'Communities' },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              paddingBottom: 10,
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.key ? '2px solid #242424' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: activeTab === tab.key ? 700 : 500,
              color: activeTab === tab.key ? '#242424' : '#999',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {activeTab === 'forYou' && <ForYouFeed goTo={goTo} />}
        {activeTab === 'friends' && <FriendsFeed goTo={goTo} />}
        {activeTab === 'communities' && <CommunitiesFeed goTo={goTo} />}

        {/* Demo launcher link */}
        <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Floating compose button */}
      <button
        onClick={() => setShowComposer(true)}
        style={{
          position: 'absolute',
          bottom: 102,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          background: '#067A46',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(6,122,70,0.35)',
          zIndex: 10,
        }}
      >
        <Plus size={24} color="#fff" />
      </button>

      {/* Post composer overlay */}
      {showComposer && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
          <div onClick={() => setShowComposer(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '8px 20px 40px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd', margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 4px' }}>Create a post</h3>
            <p style={{ fontSize: 13, color: '#999', margin: '0 0 16px' }}>Share with your community</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => { setShowComposer(false); goTo('CookingMoment') }} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', cursor: 'pointer' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Camera size={20} color="#067A46" />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>Cooking Moment</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Snap a photo of what you made</div>
                </div>
              </button>
              <button onClick={() => setShowComposer(false)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', cursor: 'pointer' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lightbulb size={20} color="#F59E0B" />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>Recipe tip</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Share a tip or trick for a recipe</div>
                </div>
              </button>
              <button onClick={() => setShowComposer(false)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', cursor: 'pointer' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image size={20} color="#3B82F6" />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>Photo post</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Share a meal photo with a caption</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <BottomTabBar goTo={goTo} active="Discover" />
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ══════════════════════════════════════════════════ */
/*  For You Feed                                      */
/* ══════════════════════════════════════════════════ */
function ForYouFeed({ goTo }: { goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <>
      {/* Spotlight carousel */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ borderRadius: 18, overflow: 'hidden', position: 'relative', height: 180 }}>
          <img src={img('1551782450-a2132b4ba21d', 800, 400)} alt="Spotlight" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.7))' }} />
          <div style={{ position: 'absolute', top: 14, left: 14 }}>
            <span style={{ background: '#067A46', color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Spotlight</span>
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, fontFamily: 'Georgia, serif' }}>Mexican Favorites</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 }}>You loved your tacos last week</div>
          </div>
          {/* Dots */}
          <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 4 }}>
            <div style={{ width: 16, height: 6, borderRadius: 3, background: '#067A46' }} />
            <div style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.5)' }} />
            <div style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.5)' }} />
          </div>
        </div>
      </div>

      {/* Sous-chef prompt */}
      <div
        style={{
          margin: '14px 20px 0',
          padding: '14px 16px',
          borderRadius: 14,
          background: '#f9f9f9',
          border: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
        }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={18} color="#067A46" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>What do you want to cook tonight?</div>
          <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Get personalized ideas from your sous-chef</div>
        </div>
        <ChevronRight size={18} color="#ccc" />
      </div>

      {/* Cooking Memory prompt (Slice 5) */}
      <div
        onClick={() => goTo('CookingMemories')}
        style={{
          margin: '14px 20px 0',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #7C3AED15, #A855F720)',
          border: '1px solid rgba(124,58,174,0.15)',
          padding: '16px',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
            <img src={img('1567620905732-2d1ec7ab7445', 120, 120)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <Sparkles size={14} color="#7C3AED" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED', letterSpacing: 0.3, textTransform: 'uppercase' }}>Memory</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>A year ago today</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 1 }}>You cooked Thai Basil Chicken for the first time</div>
          </div>
          <ChevronRight size={18} color="#7C3AED" />
        </div>
      </div>

      {/* Feed posts — Meal Train updates removed from public feed (private per PRD) */}
      {forYouPosts.map(post => (
        <FeedCard key={post.id} post={post} goTo={goTo} />
      ))}
    </>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Friends Feed                                      */
/* ══════════════════════════════════════════════════ */
function FriendsFeed({ goTo }: { goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <>
      {/* Cooking moment prompt */}
      <div
        onClick={() => goTo('CookingMoment')}
        style={{
          margin: '14px 20px 0',
          padding: '16px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #E8F5E0 0%, #f0f9eb 100%)',
          border: '1px solid rgba(6,122,70,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          cursor: 'pointer',
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 24, background: '#067A46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Camera size={22} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>How did tonight's meal turn out?</div>
          <div style={{ fontSize: 13, color: '#067A46', marginTop: 2 }}>Share a photo with your friends</div>
        </div>
      </div>

      {/* Meal Train: friends started (primary feed card) */}
      <MealTrainStartedCard mt={mealTrainFeedItems.started} goTo={goTo} />

      {/* Friends posts */}
      {friendsPosts.slice(0, 1).map(post => (
        <FeedCard key={post.id} post={post} goTo={goTo} />
      ))}

      {/* Meal Train: friend contributed */}
      <MealTrainContributedCard mt={mealTrainFeedItems.contributed} goTo={goTo} />

      {friendsPosts.slice(1).map(post => (
        <FeedCard key={post.id} post={post} goTo={goTo} />
      ))}

      {/* Meal Train: recipient claimed + thank you */}
      <MealTrainClaimedCard mt={mealTrainFeedItems.claimed} goTo={goTo} />

      {/* Empty state hint */}
      <div style={{ padding: '40px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>👋</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#242424' }}>Invite friends to see more</div>
        <div style={{ fontSize: 13, color: '#999', marginTop: 6, lineHeight: 1.5 }}>When your friends join HelloFresh, their cooking moments will show up here.</div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Communities Feed                                   */
/* ══════════════════════════════════════════════════ */
function CommunitiesFeed({ goTo }: { goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <>
      {/* Your communities */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>Your Communities</h2>
          <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600, cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
          {communities.slice(0, 2).map((c, i) => (
            <div key={i} onClick={() => goTo('TeamHome', { team: c.name })} style={{ flexShrink: 0, width: 165, borderRadius: 16, border: '1px solid #f0f0f0', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 80, background: `linear-gradient(135deg, ${c.color}20, ${c.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                {c.emoji}
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#242424' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Users size={11} /> {c.members} members
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discover communities */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>Discover Communities</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {communities.map((c, i) => (
            <div key={i} onClick={() => goTo('TeamHome', { team: c.name })} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${c.color}30, ${c.color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                {c.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{c.members} members</div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); goTo('TeamHome', { team: c.name }) }} style={{ padding: '6px 14px', borderRadius: 20, background: '#067A46', color: '#fff', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Join</button>
            </div>
          ))}
        </div>
      </div>

      {/* Community Events (Slice 5) */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>Upcoming Events</h2>
          <span onClick={() => goTo('CommunityEvent', { id: 'chef-ama' })} style={{ fontSize: 13, color: '#067A46', fontWeight: 600, cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
          {[
            { id: 'chef-ama', title: 'AMA: Chef Julia', date: 'Feb 19 · 7 PM', emoji: '🎙️', color: '#067A46' },
            { id: 'cook-along', title: 'Ramen Night Cook-Along', date: 'Feb 22 · 6:30 PM', emoji: '🍜', color: '#DC2626' },
            { id: 'spring-kickoff', title: 'Spring Menu Launch', date: 'Mar 4 · 12 PM', emoji: '🌸', color: '#7C3AED' },
          ].map((ev) => (
            <div
              key={ev.id}
              onClick={() => goTo('CommunityEvent', { id: ev.id })}
              style={{ flexShrink: 0, width: 160, borderRadius: 16, border: '1px solid #f0f0f0', overflow: 'hidden', cursor: 'pointer' }}
            >
              <div style={{ height: 64, background: `linear-gradient(135deg, ${ev.color}25, ${ev.color}45)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                {ev.emoji}
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#242424' }}>{ev.title}</div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{ev.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active challenges */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>Active Challenges</h2>
        </div>
        <div
          onClick={() => goTo('ChallengeDetail', { id: 'cuisine-explorer' })}
          style={{
            borderRadius: 16,
            background: 'linear-gradient(135deg, #067A46 0%, #0a9e5c 100%)',
            padding: '18px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Flame size={18} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.8 }}>Community Challenge</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Try 3 New Cuisines This Month</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 14 }}>248 participants · 12 days left</div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.25)' }}>
            <div style={{ height: 6, borderRadius: 3, background: '#fff', width: '33%' }} />
          </div>
          <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>Your progress: 1 / 3 cuisines</div>
        </div>
      </div>

      {/* Trending section */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <TrendingUp size={16} color="#067A46" />
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>Trending</h2>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
          {[
            { name: 'Meal Prep Mondays', members: '1.2K', emoji: '🗓️', color: '#3B82F6' },
            { name: 'Budget Friendly', members: '890', emoji: '💰', color: '#16A34A' },
            { name: 'Date Night Dishes', members: '760', emoji: '❤️', color: '#EF4444' },
          ].map((c, i) => (
            <div key={i} style={{ flexShrink: 0, width: 150, borderRadius: 16, border: '1px solid #f0f0f0', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 72, background: `linear-gradient(135deg, ${c.color}25, ${c.color}45)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                {c.emoji}
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#242424' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{c.members} members</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Meal Train Feed Cards (Slice 4)                   */
/* ══════════════════════════════════════════════════ */

/* "Sam started a Meal Train for Maria" — warm CTA card */
function MealTrainStartedCard({ mt, goTo }: { mt: typeof mealTrainFeedItems.started; goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <div style={{ padding: '16px 20px 0' }}>
      <div style={{ borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)', padding: '20px', position: 'relative' }}>
        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HandHeart size={14} color="#fff" />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#92400E', letterSpacing: 0.5, textTransform: 'uppercase' }}>Meal Train</span>
          <span style={{ fontSize: 11, color: '#B45309', marginLeft: 'auto' }}>{mt.time}</span>
        </div>

        {/* Headline */}
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 19, fontWeight: 700, color: '#242424', lineHeight: 1.3, marginBottom: 6 }}>
          {mt.organizer} started a Meal Train for {mt.recipient}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 12, background: 'rgba(146,64,14,0.1)', marginBottom: 12 }}>
          <span style={{ fontSize: 14 }}>{mt.occasionEmoji}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#92400E' }}>{mt.occasion}</span>
        </div>

        {/* Message preview */}
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, margin: '0 0 14px', fontStyle: 'italic' }}>
          "{mt.message}"
        </p>

        {/* Contributors row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ display: 'flex' }}>
            {mt.contributors.map((c, i) => (
              <div key={i} style={{ width: 30, height: 30, borderRadius: 15, overflow: 'hidden', border: '2px solid #FDE68A', marginLeft: i > 0 ? -8 : 0, position: 'relative', zIndex: 5 - i }}>
                <img src={avatar(c.avatar, 60)} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            {mt.totalContributors > mt.contributors.length && (
              <div style={{ width: 30, height: 30, borderRadius: 15, background: '#92400E', border: '2px solid #FDE68A', marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>
                +{mt.totalContributors - mt.contributors.length}
              </div>
            )}
          </div>
          <span style={{ fontSize: 12, color: '#92400E' }}>{mt.totalContributors} contributors · {mt.weeksCount} weeks</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => goTo('MealTrainContribute')}
          style={{ width: '100%', height: 44, borderRadius: 22, background: '#242424', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <Gift size={16} /> Contribute to this Meal Train
        </button>
      </div>
      <div style={{ height: 14, borderBottom: '1px solid #f5f5f5' }} />
    </div>
  )
}

/* "Meal Train fully funded!" — celebration card */
function MealTrainFundedCard({ mt, goTo }: { mt: typeof mealTrainFeedItems.funded; goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <div style={{ padding: '16px 20px 0' }}>
      <div style={{ borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(135deg, #E8F5E0 0%, #c3e6cb 50%, #a3d9a5 100%)', padding: '20px', textAlign: 'center', position: 'relative' }}>
        {/* Decorative confetti */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {['🎉', '💚', '🍽️', '✨'].map((e, i) => (
            <span key={i} style={{ position: 'absolute', fontSize: 16, opacity: 0.5, left: `${10 + i * 22}%`, top: `${5 + (i % 2) * 12}%`, transform: `rotate(${i * 25 - 30}deg)` }}>{e}</span>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 12, background: '#067A4620' }}>
              <PartyPopper size={14} color="#067A46" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#067A46', letterSpacing: 0.3, textTransform: 'uppercase' }}>Fully Funded</span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 19, fontWeight: 700, color: '#242424', lineHeight: 1.3, marginBottom: 4 }}>
            Meal Train for {mt.recipient} is fully funded!
          </div>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 14 }}>
            {mt.totalContributors} friends came together for {mt.weeksCount} weeks of meals {mt.occasionEmoji}
          </div>

          {/* Contributors */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            {mt.contributors.map((c, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 18, overflow: 'hidden', border: '2px solid #c3e6cb', marginLeft: i > 0 ? -10 : 0, position: 'relative', zIndex: 5 - i }}>
                <img src={avatar(c.avatar, 72)} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            {mt.totalContributors > mt.contributors.length && (
              <div style={{ width: 36, height: 36, borderRadius: 18, background: '#067A46', border: '2px solid #c3e6cb', marginLeft: -10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                +{mt.totalContributors - mt.contributors.length}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: '#067A46', fontWeight: 600 }}>
            <span>Organized by {mt.organizer}</span>
            <span>·</span>
            <span>{mt.time}</span>
          </div>
        </div>
      </div>

      {/* Engagement row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '10px 0 14px', borderBottom: '1px solid #f5f5f5' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>
          <Heart size={18} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>34</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>
          <MessageCircle size={18} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>8</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0, marginLeft: 'auto' }}>
          <Share2 size={18} />
        </button>
      </div>
    </div>
  )
}

/* "Tom contributed to Maria's Meal Train" — friend action card */
function MealTrainContributedCard({ mt, goTo }: { mt: typeof mealTrainFeedItems.contributed; goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <div style={{ padding: '16px 20px 0' }}>
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <img src={avatar(mt.authorAvatar, 80)} alt={mt.author} style={{ width: 36, height: 36, borderRadius: 18, objectFit: 'cover' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>{mt.author}</span>
            <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: `${mt.badgeColor}15`, color: mt.badgeColor, fontWeight: 600 }}>{mt.badge}</span>
          </div>
          <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>{mt.time} · Friends</div>
        </div>
      </div>

      {/* Contribution card */}
      <div style={{ borderRadius: 14, background: '#FEF3C720', border: '1px solid #FDE68A', padding: '16px', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HandHeart size={16} color="#F59E0B" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#242424' }}>Contributed to {mt.recipient}'s Meal Train</div>
            <div style={{ fontSize: 11, color: '#999' }}>{mt.occasionEmoji} {mt.occasion}</div>
          </div>
        </div>
        {mt.personalNote && (
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, margin: '0 0 10px', fontStyle: 'italic', paddingLeft: 12, borderLeft: '2px solid #FDE68A' }}>
            "{mt.personalNote}"
          </p>
        )}
        <button
          onClick={() => goTo('MealTrainContribute')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 14px', borderRadius: 16, background: '#FEF3C7', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#92400E' }}
        >
          <Gift size={13} /> Join this Meal Train
        </button>
      </div>

      {/* Engagement row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '4px 0 14px', borderBottom: '1px solid #f5f5f5' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>
          <Heart size={18} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>12</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>
          <MessageCircle size={18} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>3</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0, marginLeft: 'auto' }}>
          <Share2 size={18} />
        </button>
      </div>
    </div>
  )
}

/* "Maria claimed her Meal Train meals" — thank you card */
function MealTrainClaimedCard({ mt, goTo }: { mt: typeof mealTrainFeedItems.claimed; goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <div style={{ padding: '16px 20px 0' }}>
      {/* System-style header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, overflow: 'hidden' }}>
          <img src={avatar(mt.recipientAvatar, 72)} alt={mt.recipient} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>{mt.recipient}</div>
          <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>{mt.time} · Friends</div>
        </div>
      </div>

      {/* Thank you card */}
      <div style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(135deg, #E8F5E0 0%, #f0f9eb 100%)', border: '1px solid rgba(6,122,70,0.15)', padding: '18px', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Truck size={16} color="#067A46" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#067A46', letterSpacing: 0.3 }}>Meals claimed!</span>
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: '#242424', marginBottom: 6, lineHeight: 1.3 }}>
          {mt.recipient} claimed her Meal Train meals
        </div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>
          Thanks to {mt.contributorNames.slice(0, 3).join(', ')} & {mt.contributorNames.length - 3} more friends
        </div>

        {/* Thank you message */}
        <div style={{ borderRadius: 12, background: '#fff', padding: '14px', borderLeft: '3px solid #067A46' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#067A46', marginBottom: 4 }}>Thank you message</div>
          <p style={{ fontSize: 13, color: '#333', lineHeight: 1.5, margin: 0 }}>
            {mt.thankYou}
          </p>
        </div>
      </div>

      {/* Engagement row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '4px 0 14px', borderBottom: '1px solid #f5f5f5' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: 0 }}>
          <Heart size={18} fill="#EF4444" />
          <span style={{ fontSize: 13, fontWeight: 500 }}>28</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>
          <MessageCircle size={18} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>11</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0, marginLeft: 'auto' }}>
          <Share2 size={18} />
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Feed Card                                         */
/* ══════════════════════════════════════════════════ */
function FeedCard({ post, goTo }: { post: (typeof forYouPosts)[number]; goTo: (s: string, p?: Record<string, string>) => void }) {
  const [liked, setLiked] = useState(false)

  return (
    <div style={{ padding: '16px 20px 0' }}>
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <img src={avatar(post.authorAvatar, 80)} alt={post.author} style={{ width: 36, height: 36, borderRadius: 18, objectFit: 'cover' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>{post.author}</span>
            <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: `${post.badgeColor}15`, color: post.badgeColor, fontWeight: 600 }}>{post.badge}</span>
          </div>
          <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>{post.time} · {post.audience}</div>
        </div>
      </div>

      {/* Content area */}
      {post.type === 'photo' && post.photo && (
        <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 10 }}>
          <img src={img(post.photo, 800, 600)} alt="Meal" style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {post.type === 'achievement' && (
        <div style={{ borderRadius: 14, background: `${post.achievementColor}10`, border: `1px solid ${post.achievementColor}20`, padding: '20px', marginBottom: 10, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>{post.achievementIcon}</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: post.achievementColor }}>{post.achievementStat}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#242424', marginTop: 2 }}>{post.achievementTitle}</div>
        </div>
      )}

      {post.type === 'tip' && (
        <div style={{ borderRadius: 14, background: '#FFF8E1', border: '1px solid #FEF3C7', padding: '14px 16px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Sparkles size={14} color="#F59E0B" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: 0.5 }}>Tip</span>
          </div>
          {'recipe' in post && post.recipe && (
            <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>on {post.recipe}</div>
          )}
        </div>
      )}

      {/* Caption */}
      <div style={{ fontSize: 14, color: '#333', lineHeight: 1.5, marginBottom: 8 }}>
        {post.caption}
      </div>

      {/* Recipe tag */}
      {'recipe' in post && post.recipe && post.type !== 'tip' && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 4px', borderRadius: 8, background: '#f5f5f5', marginBottom: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UtensilsCrossed size={12} color="#999" />
          </div>
          <span style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{post.recipe}</span>
        </div>
      )}

      {/* Engagement row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '4px 0 14px', borderBottom: '1px solid #f5f5f5' }}>
        <button onClick={() => setLiked(!liked)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: liked ? '#EF4444' : '#999', padding: 0 }}>
          <Heart size={18} fill={liked ? '#EF4444' : 'none'} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>{post.likes + (liked ? 1 : 0)}</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>
          <MessageCircle size={18} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>{post.comments}</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0, marginLeft: 'auto' }}>
          <Share2 size={18} />
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Bottom Tab Bar                                    */
/* ══════════════════════════════════════════════════ */
function BottomTabBar({ goTo, active }: { goTo: (s: string, p?: Record<string, string>) => void; active: string }) {
  const tabs = [
    { Icon: Compass, label: 'Discover', screen: 'Discover' },
    { Icon: ShoppingBag, label: 'Store', screen: '' },
    { Icon: Sparkles2, label: 'Assistant', screen: '' },
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
