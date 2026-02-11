import { usePrototype } from '@/hooks/usePrototype'
import {
  ChevronLeft,
  MoreHorizontal,
  Play,
  Home,
  CalendarDays,
  Search,
  BookOpen,
  User,
  ExternalLink,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Screen 1: Empty Cookbook — Video Prompt                             */
/*                                                                     */
/*  First thing a brand-new user sees when they deep-link into the     */
/*  Cookbook. The cookbook is empty; we want them to watch the           */
/*  onboarding video.                                                  */
/* ------------------------------------------------------------------ */

export default function OnboardingVideoPrompt() {
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
          height: 44,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          background: '#067A46',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ChevronLeft size={22} color="#fff" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 20,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              Cookbook
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.25)',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 99,
                letterSpacing: '0.05em',
                textTransform: 'uppercase' as const,
              }}
            >
              Beta
            </span>
          </div>
        </div>
        <MoreHorizontal size={22} color="#fff" />
      </div>

      {/* ===== Green header background extension ===== */}
      <div style={{ height: 20, background: '#067A46', flexShrink: 0 }} />

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* --- Onboarding Card --- */}
        <div style={{ padding: '0 16px', marginTop: -4 }}>
          <div
            style={{
              background: '#E8F5E0',
              borderRadius: 20,
              padding: '20px 20px 24px',
              position: 'relative',
            }}
          >
            {/* NEW badge */}
            <span
              style={{
                display: 'inline-block',
                background: '#067A46',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 6,
                letterSpacing: '0.03em',
                textTransform: 'uppercase' as const,
                marginBottom: 12,
              }}
            >
              New
            </span>

            {/* Heading */}
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 22,
                fontWeight: 700,
                color: '#242424',
                margin: '0 0 6px',
                lineHeight: 1.2,
              }}
            >
              Add recipes from socials
            </h2>

            {/* Subheading */}
            <p
              style={{
                fontSize: 15,
                color: '#555',
                margin: '0 0 18px',
                lineHeight: 1.4,
              }}
            >
              Save your cooking inspiration in your cookbook now
            </p>

            {/* Video thumbnail */}
            <div
              onClick={() => goTo('OnboardingVideo')}
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
                marginBottom: 20,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=500&fit=crop&auto=format&q=80"
                alt="Cooking video thumbnail"
                style={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.25)',
                }}
              />
              {/* Play button */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  background: 'rgba(255,255,255,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <Play size={24} color="#242424" fill="#242424" style={{ marginLeft: 3 }} />
              </div>
            </div>

            {/* CTA button */}
            <button
              onClick={() => goTo('OnboardingVideo')}
              style={{
                width: '100%',
                height: 52,
                borderRadius: 14,
                background: '#242424',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              Learn how it works
            </button>
          </div>
        </div>

        {/* --- Spacer --- */}
        <div style={{ height: 32 }} />

        {/* --- Want to know more? --- */}
        <div
          style={{
            margin: '0 16px',
            padding: '20px',
            background: '#F5F0E8',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 17,
                fontWeight: 700,
                color: '#242424',
                margin: '0 0 6px',
              }}
            >
              Want to know more?
            </h3>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 14,
                color: '#067A46',
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Tap here for more cookbook details
              <ExternalLink size={13} />
            </button>
          </div>
          {/* Decorative food image */}
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=120&fit=crop&auto=format&q=80"
            alt="Food"
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        </div>

        {/* --- Bottom padding --- */}
        <div style={{ height: 24 }} />

        {/* --- Demo nav links --- */}
        <div style={{ padding: '0 20px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => goTo('RecipeSuggestions')}
            style={{ fontSize: 11, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            Skip to suggestions →
          </button>
          <span style={{ color: '#ddd', fontSize: 11 }}>|</span>
          <button
            onClick={() => goTo('Cookbook')}
            style={{ fontSize: 11, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            View populated cookbook →
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
