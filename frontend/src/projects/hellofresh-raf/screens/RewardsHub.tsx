import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, Gift, Star, Trophy, ChevronRight, Ticket, Truck, ShoppingBag, Home, UtensilsCrossed, BookOpen, User, Check, Lock } from 'lucide-react'

export default function RewardsHub() {
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
        background: '#fff',
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
          padding: '0 20px',
          gap: 12,
        }}
      >
        <button
          onClick={() => goTo('ShareHub')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}
        >
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 20,
            fontWeight: 700,
            color: '#242424',
          }}
        >
          My Rewards
        </span>
      </div>

      <div style={{ height: 1, background: '#f3f3f3', flexShrink: 0 }} />

      {/* ===== Scrollable content ===== */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Loyalty tier card */}
        <div
          style={{
            margin: '16px 20px 0',
            borderRadius: 18,
            background: 'linear-gradient(135deg, #6B21A8 0%, #7C3AED 50%, #A855F7 100%)',
            padding: '20px',
            color: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Trophy size={20} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8 }}>Rewards</span>
            </div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Home Cook</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 32, fontWeight: 800 }}>500</span>
            <span style={{ fontSize: 14, opacity: 0.8 }}>points</span>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 12, marginBottom: 6 }}>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.25)' }}>
              <div style={{ height: 6, borderRadius: 3, background: '#fff', width: '60%' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.7 }}>
            <span>3 / 5 orders</span>
            <span>Dinner Hero</span>
          </div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.9 }}>
            Just 2 more orders to reach Dinner Hero status!
          </div>
        </div>

        {/* Active discounts section */}
        <div style={{ padding: '24px 20px 0' }}>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 17,
              fontWeight: 700,
              color: '#242424',
              margin: '0 0 14px',
            }}
          >
            Your Benefits
          </h2>

          {/* Empty discounts state — drives to referral */}
          <div
            style={{
              borderRadius: 14,
              background: '#f9f9f9',
              border: '1px solid #f0f0f0',
              padding: '14px 16px',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ticket size={18} color="#bbb" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#888' }}>No discounts right now</div>
              <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>Earn rewards by sharing with friends ↓</div>
            </div>
          </div>

          {/* Referral reward card — prominent because no discounts */}
          <div
            onClick={() => goTo('ShareHub')}
            style={{
              borderRadius: 16,
              background: '#E8F5E0',
              border: '1.5px solid rgba(6,122,70,0.15)',
              padding: '18px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gift icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#067A46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Gift size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>Share with friends</div>
                <div style={{ fontSize: 12, color: '#067A46', fontWeight: 600 }}>3 invitations available</div>
              </div>
              <ChevronRight size={18} color="#067A46" style={{ marginLeft: 'auto' }} />
            </div>

            <div style={{ fontSize: 14, color: '#333', lineHeight: 1.5, marginBottom: 10 }}>
              Your referral reward: <strong style={{ color: '#067A46' }}>$35 off</strong> your next box
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(6,122,70,0.1)',
                fontSize: 12,
                color: '#067A46',
                fontWeight: 600,
              }}
            >
              <Star size={12} />
              At Dinner Hero tier: $45 off + 3x loyalty points
            </div>
          </div>
        </div>

        {/* Earn points missions */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 17,
                fontWeight: 700,
                color: '#242424',
                margin: 0,
              }}
            >
              Earn Points
            </h2>
            <span style={{ fontSize: 12, color: '#999' }}>New</span>
          </div>

          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {/* Rate meals mission */}
            <div
              style={{
                flexShrink: 0,
                width: 140,
                borderRadius: 14,
                background: '#fff',
                border: '1px solid #f0f0f0',
                padding: '14px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: '#FFF8E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                }}
              >
                <Star size={20} color="#F59E0B" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#242424', marginBottom: 4 }}>Rate meals</div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2px 8px',
                  borderRadius: 8,
                  background: '#E8F5E0',
                  fontSize: 12,
                  color: '#067A46',
                  fontWeight: 700,
                }}
              >
                +400
              </div>
            </div>

            {/* Refer a friend mission */}
            <div
              onClick={() => goTo('ShareHub')}
              style={{
                flexShrink: 0,
                width: 140,
                borderRadius: 14,
                background: '#fff',
                border: '1.5px solid #067A46',
                padding: '14px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: '#E8F5E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                }}
              >
                <Gift size={20} color="#067A46" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#242424', marginBottom: 4 }}>Refer a friend</div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2px 8px',
                  borderRadius: 8,
                  background: '#E8F5E0',
                  fontSize: 12,
                  color: '#067A46',
                  fontWeight: 700,
                }}
              >
                +1000
              </div>
            </div>

            {/* Locked mission */}
            <div
              style={{
                flexShrink: 0,
                width: 140,
                borderRadius: 14,
                background: '#fafafa',
                border: '1px solid #f0f0f0',
                padding: '14px',
                textAlign: 'center',
                opacity: 0.6,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                }}
              >
                <Lock size={18} color="#bbb" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#999', marginBottom: 4 }}>Download app</div>
              <div style={{ fontSize: 11, color: '#bbb' }}>Unlocks soon</div>
            </div>
          </div>
        </div>

        {/* Explore rewards */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>
              Redeem Points
            </h2>
            <span style={{ fontSize: 13, color: '#067A46', fontWeight: 600, cursor: 'pointer' }}>View all</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: '$5 off premium meals', points: 400, Icon: Ticket, color: '#F59E0B' },
              { label: 'Free shipping', points: 1400, Icon: Truck, color: '#067A46' },
              { label: '$15 off add-ons', points: 800, Icon: ShoppingBag, color: '#8B5CF6' },
              { label: '$30 off next order', points: 1800, Icon: Ticket, color: '#EF4444' },
            ].map((reward, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 14,
                  background: '#fff',
                  border: '1px solid #f0f0f0',
                  padding: '14px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${reward.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                  }}
                >
                  <reward.Icon size={18} color={reward.color} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#242424', marginBottom: 6, lineHeight: 1.3 }}>
                  {reward.label}
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '3px 10px',
                    borderRadius: 8,
                    background: reward.points <= 500 ? '#067A46' : '#f0f0f0',
                    color: reward.points <= 500 ? '#fff' : '#888',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {reward.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral history */}
        <div style={{ padding: '24px 20px 0' }}>
          <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 14px' }}>
            Referral Activity
          </h2>
          <div style={{ borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#242424' }}>$35</div>
                <div style={{ fontSize: 11, color: '#999' }}>earned</div>
              </div>
              <div style={{ width: 1, background: '#e8e8e8' }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F59E0B' }}>$35</div>
                <div style={{ fontSize: 11, color: '#999' }}>pending</div>
              </div>
              <div style={{ width: 1, background: '#e8e8e8' }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#242424' }}>2</div>
                <div style={{ fontSize: 11, color: '#999' }}>friends shared</div>
              </div>
            </div>
            <button
              onClick={() => goTo('ShareHub')}
              style={{
                width: '100%',
                height: 40,
                borderRadius: 20,
                background: '#067A46',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Send more invites
            </button>
          </div>
        </div>

        {/* Demo links */}
        <div style={{ padding: '28px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#ccc', fontWeight: 600, letterSpacing: 0.5 }}>DEMO</span>
          <button onClick={() => goTo('ShareHub')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Go to Share Hub
          </button>
          <button onClick={() => goTo('PostCookNudge')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Scenario 1: Post-cook nudge
          </button>
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* ===== Tab bar ===== */}
      <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
        {[
          { Icon: Home, label: 'Home', screen: 'PostCookNudge' },
          { Icon: UtensilsCrossed, label: 'My Menu', screen: '' },
          { Icon: Gift, label: 'Share', screen: 'ShareHub' },
          { Icon: BookOpen, label: 'Cookbook', screen: '' },
          { Icon: User, label: 'Profile', screen: '', active: true },
        ].map((tab) => (
          <button key={tab.label} onClick={() => tab.screen && goTo(tab.screen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: tab.screen ? 'pointer' : 'default', color: tab.active ? '#067A46' : '#aaa', padding: '4px 12px' }}>
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}
