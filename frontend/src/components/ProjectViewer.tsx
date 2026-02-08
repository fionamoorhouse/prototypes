import { useParams, Link, Navigate } from 'react-router-dom'
import { getProject } from '@/registry'
import { MobileFrame } from './MobileFrame'
import { ArrowLeft } from 'lucide-react'

export function ProjectViewer() {
  const { projectId, screenId } = useParams<{
    projectId: string
    screenId: string
  }>()

  const project = projectId ? getProject(projectId) : undefined

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Project not found.</p>
          <Link
            to="/"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Back to gallery
          </Link>
        </div>
      </div>
    )
  }

  // Redirect to start screen if no screenId provided
  if (!screenId) {
    return (
      <Navigate
        to={`/project/${projectId}/${project.meta.startScreen}`}
        replace
      />
    )
  }

  const ScreenComponent = project.screens[screenId]

  if (!ScreenComponent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">
            Screen &ldquo;{screenId}&rdquo; not found.
          </p>
          <Link
            to={`/project/${projectId}/${project.meta.startScreen}`}
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Go to start screen
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl px-4 py-4 flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Gallery
        </Link>
        <span className="text-gray-300">|</span>
        <span className="text-sm font-medium text-gray-700">
          {project.meta.title}
        </span>
        <span className="text-gray-300">&middot;</span>
        <span className="text-xs text-gray-400">{screenId}</span>
      </div>

      {/* Phone frame */}
      <div className="flex-1 flex items-center justify-center pb-8">
        <MobileFrame>
          <ScreenComponent />
        </MobileFrame>
      </div>
    </div>
  )
}
