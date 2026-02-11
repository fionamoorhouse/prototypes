import { useEffect } from 'react'
import { usePrototype } from '@/hooks/usePrototype'

/* ------------------------------------------------------------------ */
/*  Screen 5: First Save Celebration (redirect)                        */
/*                                                                     */
/*  The celebration is now a drawer on the Cookbook screen.             */
/*  This screen just redirects there so demo nav links still work.     */
/* ------------------------------------------------------------------ */

export default function FirstSaveCelebration() {
  const { goTo } = usePrototype()

  useEffect(() => {
    goTo('Cookbook', { celebration: 'true' })
  }, [goTo])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: 14, color: '#aaa' }}>Redirecting…</span>
    </div>
  )
}
