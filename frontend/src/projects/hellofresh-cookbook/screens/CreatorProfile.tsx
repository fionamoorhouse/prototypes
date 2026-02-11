import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  ChevronLeft,
  Compass,
  CalendarDays,
  Search,
  BookOpen,
  User,
  Star,
  Instagram,
  Users,
  ExternalLink,
  BookmarkPlus,
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
  curry: '1585937421612-70a008356fbe',
}

const AVATARS = {
  michelle: '1438761681033-6461ffad8d80',
  mia: '1494790108377-be9c29b29330',
  alex: '1507003211169-0a1dd7228f2d',
  sarah: '1580489944761-15a19d654956',
  james: '1472099645785-5658abf4ff4e',
  elena: '1534528741775-53994a69daeb',
}

interface CreatorData {
  id: string
  name: string
  avatar: string
  coverPhoto: string
  type: 'hellofresh-chef' | 'influencer' | 'user'
  badge: string
  role?: string
  bio: string
  specialties: string[]
  followerCount: string
  recipeCount: number
  socialHandle?: string
  collections: { id: string; name: string; recipeCount: number; subscribers: string; images: string[] }[]
  recipes: { id: number; title: string; image: string; time: string; difficulty: string; rating: number }[]
}

const CREATORS: Record<string, CreatorData> = {
  michelle: {
    id: 'michelle',
    name: 'Michelle Doll Olson',
    avatar: AVATARS.michelle,
    coverPhoto: '1556909114-f6e7ad7d3136',
    type: 'hellofresh-chef',
    badge: 'HelloFresh Chef',
    role: 'Head Chef',
    bio: "I'm Michelle — a classically trained pastry chef passionate about making food education accessible and empowering culinary voices. After graduating from the French Culinary Institute, I built a successful cake-decorating business, taught at Sur La Table and the International Culinary Center. Today, I lead recipe development at HelloFresh.",
    specialties: ['Locally Sourced', 'Comfort Food with a Twist'],
    followerCount: '3.2k',
    recipeCount: 42,
    collections: [
      { id: 'comfort-classics', name: 'Comfort Classics', recipeCount: 32, subscribers: '4.8k', images: [FOOD.pasta, FOOD.chicken, FOOD.steak, FOOD.bowl] },
      { id: 'quick-healthy', name: 'Quick & Healthy', recipeCount: 18, subscribers: '2.1k', images: [FOOD.salmon, FOOD.salad, FOOD.veggies, FOOD.avocado] },
    ],
    recipes: [
      { id: 1, title: 'Crispy Salmon Rice Bowls', image: img(FOOD.salmon), time: '35 min', difficulty: 'Hard', rating: 4.5 },
      { id: 2, title: 'Chicken Bacon Ranch Loaded Potatoes', image: img(FOOD.chicken), time: '40 min', difficulty: 'Medium', rating: 4.8 },
      { id: 3, title: 'Creamy Lemon-Garlic Shrimp Linguine', image: img(FOOD.pasta), time: '30 min', difficulty: 'Medium', rating: 4.7 },
      { id: 4, title: 'Seared Salmon & Tomato-Dill Relish', image: img(FOOD.grilled), time: '35 min', difficulty: 'Hard', rating: 4.6 },
      { id: 5, title: 'Smoky Mustard Pecan-Crusted Salmon', image: img(FOOD.steak), time: '40 min', difficulty: 'Hard', rating: 4.9 },
      { id: 6, title: 'Butter Chicken & Homemade Garlic Naan', image: img(FOOD.curry), time: '45 min', difficulty: 'Medium', rating: 4.8 },
    ],
  },
  mia: {
    id: 'mia',
    name: 'Mia Santos',
    avatar: AVATARS.mia,
    coverPhoto: '1504674900247-0877df9cc836',
    type: 'influencer',
    badge: 'Creator',
    socialHandle: '@EasyMealsByMia',
    bio: 'Food blogger & recipe developer making weeknight cooking actually enjoyable. My recipes focus on big flavor with minimal effort — because life is too short for complicated dinners. 500k+ followers on Instagram.',
    specialties: ['Quick Meals', 'Budget Friendly', 'Family Favorites'],
    followerCount: '12.4k',
    recipeCount: 67,
    collections: [
      { id: 'weeknight-winners', name: 'Weeknight Winners', recipeCount: 24, subscribers: '1.2k', images: [FOOD.stirfry, FOOD.chicken, FOOD.pasta, FOOD.salmon] },
      { id: 'one-pot-wonders', name: 'One-Pot Wonders', recipeCount: 18, subscribers: '3.4k', images: [FOOD.curry, FOOD.ramen, FOOD.stirfry, FOOD.pasta] },
      { id: 'meal-prep-monday', name: 'Meal Prep Monday', recipeCount: 12, subscribers: '890', images: [FOOD.bowl, FOOD.salad, FOOD.grilled, FOOD.avocado] },
    ],
    recipes: [
      { id: 1, title: '15-Min Garlic Butter Noodles', image: img(FOOD.pasta), time: '15 min', difficulty: 'Easy', rating: 4.9 },
      { id: 2, title: 'Crispy Honey Soy Chicken', image: img(FOOD.chicken), time: '25 min', difficulty: 'Easy', rating: 4.7 },
      { id: 3, title: 'One-Pan Cajun Shrimp & Rice', image: img(FOOD.bowl), time: '20 min', difficulty: 'Easy', rating: 4.8 },
      { id: 4, title: 'Thai Basil Stir Fry', image: img(FOOD.stirfry), time: '18 min', difficulty: 'Easy', rating: 4.6 },
      { id: 5, title: 'Creamy Tuscan Salmon', image: img(FOOD.salmon), time: '22 min', difficulty: 'Medium', rating: 4.9 },
      { id: 6, title: 'Spicy Korean Rice Bowl', image: img(FOOD.ramen), time: '25 min', difficulty: 'Easy', rating: 4.5 },
    ],
  },
  alex: {
    id: 'alex',
    name: 'Alex T.',
    avatar: AVATARS.alex,
    coverPhoto: '',
    type: 'user',
    badge: '',
    bio: 'Home cook obsessed with high-protein meals. I save the best recipes I find online and organize them so you don\'t have to.',
    specialties: [],
    followerCount: '234',
    recipeCount: 0,
    collections: [
      { id: 'high-protein-prep', name: 'High Protein Meal Prep', recipeCount: 18, subscribers: '892', images: [FOOD.grilled, FOOD.chicken, FOOD.steak, FOOD.bowl] },
      { id: 'quick-lunches', name: 'Quick Lunches', recipeCount: 11, subscribers: '156', images: [FOOD.salad, FOOD.sandwich, FOOD.avocado, FOOD.bowl] },
      { id: 'sunday-cooking', name: 'Sunday Cooking Projects', recipeCount: 7, subscribers: '89', images: [FOOD.pasta, FOOD.pizza, FOOD.brunch, FOOD.pancakes] },
    ],
    recipes: [],
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah Williams',
    avatar: AVATARS.sarah,
    coverPhoto: '1556909114-f6e7ad7d3136',
    type: 'hellofresh-chef',
    badge: 'HelloFresh Chef',
    role: 'Recipe Developer',
    bio: 'Recipe developer at HelloFresh specializing in globally-inspired dishes that bring new flavors to your kitchen. I believe cooking should be an adventure.',
    specialties: ['Global Flavors', 'Nutritious Picks'],
    followerCount: '1.8k',
    recipeCount: 38,
    collections: [],
    recipes: [
      { id: 1, title: 'Thai Green Curry Bowl', image: img(FOOD.curry), time: '30 min', difficulty: 'Medium', rating: 4.7 },
      { id: 2, title: 'Miso Glazed Salmon', image: img(FOOD.salmon), time: '25 min', difficulty: 'Easy', rating: 4.9 },
      { id: 3, title: 'Veggie Stir Fry', image: img(FOOD.veggies), time: '20 min', difficulty: 'Easy', rating: 4.4 },
      { id: 4, title: 'Mediterranean Bowl', image: img(FOOD.salad), time: '25 min', difficulty: 'Easy', rating: 4.6 },
    ],
  },
  james: {
    id: 'james',
    name: 'James Rivera',
    avatar: AVATARS.james,
    coverPhoto: '1414235077428-338989a2e8c0',
    type: 'influencer',
    badge: 'Creator',
    socialHandle: '@JamesCooks',
    bio: 'Professional chef turned content creator. I share restaurant-quality recipes you can actually make at home. Focused on bold flavors and impressive presentations that are easier than they look.',
    specialties: ['Restaurant Quality', 'Date Night', 'Bold Flavors'],
    followerCount: '8.7k',
    recipeCount: 53,
    collections: [
      { id: 'date-night-in', name: 'Date Night In', recipeCount: 15, subscribers: '2.1k', images: [FOOD.steak, FOOD.salmon, FOOD.pasta, FOOD.pancakes] },
      { id: 'impress-guests', name: 'Impress Your Guests', recipeCount: 20, subscribers: '1.8k', images: [FOOD.grilled, FOOD.chicken, FOOD.pizza, FOOD.brunch] },
    ],
    recipes: [
      { id: 1, title: 'Spicy Miso Ramen', image: img(FOOD.ramen), time: '35 min', difficulty: 'Medium', rating: 4.8 },
      { id: 2, title: 'Pan-Seared Duck Breast', image: img(FOOD.steak), time: '45 min', difficulty: 'Hard', rating: 4.9 },
      { id: 3, title: 'Truffle Mushroom Pasta', image: img(FOOD.pasta), time: '30 min', difficulty: 'Medium', rating: 4.7 },
      { id: 4, title: 'Crispy Pork Belly Bowl', image: img(FOOD.bowl), time: '50 min', difficulty: 'Hard', rating: 4.8 },
    ],
  },
  elena: {
    id: 'elena',
    name: 'Elena Rodriguez',
    avatar: AVATARS.elena,
    coverPhoto: '1556909114-f6e7ad7d3136',
    type: 'hellofresh-chef',
    badge: 'HelloFresh Chef',
    role: 'Senior Recipe Developer',
    bio: 'Born in Mexico City, trained in Paris. I bring Latin-American soul and French technique to every HelloFresh recipe I create. Fresh ingredients, vibrant flavors, always.',
    specialties: ['Latin-Inspired', 'Fresh & Vibrant'],
    followerCount: '2.4k',
    recipeCount: 31,
    collections: [],
    recipes: [
      { id: 1, title: 'Cilantro Lime Chicken', image: img(FOOD.chicken), time: '30 min', difficulty: 'Easy', rating: 4.8 },
      { id: 2, title: 'Black Bean Tacos', image: img(FOOD.grilled), time: '20 min', difficulty: 'Easy', rating: 4.6 },
      { id: 3, title: 'Avocado Crema Bowl', image: img(FOOD.avocado), time: '25 min', difficulty: 'Easy', rating: 4.7 },
    ],
  },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CreatorProfile() {
  const { goTo, searchParams } = usePrototype()
  const creatorId = searchParams.get('id') || 'michelle'
  const creator = CREATORS[creatorId] || CREATORS['michelle']

  const [following, setFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState<'collections' | 'recipes'>('collections')

  const hasCollections = creator.collections.length > 0
  const hasRecipes = creator.recipes.length > 0

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
      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>

        {/* Hero / Header */}
        {creator.type === 'user' ? (
          /* --- User (Curator) — simpler header --- */
          <>
            {/* Status bar + back button */}
            <div style={{ height: 54 }} />
            <div style={{ padding: '0 20px', height: 44, display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => goTo('Discover')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4, display: 'flex' }}
              >
                <ChevronLeft size={24} color="#242424" />
              </button>
            </div>

            {/* Profile info */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 20px 20px', textAlign: 'center' }}>
              <img
                src={avatarImg(creator.avatar, 200)}
                alt={creator.name}
                style={{ width: 80, height: 80, borderRadius: 40, objectFit: 'cover', marginBottom: 12 }}
              />
              <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontWeight: 700, color: '#242424', margin: '0 0 4px' }}>
                {creator.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: '#666' }}>
                  <strong style={{ color: '#242424' }}>{creator.followerCount}</strong> followers
                </span>
                <span style={{ fontSize: 13, color: '#666' }}>
                  <strong style={{ color: '#242424' }}>{creator.collections.length}</strong> collections
                </span>
              </div>
              <button
                onClick={() => setFollowing(!following)}
                style={{
                  padding: '8px 28px',
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  border: following ? '1.5px solid #067A46' : 'none',
                  background: following ? '#fff' : '#067A46',
                  color: following ? '#067A46' : '#fff',
                }}
              >
                {following ? 'Following ✓' : 'Follow'}
              </button>
              {creator.bio && (
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.5, marginTop: 16, textAlign: 'center', maxWidth: 320 }}>
                  {creator.bio}
                </p>
              )}
            </div>
          </>
        ) : (
          /* --- Chef or Influencer — hero photo header --- */
          <>
            <div style={{ position: 'relative', height: 280 }}>
              <img
                src={creator.type === 'influencer'
                  ? avatarImg(creator.avatar, 800)
                  : img(creator.coverPhoto, 800, 600)}
                alt={creator.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  padding: '60px 20px 20px',
                }}
              >
                <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>
                  {creator.name}
                </h1>
                {creator.socialHandle && (
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: '0 0 4px' }}>{creator.socialHandle}</p>
                )}
              </div>

              {/* Back button */}
              <button
                onClick={() => goTo('Discover')}
                style={{
                  position: 'absolute',
                  top: 54,
                  left: 16,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  background: 'rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(4px)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronLeft size={22} color="#fff" />
              </button>
            </div>

            {/* Info section below hero */}
            <div style={{ padding: '16px 20px 0' }}>
              {/* Badge + role + follow */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {creator.badge && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 99,
                        background: creator.type === 'hellofresh-chef' ? '#067A46' : '#242424',
                        color: '#fff',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {creator.badge}
                    </span>
                  )}
                  {creator.role && (
                    <span style={{ fontSize: 13, color: '#666' }}>{creator.role}</span>
                  )}
                </div>
                <button
                  onClick={() => setFollowing(!following)}
                  style={{
                    padding: '7px 22px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    border: following ? '1.5px solid #067A46' : 'none',
                    background: following ? '#fff' : '#067A46',
                    color: following ? '#067A46' : '#fff',
                  }}
                >
                  {following ? 'Following ✓' : 'Follow'}
                </button>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: '#666' }}>
                  <strong style={{ color: '#242424' }}>{creator.followerCount}</strong> followers
                </span>
                <span style={{ fontSize: 13, color: '#666' }}>
                  <strong style={{ color: '#242424' }}>{creator.recipeCount}</strong> recipes
                </span>
                {creator.socialHandle && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#067A46', fontWeight: 500 }}>
                    <Instagram size={14} />
                    {creator.socialHandle}
                  </span>
                )}
              </div>

              {/* Specialty tags */}
              {creator.specialties.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                  {creator.specialties.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        padding: '5px 14px',
                        borderRadius: 99,
                        border: '1px solid #e0e0e0',
                        background: '#fafafa',
                        color: '#555',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Bio (for chef/influencer) */}
        {creator.type !== 'user' && (
          <div style={{ padding: '0 20px 16px' }}>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>
              {creator.bio}
            </p>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 8, background: '#f5f5f5' }} />

        {/* Tabs (for creators with both collections and recipes) */}
        {(creator.type === 'influencer' || creator.type === 'hellofresh-chef') && hasCollections && hasRecipes ? (
          <>
            <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
              <button
                onClick={() => setActiveTab('collections')}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'collections' ? '2px solid #067A46' : '2px solid transparent',
                  color: activeTab === 'collections' ? '#067A46' : '#999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Collections
              </button>
              <button
                onClick={() => setActiveTab('recipes')}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'recipes' ? '2px solid #067A46' : '2px solid transparent',
                  color: activeTab === 'recipes' ? '#067A46' : '#999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Recipes
              </button>
            </div>

            {activeTab === 'collections' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '16px 20px 24px' }}>
                {creator.collections.map((col) => (
                  <CollectionCard key={col.id} col={col} goTo={goTo} ownerId={creator.id} ownerType={creator.type} />
                ))}
              </div>
            )}

            {activeTab === 'recipes' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '16px 20px 24px' }}>
                {creator.recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </>
        ) : creator.type === 'user' ? (
          /* User: collections only */
          <>
            <div style={{ padding: '16px 20px 8px' }}>
              <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>
                Public Collections
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '8px 20px 24px' }}>
              {creator.collections.map((col) => (
                <CollectionCard key={col.id} col={col} goTo={goTo} ownerId={creator.id} ownerType={creator.type} />
              ))}
            </div>
          </>
        ) : (
          /* Chef: recipes only */
          <>
            <div style={{ padding: '16px 20px 8px' }}>
              <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>
                Recipes by {creator.name.split(' ')[0]}
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '8px 20px 24px' }}>
              {creator.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}

        {/* Demo nav links */}
        <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 10, color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 2 }}>Demo Links</span>
          <button onClick={() => goTo('Discover')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
            ← Back to Discover
          </button>
          <button onClick={() => goTo('Cookbook')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
            Cookbook (with attribution) →
          </button>
          {creatorId !== 'michelle' && (
            <button onClick={() => goTo('CreatorProfile', { id: 'michelle' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
              Chef: Michelle Doll Olson →
            </button>
          )}
          {creatorId !== 'mia' && (
            <button onClick={() => goTo('CreatorProfile', { id: 'mia' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
              Influencer: @EasyMealsByMia →
            </button>
          )}
          {creatorId !== 'alex' && (
            <button onClick={() => goTo('CreatorProfile', { id: 'alex' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, textAlign: 'left' }}>
              User: Alex T. →
            </button>
          )}
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

function CollectionCard({ col, goTo, ownerId, ownerType }: {
  col: CreatorData['collections'][0]
  goTo: (screen: string, params?: Record<string, string>) => void
  ownerId: string
  ownerType: string
}) {
  return (
    <div
      onClick={() => goTo('CollectionDetail', { id: col.id, owner: ownerId, ownerType })}
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
        <p style={{ fontSize: 13, fontWeight: 600, color: '#242424', margin: '0 0 2px', lineHeight: 1.3 }}>
          {col.name}
        </p>
        <p style={{ fontSize: 11, color: '#888', margin: '0 0 2px' }}>{col.recipeCount} recipes</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Users size={10} color="#999" />
          <span style={{ fontSize: 10, color: '#999' }}>{col.subscribers}</span>
        </div>
      </div>
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: CreatorData['recipes'][0] }) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
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
        <p style={{ fontSize: 13, fontWeight: 600, color: '#242424', lineHeight: 1.3, margin: '0 0 4px' }}>
          {recipe.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Star size={11} fill="#f5a623" color="#f5a623" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#555' }}>{recipe.rating}</span>
          </div>
          <span style={{ fontSize: 11, color: '#888' }}>{recipe.time}</span>
        </div>
      </div>
    </div>
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
