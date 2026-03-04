import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  Share2,
  Flame,
  ChefHat,
  Globe,
  Leaf,
  X,
  Check,
  Instagram,
  MessageCircle,
  Image,
  Send,
  Star,
  Users,
  Trophy,
  Calendar,
  TrendingUp,
  Heart,
} from 'lucide-react'

const avatar = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`

/* ── Scorecard types ── */
const scorecards: Record<string, {
  title: string
  value: string
  subtitle: string
  description: string
  gradient: string
  Icon: typeof Flame
  detail: string
  persona: string
}> = {
  streak: {
    title: 'Cooking Streak',
    value: '22',
    subtitle: 'Week Streak',
    description: "You've cooked every week for 22 weeks straight. That's 5 months of consistency!",
    gradient: 'linear-gradient(135deg, #EF4444, #F97316)',
    Icon: Flame,
    detail: 'Longest streak: 22 weeks (current!)',
    persona: 'Veggie Connoisseur',
  },
  meals: {
    title: 'Meals Cooked',
    value: '96',
    subtitle: 'Meals Cooked',
    description: "Almost at 100! You've cooked 96 HelloFresh meals since joining.",
    gradient: 'linear-gradient(135deg, #067A46, #10B981)',
    Icon: ChefHat,
    detail: 'Favorite cuisine: Italian (24 meals)',
    persona: 'Veggie Connoisseur',
  },
  carbon: {
    title: 'Carbon Impact',
    value: '45kg',
    subtitle: 'CO₂ Saved',
    description: "By cooking at home with pre-portioned ingredients, you've saved 45kg of CO₂ compared to restaurant takeout.",
    gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    Icon: Globe,
    detail: "That's like planting 2 trees!",
    persona: 'Veggie Connoisseur',
  },
}

/* ── Year-in-Review data ── */
const yearReviewData = {
  year: '2025',
  totalMeals: 96,
  totalRecipes: 72,
  cuisinesExplored: 14,
  favoriteRecipe: 'Thai Basil Chicken',
  favoriteCuisine: 'Italian',
  longestStreak: 22,
  topBadge: 'Veggie Connoisseur',
  carbonSaved: '45kg',
  cookingPhotos: 28,
  monthlyBreakdown: [
    { month: 'Jan', meals: 6 },
    { month: 'Feb', meals: 8 },
    { month: 'Mar', meals: 10 },
    { month: 'Apr', meals: 7 },
    { month: 'May', meals: 9 },
    { month: 'Jun', meals: 8 },
    { month: 'Jul', meals: 6 },
    { month: 'Aug', meals: 10 },
    { month: 'Sep', meals: 9 },
    { month: 'Oct', meals: 8 },
    { month: 'Nov', meals: 7 },
    { month: 'Dec', meals: 8 },
  ],
  topCuisines: [
    { name: 'Italian', count: 24, pct: 25 },
    { name: 'Mexican', count: 16, pct: 17 },
    { name: 'Thai', count: 12, pct: 13 },
    { name: 'Japanese', count: 10, pct: 10 },
    { name: 'Indian', count: 8, pct: 8 },
  ],
}

/* ── Friend Comparison data ── */
const friendComparison = {
  you: { name: 'Sam J.', avatar: '1494790108377-be9c29b29330', meals: 96, streak: 22, cuisines: 14, carbon: 45, badge: 'Veggie Connoisseur' },
  friends: [
    { name: 'Lisa K.', avatar: '1544005313-94ddf0286df2', meals: 112, streak: 18, cuisines: 11, carbon: 52, badge: 'Comfort Queen' },
    { name: 'Tom M.', avatar: '1500648767791-00dcc994a43e', meals: 78, streak: 14, cuisines: 18, carbon: 38, badge: 'World Traveler' },
    { name: 'Marcus T.', avatar: '1507003211169-0a1dd7228f2d', meals: 104, streak: 20, cuisines: 9, carbon: 48, badge: 'Protein Machine' },
    { name: 'Emma R.', avatar: '1438761681033-6461ffad8d80', meals: 64, streak: 10, cuisines: 8, carbon: 30, badge: 'Garlic Lover' },
  ],
  highlights: [
    { text: "You've explored more cuisines than 80% of your friends", emoji: '🌍' },
    { text: 'Lisa is 4 meals ahead — cook 4 more to catch up!', emoji: '🔥' },
    { text: "You're #2 in your friend group for cooking streak", emoji: '🏆' },
  ],
}

export default function ScorecardDetail() {
  const { goTo, searchParams } = usePrototype()
  const type = searchParams.get('type') || 'streak'
  const [showShareSheet, setShowShareSheet] = useState(false)
  const [shared, setShared] = useState(false)

  const handleShare = (channel: string) => {
    setShared(true)
    setTimeout(() => {
      setShowShareSheet(false)
      setShared(false)
    }, 1500)
  }

  /* ── Year-in-Review variant ── */
  if (type === 'year-review') {
    const yr = yearReviewData
    const maxMeals = Math.max(...yr.monthlyBreakdown.map(m => m.meals))
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0 }} />
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44 }}>
          <button onClick={() => goTo('Profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <ChevronLeft size={22} color="#242424" />
          </button>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Year in Review</span>
          <button onClick={() => setShowShareSheet(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <Share2 size={20} color="#067A46" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
          {/* Hero card */}
          <div style={{ margin: '16px 20px 0', borderRadius: 24, background: 'linear-gradient(135deg, #7C3AED, #A855F7)', padding: '28px 24px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.06)' }} />
            <Calendar size={28} style={{ marginBottom: 12, opacity: 0.9 }} />
            <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1 }}>{yr.year}</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, opacity: 0.9 }}>Your Cooking Year</div>
            <div style={{ fontSize: 14, marginTop: 12, opacity: 0.75, lineHeight: 1.5 }}>
              {yr.totalMeals} meals · {yr.totalRecipes} recipes · {yr.cuisinesExplored} cuisines
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <img src={avatar('1494790108377-be9c29b29330', 56)} alt="You" style={{ width: 28, height: 28, borderRadius: 14, objectFit: 'cover', opacity: 0.9 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Sam Johnson</div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>{yr.topBadge}</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5 }}>hellofresh.com/sam-j</div>
            </div>
          </div>

          {/* Key stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: '20px 20px 0' }}>
            {[
              { value: yr.totalMeals.toString(), label: 'Meals Cooked', Icon: ChefHat, color: '#067A46' },
              { value: `${yr.longestStreak} wks`, label: 'Best Streak', Icon: Flame, color: '#EF4444' },
              { value: yr.cuisinesExplored.toString(), label: 'Cuisines Explored', Icon: Globe, color: '#3B82F6' },
              { value: yr.carbonSaved, label: 'CO₂ Saved', Icon: Leaf, color: '#10B981' },
            ].map((stat, i) => (
              <div key={i} style={{ borderRadius: 16, background: `${stat.color}08`, border: `1px solid ${stat.color}15`, padding: '16px', textAlign: 'center' }}>
                <stat.Icon size={20} color={stat.color} style={{ marginBottom: 6 }} />
                <div style={{ fontSize: 26, fontWeight: 800, color: '#242424' }}>{stat.value}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#999', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.3 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Monthly cooking chart */}
          <div style={{ padding: '24px 20px 0' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>Meals by Month</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
              {yr.monthlyBreakdown.map((m, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#7C3AED' }}>{m.meals}</span>
                  <div style={{ width: '100%', borderRadius: 4, background: 'linear-gradient(to top, #7C3AED, #A855F7)', height: `${(m.meals / maxMeals) * 70}px`, minHeight: 8 }} />
                  <span style={{ fontSize: 9, color: '#999', fontWeight: 500 }}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top cuisines */}
          <div style={{ padding: '24px 20px 0' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Top Cuisines</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {yr.topCuisines.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: i === 0 ? '#F59E0B' : i === 1 ? '#C0C0C0' : '#CD7F32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff' }}>
                    {i < 3 ? i + 1 : ''}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{c.name}</span>
                      <span style={{ fontSize: 13, color: '#999' }}>{c.count} meals</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: '#f0f0f0' }}>
                      <div style={{ height: 6, borderRadius: 3, background: 'linear-gradient(90deg, #7C3AED, #A855F7)', width: `${c.pct * 4}%`, maxWidth: '100%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div style={{ padding: '24px 20px 0' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Highlights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { emoji: '⭐', text: `Favorite recipe: ${yr.favoriteRecipe} (cooked 8 times!)` },
                { emoji: '📸', text: `${yr.cookingPhotos} cooking moment photos saved` },
                { emoji: '🌍', text: `Explored ${yr.cuisinesExplored} different cuisines` },
                { emoji: '🏅', text: `Earned "${yr.topBadge}" as your primary persona` },
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: '#f9f9f9' }}>
                  <span style={{ fontSize: 18 }}>{h.emoji}</span>
                  <span style={{ fontSize: 13, color: '#333', lineHeight: 1.4 }}>{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Share CTA */}
          <div style={{ padding: '24px 20px 0' }}>
            <button
              onClick={() => setShowShareSheet(true)}
              style={{ width: '100%', height: 52, borderRadius: 26, background: 'linear-gradient(135deg, #7C3AED, #A855F7)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Share2 size={18} /> Share your Year in Review
            </button>
          </div>

          {/* Other scorecards */}
          <div style={{ padding: '28px 20px 0' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>More Stats</h3>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
              {Object.entries(scorecards).map(([key, sc]) => (
                <div key={key} onClick={() => goTo('ScorecardDetail', { type: key })} style={{ flexShrink: 0, width: 120, borderRadius: 14, background: sc.gradient, padding: '14px', cursor: 'pointer', color: '#fff' }}>
                  <sc.Icon size={18} style={{ marginBottom: 6 }} />
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{sc.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>{sc.subtitle}</div>
                </div>
              ))}
              <div onClick={() => goTo('ScorecardDetail', { type: 'friends' })} style={{ flexShrink: 0, width: 120, borderRadius: 14, background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', padding: '14px', cursor: 'pointer', color: '#fff' }}>
                <Users size={18} style={{ marginBottom: 6 }} />
                <div style={{ fontSize: 22, fontWeight: 800 }}>vs</div>
                <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>Friend Compare</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
          </div>
          <div style={{ height: 20 }} />
        </div>

        {/* Share sheet */}
        {showShareSheet && <ShareSheet onClose={() => setShowShareSheet(false)} onShare={handleShare} shared={shared} title="Share your Year in Review" />}
      </div>
    )
  }

  /* ── Friend Comparison variant ── */
  if (type === 'friends') {
    const fc = friendComparison
    type CompStat = 'meals' | 'streak' | 'cuisines' | 'carbon'
    const [compStat, setCompStat] = useState<CompStat>('meals')
    const allPeople = [fc.you, ...fc.friends].sort((a, b) => b[compStat] - a[compStat])
    const maxVal = Math.max(...allPeople.map(p => p[compStat]))

    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0 }} />
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44 }}>
          <button onClick={() => goTo('Profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <ChevronLeft size={22} color="#242424" />
          </button>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Friend Comparison</span>
          <button onClick={() => setShowShareSheet(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <Share2 size={20} color="#067A46" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
          {/* Hero card */}
          <div style={{ margin: '16px 20px 0', borderRadius: 24, background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', padding: '24px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.08)' }} />
            <Users size={28} style={{ marginBottom: 10, opacity: 0.9 }} />
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>How do you stack up?</div>
            <div style={{ fontSize: 14, marginTop: 6, opacity: 0.85, lineHeight: 1.4 }}>
              Compare your cooking stats with {fc.friends.length} friends
            </div>
          </div>

          {/* Stat filter pills */}
          <div style={{ display: 'flex', gap: 6, padding: '16px 20px 0', overflowX: 'auto' }} className="no-scrollbar">
            {([
              { key: 'meals' as CompStat, label: 'Meals', Icon: ChefHat },
              { key: 'streak' as CompStat, label: 'Streak', Icon: Flame },
              { key: 'cuisines' as CompStat, label: 'Cuisines', Icon: Globe },
              { key: 'carbon' as CompStat, label: 'CO₂ Saved', Icon: Leaf },
            ]).map(s => (
              <button
                key={s.key}
                onClick={() => setCompStat(s.key)}
                style={{
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
                  padding: '7px 14px', borderRadius: 20,
                  background: compStat === s.key ? '#242424' : '#f5f5f5',
                  color: compStat === s.key ? '#fff' : '#666',
                  border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                }}
              >
                <s.Icon size={14} /> {s.label}
              </button>
            ))}
          </div>

          {/* Ranked list */}
          <div style={{ padding: '16px 20px 0' }}>
            {allPeople.map((person, i) => {
              const isYou = person.name === fc.you.name
              const val = person[compStat]
              const unit = compStat === 'carbon' ? 'kg' : compStat === 'streak' ? ' wks' : ''
              return (
                <div key={person.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < allPeople.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 14,
                    background: i === 0 ? '#F59E0B' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#e8e8e8',
                    color: i < 3 ? '#fff' : '#999',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800,
                  }}>
                    {i + 1}
                  </div>
                  <img src={avatar(person.avatar, 80)} alt={person.name} style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover', border: isYou ? '2px solid #067A46' : 'none' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: isYou ? 700 : 600, color: '#242424' }}>{person.name}</span>
                      {isYou && <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: '#067A4615', color: '#067A46', fontWeight: 600 }}>You</span>}
                    </div>
                    <div style={{ marginTop: 4, height: 6, borderRadius: 3, background: '#f0f0f0', width: '100%' }}>
                      <div style={{ height: 6, borderRadius: 3, background: isYou ? '#067A46' : '#ddd', width: `${(val / maxVal) * 100}%` }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: isYou ? '#067A46' : '#242424', minWidth: 48, textAlign: 'right' }}>{val}{unit}</span>
                </div>
              )
            })}
          </div>

          {/* Insights */}
          <div style={{ padding: '24px 20px 0' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {fc.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, background: '#FEF3C720', border: '1px solid #FDE68A' }}>
                  <span style={{ fontSize: 22 }}>{h.emoji}</span>
                  <span style={{ fontSize: 13, color: '#333', lineHeight: 1.4 }}>{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Share CTA */}
          <div style={{ padding: '24px 20px 0' }}>
            <button
              onClick={() => setShowShareSheet(true)}
              style={{ width: '100%', height: 52, borderRadius: 26, background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Share2 size={18} /> Challenge a friend
            </button>
          </div>

          {/* Other scorecards */}
          <div style={{ padding: '28px 20px 0' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>More Stats</h3>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
              {Object.entries(scorecards).map(([key, sc]) => (
                <div key={key} onClick={() => goTo('ScorecardDetail', { type: key })} style={{ flexShrink: 0, width: 120, borderRadius: 14, background: sc.gradient, padding: '14px', cursor: 'pointer', color: '#fff' }}>
                  <sc.Icon size={18} style={{ marginBottom: 6 }} />
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{sc.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>{sc.subtitle}</div>
                </div>
              ))}
              <div onClick={() => goTo('ScorecardDetail', { type: 'year-review' })} style={{ flexShrink: 0, width: 120, borderRadius: 14, background: 'linear-gradient(135deg, #7C3AED, #A855F7)', padding: '14px', cursor: 'pointer', color: '#fff' }}>
                <Calendar size={18} style={{ marginBottom: 6 }} />
                <div style={{ fontSize: 22, fontWeight: 800 }}>2025</div>
                <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>Year in Review</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
          </div>
          <div style={{ height: 20 }} />
        </div>

        {/* Share sheet */}
        {showShareSheet && <ShareSheet onClose={() => setShowShareSheet(false)} onShare={handleShare} shared={shared} title="Share with friends" />}
      </div>
    )
  }

  /* ── Standard scorecard variants (streak, meals, carbon) ── */
  const card = scorecards[type] || scorecards.streak

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44 }}>
        <button onClick={() => goTo('Profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>{card.title}</span>
        <button onClick={() => setShowShareSheet(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <Share2 size={20} color="#067A46" />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* The visual scorecard */}
        <div
          style={{
            margin: '24px 20px 0',
            width: 'calc(100% - 40px)',
            maxWidth: 340,
            borderRadius: 24,
            background: card.gradient,
            padding: '32px 28px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative elements */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.06)' }} />

          {/* Icon */}
          <card.Icon size={36} style={{ marginBottom: 20, opacity: 0.9 }} />

          {/* Main stat */}
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1 }}>{card.value}</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, opacity: 0.9 }}>{card.subtitle}</div>

          {/* Detail */}
          <div style={{ fontSize: 14, marginTop: 16, opacity: 0.75, lineHeight: 1.4 }}>{card.detail}</div>

          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={14} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Sam Johnson</div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>{card.persona}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5 }}>hellofresh.com/sam-j</div>
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: '24px 28px', textAlign: 'center', maxWidth: 340 }}>
          <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, margin: 0 }}>{card.description}</p>
        </div>

        {/* Share CTA */}
        <button
          onClick={() => setShowShareSheet(true)}
          style={{
            margin: '0 28px',
            width: 'calc(100% - 56px)',
            maxWidth: 340,
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
          Share this achievement
        </button>

        {/* Other scorecards */}
        <div style={{ padding: '32px 20px 0', width: '100%' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>More Stats</h3>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {Object.entries(scorecards).filter(([k]) => k !== type).map(([key, sc]) => (
              <div
                key={key}
                onClick={() => goTo('ScorecardDetail', { type: key })}
                style={{ flexShrink: 0, width: 120, borderRadius: 14, background: sc.gradient, padding: '14px', cursor: 'pointer', color: '#fff' }}
              >
                <sc.Icon size={18} style={{ marginBottom: 6 }} />
                <div style={{ fontSize: 22, fontWeight: 800 }}>{sc.value}</div>
                <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>{sc.subtitle}</div>
              </div>
            ))}
            <div onClick={() => goTo('ScorecardDetail', { type: 'year-review' })} style={{ flexShrink: 0, width: 120, borderRadius: 14, background: 'linear-gradient(135deg, #7C3AED, #A855F7)', padding: '14px', cursor: 'pointer', color: '#fff' }}>
              <Calendar size={18} style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 22, fontWeight: 800 }}>2025</div>
              <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>Year in Review</div>
            </div>
            <div onClick={() => goTo('ScorecardDetail', { type: 'friends' })} style={{ flexShrink: 0, width: 120, borderRadius: 14, background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', padding: '14px', cursor: 'pointer', color: '#fff' }}>
              <Users size={18} style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 22, fontWeight: 800 }}>vs</div>
              <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>Friend Compare</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* ── Share sheet overlay ── */}
      {showShareSheet && <ShareSheet onClose={() => setShowShareSheet(false)} onShare={handleShare} shared={shared} title="Share your achievement" />}
    </div>
  )
}

/* ── Reusable Share Sheet component ── */
function ShareSheet({ onClose, onShare, shared, title }: { onClose: () => void; onShare: (ch: string) => void; shared: boolean; title: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '8px 20px 40px' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd', margin: '0 auto 16px' }} />
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: '0 0 16px' }}>{title}</h3>

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
              <button key={i} onClick={() => onShare(ch.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
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
            onClick={() => onShare('feed')}
            style={{ marginTop: 16, width: '100%', height: 48, borderRadius: 24, background: '#f5f5f5', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#242424', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            Post to community feed
          </button>
        )}
      </div>
    </div>
  )
}
