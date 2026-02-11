import { useState, useEffect } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  Instagram,
  Music,
  X,
  Play,
  Share,
  ArrowRight,
  Smartphone,
  Heart,
  MessageCircle,
  Send,
  Bookmark as BookmarkIcon,
  MoreHorizontal,
  Home as HomeIcon,
  Search as SearchIcon,
  Film,
  ShoppingBag,
  UserCircle,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Screen 4: Social Media Handoff                                     */
/*                                                                     */
/*  Two phases:                                                        */
/*  1. Brief interstitial ("Opening Instagram...")                     */
/*  2. Simulated social media view with PIP tutorial overlay           */
/* ------------------------------------------------------------------ */

export default function SocialHandoff() {
  const { goTo, searchParams } = usePrototype()

  const recipeName = searchParams.get('recipeName') || 'Recipe'
  const source = (searchParams.get('source') || 'instagram') as 'instagram' | 'tiktok'
  const creator = searchParams.get('creator') || 'creator'

  const [phase, setPhase] = useState<'interstitial' | 'social'>('interstitial')
  const [pipVisible, setPipVisible] = useState(false)
  const [pipPlaying, setPipPlaying] = useState(false)

  // Auto-advance from interstitial after 1.5s
  useEffect(() => {
    let innerTimer: ReturnType<typeof setTimeout>
    const timer = setTimeout(() => {
      setPhase('social')
      // Show PIP after a brief delay
      innerTimer = setTimeout(() => {
        setPipVisible(true)
        setPipPlaying(true)
      }, 600)
    }, 1500)
    return () => {
      clearTimeout(timer)
      clearTimeout(innerTimer)
    }
  }, [])

  const appName = source === 'instagram' ? 'Instagram' : 'TikTok'
  const AppIcon = source === 'instagram' ? Instagram : Music

  /* ------ Interstitial phase ------ */
  if (phase === 'interstitial') {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        {/* App icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: source === 'instagram'
              ? 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)'
              : '#010101',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <AppIcon size={36} color="#fff" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: '#242424',
              margin: '0 0 6px',
            }}
          >
            Opening {appName}...
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#888',
              margin: 0,
            }}
          >
            Taking you to @{creator}
          </p>
        </div>

        {/* Loading dots */}
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: '#067A46',
                opacity: 0.3,
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes pulse {
            0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
            40% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>

        {/* Skip link */}
        <button
          onClick={() => {
            setPhase('social')
            setTimeout(() => {
              setPipVisible(true)
              setPipPlaying(true)
            }, 300)
          }}
          style={{
            marginTop: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#aaa',
            fontSize: 13,
          }}
        >
          Tap to skip
        </button>
      </div>
    )
  }

  /* ------ Social media phase ------ */
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
      {/* ===== Simulated Instagram / social feed ===== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Status bar */}
        <div style={{ height: 54, flexShrink: 0, background: '#fff' }} />

        {/* App header */}
        <div
          style={{
            height: 44,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            borderBottom: '1px solid #eee',
          }}
        >
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontWeight: 700, color: '#242424' }}>
            {appName}
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            <Heart size={22} color="#242424" />
            <Send size={22} color="#242424" />
          </div>
        </div>

        {/* Scrollable post area */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Post header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #833AB4, #FD1D1D)',
                padding: 2,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: '#ddd',
                  border: '2px solid #fff',
                }}
              />
            </div>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>
                @{creator}
              </span>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <MoreHorizontal size={20} color="#242424" />
            </div>
          </div>

          {/* Post image */}
          <img
            src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&h=800&fit=crop&auto=format&q=80"
            alt={recipeName}
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Post actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
            }}
          >
            <div style={{ display: 'flex', gap: 18 }}>
              <Heart size={24} color="#242424" />
              <MessageCircle size={24} color="#242424" />
              <Send size={24} color="#242424" />
            </div>
            <BookmarkIcon size={24} color="#242424" />
          </div>

          {/* Likes */}
          <div style={{ padding: '0 16px' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>
              2,341 likes
            </span>
          </div>

          {/* Caption */}
          <div style={{ padding: '6px 16px 16px' }}>
            <span style={{ fontSize: 14, color: '#242424' }}>
              <span style={{ fontWeight: 600 }}>@{creator}</span>{' '}
              {recipeName} - the easiest weeknight dinner! Full recipe below...
            </span>
          </div>

          {/* Pagination dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, paddingBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#3897f0' }} />
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#ddd' }} />
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#ddd' }} />
          </div>
        </div>

        {/* Simulated social media tab bar */}
        <div
          style={{
            flexShrink: 0,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderTop: '1px solid #eee',
            background: '#fff',
          }}
        >
          <HomeIcon size={24} color="#242424" />
          <SearchIcon size={24} color="#999" />
          <Film size={24} color="#999" />
          <ShoppingBag size={24} color="#999" />
          <UserCircle size={24} color="#999" />
        </div>

        {/* Home indicator */}
        <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
      </div>

      {/* ===== PIP Tutorial Overlay ===== */}
      {pipVisible && (
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 16,
            width: 160,
            zIndex: 100,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '2px solid rgba(255,255,255,0.3)',
            background: '#1a1a1a',
          }}
        >
          {/* PIP header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              background: '#067A46',
            }}
          >
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
              HELLOFRESH
            </span>
            <button
              onClick={() => setPipVisible(false)}
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <X size={10} color="#fff" />
            </button>
          </div>

          {/* PIP video content (placeholder) */}
          <div
            style={{
              height: 200,
              background: '#1a1a1a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '12px',
            }}
          >
            {pipPlaying ? (
              <>
                {/* Simulated tutorial steps */}
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'rgba(6,122,70,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px',
                    }}
                  >
                    <Share size={20} color="#067A46" />
                  </div>
                  <p style={{ fontSize: 11, color: '#fff', fontWeight: 600, margin: '0 0 4px' }}>
                    Step 1: Tap Share
                  </p>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    Tap the share icon on this post
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 4,
                  }}
                >
                  <ArrowRight size={12} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>
                    Then find HelloFresh
                  </span>
                </div>
              </>
            ) : (
              <button
                onClick={() => setPipPlaying(true)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Play size={20} color="#fff" fill="#fff" />
              </button>
            )}
          </div>

          {/* PIP footer — progress bar */}
          <div style={{ padding: '0 10px 8px', background: '#1a1a1a' }}>
            <div style={{ height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 1 }}>
              <div
                style={{
                  height: '100%',
                  width: pipPlaying ? '60%' : '0%',
                  background: '#067A46',
                  borderRadius: 1,
                  transition: 'width 3s linear',
                }}
              />
            </div>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 4, display: 'block' }}>
              Video placeholder • Tutorial
            </span>
          </div>
        </div>
      )}

      {/* ===== "I saved it" floating button ===== */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 90,
        }}
      >
        <button
          onClick={() => goTo('Cookbook', { celebration: 'true' })}
          style={{
            height: 48,
            padding: '0 28px',
            borderRadius: 24,
            background: '#067A46',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(6,122,70,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Smartphone size={18} />
          I saved it — back to HelloFresh
        </button>
      </div>
    </div>
  )
}
