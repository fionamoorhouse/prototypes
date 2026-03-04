import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Flame,
  Trophy,
  Settings,
  UserPlus,
  Camera,
  ChefHat,
  Compass,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  BookOpen,
  User,
  Leaf,
  Dumbbell,
  Globe,
  Zap,
  Target,
  Clock,
  Star,
  Gift,
  HandHeart,
} from 'lucide-react'

/* ── helpers ── */
const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`
const avatar = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`

/* ── team data ── */
const team = {
  name: 'Weeknight Warriors',
  emoji: '⚡',
  color: '#067A46',
  members: 247,
  weekMeals: 47,
  activeMembers: 12,
  description: 'For people who cook real meals on busy weeknights. Quick recipes, smart prep, shared tips.',
}

const members = [
  { name: 'Sam J.', avatar: '1494790108377-be9c29b29330', badge: 'Veggie Connoisseur', isYou: true },
  { name: 'Tom M.', avatar: '1500648767791-00dcc994a43e', badge: 'World Traveler', isYou: false },
  { name: 'Lisa K.', avatar: '1544005313-94ddf0286df2', badge: 'Comfort Queen', isYou: false },
  { name: 'Emma R.', avatar: '1438761681033-6461ffad8d80', badge: 'Garlic Lover', isYou: false },
  { name: 'Marcus T.', avatar: '1507003211169-0a1dd7228f2d', badge: 'Protein Machine', isYou: false },
  { name: 'Alex K.', avatar: '1472099645785-5658abf4ff4e', badge: 'Speed Demon', isYou: false },
  { name: 'Priya S.', avatar: '1534528741775-53994a69daeb', badge: 'Spice Explorer', isYou: false },
  { name: 'Jordan L.', avatar: '1539571696357-5a69c17a67c6', badge: 'Meal Prep Master', isYou: false },
]

const challenges = [
  {
    id: 'cuisine-explorer',
    title: 'Try 3 New Cuisines',
    type: 'Community Challenge',
    icon: '🌍',
    gradient: 'linear-gradient(135deg, #067A46 0%, #0a9e5c 100%)',
    participants: 248,
    daysLeft: 12,
    progress: 1,
    goal: 3,
    active: true,
  },
  {
    id: 'protein-week',
    title: 'High Protein Week',
    type: 'Team Challenge',
    icon: '💪',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
    participants: 18,
    daysLeft: 5,
    progress: 3,
    goal: 5,
    active: true,
  },
]

const feedPosts = [
  {
    id: 1,
    author: 'Emma R.',
    authorAvatar: '1438761681033-6461ffad8d80',
    badge: 'Garlic Lover',
    badgeColor: '#D97706',
    time: '1h ago',
    type: 'photo' as const,
    photo: '1567620905732-2d1ec7ab7445',
    caption: 'Made the Thai Basil Chicken in 25 minutes flat — weeknight record! The key is prepping everything before you even turn on the stove.',
    recipe: 'Thai Basil Chicken',
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    author: 'Marcus T.',
    authorAvatar: '1507003211169-0a1dd7228f2d',
    badge: 'Protein Machine',
    badgeColor: '#DC2626',
    time: '3h ago',
    type: 'achievement' as const,
    achievementTitle: 'Challenge Progress!',
    achievementIcon: '🌍',
    achievementStat: '2/3',
    achievementColor: '#067A46',
    caption: 'Just tried Korean Bibimbap — that makes 2 new cuisines this month! One more to go for the challenge 🎯',
    likes: 8,
    comments: 3,
  },
  {
    id: 3,
    author: 'Tom M.',
    authorAvatar: '1500648767791-00dcc994a43e',
    badge: 'World Traveler',
    badgeColor: '#3B82F6',
    time: '5h ago',
    type: 'tip' as const,
    recipe: 'Crispy Salmon Rice Bowls',
    caption: 'Tip for fellow warriors: mix the rice with sesame oil and a splash of rice vinegar BEFORE plating. Makes a massive difference.',
    likes: 19,
    comments: 6,
  },
  {
    id: 4,
    author: 'Lisa K.',
    authorAvatar: '1544005313-94ddf0286df2',
    badge: 'Comfort Queen',
    badgeColor: '#92400E',
    time: '6h ago',
    type: 'photo' as const,
    photo: '1551782450-a2132b4ba21d',
    caption: 'Meal prep Sunday! Got 4 lunches sorted for the week. This community keeps me accountable 🙌',
    recipe: 'Tuscan Shrimp Risotto',
    likes: 23,
    comments: 7,
  },
]

