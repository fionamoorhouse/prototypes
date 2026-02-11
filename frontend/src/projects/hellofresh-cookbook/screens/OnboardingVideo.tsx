import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  X,
  Play,
  Heart,
  MessageCircle,
  Share2,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Screen 2: Onboarding Video (Full-Screen Overlay)                   */
/*                                                                     */
/*  20-second marketing video explaining the Cookbook value prop.       */
/*  Ends with a CTA to start saving recipes.                           */
/*  For the prototype, this is a placeholder — no actual video.        */
/* ------------------------------------------------------------------ */

export default function OnboardingVideo() {
  const { goTo } = usePrototype()
  const [hasPlayed, setHasPlayed] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ===== Video area (placeholder image) ===== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=1200&fit=crop&auto=format&q=80"
          alt="Cooking video"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Gradient overlay from bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '55%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* ===== Close button ===== */}
      <div style={{ position: 'relative', zIndex: 10, padding: '54px 16px 0' }}>
        <button
          onClick={() => goTo('RecipeSuggestions')}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={20} color="#fff" />
        </button>
      </div>

      {/* ===== Center play button (pre-play state) ===== */}
      {!hasPlayed && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
          }}
        >
          <button
            onClick={() => setHasPlayed(true)}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
          >
            <Play size={32} color="#242424" fill="#242424" style={{ marginLeft: 4 }} />
          </button>
        </div>
      )}

      {/* ===== Video placeholder badge ===== */}
      {!hasPlayed && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, calc(-50% + 56px))',
            zIndex: 5,
            background: 'rgba(0,0,0,0.6)',
            borderRadius: 8,
            padding: '6px 12px',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 500 }}>
            Tap to play • 0:20
          </span>
        </div>
      )}

      {/* ===== Social-style engagement indicators (right side) ===== */}
      {hasPlayed && (
        <div
          style={{
            position: 'absolute',
            right: 16,
            bottom: 240,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={22} color="#fff" />
            </div>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>87</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MessageCircle size={22} color="#fff" />
            </div>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>12</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Share2 size={22} color="#fff" />
            </div>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>72</span>
          </div>
        </div>
      )}

      {/* ===== Bottom CTA area ===== */}
      {hasPlayed && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: '0 24px 54px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {/* Video ended indicator */}
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '6px 14px',
              marginBottom: 4,
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 500 }}>
              Video placeholder • 0:20
            </span>
          </div>

          {/* CTA button */}
          <button
            onClick={() => goTo('RecipeSuggestions')}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 26,
              background: '#fff',
              color: '#242424',
              fontSize: 16,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            Save your first recipe
          </button>

          {/* Maybe later */}
          <button
            onClick={() => goTo('RecipeSuggestions')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'underline',
              padding: '4px 8px',
            }}
          >
            Maybe later
          </button>
        </div>
      )}

      {/* ===== Pre-play bottom hint ===== */}
      {!hasPlayed && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: '0 24px 54px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <button
            onClick={() => goTo('RecipeSuggestions')}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 26,
              background: '#fff',
              color: '#242424',
              fontSize: 16,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            Save your first recipe
          </button>
          <button
            onClick={() => goTo('RecipeSuggestions')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'underline',
              padding: '4px 8px',
            }}
          >
            Maybe later
          </button>
        </div>
      )}
    </div>
  )
}
