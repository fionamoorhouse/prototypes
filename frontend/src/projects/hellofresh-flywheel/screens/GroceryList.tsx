import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, Copy, Share2, Check, ShoppingCart } from 'lucide-react'

interface GroceryItem {
  name: string
  quantity: string
  recipes: string[]
  checked: boolean
}

interface GroceryCategory {
  name: string
  emoji: string
  items: GroceryItem[]
}

const groceryData: GroceryCategory[] = [
  {
    name: 'Protein',
    emoji: '🥩',
    items: [
      { name: 'Chicken thighs, boneless', quantity: '1.5 lbs', recipes: ['Yuzu Kosho Chicken'], checked: false },
      { name: 'Salmon fillets', quantity: '2 fillets', recipes: ['Miso Glazed Salmon'], checked: false },
      { name: 'Large shrimp, peeled', quantity: '1 lb', recipes: ['Honey Garlic Shrimp'], checked: false },
    ],
  },
  {
    name: 'Produce',
    emoji: '🥬',
    items: [
      { name: 'Garlic', quantity: '1 head', recipes: ['Yuzu Kosho Chicken', 'Honey Garlic Shrimp', 'Miso Glazed Salmon'], checked: false },
      { name: 'Ginger, fresh', quantity: '2 inch piece', recipes: ['Miso Glazed Salmon', 'Yuzu Kosho Chicken'], checked: false },
      { name: 'Green onions', quantity: '1 bunch', recipes: ['Yuzu Kosho Chicken', 'Miso Glazed Salmon', 'Honey Garlic Shrimp'], checked: false },
      { name: 'Lemon', quantity: '2', recipes: ['Yuzu Kosho Chicken', 'Honey Garlic Shrimp'], checked: false },
      { name: 'Avocado', quantity: '2', recipes: ['Miso Glazed Salmon'], checked: false },
      { name: 'Cucumber', quantity: '1', recipes: ['Miso Glazed Salmon'], checked: false },
      { name: 'Edamame', quantity: '1 cup', recipes: ['Miso Glazed Salmon'], checked: false },
    ],
  },
  {
    name: 'Pantry',
    emoji: '🫙',
    items: [
      { name: 'Soy sauce', quantity: '¼ cup', recipes: ['Yuzu Kosho Chicken', 'Miso Glazed Salmon', 'Honey Garlic Shrimp'], checked: false },
      { name: 'Rice vinegar', quantity: '3 tbsp', recipes: ['Miso Glazed Salmon', 'Honey Garlic Shrimp'], checked: false },
      { name: 'Honey', quantity: '3 tbsp', recipes: ['Honey Garlic Shrimp', 'Miso Glazed Salmon'], checked: false },
      { name: 'Sesame oil', quantity: '2 tbsp', recipes: ['Yuzu Kosho Chicken', 'Miso Glazed Salmon'], checked: false },
      { name: 'Sesame seeds', quantity: '2 tbsp', recipes: ['Miso Glazed Salmon'], checked: false },
      { name: 'Cornstarch', quantity: '1 tbsp', recipes: ['Honey Garlic Shrimp'], checked: false },
    ],
  },
  {
    name: 'Grains',
    emoji: '🍚',
    items: [
      { name: 'Jasmine rice', quantity: '3 cups', recipes: ['Yuzu Kosho Chicken', 'Miso Glazed Salmon', 'Honey Garlic Shrimp'], checked: false },
    ],
  },
  {
    name: 'Dairy & Spices',
    emoji: '🧈',
    items: [
      { name: 'Butter', quantity: '2 tbsp', recipes: ['Honey Garlic Shrimp'], checked: false },
      { name: 'Miso paste (white)', quantity: '3 tbsp', recipes: ['Miso Glazed Salmon'], checked: false },
      { name: 'Yuzu kosho paste', quantity: '1 tbsp', recipes: ['Yuzu Kosho Chicken'], checked: false },
    ],
  },
]

