import { usePrototype } from '@/hooks/usePrototype'
import {
  BookOpen,
  Camera,
  ChefHat,
  ChevronRight,
  Download,
  Lightbulb,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Home,
} from 'lucide-react'

const HELLOFRESH_GREEN = '#067A46'

const SECTION_COLORS = {
  fill: { icon: '#2563EB', bg: '#DBEAFE' },
  solve: { icon: '#067A46', bg: '#E8F5E0' },
  grow: { icon: '#D97706', bg: '#FEF3C7' },
} as const

interface ScenarioCardProps {
  title: string
  description: string
  iconColor: string
  iconBg: string
  Icon: typeof BookOpen
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
  subtitle: string
  scenarios: { title: string; description: string; Icon: typeof BookOpen; screen: string; params?: Record<string, string> }[]
  colors: (typeof SECTION_COLORS)[keyof typeof SECTION_COLORS]
}

function Section({ title, subtitle, scenarios, colors }: SectionProps) {
  const { goTo } = usePrototype()

  return (
    <section style={{ marginBottom: 28 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 6,
          paddingTop: 4,
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #eee)' }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, color: '#bbb', textTransform: 'uppercase' }}>
          {title}
        </span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #eee, transparent)' }} />
      </div>
      <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', margin: '0 0 14px', lineHeight: 1.4 }}>{subtitle}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {scenarios.map((s) => (
          <ScenarioCard
            key={s.screen + (s.params ? JSON.stringify(s.params) : '')}
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
  const { goTo } = usePrototype()

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
      <div style={{ height: 54, flexShrink: 0 }} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, padding: '0 20px 34px' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, paddingBottom: 20 }}>
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
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700, color: '#fff' }}>H</span>
            </div>
            <div>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#242424' }}>HelloFresh</span>
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

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: '#242424', margin: 0, lineHeight: 1.3 }}>
            Dinner Decision Flywheel
          </h1>
          <p style={{ fontSize: 14, color: '#999', margin: '8px 0 0', lineHeight: 1.4 }}>
            Fill your cookbook, solve dinner, grow your collection
          </p>
        </div>

        {/* Main entry point */}
        <div
          onClick={() => goTo('CookbookHome')}
          style={{
            background: `linear-gradient(135deg, ${HELLOFRESH_GREEN}, #0a9e5c)`,
            borderRadius: 16,
            padding: '20px 18px',
            marginBottom: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BookOpen size={24} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Start: Open Cookbook</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>
              The full walkthrough — spotlight, AI creator, grocery list
            </div>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.7)" />
        </div>

        <Section
          title="Fill It"
          subtitle="Make it effortless to build a meaningful recipe collection"
          colors={SECTION_COLORS.fill}
          scenarios={[
            {
              title: 'Bulk Import from Social',
              description: 'Import 14 recipes from Instagram & TikTok instantly',
              Icon: Download,
              screen: 'ImportPrompt',
            },
            {
              title: 'Photo Scan a Cookbook',
              description: 'Point camera at a recipe, AI extracts it',
              Icon: Camera,
              screen: 'PhotoScan',
            },
          ]}
        />

        <Section
          title="Solve Dinner"
          subtitle="Answer 'what's for dinner tonight?' with your collection"
          colors={SECTION_COLORS.solve}
          scenarios={[
            {
              title: 'AI Dinner Creator',
              description: 'Enter ingredients, get a custom recipe',
              Icon: ChefHat,
              screen: 'AIDinnerInput',
            },
            {
              title: 'Weekly Grocery List',
              description: 'Pick recipes for the week, generate a list',
              Icon: ShoppingCart,
              screen: 'GrocerySelect',
            },
            {
              title: 'Household Collaboration',
              description: "Decide tonight's dinner together",
              Icon: Lightbulb,
              screen: 'CookbookHome',
              params: { collab: 'true' },
            },
          ]}
        />

        <Section
          title="Grow It"
          subtitle="Smart recs keep your collection growing passively"
          colors={SECTION_COLORS.grow}
          scenarios={[
            {
              title: 'Post-Save Recommendations',
              description: 'Save a recipe, discover related ones',
              Icon: Sparkles,
              screen: 'PostSaveRecs',
            },
            {
              title: 'Home Feed Integration',
              description: 'Cookbook recs on the main feed',
              Icon: Home,
              screen: 'HomeFeed',
            },
            {
              title: 'Recipe Detail + More Like This',
              description: 'Related recipes at the bottom of any recipe',
              Icon: TrendingUp,
              screen: 'RecipeDetail',
            },
          ]}
        />
      </div>
    </div>
  )
}
