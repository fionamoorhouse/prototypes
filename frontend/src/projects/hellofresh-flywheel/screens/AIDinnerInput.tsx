import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, ChevronRight, Mic, X } from 'lucide-react'

const pantryStaples = [
  'Chicken', 'Rice', 'Pasta', 'Eggs', 'Onion', 'Garlic',
  'Broccoli', 'Tomatoes', 'Cheese', 'Soy Sauce', 'Olive Oil', 'Butter',
]

export default function AIDinnerInput() {
  const { goTo } = usePrototype()
  const [inputValue, setInputValue] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])

  const addIngredient = (name: string) => {
    const trimmed = name.trim()
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients(prev => [...prev, trimmed])
    }
    setInputValue('')
  }

  const removeIngredient = (name: string) => {
    setIngredients(prev => prev.filter(i => i !== name))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addIngredient(inputValue)
    }
  }

  const hasEnoughIngredients = ingredients.length >= 2

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <button onClick={() => goTo('CookbookHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} color="#242424" />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px', overflow: 'hidden' }}>
        {/* Title */}
        <div style={{ paddingTop: 16, paddingBottom: 24 }}>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 700, color: '#242424', margin: '0 0 6px', lineHeight: 1.2 }}>
            What's in your fridge?
          </h1>
          <p style={{ fontSize: 15, color: '#888', margin: 0, lineHeight: 1.4 }}>
            Tell us what you have and we'll create a recipe
          </p>
        </div>

        {/* Input field */}
        <div style={{ position: 'relative', marginBottom: 16, flexShrink: 0 }}>
          <input
            type="text"
            placeholder="e.g. chicken, broccoli, rice..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%', height: 52,
              padding: '0 44px 0 16',
              borderRadius: 16,
              border: '1.5px solid #ddd',
              background: '#fafafa',
              fontSize: 16, color: '#242424',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
          <button style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: 18,
            background: '#f0f0f0', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mic size={18} color="#888" />
          </button>
        </div>

        {/* Added ingredients */}
        {ingredients.length > 0 && (
          <div style={{ marginBottom: 20, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ingredients.map(ing => (
                <div
                  key={ing}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 10px 6px 14px',
                    borderRadius: 20,
                    background: '#E8F5E0',
                    border: '1px solid #BBF7D0',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#067A46' }}>{ing}</span>
                  <button
                    onClick={() => removeIngredient(ing)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                  >
                    <X size={14} color="#067A46" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick-add chips */}
        <div style={{ marginBottom: 20, flexShrink: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#999', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Quick add
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {pantryStaples
              .filter(s => !ingredients.includes(s))
              .map(staple => (
                <button
                  key={staple}
                  onClick={() => addIngredient(staple)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 20,
                    border: '1.5px solid #e0e0e0',
                    background: '#fff',
                    fontSize: 13, fontWeight: 500, color: '#555',
                    cursor: 'pointer',
                  }}
                >
                  + {staple}
                </button>
              ))}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Generate button */}
        <button
          onClick={() => {
            if (hasEnoughIngredients) {
              goTo('AIDinnerGenerating', { ingredients: ingredients.join(',') })
            }
          }}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            background: hasEnoughIngredients ? '#067A46' : '#ccc',
            color: '#fff',
            fontSize: 17, fontWeight: 700,
            border: 'none',
            cursor: hasEnoughIngredients ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 8,
            transition: 'background 0.2s ease',
          }}
        >
          Create My Recipe
          <ChevronRight size={18} />
        </button>

        {!hasEnoughIngredients && (
          <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', margin: '4px 0 0' }}>
            Add at least 2 ingredients to get started
          </p>
        )}
      </div>

      <div style={{ height: 34, flexShrink: 0 }} />
    </div>
  )
}
