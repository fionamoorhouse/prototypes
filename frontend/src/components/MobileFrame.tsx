import { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div
      className="relative bg-white rounded-[2.5rem] shadow-2xl border border-gray-200"
      style={{ width: 393, height: 852, overflow: 'hidden' }}
    >
      {/* Inner wrapper: provides flex context for screen children and clips overlays */}
      <div
        className="flex flex-col"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}
