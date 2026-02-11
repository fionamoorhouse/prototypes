# Build Brief: Local Prototype Workspace for Product Exploration

## What I'm trying to accomplish

I want a local prototyping workspace that a non-technical product professional can use with Claude Code inside VS Code to quickly explore product ideas.

This is not a production app and not a design system.
It's a thinking tool.

The primary job of this repo is to let someone:

- articulate a product idea or problem in plain language
- ask an AI agent to help turn that idea into a clickable, mobile-framed prototype
- iterate on flows and layouts quickly
- compare ideas qualitatively (does this feel clearer? simpler? more usable?)
- share the result later if needed, but optimize first for local iteration

The emphasis is on speed, clarity, and low cognitive overhead, not polish or technical correctness.

## Who this is for

This repo is designed for a product person, not a developer.

They:

- are comfortable writing product specs and explaining intent
- are not expected to write React themselves
- will rely on Claude Code in the terminal to:
  - scaffold screens
  - adjust layouts
  - tweak copy and interactions
- should feel safe "playing" without breaking anything important

Everything about the structure should reduce fear:

- predictable patterns
- obvious places to add things
- minimal configuration
- clear visual output

## How this tool is meant to be used (day-to-day)

A typical session looks like this:

1. The user opens the repo in VS Code.
2. They run the local dev server.
3. They describe a product problem or idea to Claude Code.
4. Claude helps create a prototype project with a small set of screens.
5. The user clicks through the flow in a mobile-framed viewer.
6. They notice something:
   - "This is too dense."
   - "This screen should probably be split."
   - "What if this used a selector instead?"
7. They ask Claude to adjust the prototype.
8. Repeat.

At this stage, the most important outcome is:

> "I can see the idea, react to it, and think more clearly."

## What a "prototype project" is (conceptually)

A project represents a single product problem or feature area.

Examples:

- "Onboarding step for Feature X"
- "Settings page for managing Y"
- "First-time experience for Z"

Each project contains:

- a short written description (optional but encouraged)
- a set of screens that form a flow
- no backend logic
- no real data
- no authentication

Initially, each project will have one main flow.
Later, we may introduce variants (alternative layouts or interaction models), but that is not required for the MVP.

## What "variants" mean here (important for future, not MVP)

Variants are different solutions to the same problem, not versions over time.

Examples:

- One screen vs multi-step flow
- Selector-based interaction vs everything visible at once
- Dense layout vs spacious layout

Variants exist to support qualitative comparison, like a design review.

However:

- We are not optimizing for variants yet
- The initial architecture should allow them later without forcing complexity now

## Visual constraints and fidelity

- The primary surface is a mobile app
- All prototypes should be shown inside a phone-sized frame
  - roughly equivalent to a modern iPhone (15/16 class)
  - exact dimensions are not critical
- No fake OS chrome, status bar, or navigation required
- Light mode only
- Placeholder copy, icons, and images are totally acceptable
- This is about structure and comprehension, not final UI polish

## Design system philosophy (for now)

We will use:

- Tailwind
- shadcn/ui

The goal is:

- consistency
- reasonable defaults
- easy customization later

We do not need:

- perfect design tokens
- parity with Figma
- strict enforcement rules yet

We do want to build in a direction that can mature later.

## Non-goals (explicitly out of scope)

- Authentication
- Backend APIs
- Data persistence
- Production readiness
- Accessibility audits
- Automated testing
- Exact brand matching

If any of those become necessary later, we can add them deliberately.

## Success criteria for the MVP

This is successful if:

- A product person can run it locally without stress
- They can create a prototype with Claude Code in under ~30 minutes
- They can click through a mobile-framed flow and react to it
- The repo structure feels intuitive rather than intimidating
- Nothing feels "over-engineered"

## Implementation direction (high level, not binding)

- Vite + React + TypeScript
- Simple client-side routing
- Auto-discovered prototype projects
- A gallery home → project flow viewer
- Mobile frame wrapper as a shared component

The exact implementation details are less important than:

> keeping the mental model simple and the feedback loop fast

## Key decisions made during implementation

- **Interactive navigation**: Screens function like a real app — buttons and elements navigate between screens (not a sequential slideshow)
- **Project structure**: `frontend/` directory to allow a light backend to be added alongside later
- **Screen variations**: Recreate entire screen files for variants rather than modularizing within a screen — simpler mental model
- **Home page**: Minimal gallery listing projects, expandable later
