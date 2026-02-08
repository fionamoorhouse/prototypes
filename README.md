# Prototype Workspace

A local tool for exploring product ideas as clickable, mobile-framed prototypes.
Built for use with Claude Code in VS Code.

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## How It Works

1. Open this repo in VS Code
2. Start the dev server (`npm run dev` in the `frontend/` folder)
3. Describe a product idea to Claude Code in the terminal
4. Claude creates a prototype — a set of interactive screens in a mobile phone frame
5. Click through the flow in your browser
6. Ask Claude to adjust anything: layout, copy, interactions, flow
7. Repeat until the idea feels right

## Project Structure

Each prototype lives in its own folder under `frontend/src/projects/`:

```
frontend/src/projects/
  └── your-project-name/
      ├── meta.ts              # Title, description, start screen
      └── screens/
          ├── Welcome.tsx       # Each screen is a React component
          ├── ChooseGoal.tsx
          └── Confirmation.tsx
```

Projects are **auto-discovered** — create a new folder and it appears in the gallery.

## Creating a New Prototype

Ask Claude Code something like:

> "Create a new prototype for an onboarding flow for a fitness app.
> It should have 4 screens: welcome, goal selection, plan preview, and confirmation."

Claude will create the project folder, metadata file, and all screen components.

## How Screens Navigate

Screens use `goTo('ScreenName')` to link to other screens in the same project:

```tsx
import { usePrototype } from '@/hooks/usePrototype'
import { Button } from '@/components/ui/button'

export default function Welcome() {
  const { goTo } = usePrototype()

  return (
    <div className="flex flex-col min-h-full px-6 pt-14 pb-10">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <Button onClick={() => goTo('NextScreen')}>Continue</Button>
    </div>
  )
}
```

The screen name in `goTo()` matches the filename without `.tsx`.

## Folder Layout

```
prototypes/
├── docs/
│   └── prd.md              # Product requirements
├── frontend/
│   ├── src/
│   │   ├── components/      # Shared UI (MobileFrame, Gallery, etc.)
│   │   ├── hooks/           # usePrototype navigation hook
│   │   ├── projects/        # ← Your prototypes go here
│   │   ├── registry.ts      # Auto-discovers projects
│   │   └── App.tsx          # Routing
│   ├── package.json
│   └── vite.config.ts
├── TASKS.md                 # What's built, what's planned
└── README.md                # You are here
```

## Tips

- **Safe to experiment**: Nothing here is production code. Break things freely.
- **One project per idea**: Keep prototypes focused on a single problem or feature.
- **Placeholder content is fine**: Use fake names, lorem ipsum, emoji icons — whatever communicates the idea.
- **Iterate quickly**: Don't aim for perfection. Aim for "can I see the idea clearly?"
