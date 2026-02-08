import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export function usePrototype() {
  const navigate = useNavigate()
  const { projectId, screenId } = useParams<{
    projectId: string
    screenId: string
  }>()
  const [searchParams] = useSearchParams()

  const goTo = useCallback(
    (screen: string, params?: Record<string, string>) => {
      const search = params
        ? '?' + new URLSearchParams(params).toString()
        : ''
      navigate(`/project/${projectId}/${screen}${search}`)
    },
    [navigate, projectId],
  )

  const goHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  return { goTo, goHome, projectId, screenId, searchParams }
}
