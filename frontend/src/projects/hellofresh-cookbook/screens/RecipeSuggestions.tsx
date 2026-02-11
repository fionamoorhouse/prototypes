import { useState, useCallback } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  X,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Music,
  Plus,
  Home,
  CalendarDays,
  Search,
  BookOpen,
  User,
  Share,
  Play,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Image helper                                                       */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 600, h = 700) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

/* ------------------------------------------------------------------ */
/*  Suggestion data                                                    */
/* ------------------------------------------------------------------ */

const SUGGESTIONS = [
  {
    id: 1,
    title: 'Crispy Chicken Shawarma Bowl',
    creator: 'halfbakedharvest',
    source: 'instagram' as const,
    image: img('1532550907401-a500c9a57435'),
  },
  {
    id: 2,
    title: 'Creamy Tuscan Salmon',
    creator: 'feelgoodfoodie',
    source: 'instagram' as const,
    image: img('1467003909585-2f8a72700288'),
  },
  {
    id: 3,
    title: '15-Min Garlic Butter Noodles',
    creator: 'thecookingguy',
    source: 'tiktok' as const,
    image: img('1473093295043-cdd812d0e601'),
  },
  {
    id: 4,
    title: 'Korean BBQ Tacos',
    creator: 'maangchi',
    source: 'instagram' as const,
    image: img('1499028344343-cd173ffc68a9'),
  },
  {
    id: 5,
    title: 'Avocado Crunch Wrap',
    creator: 'budgetbytes',
    source: 'tiktok' as const,
    image: img('1482049016688-2d3e1b311543'),
  },
]

/* ------------------------------------------------------------------ */
/*  Screen 3 + 3b: Recipe Suggestions (Swipe Cards)                    */
/*                                                                     */
/*  Tinder-style recipe cards to spark desire.                         */
/*  Swipe right → social handoff. Swipe left → next card.             */
/*  If all rejected → fallback state (3b).                             */
/* ------------------------------------------------------------------ */

