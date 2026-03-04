import { usePrototype } from '@/hooks/usePrototype'
import {
  Gift,
  MessageCircle,
  Users,
  Compass,
  User,
  Trophy,
  Camera,
  Sparkles,
  Star,
  ChevronRight,
  Heart,
  Flame,
} from 'lucide-react'

const HELLOFRESH_GREEN = '#067A46'

const SECTION_COLORS = {
  green: { icon: '#067A46', bg: '#E8F5E0' },
  blue: { icon: '#2563EB', bg: '#DBEAFE' },
  purple: { icon: '#7C3AED', bg: '#EDE9FE' },
} as const

interface ScenarioCardProps {
  title: string
  description: string
  iconColor: string
  iconBg: string
  Icon: typeof Gift
  onClick: () => void
}

function ScenarioCard({ title, description, iconColor, iconBg, Icon, onClick }: ScenarioCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: 14,
        background: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: 14,
        cursor: 'pointer',
        minHeight: 60,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} color={iconColor} strokeWidth={2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{description}</div>
      </div>
      <ChevronRight size={18} color="#ccc" strokeWidth={2} style={{ flexShrink: 0 }} />
    </div>
  )
}

interface SectionProps {
  title: string
  scenarios: { title: string; description: string; Icon: typeof Gift; screen: string; params?: Record<string, string> }[]
  colors: (typeof SECTION_COLORS)[keyof typeof SECTION_COLORS]
}

function Section({ title, scenarios, colors }: SectionProps) {
  const { goTo } = usePrototype()

  return (
    <section style={{ marginBottom: 28 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 14,
          paddingTop: 4,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #eee)',
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: '#bbb',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: 'linear-gradient(90deg, #eee, transparent)',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {scenarios.map((s) => (
          <ScenarioCard
            key={s.screen}
            title={s.title}
            description={s.description}
            iconColor={colors.icon}
            iconBg={colors.bg}
            Icon={s.Icon}
            onClick={() => goTo(s.screen, s.params)}
          />
        ))}
      </div>
    </section>
  )
}

export default function DemoLauncher() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Status bar safe area */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
          padding: '0 20px 34px',
        }}
      >
        {/* Header: logo + HelloFresh + Prototype badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 24,
            paddingBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: HELLOFRESH_GREEN,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                H
              </span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#242424',
                }}
              >
                HelloFresh
              </span>
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: 8,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: '#f0f0f0',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#666',
                  letterSpacing: 0.3,
                }}
              >
                Prototype
              </span>
            </div>
          </div>
        </div>

        {/* Title & subtitle */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 22,
              fontWeight: 600,
              color: '#242424',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Viral-First Social Ecosystem
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#999',
              margin: '8px 0 0',
            }}
          >
            Explore the unified prototype
          </p>
        </div>

        {/* Referral & Gifting */}
        <Section
          title="Referral & Gifting"
          colors={SECTION_COLORS.green}
          scenarios={[
            {
              title: 'Post-Signup Referral',
              description: 'New subscriber shares with a friend',
              Icon: Gift,
              screen: 'PostSignupNudge',
            },
            {
              title: 'Post-Cook Gift Nudge',
              description: 'Rate a meal, then share the love',
              Icon: Gift,
              screen: 'PostCookNudge',
            },
            {
              title: 'Share Hub',
              description: 'Permanent gifting surface',
              Icon: Gift,
              screen: 'ShareHub',
            },
            {
              title: "Friend's Experience",
              description: 'See what a referred friend receives',
              Icon: MessageCircle,
              screen: 'FriendMessage',
            },
            {
              title: 'Meal Train',
              description: 'Group gifting for life moments',
              Icon: Heart,
              screen: 'MealTrainCreate',
            },
          ]}
        />

        {/* Social Hub */}
        <Section
          title="Social Hub"
          colors={SECTION_COLORS.blue}
          scenarios={[
            {
              title: 'Discover Feed',
              description: 'Community feed, trending content',
              Icon: Compass,
              screen: 'Discover',
            },
            {
              title: 'Profile & Identity',
              description: 'Badges, stats, cooking identity',
              Icon: User,
              screen: 'Profile',
            },
            {
              title: 'Team & Challenges',
              description: 'Community groups with challenges',
              Icon: Users,
              screen: 'TeamHome',
            },
            {
              title: 'Cooking Moments',
              description: 'Prompted photos at cooking moments',
              Icon: Camera,
              screen: 'CookingMoment',
            },
            {
              title: 'Cooking Memories',
              description: 'Relive your cooking journey',
              Icon: Sparkles,
              screen: 'CookingMemories',
            },
          ]}
        />

        {/* Scorecards & Events */}
        <Section
          title="Scorecards & Events"
          colors={SECTION_COLORS.purple}
          scenarios={[
            {
              title: 'Cooking Scorecards',
              description: 'Shareable cooking stats',
              Icon: Flame,
              screen: 'ScorecardDetail',
              params: { type: 'streak' },
            },
            {
              title: 'Year in Review',
              description: 'Annual cooking summary',
              Icon: Star,
              screen: 'ScorecardDetail',
              params: { type: 'year-review' },
            },
            {
              title: 'Community Events',
              description: 'Chef AMAs, cook-alongs',
              Icon: Trophy,
              screen: 'CommunityEvent',
              params: { id: 'chef-ama' },
            },
          ]}
        />

        {/* Home indicator safe area spacer (34px is in paddingBottom of parent) */}
      </div>
    </div>
  )
}
