import { ComponentType } from 'react'
import type { ProjectMeta } from '@/types'

export interface Project {
  id: string
  meta: ProjectMeta
  screens: Record<string, ComponentType>
}

// Auto-discover project metadata
const metaModules = import.meta.glob<{ default: ProjectMeta }>(
  './projects/*/meta.ts',
  { eager: true },
)

// Auto-discover screen components
const screenModules = import.meta.glob<{ default: ComponentType }>(
  './projects/*/screens/*.tsx',
  { eager: true },
)

function buildRegistry(): Project[] {
  const projects: Record<string, Project> = {}

  for (const [path, mod] of Object.entries(metaModules)) {
    const match = path.match(/\.\/projects\/([^/]+)\/meta\.ts/)
    if (!match) continue
    const id = match[1]
    projects[id] = { id, meta: mod.default, screens: {} }
  }

  for (const [path, mod] of Object.entries(screenModules)) {
    const match = path.match(/\.\/projects\/([^/]+)\/screens\/([^/]+)\.tsx/)
    if (!match) continue
    const [, projectId, screenName] = match
    if (projects[projectId]) {
      projects[projectId].screens[screenName] = mod.default
    }
  }

  return Object.values(projects)
}

let _cache: Project[] | null = null

export function getProjects(): Project[] {
  if (!_cache) _cache = buildRegistry()
  return _cache
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id)
}