export default function GroceryList() {
  const { goTo } = usePrototype()
  const [categories, setCategories] = useState(groceryData)
  const [copied, setCopied] = useState(false)
  const [expandedRecipes, setExpandedRecipes] = useState<string | null>(null)

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0)
  const checkedItems = categories.reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0)

  const toggleItem = (catIndex: number, itemIndex: number) => {
    setCategories(prev => {
      const next = [...prev]
      const cat = { ...next[catIndex] }
      const items = [...cat.items]
      items[itemIndex] = { ...items[itemIndex], checked: !items[itemIndex].checked }
      cat.items = items
      next[catIndex] = cat
      return next
    })
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <button onClick={() => goTo('GrocerySelect')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} color="#242424" />
        </button>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#242424' }}>Grocery List</span>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
        >
          {copied ? <Check size={20} color="#067A46" /> : <Copy size={20} color="#242424" />}
        </button>
      </div>

      {/* Summary bar */}
      <div style={{
        padding: '10px 20px',
        background: '#F0FDF4',
        borderBottom: '1px solid #BBF7D0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShoppingCart size={16} color="#067A46" />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#067A46' }}>
            {totalItems - checkedItems} items remaining
          </span>
        </div>
        <span style={{ fontSize: 13, color: '#888' }}>3 meals planned</span>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {categories.map((cat, catIndex) => (
          <div key={cat.name} style={{ padding: '0 20px' }}>
            {/* Category header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '16px 0 8px',
              position: 'sticky', top: 0, background: '#fff', zIndex: 2,
            }}>
              <span style={{ fontSize: 18 }}>{cat.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>{cat.name}</span>
              <span style={{ fontSize: 12, color: '#999' }}>({cat.items.length})</span>
            </div>

            {/* Items */}
            {cat.items.map((item, itemIndex) => (
              <div key={item.name}>
                <div
                  onClick={() => toggleItem(catIndex, itemIndex)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '10px 0',
                    cursor: 'pointer',
                    opacity: item.checked ? 0.5 : 1,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, marginTop: 1,
                    border: item.checked ? 'none' : '2px solid #ccc',
                    background: item.checked ? '#067A46' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.15s ease',
                  }}>
                    {item.checked && <Check size={13} color="#fff" strokeWidth={3} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{
                        fontSize: 14, color: '#242424',
                        textDecoration: item.checked ? 'line-through' : 'none',
                        fontWeight: 500,
                      }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: 13, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                        {item.quantity}
                      </span>
                    </div>
                    {item.recipes.length > 1 ? (
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          setExpandedRecipes(expandedRecipes === item.name ? null : item.name)
                        }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          padding: 0, marginTop: 2,
                          fontSize: 11, color: '#888',
                        }}
                      >
                        For {item.recipes.length} recipes {expandedRecipes === item.name ? '▲' : '▼'}
                      </button>
                    ) : (
                      <span style={{ fontSize: 11, color: '#aaa', marginTop: 2, display: 'block' }}>
                        {item.recipes[0]}
                      </span>
                    )}
                    {expandedRecipes === item.name && (
                      <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {item.recipes.map(r => (
                          <span key={r} style={{ fontSize: 11, color: '#999' }}>• {r}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ height: 1, background: '#f5f5f5', marginLeft: 34 }} />
              </div>
            ))}
          </div>
        ))}
        <div style={{ height: 20 }} />
      </div>

      {/* Bottom actions */}
      <div style={{ flexShrink: 0, padding: '12px 20px 0', borderTop: '1px solid #f0f0f0', background: '#fff', display: 'flex', gap: 10 }}>
        <button
          onClick={() => goTo('CookbookHome')}
          style={{
            flex: 1, height: 48, borderRadius: 24,
            border: '1.5px solid #ddd', background: '#fff',
            fontSize: 14, fontWeight: 600, color: '#242424',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          Back to Cookbook
        </button>
        <button
          style={{
            flex: 1, height: 48, borderRadius: 24,
            background: '#067A46', color: '#fff',
            fontSize: 14, fontWeight: 600,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Share2 size={16} />
          Share List
        </button>
      </div>

      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
