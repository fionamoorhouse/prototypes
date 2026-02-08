# Prototype Workspace — Task Tracker

Use this file to understand what's been built, what's in progress, and what's planned.
If picking up from another agent session, start here.

## Status Legend

- [x] Complete
- [~] In progress
- [ ] Not started

---

## MVP Build

### Phase 1: Project Structure & Config
- [x] Create directory layout (`frontend/` for future backend support)
- [x] Save PRD to `docs/prd.md`
- [x] Set up Vite + React + TypeScript
- [x] Configure Tailwind CSS with shadcn/ui theme
- [x] Configure path aliases (`@/` → `src/`)
- [x] Set up shadcn/ui (components.json, Button component)
- [x] Write README with getting-started instructions
- [x] Create this task tracker

### Phase 2: Core Infrastructure
- [x] Define shared types (`ProjectMeta`)
- [x] Build auto-discovery registry (`import.meta.glob`)
- [x] Set up React Router (gallery → project viewer)
- [x] Create `usePrototype` navigation hook (`goTo`, `goHome`)
- [x] Create `MobileFrame` wrapper component (iPhone 15-class dimensions)

### Phase 3: Views
- [x] Build Gallery home page (list of projects, minimal)
- [x] Build ProjectViewer (mobile frame + screen rendering + header)

### Phase 4: Example & Validation
- [x] Create example prototype: 3-screen onboarding flow (Welcome → CreateAccount → AllSet)
- [x] Verify dev server runs (`npm run dev` in `frontend/`)
- [x] Verify flow is interactive and clickable
- [x] Add `.gitignore`

**MVP is complete.** Dev server runs at http://localhost:5173 (or next available port).

---

## Future Work (not MVP)

### Variants
- [ ] Design variant model (multiple solutions per project)
- [ ] Add variant selector to ProjectViewer
- [ ] Gallery shows variant counts

### PRD & Guidance
- [ ] Create PRD template for product managers
- [ ] Write guide: "How to describe a prototype to Claude"
- [ ] Add sample PRDs for common patterns

### Polish
- [ ] Screen transition animations
- [ ] More shadcn/ui components (Input, Card, Dialog, etc.)
- [ ] Thumbnail previews in Gallery
- [ ] Last-modified dates in Gallery

### Backend (if needed)
- [ ] Add `backend/` directory alongside `frontend/`
- [ ] Define API contract if persistence is needed

---

## Architecture Notes (for agent context)

- **Auto-discovery**: Projects are auto-discovered via `import.meta.glob` in `src/registry.ts`. Any folder in `src/projects/` with a `meta.ts` and `screens/*.tsx` is picked up automatically.
- **Navigation**: Screens use `usePrototype()` hook which provides `goTo(screenName)` to navigate between screens within a project. Screen names match filenames (without `.tsx`).
- **Routing**: `/ → Gallery`, `/project/:projectId/:screenId → ProjectViewer`
- **Mobile frame**: 393×852px (iPhone 15 class), rendered in `MobileFrame` component
- **Stack**: Vite + React 18 + TypeScript + Tailwind CSS 3 + shadcn/ui
