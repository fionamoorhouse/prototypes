import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  Search,
  ChevronLeft,
  MoreHorizontal,
  SlidersHorizontal,
  Star,
  ArrowDownUp,
  Home,
  CalendarDays,
  BookOpen,
  User,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Image helper                                                       */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

/* ------------------------------------------------------------------ */
/*  Data — all saved recipes across the cookbook                        */
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
}

interface Recipe {
  id: number
  title: string
  author: string
  rating: number
  reviews: string
  time: string
  image: string
}

const allRecipes: Recipe[] = [
  { id: 1, title: 'Yuzu Kosho Chicken', author: 'Sarah Chen', rating: 4.5, reviews: '312', time: '25 min', image: img(FOOD.chicken) },
  { id: 2, title: 'Miso Glazed Salmon', author: 'Samin Nosrat', rating: 5, reviews: '1.8k', time: '18 min', image: img(FOOD.salmon) },
  { id: 3, title: 'Crispy Air Fryer Tofu', author: 'Sarah Chen', rating: 4.5, reviews: '312', time: '25 min', image: img(FOOD.veggies) },
  { id: 4, title: 'One-Pan Lemon Pasta', author: 'Melissa Clark', rating: 4.5, reviews: '1.2k', time: '20 min', image: img(FOOD.pasta) },
  { id: 5, title: 'Thai Basil Stir Fry', author: 'Andy Baraghani', rating: 5, reviews: '934', time: '15 min', image: img(FOOD.stirfry) },
  { id: 6, title: 'Margherita Pizza', author: 'Claire Saffitz', rating: 5, reviews: '2.3k', time: '45 min', image: img(FOOD.pizza) },
  { id: 7, title: 'Summer Salad Bowl', author: 'Alison Roman', rating: 4, reviews: '567', time: '15 min', image: img(FOOD.salad) },
  { id: 8, title: 'Fluffy Pancakes', author: 'Ina Garten', rating: 5, reviews: '3.1k', time: '30 min', image: img(FOOD.pancakes) },
  { id: 9, title: 'Pan-Seared Steak', author: 'Kenji López-Alt', rating: 5, reviews: '2.1k', time: '25 min', image: img(FOOD.steak) },
  { id: 10, title: 'Caprese Sandwich', author: 'Ina Garten', rating: 4.5, reviews: '342', time: '10 min', image: img(FOOD.sandwich) },
  { id: 11, title: 'Quinoa Power Bowl', author: 'Melissa Clark', rating: 4.5, reviews: '567', time: '25 min', image: img(FOOD.bowl) },
  { id: 12, title: 'Honey Garlic Wings', author: 'Mark Bittman', rating: 5, reviews: '891', time: '35 min', image: img(FOOD.grilled) },
  { id: 13, title: 'Avocado Toast Deluxe', author: 'Alison Roman', rating: 4, reviews: '234', time: '8 min', image: img(FOOD.avocado) },
  { id: 14, title: 'Sunday Brunch Spread', author: 'Samin Nosrat', rating: 4.5, reviews: '678', time: '45 min', image: img(FOOD.brunch) },
  { id: 15, title: 'Truffle Mushroom Risotto', author: 'Marcella Hazan', rating: 5, reviews: '1.4k', time: '45 min', image: img(FOOD.bowl) },
  { id: 16, title: 'Coconut Shrimp', author: 'Yotam Ottolenghi', rating: 4.5, reviews: '445', time: '30 min', image: img(FOOD.grilled) },
  { id: 17, title: 'Sheet Pan Fajitas', author: 'Rick Bayless', rating: 4, reviews: '389', time: '30 min', image: img(FOOD.stirfry) },
  { id: 18, title: 'Lobster Linguine', author: 'Giada De Laurentiis', rating: 4.5, reviews: '892', time: '50 min', image: img(FOOD.pasta) },
  { id: 19, title: 'Overnight Oats', author: 'Claire Saffitz', rating: 4.5, reviews: '892', time: '10 min', image: img(FOOD.brunch) },
  { id: 20, title: 'Sweet Potato Fries', author: 'Ina Garten', rating: 4, reviews: '156', time: '20 min', image: img(FOOD.avocado) },
]

const FILTERS = ['Filter', 'Easy', 'Under 30 Min', 'Quick', 'High Protein', 'Top-Rated', 'Vegetarian']