export default function RecipeSuggestions() {
  const { goTo } = usePrototype()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const allExhausted = currentIndex >= SUGGESTIONS.length
  const currentCard = allExhausted ? null : SUGGESTIONS[currentIndex]

  const animateCard = useCallback(
    (direction: 'left' | 'right') => {
      if (isAnimating || allExhausted) return
      setExitDirection(direction)
      setIsAnimating(true)

      setTimeout(() => {
        if (direction === 'right') {
          // Save interest — go to social handoff
          goTo('SocialHandoff', {
            recipeId: String(SUGGESTIONS[currentIndex].id),
            recipeName: SUGGESTIONS[currentIndex].title,
            source: SUGGESTIONS[currentIndex].source,
            creator: SUGGESTIONS[currentIndex].creator,
          })
        } else {
          // Reject — next card
          setCurrentIndex((prev) => prev + 1)
        }
        setExitDirection(null)
        setIsAnimating(false)
      }, 300)
    },
    [isAnimating, allExhausted, currentIndex, goTo],
  )

  const handleReject = () => animateCard('left')
  const handleAccept = () => animateCard('right')

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
          height: 44,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
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
          Cookbook
        </span>
      </div>

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {!allExhausted ? (
          /* --- Active suggestion cards --- */
          <div style={{ padding: '12px 20px 0' }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 18,
                fontWeight: 700,
                color: '#242424',
                margin: '0 0 16px',
              }}
            >
              Add your first favorite recipes
            </h2>

            {/* Card stack area */}
            <div
              style={{
                position: 'relative',
                height: 340,
                marginBottom: 16,
              }}
            >
              {/* Background peek card (next card) */}
              {currentIndex + 1 < SUGGESTIONS.length && (
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    right: 8,
                    bottom: 8,
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: '#e0e0e0',
                  }}
                >
                  <img
                    src={SUGGESTIONS[currentIndex + 1].image}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      opacity: 0.6,
                    }}
                  />
                </div>
              )}

              {/* Active card */}
              {currentCard && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    transform: exitDirection === 'left'
                      ? 'translateX(-120%) rotate(-12deg)'
                      : exitDirection === 'right'
                        ? 'translateX(120%) rotate(12deg)'
                        : 'translateX(0) rotate(0)',
                    opacity: exitDirection ? 0.5 : 1,
                    transition: exitDirection
                      ? 'transform 0.3s ease, opacity 0.3s ease'
                      : 'none',
                  }}
                >
                  <img
                    src={currentCard.image}
                    alt={currentCard.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    }}
                  />
                  {/* Card info */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '0 20px 20px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#fff',
                        margin: '0 0 6px',
                        lineHeight: 1.3,
                      }}
                    >
                      {currentCard.title}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {currentCard.source === 'instagram' ? (
                        <Instagram size={14} color="rgba(255,255,255,0.8)" />
                      ) : (
                        <Music size={14} color="rgba(255,255,255,0.8)" />
                      )}
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                        From @{currentCard.creator}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
                marginBottom: 16,
              }}
            >
              {/* Reject */}
              <button
                onClick={handleReject}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  border: '2px solid #E74C3C',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(231,76,60,0.15)',
                  transition: 'transform 0.1s ease',
                }}
              >
                <X size={24} color="#E74C3C" />
              </button>

              {/* Accept / bookmark */}
              <button
                onClick={handleAccept}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  border: '2px solid #242424',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.1s ease',
                }}
              >
                <Bookmark size={24} color="#242424" />
              </button>
            </div>

            {/* Pagination dots */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <ChevronLeft size={18} color={currentIndex > 0 ? '#999' : '#ddd'} />
              <div style={{ display: 'flex', gap: 6 }}>
                {SUGGESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: idx === currentIndex ? '#242424' : '#ddd',
                      transition: 'background 0.2s ease',
                    }}
                  />
                ))}
              </div>
              <ChevronRight
                size={18}
                color={currentIndex < SUGGESTIONS.length - 1 ? '#999' : '#ddd'}
              />
            </div>
          </div>
        ) : (
          /* --- Screen 3b: Suggestions Exhausted --- */
          <div style={{ padding: '40px 20px 0' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '40px 20px',
                background: '#fff',
                borderRadius: 24,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              {/* Illustration */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  background: '#E8F5E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Share size={32} color="#067A46" />
              </div>

              <h2
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#242424',
                  margin: '0 0 8px',
                }}
              >
                Save any recipe you find
              </h2>

              <p
                style={{
                  fontSize: 15,
                  color: '#666',
                  lineHeight: 1.5,
                  margin: '0 0 24px',
                  maxWidth: 280,
                }}
              >
                See a recipe you love on Instagram or TikTok? Tap share, then choose HelloFresh to save it to your cookbook.
              </p>

              {/* Browse CTA */}
              <button
                onClick={() => goTo('SocialHandoff', {
                  recipeId: '1',
                  recipeName: 'Browse recipes',
                  source: 'instagram',
                  creator: 'hellofresh',
                })}
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 14,
                  background: '#067A46',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <Instagram size={18} />
                Browse recipes on Instagram
              </button>

              {/* Watch tutorial link */}
              <button
                onClick={() => goTo('SocialHandoff', {
                  recipeId: '0',
                  recipeName: 'Tutorial',
                  source: 'instagram',
                  creator: 'hellofresh',
                  tutorialOnly: 'true',
                })}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#067A46',
                  fontSize: 14,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 0',
                }}
              >
                <Play size={14} />
                Watch how it works
              </button>
            </div>
          </div>
        )}

        {/* --- Your Collection section --- */}
        <div style={{ padding: '28px 20px 20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 17,
                fontWeight: 700,
                color: '#242424',
                margin: 0,
              }}
            >
              Your collection
            </h2>
            <button
              style={{
                fontSize: 14,
                color: '#067A46',
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              View All
            </button>
          </div>

          {/* Create new card only */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
                border: '2px dashed #ccc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Plus size={24} color="#999" />
              <span style={{ fontSize: 12, color: '#999', fontWeight: 500 }}>Create new</span>
            </div>
          </div>
        </div>

        {/* --- Demo nav links --- */}
        <div style={{ padding: '0 20px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => goTo('OnboardingVideoPrompt')}
            style={{ fontSize: 11, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            ← Back to video prompt
          </button>
          <span style={{ color: '#ddd', fontSize: 11 }}>|</span>
          <button
            onClick={() => goTo('Cookbook', { celebration: 'true' })}
            style={{ fontSize: 11, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            Skip to celebration →
          </button>
          <span style={{ color: '#ddd', fontSize: 11 }}>|</span>
          <button
            onClick={() => goTo('Cookbook')}
            style={{ fontSize: 11, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            Populated cookbook →
          </button>
        </div>
      </div>

      {/* ===== Tab bar ===== */}
      <TabBar />

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function TabBar() {
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
  )
}
