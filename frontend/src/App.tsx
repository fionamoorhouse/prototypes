import { Routes, Route } from 'react-router-dom'
import { Gallery } from '@/components/Gallery'
import { ProjectViewer } from '@/components/ProjectViewer'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/project/:projectId" element={<ProjectViewer />} />
      <Route path="/project/:projectId/:screenId" element={<ProjectViewer />} />
    </Routes>
  )
}
