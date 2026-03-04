import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  ChevronLeft,
  Clock,
  Users,
  BarChart3,
  Share2,
  BookmarkPlus,
  Check,
  Heart,
  ChevronRight,
  Instagram,
  Music,
  BookOpen,
  ShoppingCart,
} from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const FOOD = {
  chicken: '1532550907401-a500c9a57435',
  salmon: '1467003909585-2f8a72700288',
  veggies: '1546069901-ba9599a7e63c',
  pasta: '1473093295043-cdd812d0e601',
  stirfry: '1455619452474-d2be8b1e70cd',
  steak: '1504674900247-0877df9cc836',
  bowl: '1540189549336-e6e99c3679fe',
  ramen: '1569718212165-3a8278d5f624',
  tacos: '1551504734-5ee1c4a1479b',
  curry: '1585937421612-70a008356fbe',
  shrimp: '1559058789-672da06263d8',
}

const recipeDB: Record<string, { title: string; image: string; source: string; creator: string; time: string; servings: string; difficulty: string }> = {
  '1': { title: 'Yuzu Kosho Chicken Thighs', image: img(FOOD.chicken, 800, 500), source: 'instagram', creator: '@halfbakedharvest', time: '35 min', servings: '4', difficulty: 'Medium' },
  '2': { title: 'Miso Glazed Salmon Bowl', image: img(FOOD.salmon, 800, 500), source: 'tiktok', creator: '@easymealsbymia', time: '25 min', servings: '2', difficulty: 'Easy' },
  '5': { title: 'Thai Basil Stir Fry', image: img(FOOD.stirfry, 800, 500), source: 'hellofresh', creator: 'HelloFresh', time: '25 min', servings: '4', difficulty: 'Easy' },
}

const defaultRecipe = { title: 'Thai Basil Stir Fry', image: img(FOOD.stirfry, 800, 500), source: 'hellofresh', creator: 'HelloFresh', time: '25 min', servings: '4', difficulty: 'Easy' }

const moreLikeThis = [
  { id: 101, title: 'Cashew Chicken Stir Fry', image: img(FOOD.chicken), time: '30 min' },
  { id: 102, title: 'Spicy Basil Beef', image: img(FOOD.steak), time: '25 min' },
  { id: 103, title: 'Coconut Curry Shrimp', image: img(FOOD.shrimp), time: '30 min' },
  { id: 104, title: 'Garlic Noodle Bowl', image: img(FOOD.ramen), time: '20 min' },
]

export default function RecipeDetail() {
  const { goTo, searchParams } = usePrototype()
  const recipeId = searchParams.get('id') || '5'
  const recipe = recipeDB[recipeId] || defaultRecipe
  const [savedRecs, setSavedRecs] = useState<Set<number>>(new Set())

  const saveRec = (id: number) => {
    setSavedRecs(prev => { const n = new Set(prev); n.add(id); return n })
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <button onClick={() => goTo('CookbookHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} color="#242424" />
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
            <Heart size={20} color="#242424" />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
            <Share2 size={20} color="#242424" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {/* Hero image */}
        <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />

        <div style={{ padding: '20px 20px 0' }}>
          {/* Source badge */}
          <div style={{ marginBottom: 8 }}>
            <SourceBadge source={recipe.source} creator={recipe.creator} />
          </div>

          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 24, fontWeight: 700, color: '#242424', margin: '0 0 12px', lineHeight: 1.2 }}>
            {recipe.title}
          </h1>

          {/* Meta */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Clock size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>{recipe.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Users size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>{recipe.servings} servings</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <BarChart3 size={14} color="#888" />
              <span style={{ fontSize: 13, color: '#666' }}>{recipe.difficulty}</span>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button
              onClick={() => goTo('GrocerySelect')}
              style={{
                flex: 1, height: 40, borderRadius: 20,
                border: '1.5px solid #ddd', background: '#fff',
                fontSize: 13, fontWeight: 600, color: '#242424',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <ShoppingCart size={14} color="#067A46" />
              Add to Grocery List
            </button>
          </div>

          {/* Ingredients */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Ingredients</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {[
              '1 lb chicken thighs, sliced',
              '2 cups Thai basil leaves',
              '4 cloves garlic, minced',
              '3 Thai chilis, sliced',
              '2 tbsp soy sauce',
              '1 tbsp fish sauce',
              '1 tbsp oyster sauce',
              '1 tsp sugar',
              'Jasmine rice for serving',
              '2 tbsp vegetable oil',
            ].map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: '#067A46', marginTop: 6, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#444', lineHeight: 1.4 }}>{ing}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Steps</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {[
              'Cook jasmine rice according to package directions.',
              'Heat oil in a wok or large pan over high heat.',
              'Add garlic and chilis, stir for 30 seconds until fragrant.',
              'Add chicken, cook until golden and cooked through, 5-6 minutes.',
              'Add soy sauce, fish sauce, oyster sauce, and sugar. Toss to coat.',
              'Remove from heat, toss in Thai basil until just wilted.',
              'Serve immediately over hot rice.',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 12,
                  background: '#E8F5E0', color: '#067A46',
                  fontSize: 12, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.5, margin: 0 }}>{step}</p>
              </div>
            ))}
          </div>

          {/* MORE LIKE THIS — the Grow It section */}
          <div style={{
            background: '#FBF8F3',
            margin: '0 -20px',
            padding: '24px 20px',
            borderTop: '1px solid #f0f0f0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 18, fontWeight: 700, color: '#242424', margin: 0 }}>
                More Like This
              </h3>
              <span style={{ fontSize: 13, color: '#888' }}>Save to your Cookbook</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {moreLikeThis.map(rec => {
                const isSaved = savedRecs.has(rec.id)
                return (
                  <div
                    key={rec.id}
                    style={{
                      borderRadius: 14, overflow: 'hidden',
                      background: '#fff',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                      border: '1px solid #f0f0f0',
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img src={rec.image} alt={rec.title} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
                      <button
                        onClick={() => {
                          saveRec(rec.id)
                          if (!isSaved) {
                            setTimeout(() => goTo('PostSaveRecs'), 800)
                          }
                        }}
                        style={{
                          position: 'absolute', top: 6, right: 6,
                          width: 30, height: 30, borderRadius: 15,
                          background: isSaved ? '#067A46' : 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(4px)',
                          border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isSaved ? <Check size={14} color="#fff" /> : <BookmarkPlus size={14} color="#242424" />}
                      </button>
                    </div>
                    <div style={{ padding: '8px 10px 10px' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#242424', margin: '0 0 4px', lineHeight: 1.3 }}>
                        {rec.title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} color="#999" />
                        <span style={{ fontSize: 11, color: '#999' }}>{rec.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

function SourceBadge({ source, creator }: { source: string; creator: string }) {
  const iconMap: Record<string, typeof Instagram> = { instagram: Instagram, tiktok: Music, hellofresh: BookOpen }
  const Icon = iconMap[source] || BookOpen
  const colorMap: Record<string, { bg: string; text: string }> = {
    instagram: { bg: '#f5f5f5', text: '#666' },
    tiktok: { bg: '#f5f5f5', text: '#666' },
    hellofresh: { bg: '#E8F5E0', text: '#067A46' },
  }
  const colors = colorMap[source] || colorMap.hellofresh

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 12, color: colors.text, background: colors.bg,
      borderRadius: 99, padding: '4px 10px', fontWeight: 500,
    }}>
      <Icon size={12} />
      {creator}
    </span>
  )
}
