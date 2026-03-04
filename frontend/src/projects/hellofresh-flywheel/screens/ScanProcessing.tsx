import { useState, useEffect } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import { Sparkles } from 'lucide-react'

const steps = [
  { label: 'Reading recipe text...', duration: 1200 },
  { label: 'Extracting ingredients...', duration: 1000 },
  { label: 'Structuring steps...', duration: 1100 },
  { label: 'Almost done...', duration: 800 },
]

export default function ScanProcessing() {
  const { goTo } = usePrototype()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(
        () => setCurrentStep(s => s + 1),
        steps[currentStep].duration,
      )
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => goTo('ScanResult'), 400)
      return () => clearTimeout(timer)
    }
  }, [currentStep, goTo])

  const progress = Math.min(currentStep / steps.length, 1)

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
        {/* Spinning icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 40,
          background: '#E8F5E0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 32,
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <Sparkles size={36} color="#067A46" style={{ animation: 'spin-slow 3s linear infinite' }} />
        </div>

        <h2 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 22, fontWeight: 700, color: '#242424',
          margin: '0 0 12px', textAlign: 'center',
        }}>
          AI is reading your recipe
        </h2>

        {/* Step indicators */}
        <div style={{ width: '100%', maxWidth: 260, marginBottom: 32 }}>
          {steps.map((step, i) => {
            const isActive = i === currentStep
            const isDone = i < currentStep
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  opacity: isDone ? 0.5 : isActive ? 1 : 0.3,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: 10,
                  background: isDone ? '#067A46' : isActive ? '#E8F5E0' : '#f0f0f0',
                  border: isActive ? '2px solid #067A46' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {isDone && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>}
                  {isActive && <div style={{ width: 6, height: 6, borderRadius: 3, background: '#067A46' }} />}
                </div>
                <span style={{ fontSize: 14, color: isActive ? '#242424' : '#888', fontWeight: isActive ? 600 : 400 }}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', maxWidth: 260, height: 4, borderRadius: 2, background: '#f0f0f0', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: 'linear-gradient(90deg, #067A46, #0a9e5c)',
            width: `${progress * 100}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      <div style={{ height: 34, flexShrink: 0 }} />

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