type SortKey = 'recent' | 'rating' | 'time'

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AllRecipes() {
  const { goTo } = usePrototype()
  const [searchText, setSearchText] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortKey>('recent')
  const [showSortMenu, setShowSortMenu] = useState(false)

  let recipes = allRecipes.filter((r) =>
    r.title.toLowerCase().includes(searchText.toLowerCase()),
  )

  // Sort
  if (sortBy === 'rating') {
    recipes = [...recipes].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'time') {
    recipes = [...recipes].sort((a, b) => parseInt(a.time) - parseInt(b.time))
  }

  const sortLabel = sortBy === 'recent' ? 'Recent' : sortBy === 'rating' ? 'Top Rated' : 'Quickest'

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
      {/* ===== Status bar safe area ===== */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* ===== Header ===== */}
      <div
        style={{
          height: 44,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}
      >
        <button
          onClick={() => goTo('Cookbook')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4, display: 'flex', alignItems: 'center' }}
        >
          <ChevronLeft size={24} color="#242424" />
        </button>
        <span
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 18,
            fontWeight: 700,
            color: '#242424',
          }}
        >
          All Saved Recipes
        </span>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4, display: 'flex', alignItems: 'center' }}
        >
          <MoreHorizontal size={22} color="#242424" />
        </button>
      </div>

      {/* ===== Search bar ===== */}
      <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="#999" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search all recipes"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: '100%',
              height: 40,
              paddingLeft: 38,
              paddingRight: 14,
              borderRadius: 20,
              border: '1px solid #e5e5e5',
              background: '#fafafa',
              fontSize: 15,
              color: '#242424',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* ===== Filter chips ===== */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: 8,
          padding: '14px 20px',
          overflowX: 'auto',
          overflowY: 'hidden',
          flexShrink: 0,
        }}
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter
          const isFilterBtn = filter === 'Filter'
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(isActive ? null : filter)}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                border: isActive ? '1.5px solid #067A46' : '1.5px solid #ddd',
                background: isActive ? '#067A46' : '#fff',
                color: isActive ? '#fff' : '#242424',
              }}
            >
              {isFilterBtn && <SlidersHorizontal size={14} />}
              {filter}
            </button>
          )
        })}
      </div>

      {/* ===== Divider ===== */}
      <div style={{ height: 1, background: '#f0f0f0', flexShrink: 0 }} />

      {/* ===== Scrollable recipe content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Recipe count + sort */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px 10px',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700, color: '#242424', margin: 0 }}>
            {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
          </p>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 13,
                fontWeight: 500,
                color: '#067A46',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <ArrowDownUp size={14} />
              {sortLabel}
            </button>

            {/* Sort dropdown */}
            {showSortMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: 28,
                  right: 0,
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  border: '1px solid #eee',
                  zIndex: 10,
                  overflow: 'hidden',
                  minWidth: 150,
                }}
              >
                {([
                  { key: 'recent' as SortKey, label: 'Recently Added' },
                  { key: 'rating' as SortKey, label: 'Top Rated' },
                  { key: 'time' as SortKey, label: 'Quickest First' },
                ]).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSortBy(opt.key)
                      setShowSortMenu(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 14,
                      fontWeight: sortBy === opt.key ? 600 : 400,
                      color: sortBy === opt.key ? '#067A46' : '#242424',
                      background: sortBy === opt.key ? 'rgba(6,122,70,0.05)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f5f5f5',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recipe grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            padding: '0 20px 24px',
          }}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      {/* ===== Tab bar ===== */}
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
          { Icon: Home, label: 'Home', active: false },
          { Icon: CalendarDays, label: 'Menu', active: false },
          { Icon: Search, label: 'Search', active: false },
          { Icon: BookOpen, label: 'Cookbook', active: true },
          { Icon: User, label: 'Profile', active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: tab.active ? '#067A46' : '#aaa',
              padding: '4px 12px',
            }}
          >
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Recipe card (consistent with CollectionDetail)                     */
/* ------------------------------------------------------------------ */

function RecipeCard({ recipe }: { recipe: Recipe }) {
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
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
      />
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', lineHeight: 1.3, margin: 0 }}>
          {recipe.title}
        </p>
        <p style={{ fontSize: 12, color: '#888', margin: '3px 0 0' }}>
          {recipe.author}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px 12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: '#555' }}>
          <Star size={12} fill="#f5a623" color="#f5a623" />
          <span style={{ fontWeight: 600 }}>{recipe.rating}</span>
          <span style={{ color: '#aaa' }}>({recipe.reviews})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#888' }}>{recipe.time}</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <MoreHorizontal size={16} color="#bbb" />
          </button>
        </div>
      </div>
    </div>
  )
}
