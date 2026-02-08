import { useNavigate, useParams } from 'react-router-dom'
import { useCallback } from 'react'

export function usePrototype() {
  const navigate = useNavigate()
  const { projectId, screenId } = useParams<{
    projectId: string
    screenId: string
  }>()

  const goTo = useCallback(
    (screen: string) => {
      navigate(`/project/${projectId}/${screen}`)
    },
    [navigate, projectId],
  )

  const goHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  return { goTo, goHome, projectId, screenId }
}
