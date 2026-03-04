import { usePrototype } from '@/hooks/usePrototype'
import { ChevronLeft, Zap, Image, FlipHorizontal } from 'lucide-react'

export default function PhotoScan() {
  const { goTo } = usePrototype()

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#000', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 10 }}>
        <button onClick={() => goTo('CookbookHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} color="#fff" />
        </button>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Scan Recipe</span>
        <div style={{ width: 24 }} />
      </div>

      {/* Camera viewfinder */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Simulated camera feed — cookbook page */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `url(https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=700&fit=crop&auto=format&q=80) center/cover`,
          opacity: 0.85,
          filter: 'brightness(0.9)',
        }} />

        {/* Viewfinder overlay */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Top darkened area */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%', background: 'rgba(0,0,0,0.5)' }} />
          {/* Bottom darkened area */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%', background: 'rgba(0,0,0,0.5)' }} />
          {/* Left darkened */}
          <div style={{ position: 'absolute', top: '15%', left: 0, width: '8%', bottom: '15%', background: 'rgba(0,0,0,0.5)' }} />
          {/* Right darkened */}
          <div style={{ position: 'absolute', top: '15%', right: 0, width: '8%', bottom: '15%', background: 'rgba(0,0,0,0.5)' }} />

          {/* Corner brackets */}
          {[
            { top: '15%', left: '8%', borderTop: '3px solid #fff', borderLeft: '3px solid #fff', borderRadius: '6px 0 0 0' },
            { top: '15%', right: '8%', borderTop: '3px solid #fff', borderRight: '3px solid #fff', borderRadius: '0 6px 0 0' },
            { bottom: '15%', left: '8%', borderBottom: '3px solid #fff', borderLeft: '3px solid #fff', borderRadius: '0 0 0 6px' },
            { bottom: '15%', right: '8%', borderBottom: '3px solid #fff', borderRight: '3px solid #fff', borderRadius: '0 0 6px 0' },
          ].map((style, i) => (
            <div key={i} style={{ position: 'absolute', width: 28, height: 28, ...style } as React.CSSProperties} />
          ))}
        </div>

        {/* Instruction text */}
        <div style={{ position: 'absolute', bottom: '18%', left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
          <p style={{ fontSize: 15, color: '#fff', fontWeight: 500, textShadow: '0 1px 3px rgba(0,0,0,0.5)', margin: 0 }}>
            Point camera at a recipe page
          </p>
        </div>

        {/* Scanning animation line */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          right: '8%',
          height: 2,
          background: 'linear-gradient(90deg, transparent, #067A46, transparent)',
          animation: 'scan-line 2.5s ease-in-out infinite',
          zIndex: 5,
        }} />

        <style>{`
          @keyframes scan-line {
            0% { top: 15%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 82%; opacity: 0; }
          }
        `}</style>
      </div>

      {/* Bottom controls */}
      <div style={{ flexShrink: 0, padding: '20px 40px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Gallery */}
        <button style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image size={20} color="#fff" />
        </button>

        {/* Capture button */}
        <button
          onClick={() => goTo('ScanProcessing')}
          style={{
            width: 72, height: 72, borderRadius: 36,
            background: 'transparent',
            border: '4px solid #fff',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}
        >
          <div style={{ width: 58, height: 58, borderRadius: 29, background: '#fff' }} />
        </button>

        {/* Flash */}
        <button style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={20} color="#fff" />
        </button>
      </div>

      <div style={{ height: 34, flexShrink: 0, background: '#000' }} />
    </div>
  )
}
