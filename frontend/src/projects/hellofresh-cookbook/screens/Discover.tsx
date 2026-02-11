import { usePrototype } from '@/hooks/usePrototype'
import {
  Search,
  Compass,
  CalendarDays,
  BookOpen,
  User,
  ChevronRight,
  Instagram,
  Music,
  BookmarkPlus,
  Users,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const thumb = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=80`

const avatarImg = (id: string, size = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FOOD = {
  chicken: '1532550907401-a500c9a57435',
  salmon: '1467003909585-2f8a72700288',
  veggies: '1546069901-ba9599a7e63c',
  pasta: '1473093295043-cdd812d0e601',
  stirfry: '1455619452474-d2be8b1e70cd',
  pizza: '1565299624946-b28f40a0ae38',
  salad: '1512621776951-a57141f2eefd',
  pancakes: '1567620905732-2d1ec7ab7445',
  steak: '1504674900247-0877df9cc836',
  sandwich: '1476224203421-9ac39bcb3327',
  bowl: '1540189549336-e6e99c3679fe',
  grilled: '1499028344343-cd173ffc68a9',
  avocado: '1482049016688-2d3e1b311543',
  brunch: '1490645935967-10de6ba17061',
  ramen: '1569718212165-3a8278d5f624',
  tacos: '1551504734-5ee1c4a1479b',
  curry: '1585937421612-70a008356fbe',
  sushi: '1579584425555-c3ce17fd4351',
}

const AVATARS = {
  michelle: '1438761681033-6461ffad8d80',
  mia: '1494790108377-be9c29b29330',
  alex: '1507003211169-0a1dd7228f2d',
  sarah: '1580489944761-15a19d654956',
  james: '1472099645785-5658abf4ff4e',
  elena: '1534528741775-53994a69daeb',
}

const savedByYou = [
  { id: 1, title: 'Yuzu Kosho Chicken', source: 'instagram' as const, image: img(FOOD.chicken), creator: 'Michelle Doll Olson', creatorAvatar: AVATARS.michelle, creatorType: 'hellofresh-chef' as const, creatorId: 'michelle' },
  { id: 2, title: 'Miso Glazed Salmon', source: 'instagram' as const, image: img(FOOD.salmon), creator: 'Sarah Williams', creatorAvatar: AVATARS.sarah, creatorType: 'hellofresh-chef' as const, creatorId: 'sarah' },
  { id: 3, title: 'Crispy Air Fryer Tofu', source: 'tiktok' as const, image: img(FOOD.veggies), creator: '@EasyMealsByMia', creatorAvatar: AVATARS.mia, creatorType: 'influencer' as const, creatorId: 'mia' },
]

const featuredCollections = [
  {
    id: 'weeknight-winners',
    name: 'Weeknight Winners',
    description: 'Quick, easy meals for busy evenings',
    ownerName: '@EasyMealsByMia',
    ownerId: 'mia',
    ownerType: 'influencer' as const,
    ownerAvatar: AVATARS.mia,
    recipeCount: 24,
    subscribers: '1.2k',
    coverImage: FOOD.stirfry,
  },
  {
    id: 'comfort-classics',
    name: 'Comfort Classics',
    description: 'Warm, hearty dishes the whole family loves',
    ownerName: 'HelloFresh',
    ownerId: 'hellofresh',
    ownerType: 'hellofresh-chef' as const,
    ownerAvatar: AVATARS.michelle,
    recipeCount: 32,
    subscribers: '4.8k',
    coverImage: FOOD.pasta,
  },
  {
    id: 'high-protein-prep',
    name: 'High Protein Meal Prep',
    description: 'Fuel your week with protein-packed meals',
    ownerName: 'Alex T.',
    ownerId: 'alex',
    ownerType: 'user' as const,
    ownerAvatar: AVATARS.alex,
    recipeCount: 18,
    subscribers: '892',
    coverImage: FOOD.grilled,
  },
]

const topCreators = [
  { id: 'michelle', name: 'Michelle D.O.', avatar: AVATARS.michelle, type: 'hellofresh-chef' as const },
  { id: 'mia', name: '@EasyMealsByMia', avatar: AVATARS.mia, type: 'influencer' as const },
  { id: 'sarah', name: 'Sarah W.', avatar: AVATARS.sarah, type: 'hellofresh-chef' as const },
  { id: 'james', name: '@JamesCooks', avatar: AVATARS.james, type: 'influencer' as const },
  { id: 'elena', name: 'Elena R.', avatar: AVATARS.elena, type: 'hellofresh-chef' as const },
]

const trendingCollections = [
  {
    id: 'high-protein-prep',
    name: 'High Protein Meal Prep',
    ownerName: 'Alex T.',
    ownerId: 'alex',
    ownerType: 'user' as const,
    ownerAvatar: AVATARS.alex,
    subscribers: '892',
    images: [FOOD.grilled, FOOD.chicken, FOOD.steak, FOOD.bowl],
  },
  {
    id: 'date-night-in',
    name: 'Date Night In',
    ownerName: '@JamesCooks',
    ownerId: 'james',
    ownerType: 'influencer' as const,
    ownerAvatar: AVATARS.james,
    subscribers: '2.1k',
    images: [FOOD.steak, FOOD.salmon, FOOD.pasta, FOOD.pancakes],
  },
  {
    id: 'summer-salads',
    name: 'Fresh Summer Salads',
    ownerName: 'Elena R.',
    ownerId: 'elena',
    ownerType: 'hellofresh-chef' as const,
    ownerAvatar: AVATARS.elena,
    subscribers: '1.5k',
    images: [FOOD.salad, FOOD.avocado, FOOD.veggies, FOOD.bowl],
  },
  {
    id: 'one-pot-wonders',
    name: 'One-Pot Wonders',
    ownerName: '@EasyMealsByMia',
    ownerId: 'mia',
    ownerType: 'influencer' as const,
    ownerAvatar: AVATARS.mia,
    subscribers: '3.4k',
    images: [FOOD.curry, FOOD.ramen, FOOD.stirfry, FOOD.pasta],
  },
]

const mostRecent = [
  { id: 1, title: 'Spicy Miso Ramen', creator: '@JamesCooks', creatorId: 'james', creatorAvatar: AVATARS.james, time: '35 min', image: img(FOOD.ramen) },
  { id: 2, title: 'Crispy Salmon Rice Bowls', creator: 'Michelle Doll Olson', creatorId: 'michelle', creatorAvatar: AVATARS.michelle, time: '35 min', image: img(FOOD.salmon) },
  { id: 3, title: 'Chicken Bacon Ranch Loaded Potatoes', creator: 'Sarah Williams', creatorId: 'sarah', creatorAvatar: AVATARS.sarah, time: '40 min', image: img(FOOD.chicken) },
  { id: 4, title: 'Thai Green Curry', creator: '@EasyMealsByMia', creatorId: 'mia', creatorAvatar: AVATARS.mia, time: '30 min', image: img(FOOD.curry) },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Discover() {
  const { goTo } = usePrototype()

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
        background: '#FBF8F3',
        overflow: 'hidden',
      }}
    >
      {/* ===== Status bar safe area ===== */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* ===== Header ===== */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          height: 44,
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 24,
            fontWeight: 700,
            color: '#242424',
          }}
        >
          Discover
        </span>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            margin: -4,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search size={22} color="#242424" />
        </button>
      </div>

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>

        {/* --- Saved by you --- */}
        <div style={{ paddingTop: 20, paddingBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 14 }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 18,
                fontWeight: 700,
                color: '#242424',
                margin: 0,
              }}
            >
              Saved by you
            </h2>
            <button
              onClick={() => goTo('AllRecipes')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: '#067A46',
                padding: 0,
              }}
            >
              View all
            </button>
          </div>

          <div
            className="no-scrollbar"
            style={{ display: 'flex', gap: 12, padding: '0 20px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: 4 }}
          >
            {savedByYou.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  flexShrink: 0,
                  width: 170,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #f0f0f0',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 112, objectFit: 'cover', display: 'block' }} />
                  <button
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(4px)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    <BookmarkPlus size={14} color="#242424" />
                  </button>
                </div>
                <div style={{ padding: '10px 12px 12px' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3, margin: 0 }}>
                    {recipe.title}
                  </p>
                  <button
                    onClick={() => goTo('CreatorProfile', { id: recipe.creatorId })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      marginTop: 6,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <img
                      src={avatarImg(recipe.creatorAvatar, 40)}
                      alt=""
                      style={{ width: 16, height: 16, borderRadius: 8, objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: 11, color: '#666' }}>{recipe.creator}</span>
                  </button>
                  <div style={{ marginTop: 4 }}>
                    <SourceBadge source={recipe.source} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Featured Collections --- */}
        <div style={{ paddingTop: 16, paddingBottom: 8 }}>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#242424',
              padding: '0 20px',
              marginBottom: 14,
              margin: '0 0 14px',
            }}
          >
            Featured Collections
          </h2>

          <div
            className="no-scrollbar"
            style={{ display: 'flex', gap: 14, padding: '0 20px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: 4 }}
          >
            {featuredCollections.map((col) => (
              <div
                key={col.id}
                onClick={() => goTo('CollectionDetail', { id: col.id, owner: col.ownerId, ownerType: col.ownerType })}
                style={{
                  flexShrink: 0,
                  width: 280,
                  height: 180,
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                }}
              >
                <img
                  src={img(col.coverImage, 600, 400)}
                  alt={col.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
                    padding: '40px 16px 16px',
                  }}
                >
                  <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.2 }}>
                    {col.name}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: '0 0 8px' }}>
                    {col.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <img
                      src={avatarImg(col.ownerAvatar, 40)}
                      alt=""
                      style={{ width: 20, height: 20, borderRadius: 10, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.4)' }}
                    />
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                      {col.ownerName}
                    </span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                      · {col.recipeCount} recipes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Top Creators --- */}
        <div style={{ paddingTop: 20, paddingBottom: 8 }}>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#242424',
              padding: '0 20px',
              margin: '0 0 14px',
            }}
          >
            Top Creators
          </h2>

          <div
            className="no-scrollbar"
            style={{ display: 'flex', gap: 16, padding: '0 20px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: 4 }}
          >
            {topCreators.map((creator) => (
              <button
                key={creator.id}
                onClick={() => goTo('CreatorProfile', { id: creator.id })}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  width: 72,
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={avatarImg(creator.avatar, 150)}
                    alt={creator.name}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      objectFit: 'cover',
                      border: creator.type === 'hellofresh-chef'
                        ? '2.5px solid #067A46'
                        : '2.5px solid #e0e0e0',
                    }}
                  />
                  {creator.type === 'hellofresh-chef' && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        background: '#067A46',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #FBF8F3',
                      }}
                    >
                      <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>HF</span>
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: '#555',
                    fontWeight: 500,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    maxWidth: 72,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {creator.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- Most Recent --- */}
        <div style={{ paddingTop: 16, paddingBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 14 }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 18,
                fontWeight: 700,
                color: '#242424',
                margin: 0,
              }}
            >
              Most Recent
            </h2>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: '#067A46',
                padding: 0,
              }}
            >
              View all
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 20px' }}>
            {mostRecent.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                }}
              >
                <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '10px 12px 12px' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3, margin: '0 0 4px' }}>
                    {recipe.title}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); goTo('CreatorProfile', { id: recipe.creatorId }) }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <img
                      src={avatarImg(recipe.creatorAvatar, 40)}
                      alt=""
                      style={{ width: 16, height: 16, borderRadius: 8, objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: 11, color: '#666' }}>{recipe.creator}</span>
                  </button>
                  <span style={{ fontSize: 11, color: '#999', marginTop: 4, display: 'block' }}>{recipe.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Trending Collections --- */}
        <div style={{ paddingTop: 20, paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 14 }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 18,
                fontWeight: 700,
                color: '#242424',
                margin: 0,
              }}
            >
              Trending Collections
            </h2>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: '#067A46',
                padding: 0,
              }}
            >
              See all
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 20px' }}>
            {trendingCollections.map((col) => (
              <div
                key={col.id}
                onClick={() => goTo('CollectionDetail', { id: col.id, owner: col.ownerId, ownerType: col.ownerType })}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  {col.images.map((id, i) => (
                    <img key={i} src={thumb(id)} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                  ))}
                </div>
                <div style={{ padding: '10px 12px 12px' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#242424', margin: '0 0 4px', lineHeight: 1.3 }}>
                    {col.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <img
                      src={avatarImg(col.ownerAvatar, 40)}
                      alt=""
                      style={{ width: 16, height: 16, borderRadius: 8, objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: 11, color: '#666' }}>{col.ownerName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 4 }}>
                    <Users size={10} color="#999" />
                    <span style={{ fontSize: 10, color: '#999' }}>{col.subscribers} subscribers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Demo nav links --- */}
        <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 10, color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 2 }}>Demo Links</span>
          <button onClick={() => goTo('Cookbook')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
            Cookbook (with attribution) →
          </button>
          <button onClick={() => goTo('CreatorProfile', { id: 'michelle' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
            Chef Profile: Michelle Doll Olson →
          </button>
          <button onClick={() => goTo('CreatorProfile', { id: 'mia' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
            Influencer Profile: @EasyMealsByMia →
          </button>
          <button onClick={() => goTo('CreatorProfile', { id: 'alex' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
            User Profile: Alex T. →
          </button>
        </div>
      </div>

      {/* ===== Tab bar ===== */}
      <TabBar goTo={goTo} active="Discover" />

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SourceBadge({ source }: { source: 'instagram' | 'tiktok' }) {
  const Icon = source === 'instagram' ? Instagram : Music
  const label = source === 'instagram' ? 'Instagram' : 'TikTok'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#666', background: '#f5f5f5', borderRadius: 99, padding: '2px 7px' }}>
      <Icon size={10} />
      {label}
    </span>
  )
}

function TabBar({ goTo, active }: { goTo: (screen: string, params?: Record<string, string>) => void; active: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTop: '1px solid #f0f0f0',
        background: '#fff',
      }}
    >
      {[
        { Icon: Compass, label: 'Discover', screen: 'Discover' },
        { Icon: CalendarDays, label: 'Menu', screen: '' },
        { Icon: Search, label: 'Search', screen: '' },
        { Icon: BookOpen, label: 'Cookbook', screen: 'Cookbook' },
        { Icon: User, label: 'Profile', screen: '' },
      ].map((tab) => {
        const isActive = tab.label === active
        return (
          <button
            key={tab.label}
            onClick={() => tab.screen && goTo(tab.screen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              background: 'none',
              border: 'none',
              cursor: tab.screen ? 'pointer' : 'default',
              color: isActive ? '#067A46' : '#aaa',
              padding: '4px 12px',
            }}
          >
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
