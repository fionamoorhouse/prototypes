import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, ChevronRight, Clock, Check, ShoppingCart } from 'lucide-react'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const FOOD = {
  chicken: '1532550907401-a500c9a57435',
  salmon: '1467003909585-2f8a72700288',
  pasta: '1473093295043-cdd812d0e601',
  stirfry: '1455619452474-d2be8b1e70cd',
  steak: '1504674900247-0877df9cc836',
  bowl: '1540189549336-e6e99c3679fe',
  tacos: '1551504734-5ee1c4a1479b',
  curry: '1585937421612-70a008356fbe',
  ramen: '1569718212165-3a8278d5f624',
  shrimp: '1559058789-672da06263d8',
}

interface Recipe {
  id: number
  title: string
  image: string
  cookTime: string
  servings: number
}

const recipes: Recipe[] = [
  { id: 1, title: 'Yuzu Kosho Chicken Thighs', image: img(FOOD.chicken), cookTime: '35 min', servings: 4 },
  { id: 2, title: 'Miso Glazed Salmon Bowl', image: img(FOOD.salmon), cookTime: '25 min', servings: 2 },
  { id: 3, title: 'One-Pan Lemon Pasta', image: img(FOOD.pasta), cookTime: '30 min', servings: 4 },
  { id: 4, title: 'Thai Basil Stir Fry', image: img(FOOD.stirfry), cookTime: '25 min', servings: 4 },
  { id: 5, title: 'Korean BBQ Tacos', image: img(FOOD.tacos), cookTime: '40 min', servings: 4 },
  { id: 6, title: 'Honey Garlic Shrimp', image: img(FOOD.shrimp), cookTime: '20 min', servings: 2 },
  { id: 7, title: 'Spicy Ramen Noodle Soup', image: img(FOOD.ramen), cookTime: '35 min', servings: 4 },
  { id: 8, title: 'Mediterranean Grain Bowl', image: img(FOOD.bowl), cookTime: '30 min', servings: 2 },
]

export default function GrocerySelect() {
  const { goTo } = usePrototype()
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const toggle = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <button onClick={() => goTo('CookbookHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} color="#242424" />
        </button>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#242424' }}>Plan Meals</span>
        <div style={{ width: 24 }} />
      </div>

      {/* Title */}
      <div style={{ padding: '12px 20px 16px', flexShrink: 0 }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontWeight: 700, color: '#242424', margin: '0 0 4px' }}>
          Pick your meals for the week
        </h1>
        <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
          Select recipes and we'll create a combined grocery list
        </p>
      </div>

      {/* Recipe list */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '0 20px' }}>
        {recipes.map(recipe => {
          const isSelected = selected.has(recipe.id)
          return (
            <div
              key={recipe.id}
              onClick={() => toggle(recipe.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 0',
                borderBottom: '1px solid #f3f3f3',
                cursor: 'pointer',
              }}
            >
              {/* Checkbox */}
              <div style={{
                width: 24, height: 24, borderRadius: 7,
                border: isSelected ? 'none' : '2px solid #ccc',
                background: isSelected ? '#067A46' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.15s ease',
              }}>
                {isSelected && <Check size={14} color="#fff" strokeWidth={3} />}
              </div>

              {/* Image */}
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
              />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#242424', margin: 0, lineHeight: 1.3 }}>
                  {recipe.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} color="#999" />
                    <span style={{ fontSize: 12, color: '#999' }}>{recipe.cookTime}</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#ccc' }}>·</span>
                  <span style={{ fontSize: 12, color: '#999' }}>{recipe.servings} servings</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '12px 20px 0', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
        <button
          onClick={() => {
            if (selected.size > 0) {
              goTo('GroceryList', { ids: Array.from(selected).join(',') })
            }
          }}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            background: selected.size > 0 ? '#067A46' : '#ccc',
            color: '#fff',
            fontSize: 16, fontWeight: 700,
            border: 'none',
            cursor: selected.size > 0 ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'background 0.2s ease',
          }}
        >
          <ShoppingCart size={18} />
          {selected.size > 0
            ? `Generate Grocery List (${selected.size} ${selected.size === 1 ? 'meal' : 'meals'})`
            : 'Select meals to continue'}
        </button>
      </div>

      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
