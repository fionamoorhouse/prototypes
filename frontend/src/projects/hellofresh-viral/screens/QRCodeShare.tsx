import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import { ChevronLeft, Maximize2, Minimize2, Wallet, Copy, Check } from 'lucide-react'

export default function QRCodeShare() {
  const { goTo } = usePrototype()
  const [fullscreen, setFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (fullscreen) {
    return (
      <div
        onClick={() => setFullscreen(false)}
        style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setFullscreen(false) }}
          style={{ position: 'absolute', top: 60, right: 20, width: 40, height: 40, borderRadius: 20, background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Minimize2 size={20} color="#242424" />
        </button>

        {/* Large QR code */}
        <QRCodeSVG size={280} />
        <div style={{ marginTop: 20, fontSize: 18, fontWeight: 700, color: '#242424' }}>Sam Johnson</div>
        <div style={{ fontSize: 14, color: '#999', marginTop: 4 }}>Scan for a free HelloFresh box</div>

        <div style={{ position: 'absolute', bottom: 50, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <button onClick={(e) => { e.stopPropagation(); goTo('DemoLauncher') }} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <button onClick={() => goTo('Profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Share in person</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 28px' }}>
        {/* QR Card */}
        <div style={{ width: '100%', maxWidth: 320, borderRadius: 24, background: '#fff', border: '2px solid #f0f0f0', padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <QRCodeSVG size={200} />
          <div style={{ marginTop: 20, fontSize: 18, fontWeight: 700, color: '#242424' }}>Sam Johnson</div>
          <div style={{ fontSize: 13, color: '#999', marginTop: 4, lineHeight: 1.4 }}>
            Scan to claim a free HelloFresh box
          </div>
          <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 8, background: '#E8F5E0', fontSize: 12, color: '#067A46', fontWeight: 600 }}>
            3 invitations available
          </div>
        </div>

        {/* Actions */}
        <div style={{ width: '100%', maxWidth: 320, marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={() => setFullscreen(true)}
            style={{ width: '100%', height: 48, borderRadius: 24, background: '#067A46', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Maximize2 size={16} /> Full screen
          </button>

          <button
            style={{ width: '100%', height: 48, borderRadius: 24, background: '#f5f5f5', color: '#242424', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Wallet size={16} /> Save to Wallet
          </button>
        </div>

        {/* Copy link fallback */}
        <div style={{ width: '100%', maxWidth: 320, marginTop: 20 }}>
          <div style={{ fontSize: 11, color: '#ccc', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 }}>Or copy your link</div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f8f8f8', borderRadius: 12, padding: '10px 14px', border: '1px solid #f0f0f0' }}>
            <span style={{ flex: 1, fontSize: 13, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>hellofresh.com/gift/sam-j</span>
            <button onClick={handleCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#067A46', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, paddingLeft: 12 }}>
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        </div>

        <div style={{ padding: '24px 20px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => goTo('DemoLauncher')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>← All demo scenarios</button>
        </div>
      </div>
    </div>
  )
}

/* ── Simulated QR code SVG ── */
function QRCodeSVG({ size }: { size: number }) {
  const cells = 21
  const cellSize = size / cells
  // Deterministic pattern simulating a QR code
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,1,1,1,0,0,1,0,1,1,1,0,0,1,0,1,0],
    [0,1,0,1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,0,1,0],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,0,1],
    [1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,0,1,1,0],
    [0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,0,1,1,0,1,0],
    [1,0,0,0,0,0,1,0,1,0,1,1,1,0,0,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,0,1,0],
    [1,0,1,1,1,0,1,0,0,0,1,1,0,0,1,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,0],
  ]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ margin: '0 auto', display: 'block' }}>
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#242424"
              rx={1}
            />
          ) : null
        )
      )}
    </svg>
  )
}
