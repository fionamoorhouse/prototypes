import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  Plus,
  UserPlus,
  Link2,
  Copy,
  Check,
  Send,
  Users,
  X,
} from 'lucide-react'

const avatarImg = (id: string, size = 100) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

const initialContributors = [
  { name: 'You (Organizer)', avatar: '1494790108377-be9c29b29330', amount: 60, isOrganizer: true },
]

export default function MealTrainInvite() {
  const { goTo } = usePrototype()
  const [contributors, setContributors] = useState(initialContributors)
  const [splitMode, setSplitMode] = useState<'even' | 'custom'>('even')
  const [copied, setCopied] = useState(false)
  const [showAddRow, setShowAddRow] = useState(false)
  const [newName, setNewName] = useState('')
  const [sent, setSent] = useState(false)

  const totalCost = 239.96 // 4 weeks × $59.99
  const perPerson = (totalCost / contributors.length).toFixed(2)

  const addContributor = () => {
    if (newName.trim()) {
      setContributors([...contributors, {
        name: newName.trim(),
        avatar: '',
        amount: 0,
        isOrganizer: false,
      }])
      setNewName('')
      setShowAddRow(false)
    }
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (sent) {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: '#E8F5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Send size={36} color="#067A46" />
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#242424', textAlign: 'center', margin: '0 0 8px' }}>
          Invitations sent!
        </h1>
        <p style={{ fontSize: 15, color: '#999', textAlign: 'center', margin: '0 0 6px', lineHeight: 1.5 }}>
          {contributors.length - 1} friend{contributors.length - 1 !== 1 ? 's' : ''} will receive your invitation to contribute to Maria's Meal Train.
        </p>
        <p style={{ fontSize: 13, color: '#ccc', textAlign: 'center', margin: '0 0 32px' }}>
          We'll notify you as contributions come in.
        </p>
        <button onClick={() => goTo('Profile')} style={{ width: '100%', maxWidth: 260, height: 48, borderRadius: 24, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
          Back to Profile
        </button>
        <button onClick={() => goTo('MealTrainClaim')} style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#999', textDecoration: 'underline' }}>
          Preview recipient view →
        </button>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <button onClick={() => goTo('MealTrainCreate')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Invite contributors</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Summary card */}
        <div style={{ margin: '12px 20px 0', borderRadius: 16, background: '#FEF3C7', padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20 }}>👶</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>Meal Train for Maria</div>
            <div style={{ fontSize: 12, color: '#92400E' }}>New baby · 4 weeks · 3 meals for 2</div>
          </div>
        </div>

        {/* Cost breakdown */}
        <div style={{ margin: '16px 20px 0', borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>Total cost</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>${totalCost.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: '#999' }}>
              <Users size={12} style={{ verticalAlign: -1 }} /> {contributors.length} contributor{contributors.length !== 1 ? 's' : ''} · ${perPerson} each
            </span>
          </div>
        </div>

        {/* Split mode toggle */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', borderRadius: 12, background: '#f5f5f5', padding: 3 }}>
            {(['even', 'custom'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setSplitMode(mode)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  borderRadius: 10,
                  background: splitMode === mode ? '#fff' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  color: splitMode === mode ? '#242424' : '#999',
                  boxShadow: splitMode === mode ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {mode === 'even' ? 'Split evenly' : 'Set your own'}
              </button>
            ))}
          </div>
        </div>

        {/* Contributors list */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 10, letterSpacing: 0.3, textTransform: 'uppercase' }}>Contributors</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {contributors.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0' }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden', background: '#e8e8e8', flexShrink: 0 }}>
                  {c.avatar && <img src={avatarImg(c.avatar)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  {!c.avatar && <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 16, fontWeight: 700 }}>{c.name.charAt(0)}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>{c.name}</div>
                  {c.isOrganizer && <div style={{ fontSize: 11, color: '#067A46', fontWeight: 600 }}>Organizer</div>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>${perPerson}</div>
                {!c.isOrganizer && (
                  <button
                    onClick={() => setContributors(contributors.filter((_, idx) => idx !== i))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#ccc' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}

            {/* Add contributor row */}
            {showAddRow ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 14, border: '1.5px dashed #067A46' }}>
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addContributor()}
                  placeholder="Name or phone"
                  autoFocus
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit', background: 'transparent' }}
                />
                <button onClick={addContributor} style={{ background: '#067A46', border: 'none', borderRadius: 16, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={16} color="#fff" />
                </button>
                <button onClick={() => { setShowAddRow(false); setNewName('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#ccc' }}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddRow(true)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, border: '1.5px dashed #ddd', background: 'none', cursor: 'pointer' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 20, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserPlus size={18} color="#999" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#999' }}>Add a contributor</span>
              </button>
            )}
          </div>
        </div>

        {/* Share invite link */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#999', marginBottom: 8, letterSpacing: 0.3, textTransform: 'uppercase' }}>Or share an invite link</div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f8f8f8', borderRadius: 12, padding: '10px 14px', border: '1px solid #f0f0f0' }}>
            <Link2 size={16} color="#999" style={{ marginRight: 8, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>hellofresh.com/mealtrain/abc123</span>
            <button onClick={handleCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#067A46', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, paddingLeft: 12 }}>
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        </div>

        <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>

        <div style={{ height: 100 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 44px', background: 'linear-gradient(transparent, #fff 20%)' }}>
        <button
          onClick={() => setSent(true)}
          style={{ width: '100%', height: 52, borderRadius: 26, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <Send size={18} /> Send invitations
        </button>
      </div>
    </div>
  )
}