type TabView = 'feed' | 'challenges' | 'members'

export default function TeamHome() {
  const { goTo, searchParams } = usePrototype()
  const [activeTab, setActiveTab] = useState<TabView>('feed')
  const teamName = searchParams.get('team') || team.name

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', height: 44, gap: 12 }}>
        <button onClick={() => goTo('Discover')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>{team.emoji}</span>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>{teamName}</span>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings size={18} color="#242424" />
        </button>
      </div>

      {/* Team hero banner */}
      <div style={{ flexShrink: 0, padding: '0 20px 12px' }}>
        {/* Member avatars & stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex' }}>
            {members.slice(0, 5).map((m, i) => (
              <img
                key={i}
                src={avatar(m.avatar, 80)}
                alt={m.name}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  objectFit: 'cover',
                  border: '2px solid #fff',
                  marginLeft: i > 0 ? -8 : 0,
                  zIndex: 5 - i,
                }}
              />
            ))}
            <div style={{ width: 28, height: 28, borderRadius: 14, background: '#f0f0f0', border: '2px solid #fff', marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#999' }}>
              +{team.members - 5}
            </div>
          </div>
          <span style={{ fontSize: 13, color: '#999' }}>{team.members} members</span>
          <button
            onClick={() => {}}
            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 20, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
          >
            <UserPlus size={13} /> Invite
          </button>
        </div>

        {/* Team stats strip */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, borderRadius: 12, background: '#f9f9f9', border: '1px solid #f0f0f0', padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#242424' }}>{team.weekMeals}</div>
            <div style={{ fontSize: 10, color: '#999', fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 1 }}>Meals this week</div>
          </div>
          <div style={{ flex: 1, borderRadius: 12, background: '#f9f9f9', border: '1px solid #f0f0f0', padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#242424' }}>{team.activeMembers}</div>
            <div style={{ fontSize: 10, color: '#999', fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 1 }}>Active cooks</div>
          </div>
          <div style={{ flex: 1, borderRadius: 12, background: '#f9f9f9', border: '1px solid #f0f0f0', padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#242424' }}>2</div>
            <div style={{ fontSize: 10, color: '#999', fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 1 }}>Challenges</div>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{ flexShrink: 0, display: 'flex', gap: 0, padding: '0 20px', borderBottom: '1px solid #f0f0f0' }}>
        {([
          { key: 'feed' as TabView, label: 'Feed' },
          { key: 'challenges' as TabView, label: 'Challenges' },
          { key: 'members' as TabView, label: 'Members' },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              paddingBottom: 10,
              paddingTop: 6,
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
        {activeTab === 'feed' && <FeedTab goTo={goTo} />}
        {activeTab === 'challenges' && <ChallengesTab goTo={goTo} />}
        {activeTab === 'members' && <MembersTab goTo={goTo} />}

        {/* Demo links */}
        <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Floating compose button */}
      <button
        onClick={() => goTo('CookingMoment')}
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
        <Camera size={24} color="#fff" />
      </button>

      {/* Tab bar */}
      <BottomTabBar goTo={goTo} active="Discover" />
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Feed Tab                                          */
/* ══════════════════════════════════════════════════ */
function FeedTab({ goTo }: { goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <>
      {/* Active challenge highlight (pinned) */}
      <div style={{ padding: '14px 20px 0' }}>
        <div
          onClick={() => goTo('ChallengeDetail', { id: 'cuisine-explorer' })}
          style={{
            borderRadius: 16,
            background: challenges[0].gradient,
            padding: '16px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Flame size={16} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.8 }}>{challenges[0].type}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, opacity: 0.8 }}>{challenges[0].daysLeft}d left</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{challenges[0].title}</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 12 }}>{challenges[0].participants} participants</div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.25)' }}>
            <div style={{ height: 6, borderRadius: 3, background: '#fff', width: `${(challenges[0].progress / challenges[0].goal) * 100}%`, transition: 'width 0.3s' }} />
          </div>
          <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>Your progress: {challenges[0].progress} / {challenges[0].goal}</div>
        </div>
      </div>

      {/* Meal Train activity card (Slice 4 integration) */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ borderRadius: 16, background: '#fff', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px 0' }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HandHeart size={16} color="#F59E0B" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#242424' }}>Meal Train for Emma</div>
              <div style={{ fontSize: 11, color: '#999' }}>Community members rallied together</div>
            </div>
            <span style={{ fontSize: 11, color: '#ccc' }}>2h</span>
          </div>

          {/* Content */}
          <div style={{ padding: '10px 16px 14px' }}>
            <div style={{ borderRadius: 12, background: 'linear-gradient(135deg, #FEF3C720, #FDE68A30)', border: '1px solid #FDE68A50', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 14 }}>📦</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#92400E' }}>Big move</span>
              </div>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, margin: '0 0 10px' }}>
                3 Weeknight Warriors chipped in for 2 weeks of meals to help Emma settle into her new place!
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex' }}>
                  {[members[1], members[2], members[5]].map((m, i) => (
                    <img key={i} src={avatar(m.avatar, 48)} alt={m.name} style={{ width: 24, height: 24, borderRadius: 12, objectFit: 'cover', border: '2px solid #fff', marginLeft: i > 0 ? -6 : 0, zIndex: 5 - i }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: '#999' }}>Tom, Lisa & Alex contributed</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>
                <Heart size={16} />
                <span style={{ fontSize: 12, fontWeight: 500 }}>18</span>
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>
                <MessageCircle size={16} />
                <span style={{ fontSize: 12, fontWeight: 500 }}>5</span>
              </button>
              <button onClick={() => goTo('MealTrainCreate')} style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: 14, background: '#FEF3C7', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#92400E' }}>
                <Gift size={12} /> Start a Meal Train
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Event card (Slice 5) */}
      <div style={{ padding: '14px 20px 0' }}>
        <div
          onClick={() => goTo('CommunityEvent', { id: 'cook-along' })}
          style={{ borderRadius: 16, background: '#fff', border: '1px solid #f0f0f0', overflow: 'hidden', cursor: 'pointer' }}
        >
          <div style={{ position: 'relative', height: 100 }}>
            <img src={img('1569718212165-3a8922ada9e5', 800, 300)} alt="Cook-along" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 20%, rgba(0,0,0,0.5))' }} />
            <div style={{ position: 'absolute', top: 10, left: 10 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: 'rgba(220,38,38,0.9)' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: 0.5, textTransform: 'uppercase' }}>🍜 Cook-Along</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Ramen Night — Cook Together!</div>
            </div>
          </div>
          <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={13} color="#999" />
              <span style={{ fontSize: 12, color: '#666' }}>Sat Feb 22 · 6:30 PM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Users size={13} color="#999" />
              <span style={{ fontSize: 12, color: '#666' }}>42 going</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feed posts */}
      {feedPosts.map(post => (
        <FeedCard key={post.id} post={post} goTo={goTo} />
      ))}
    </>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Challenges Tab                                    */
/* ══════════════════════════════════════════════════ */
function ChallengesTab({ goTo }: { goTo: (s: string, p?: Record<string, string>) => void }) {
  return (
    <>
      {/* Create challenge CTA */}
      <div style={{ padding: '14px 20px 0' }}>
        <button
          onClick={() => goTo('ChallengeCreate')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 16px',
            borderRadius: 14,
            background: '#f9f9f9',
            border: '1.5px dashed #ddd',
            cursor: 'pointer',
          }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 12, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={20} color="#067A46" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>Create a Challenge</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Pick a template or go custom</div>
          </div>
          <ChevronRight size={18} color="#ccc" style={{ marginLeft: 'auto' }} />
        </button>
      </div>

      {/* Active challenges */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10 }}>Active Challenges</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {challenges.map(ch => (
            <div
              key={ch.id}
              onClick={() => goTo('ChallengeDetail', { id: ch.id })}
              style={{ borderRadius: 16, background: ch.gradient, padding: '16px', color: '#fff', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{ch.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.8 }}>{ch.type}</span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} style={{ opacity: 0.8 }} />
                  <span style={{ fontSize: 12, opacity: 0.8 }}>{ch.daysLeft}d left</span>
                </div>
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{ch.title}</div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>
                <div style={{ height: 6, borderRadius: 3, background: '#fff', width: `${(ch.progress / ch.goal) * 100}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ opacity: 0.7 }}>{ch.progress} / {ch.goal} completed</span>
                <span style={{ opacity: 0.7 }}>{ch.participants} participants</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past challenges */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10 }}>Completed</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { title: 'Cook 5 Meals This Week', icon: '🍳', participants: 34, winner: 'Lisa K.', badge: '5-Meal Warrior' },
            { title: '30g Fiber Daily Challenge', icon: '🌾', participants: 22, winner: 'Sam J. (You!)', badge: 'Fiber Champion' },
          ].map((ch, i) => (
            <div key={i} style={{ borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{ch.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>{ch.title}</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{ch.participants} participated · Winner: {ch.winner}</div>
                </div>
              </div>
              <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: '#F59E0B15' }}>
                <Trophy size={11} color="#F59E0B" />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#F59E0B' }}>{ch.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Members Tab                                       */
/* ══════════════════════════════════════════════════ */
function MembersTab({ goTo }: { goTo: (s: string, p?: Record<string, string>) => void }) {
  const badgeIconMap: Record<string, typeof Leaf> = {
    'Veggie Connoisseur': Leaf,
    'World Traveler': Globe,
    'Comfort Queen': Heart,
    'Garlic Lover': Flame,
    'Protein Machine': Dumbbell,
    'Speed Demon': Zap,
    'Spice Explorer': Flame,
    'Meal Prep Master': ChefHat,
  }
  const badgeColorMap: Record<string, string> = {
    'Veggie Connoisseur': '#067A46',
    'World Traveler': '#3B82F6',
    'Comfort Queen': '#92400E',
    'Garlic Lover': '#D97706',
    'Protein Machine': '#DC2626',
    'Speed Demon': '#EAB308',
    'Spice Explorer': '#EF4444',
    'Meal Prep Master': '#0891B2',
  }

  return (
    <>
      {/* Invite banner */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ borderRadius: 14, background: '#E8F5E0', border: '1px solid rgba(6,122,70,0.1)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <UserPlus size={20} color="#067A46" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>Invite friends to join</div>
            <div style={{ fontSize: 12, color: '#067A46', marginTop: 1 }}>Share a link or pick from contacts</div>
          </div>
          <ChevronRight size={18} color="#067A46" />
        </div>
      </div>

      {/* Leaderboard preview */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10 }}>This Week's Top Cooks</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { name: 'Lisa K.', meals: 6, rank: 1 },
            { name: 'Sam J. (You)', meals: 5, rank: 2 },
            { name: 'Marcus T.', meals: 4, rank: 3 },
          ].map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 14,
                background: i === 0 ? '#F59E0B' : i === 1 ? '#C0C0C0' : '#CD7F32',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800,
              }}>
                {entry.rank}
              </div>
              <img
                src={avatar(members.find(m => m.name.startsWith(entry.name.split(' ')[0]))?.avatar || '1494790108377-be9c29b29330', 80)}
                alt={entry.name}
                style={{ width: 36, height: 36, borderRadius: 18, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{entry.name}</div>
                <div style={{ fontSize: 12, color: '#999' }}>{entry.meals} meals this week</div>
              </div>
              {i === 0 && <Trophy size={16} color="#F59E0B" />}
            </div>
          ))}
        </div>
      </div>

      {/* All members */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10 }}>All Members ({team.members})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {members.map((m, i) => {
            const BadgeIcon = badgeIconMap[m.badge] || Star
            const badgeColor = badgeColorMap[m.badge] || '#999'
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < members.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <img src={avatar(m.avatar, 80)} alt={m.name} style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{m.name}</span>
                    {m.isYou && <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: '#067A4615', color: '#067A46', fontWeight: 600 }}>You</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <BadgeIcon size={11} color={badgeColor} />
                    <span style={{ fontSize: 11, color: '#999' }}>{m.badge}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════════════ */
/*  Feed Card (reused from Discover)                  */
/* ══════════════════════════════════════════════════ */
function FeedCard({ post, goTo }: { post: typeof feedPosts[number]; goTo: (s: string, p?: Record<string, string>) => void }) {
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
          <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>{post.time}</div>
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
          <div style={{ fontSize: 32, fontWeight: 800, color: post.achievementColor }}>{post.achievementStat}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#242424', marginTop: 2 }}>{post.achievementTitle}</div>
        </div>
      )}

      {post.type === 'tip' && (
        <div style={{ borderRadius: 14, background: '#FFF8E1', border: '1px solid #FEF3C7', padding: '14px 16px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Star size={14} color="#F59E0B" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: 0.5 }}>Tip</span>
          </div>
          {post.recipe && <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>on {post.recipe}</div>}
        </div>
      )}

      {/* Caption */}
      <div style={{ fontSize: 14, color: '#333', lineHeight: 1.5, marginBottom: 8 }}>{post.caption}</div>

      {/* Recipe tag */}
      {post.recipe && post.type !== 'tip' && (
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
