import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  Share2,
  Clock,
  Users,
  Trophy,
  Target,
  ChevronRight,
  Heart,
  MessageCircle,
  Flame,
  Globe,
  Dumbbell,
  ChefHat,
  Leaf,
  Zap,
  Star,
  Check,
  Compass,
  UtensilsCrossed,
  Search,
  BookOpen,
  User,
} from 'lucide-react'

/* ── helpers ── */
const avatar = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`

/* ── challenge data ── */
const challengeData: Record<string, {
  title: string
  icon: string
  type: string
  gradient: string
  description: string
  rules: string[]
  duration: string
  daysLeft: number
  participants: number
  goal: number
  goalUnit: string
  reward: string
  rewardBadge: string
  leaderboard: { name: string; avatar: string; progress: number; badge: string; isYou?: boolean }[]
  recentActivity: { name: string; avatar: string; text: string; time: string }[]
}> = {
  'cuisine-explorer': {
    title: 'Try 3 New Cuisines',
    icon: '🌍',
    type: 'Community Challenge',
    gradient: 'linear-gradient(135deg, #067A46 0%, #0a9e5c 100%)',
    description: 'Expand your cooking horizons! Try recipes from 3 cuisines you\'ve never cooked before this month. From Thai to Moroccan, there\'s a whole world of flavors waiting.',
    rules: [
      'Cook at least 1 recipe from 3 different cuisines you haven\'t tried before',
      'Cuisines must be new to your HelloFresh history',
      'Post a Cooking Moment for each to count toward the challenge',
      'Challenge runs for 4 weeks',
    ],
    duration: '4 weeks',
    daysLeft: 12,
    participants: 248,
    goal: 3,
    goalUnit: 'cuisines',
    reward: 'World Traveler badge upgrade + 200 bonus points',
    rewardBadge: 'World Traveler',
    leaderboard: [
      { name: 'Marcus T.', avatar: '1507003211169-0a1dd7228f2d', progress: 3, badge: 'Protein Machine' },
      { name: 'Priya S.', avatar: '1534528741775-53994a69daeb', progress: 3, badge: 'Spice Explorer' },
      { name: 'Tom M.', avatar: '1500648767791-00dcc994a43e', progress: 2, badge: 'World Traveler' },
      { name: 'Lisa K.', avatar: '1544005313-94ddf0286df2', progress: 2, badge: 'Comfort Queen' },
      { name: 'Sam J.', avatar: '1494790108377-be9c29b29330', progress: 1, badge: 'Veggie Connoisseur', isYou: true },
      { name: 'Emma R.', avatar: '1438761681033-6461ffad8d80', progress: 1, badge: 'Garlic Lover' },
      { name: 'Alex K.', avatar: '1472099645785-5658abf4ff4e', progress: 1, badge: 'Speed Demon' },
      { name: 'Jordan L.', avatar: '1539571696357-5a69c17a67c6', progress: 0, badge: 'Meal Prep Master' },
    ],
    recentActivity: [
      { name: 'Marcus T.', avatar: '1507003211169-0a1dd7228f2d', text: 'Completed the challenge! 🎉 Tried Korean, Moroccan, and Thai', time: '2h ago' },
      { name: 'Priya S.', avatar: '1534528741775-53994a69daeb', text: 'Just cooked her first Japanese recipe — 3/3!', time: '4h ago' },
      { name: 'Tom M.', avatar: '1500648767791-00dcc994a43e', text: 'Made Moroccan Tagine — 2/3 cuisines done', time: '6h ago' },
      { name: 'Lisa K.', avatar: '1544005313-94ddf0286df2', text: 'Tried Greek Moussaka for the first time!', time: '1d ago' },
    ],
  },
  'protein-week': {
    title: 'High Protein Week',
    icon: '💪',
    type: 'Team Challenge',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
    description: 'Cook 5 high-protein meals this week! Any recipe with 30g+ protein per serving counts. Show your team what gains-friendly cooking looks like.',
    rules: [
      'Cook 5 meals with 30g+ protein per serving',
      'Must be HelloFresh recipes (not custom)',
      'Each meal counts once (no repeats)',
      'Challenge runs for 1 week',
    ],
    duration: '1 week',
    daysLeft: 5,
    participants: 18,
    goal: 5,
    goalUnit: 'meals',
    reward: 'Protein Machine badge + 100 bonus points',
    rewardBadge: 'Protein Machine',
    leaderboard: [
      { name: 'Marcus T.', avatar: '1507003211169-0a1dd7228f2d', progress: 4, badge: 'Protein Machine' },
      { name: 'Sam J.', avatar: '1494790108377-be9c29b29330', progress: 3, badge: 'Veggie Connoisseur', isYou: true },
      { name: 'Alex K.', avatar: '1472099645785-5658abf4ff4e', progress: 3, badge: 'Speed Demon' },
      { name: 'Tom M.', avatar: '1500648767791-00dcc994a43e', progress: 2, badge: 'World Traveler' },
      { name: 'Jordan L.', avatar: '1539571696357-5a69c17a67c6', progress: 2, badge: 'Meal Prep Master' },
      { name: 'Lisa K.', avatar: '1544005313-94ddf0286df2', progress: 1, badge: 'Comfort Queen' },
    ],
    recentActivity: [
      { name: 'Marcus T.', avatar: '1507003211169-0a1dd7228f2d', text: 'Cooked Grilled Chicken Power Bowl — 42g protein!', time: '1h ago' },
      { name: 'Sam J.', avatar: '1494790108377-be9c29b29330', text: 'Made Salmon Rice Bowls — 3/5 done!', time: '3h ago' },
      { name: 'Alex K.', avatar: '1472099645785-5658abf4ff4e', text: 'Steak & Chimichurri checked off the list', time: '5h ago' },
    ],
  },
}

type DetailTab = 'overview' | 'leaderboard' | 'activity'

export default function ChallengeDetail() {
  const { goTo, searchParams } = usePrototype()
  const id = searchParams.get('id') || 'cuisine-explorer'
  const challenge = challengeData[id] || challengeData['cuisine-explorer']
  const [activeTab, setActiveTab] = useState<DetailTab>('overview')
  const [joined, setJoined] = useState(true)
  const [showShareSheet, setShowShareSheet] = useState(false)

  const myEntry = challenge.leaderboard.find(e => e.isYou)
  const myProgress = myEntry?.progress || 0
  const myRank = challenge.leaderboard.findIndex(e => e.isYou) + 1

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44 }}>
        <button onClick={() => goTo('TeamHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Challenge</span>
        <button onClick={() => setShowShareSheet(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <Share2 size={20} color="#067A46" />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Hero card */}
        <div style={{ margin: '8px 20px 0' }}>
          <div
            style={{
              borderRadius: 20,
              background: challenge.gradient,
              padding: '24px 20px',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', bottom: -20, left: -20, width: 70, height: 70, borderRadius: 35, background: 'rgba(255,255,255,0.06)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.8 }}>{challenge.type}</span>
            </div>
            <div style={{ fontSize: 32 }}>{challenge.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>{challenge.title}</div>

            {/* Meta row */}
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.85 }}>
                <Clock size={14} />
                <span style={{ fontSize: 13 }}>{challenge.daysLeft}d left</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.85 }}>
                <Users size={14} />
                <span style={{ fontSize: 13 }}>{challenge.participants} joined</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.85 }}>
                <Target size={14} />
                <span style={{ fontSize: 13 }}>{challenge.goal} {challenge.goalUnit}</span>
              </div>
            </div>

            {/* Your progress */}
            <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Your progress</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{myProgress} / {challenge.goal}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.25)' }}>
                <div style={{ height: 8, borderRadius: 4, background: '#fff', width: `${(myProgress / challenge.goal) * 100}%`, transition: 'width 0.3s' }} />
              </div>
              {myRank > 0 && (
                <div style={{ fontSize: 12, marginTop: 6, opacity: 0.75 }}>Rank #{myRank} of {challenge.participants}</div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, padding: '12px 20px 0', borderBottom: '1px solid #f0f0f0' }}>
          {([
            { key: 'overview' as DetailTab, label: 'Overview' },
            { key: 'leaderboard' as DetailTab, label: 'Leaderboard' },
            { key: 'activity' as DetailTab, label: 'Activity' },
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

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div style={{ padding: '16px 20px' }}>
            {/* Description */}
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: '0 0 20px' }}>{challenge.description}</p>

            {/* Rules */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 8 }}>Rules</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {challenge.rules.map((rule, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 10, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#067A46' }}>{i + 1}</span>
                    </div>
                    <span style={{ fontSize: 14, color: '#333', lineHeight: 1.4 }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reward */}
            <div style={{ borderRadius: 14, background: '#FFF8E1', border: '1px solid #FEF3C7', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Trophy size={18} color="#F59E0B" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#F59E0B', letterSpacing: 0.3, textTransform: 'uppercase' }}>Reward</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#242424' }}>{challenge.reward}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Top 3 finishers earn a special podium variant of the badge</div>
            </div>

            {/* Quick leaderboard preview */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase' }}>Top 3</div>
                <button onClick={() => setActiveTab('leaderboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#067A46', fontWeight: 600 }}>See all</button>
              </div>
              {challenge.leaderboard.slice(0, 3).map((entry, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 13,
                    background: i === 0 ? '#F59E0B' : i === 1 ? '#C0C0C0' : '#CD7F32',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800,
                  }}>
                    {i + 1}
                  </div>
                  <img src={avatar(entry.avatar, 80)} alt={entry.name} style={{ width: 32, height: 32, borderRadius: 16, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{entry.name}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: entry.progress >= challenge.goal ? '#067A46' : '#242424' }}>
                    {entry.progress}/{challenge.goal}
                    {entry.progress >= challenge.goal && ' ✓'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div style={{ padding: '16px 20px' }}>
            {/* Podium visualization */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 24, paddingTop: 16 }}>
              {/* 2nd place */}
              <div style={{ textAlign: 'center', width: 80 }}>
                <img src={avatar(challenge.leaderboard[1].avatar, 80)} alt={challenge.leaderboard[1].name} style={{ width: 44, height: 44, borderRadius: 22, objectFit: 'cover', border: '3px solid #C0C0C0' }} />
                <div style={{ fontSize: 11, fontWeight: 600, color: '#242424', marginTop: 4 }}>{challenge.leaderboard[1].name}</div>
                <div style={{ fontSize: 10, color: '#999', marginTop: 1 }}>{challenge.leaderboard[1].progress}/{challenge.goal}</div>
                <div style={{ width: '100%', height: 60, borderRadius: '8px 8px 0 0', background: '#E0E0E0', marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#888' }}>2</span>
                </div>
              </div>
              {/* 1st place */}
              <div style={{ textAlign: 'center', width: 90 }}>
                <div style={{ fontSize: 20, marginBottom: 2 }}>👑</div>
                <img src={avatar(challenge.leaderboard[0].avatar, 80)} alt={challenge.leaderboard[0].name} style={{ width: 52, height: 52, borderRadius: 26, objectFit: 'cover', border: '3px solid #F59E0B' }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: '#242424', marginTop: 4 }}>{challenge.leaderboard[0].name}</div>
                <div style={{ fontSize: 10, color: '#999', marginTop: 1 }}>{challenge.leaderboard[0].progress}/{challenge.goal}</div>
                <div style={{ width: '100%', height: 80, borderRadius: '8px 8px 0 0', background: 'linear-gradient(180deg, #F59E0B, #D97706)', marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>1</span>
                </div>
              </div>
              {/* 3rd place */}
              <div style={{ textAlign: 'center', width: 80 }}>
                <img src={avatar(challenge.leaderboard[2].avatar, 80)} alt={challenge.leaderboard[2].name} style={{ width: 44, height: 44, borderRadius: 22, objectFit: 'cover', border: '3px solid #CD7F32' }} />
                <div style={{ fontSize: 11, fontWeight: 600, color: '#242424', marginTop: 4 }}>{challenge.leaderboard[2].name}</div>
                <div style={{ fontSize: 10, color: '#999', marginTop: 1 }}>{challenge.leaderboard[2].progress}/{challenge.goal}</div>
                <div style={{ width: '100%', height: 44, borderRadius: '8px 8px 0 0', background: '#D4A574', marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>3</span>
                </div>
              </div>
            </div>

            {/* Full ranking list (4th and below) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {challenge.leaderboard.slice(3).map((entry, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 0',
                    borderBottom: i < challenge.leaderboard.length - 4 ? '1px solid #f5f5f5' : 'none',
                    background: entry.isYou ? '#E8F5E020' : 'transparent',
                    borderRadius: entry.isYou ? 8 : 0,
                    ...(entry.isYou ? { padding: '10px 8px', margin: '0 -8px' } : {}),
                  }}
                >
                  <div style={{ width: 26, minWidth: 26, textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#999' }}>{i + 4}</div>
                  <img src={avatar(entry.avatar, 80)} alt={entry.name} style={{ width: 36, height: 36, borderRadius: 18, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{entry.name}</span>
                      {entry.isYou && <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: '#067A4615', color: '#067A46', fontWeight: 600 }}>You</span>}
                    </div>
                    <span style={{ fontSize: 12, color: '#999' }}>{entry.badge}</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ width: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: entry.progress >= challenge.goal ? '#067A46' : '#242424' }}>
                      {entry.progress}/{challenge.goal}
                    </span>
                    <div style={{ width: '100%', height: 4, borderRadius: 2, background: '#f0f0f0' }}>
                      <div style={{ height: 4, borderRadius: 2, background: entry.progress >= challenge.goal ? '#067A46' : '#F59E0B', width: `${(entry.progress / challenge.goal) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div style={{ padding: '16px 20px' }}>
            {challenge.recentActivity.map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < challenge.recentActivity.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <img src={avatar(act.avatar, 80)} alt={act.name} style={{ width: 36, height: 36, borderRadius: 18, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: '#333', lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 700 }}>{act.name}</span>{' '}{act.text}
                  </div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 3 }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Demo links */}
        <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#ddd', fontWeight: 600, letterSpacing: 0.5 }}>DEMO SCREENS</span>
          <button onClick={() => goTo('TeamHome')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Back to Team Home</button>
          <button onClick={() => goTo('ChallengeCreate')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Create Challenge</button>
          <button onClick={() => goTo('ChallengeBadge')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Challenge Badge (Celebration)</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Share sheet overlay */}
      {showShareSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
          <div onClick={() => setShowShareSheet(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '8px 20px 40px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd', margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 6px' }}>Invite friends to this challenge</h3>
            <p style={{ fontSize: 13, color: '#999', margin: '0 0 16px' }}>Share the challenge link with friends so they can join!</p>
            <button
              onClick={() => setShowShareSheet(false)}
              style={{ width: '100%', height: 48, borderRadius: 24, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Share2 size={18} /> Copy invite link
            </button>
            <button
              onClick={() => setShowShareSheet(false)}
              style={{ width: '100%', height: 44, borderRadius: 22, background: '#f5f5f5', color: '#242424', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, marginTop: 10 }}
            >
              Share to community feed
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
