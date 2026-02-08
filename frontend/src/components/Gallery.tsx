import { Link } from 'react-router-dom'
import { getProjects } from '@/registry'

export function Gallery() {
  const projects = getProjects()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Prototypes</h1>
        <p className="text-gray-500 mt-2">
          Click a project to explore its flow.
        </p>

        <div className="mt-8 space-y-4">
          {projects.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No projects yet.</p>
              <p className="text-sm mt-2">
                Create a folder in{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                  src/projects/
                </code>{' '}
                to get started.
              </p>
            </div>
          )}

          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}/${project.meta.startScreen}`}
              className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {project.meta.title}
              </h2>
              {project.meta.description && (
                <p className="text-gray-500 mt-1 text-sm">
                  {project.meta.description}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-3">
                {Object.keys(project.screens).length} screen
                {Object.keys(project.screens).length !== 1 ? 's' : ''}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
