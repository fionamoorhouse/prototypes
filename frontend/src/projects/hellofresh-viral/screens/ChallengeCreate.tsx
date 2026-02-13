import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Dumbbell,
  Flame,
  ChefHat,
  Leaf,
  Zap,
  Target,
  Clock,
  Users,
  Plus,
  Minus,
  Check,
  Pencil,
  Trophy,
} from 'lucide-react'

/* ── Template data ── */
const templates = [
  {
    id: 'cuisine',
    icon: '🌍',
    title: 'Cuisine Explorer',
    description: 'Try recipes from new cuisines',
    defaultGoal: 3,
    goalUnit: 'cuisines',
    defaultDuration: 4,
    gradient: 'linear-gradient(135deg, #067A46, #0a9e5c)',
    badge: 'World Traveler',
  },
  {
    id: 'protein',
    icon: '💪',
    title: 'High Protein',
    description: 'Cook meals with 30g+ protein',
    defaultGoal: 5,
    goalUnit: 'meals',
    defaultDuration: 1,
    gradient: 'linear-gradient(135deg, #DC2626, #F97316)',
    badge: 'Protein Machine',
  },
  {
    id: 'frequency',
    icon: '🍳',
    title: 'Cooking Streak',
    description: 'Cook a certain number of meals',
    defaultGoal: 5,
    goalUnit: 'meals',
    defaultDuration: 1,
    gradient: 'linear-gradient(135deg, #EF4444, #F97316)',
    badge: '5-Meal Warrior',
  },
  {
    id: 'fiber',
    icon: '🌾',
    title: 'Fiber Challenge',
    description: 'Average 30g+ daily fiber',
    defaultGoal: 30,
    goalUnit: 'g avg/day',
    defaultDuration: 2,
    gradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
    badge: 'Fiber Champion',
  },
  {
    id: 'variety',
    icon: '🎲',
    title: 'Recipe Roulette',
    description: 'Cook recipes you\'ve never tried',
    defaultGoal: 10,
    goalUnit: 'new recipes',
    defaultDuration: 4,
    gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    badge: 'Adventurer',
  },
  {
    id: 'team-goal',
    icon: '🏆',
    title: 'Team Goal',
    description: 'Total meals by the whole team',
    defaultGoal: 100,
    goalUnit: 'team meals',
    defaultDuration: 4,
    gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    badge: 'Team Champion',
  },
]

type Step = 'template' | 'customize' | 'confirm' | 'created'

export default function ChallengeCreate() {
  const { goTo } = usePrototype()
  const [step, setStep] = useState<Step>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customTitle, setCustomTitle] = useState('')
  const [goal, setGoal] = useState(3)
  const [duration, setDuration] = useState(4)
  const [isCustom, setIsCustom] = useState(false)

  const template = templates.find(t => t.id === selectedTemplate)

  const selectTemplate = (id: string) => {
    const tmpl = templates.find(t => t.id === id)
    if (tmpl) {
      setSelectedTemplate(id)
      setCustomTitle(tmpl.title)
      setGoal(tmpl.defaultGoal)
      setDuration(tmpl.defaultDuration)
      setIsCustom(false)
      setStep('customize')
    }
  }

  const startCustom = () => {
    setSelectedTemplate(null)
    setCustomTitle('')
    setGoal(5)
    setDuration(2)
    setIsCustom(true)
    setStep('customize')
  }

  /* ── Created confirmation ── */
  if (step === 'created') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Check size={40} color="#067A46" />
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#242424', textAlign: 'center', margin: '0 0 8px' }}>
          Challenge created!
        </h1>
        <p style={{ fontSize: 15, color: '#999', textAlign: 'center', margin: '0 0 6px' }}>
          "{customTitle || 'Your challenge'}" is now live for the team.
        </p>
        <p style={{ fontSize: 13, color: '#ccc', textAlign: 'center', margin: '0 0 32px' }}>
          {duration} week{duration > 1 ? 's' : ''} · Goal: {goal} {template?.goalUnit || 'items'}
        </p>
        <button
          onClick={() => goTo('ChallengeDetail', { id: 'cuisine-explorer' })}
          style={{ width: '100%', maxWidth: 280, height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}
        >
          View challenge
        </button>
        <button
          onClick={() => goTo('TeamHome')}
          style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#999', textDecoration: 'underline' }}
        >
          Back to team
        </button>
      </div>
    )
  }

  /* ── Confirm step ── */
  if (step === 'confirm') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0 }} />
        <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
          <button onClick={() => setStep('customize')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <ChevronLeft size={22} color="#242424" />
          </button>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Review challenge</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {/* Preview card */}
          <div
            style={{
              borderRadius: 20,
              background: template?.gradient || 'linear-gradient(135deg, #242424, #444)',
              padding: '24px 20px',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 20,
            }}
          >
            <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.8, marginBottom: 6 }}>
              {isCustom ? 'Custom Challenge' : 'Team Challenge'}
            </div>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{template?.icon || '🎯'}</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{customTitle || 'Custom Challenge'}</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.85 }}>
                <Clock size={14} />
                <span style={{ fontSize: 13 }}>{duration} week{duration > 1 ? 's' : ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.85 }}>
                <Target size={14} />
                <span style={{ fontSize: 13 }}>{goal} {template?.goalUnit || 'items'}</span>
              </div>
            </div>
          </div>

          {/* Details list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Challenge name', value: customTitle || 'Custom Challenge' },
              { label: 'Goal', value: `${goal} ${template?.goalUnit || 'items'}` },
              { label: 'Duration', value: `${duration} week${duration > 1 ? 's' : ''}` },
              { label: 'Team', value: 'Weeknight Warriors (247 members)' },
              { label: 'Badge reward', value: template?.badge || 'Custom Badge' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 4 ? '1px solid #f5f5f5' : 'none' }}>
                <span style={{ fontSize: 14, color: '#999' }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Info note */}
          <div style={{ marginTop: 20, padding: '12px 14px', borderRadius: 12, background: '#E8F5E0', border: '1px solid rgba(6,122,70,0.1)' }}>
            <div style={{ fontSize: 13, color: '#333', lineHeight: 1.5 }}>
              All team members will be notified and can join the challenge immediately. Challenge progress is tracked automatically based on HelloFresh cooking activity.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '12px 20px 44px' }}>
          <button
            onClick={() => setStep('created')}
            style={{ width: '100%', height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Trophy size={18} /> Launch challenge
          </button>
        </div>
      </div>
    )
  }

  /* ── Customize step ── */
  if (step === 'customize') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0 }} />
        <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
          <button onClick={() => setStep('template')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <ChevronLeft size={22} color="#242424" />
          </button>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Customize</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {/* Template indicator */}
          {template && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>{template.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>{template.title} Template</div>
                <div style={{ fontSize: 12, color: '#999' }}>{template.description}</div>
              </div>
            </div>
          )}

          {/* Challenge name */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 6 }}>Challenge Name</div>
            <input
              value={customTitle}
              onChange={e => setCustomTitle(e.target.value)}
              placeholder="e.g., Try 3 New Cuisines"
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #e8e8e8', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          {/* Goal */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 6 }}>Goal</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                onClick={() => setGoal(Math.max(1, goal - 1))}
                style={{ width: 44, height: 44, borderRadius: 22, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Minus size={18} color="#242424" />
              </button>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#242424' }}>{goal}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{template?.goalUnit || 'items'}</div>
              </div>
              <button
                onClick={() => setGoal(goal + 1)}
                style={{ width: 44, height: 44, borderRadius: 22, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Plus size={18} color="#242424" />
              </button>
            </div>
          </div>

          {/* Duration */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10 }}>Duration</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4].map(w => (
                <button
                  key={w}
                  onClick={() => setDuration(w)}
                  style={{
                    flex: 1,
                    padding: '12px 8px',
                    borderRadius: 12,
                    background: duration === w ? '#067A46' : '#f5f5f5',
                    color: duration === w ? '#fff' : '#242424',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{w}</div>
                  <div style={{ fontSize: 10, marginTop: 2, opacity: 0.7 }}>week{w > 1 ? 's' : ''}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Team */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 6 }}>Team</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: '1px solid #e8e8e8' }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>Weeknight Warriors</div>
                <div style={{ fontSize: 12, color: '#999' }}>247 members</div>
              </div>
              <ChevronRight size={16} color="#ccc" />
            </div>
          </div>

          {/* Badge reward preview */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 6 }}>Reward</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, background: '#FFF8E1', border: '1px solid #FEF3C7' }}>
              <Trophy size={18} color="#F59E0B" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{template?.badge || 'Custom'} badge</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>All finishers earn the badge · Top 3 get podium variant</div>
              </div>
            </div>
          </div>

          <div style={{ height: 80 }} />
        </div>

        {/* Bottom CTA */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 44px', background: 'linear-gradient(transparent, #fff 20%)' }}>
          <button
            onClick={() => setStep('confirm')}
            style={{ width: '100%', height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}
          >
            Review challenge
          </button>
        </div>
      </div>
    )
  }

  /* ── Template selection step ── */
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <button onClick={() => goTo('TeamHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Create a Challenge</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {/* Intro */}
        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5, margin: '0 0 20px' }}>
          Pick a template to get started quickly, or create a fully custom challenge for your team.
        </p>

        {/* Templates */}
        <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10 }}>Templates</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {templates.map(tmpl => (
            <button
              key={tmpl.id}
              onClick={() => selectTemplate(tmpl.id)}
              style={{
                borderRadius: 16,
                background: tmpl.gradient,
                padding: '16px 14px',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: -15, right: -15, width: 50, height: 50, borderRadius: 25, background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ fontSize: 28, marginBottom: 8 }}>{tmpl.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{tmpl.title}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>{tmpl.description}</div>
            </button>
          ))}
        </div>

        {/* Custom option */}
        <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10 }}>Or</div>
        <button
          onClick={startCustom}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px',
            borderRadius: 16,
            background: '#f9f9f9',
            border: '1.5px dashed #ddd',
            cursor: 'pointer',
          }}
        >
          <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', border: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pencil size={20} color="#242424" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>Custom Challenge</div>
            <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>Define your own rules and goals</div>
          </div>
          <ChevronRight size={18} color="#ccc" style={{ marginLeft: 'auto' }} />
        </button>

        {/* Demo links */}
        <div style={{ padding: '28px 0 8px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#ddd', fontWeight: 600, letterSpacing: 0.5 }}>DEMO SCREENS</span>
          <button onClick={() => goTo('TeamHome')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Back to Team Home</button>
          <button onClick={() => goTo('ChallengeDetail', { id: 'cuisine-explorer' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Challenge Detail</button>
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}
